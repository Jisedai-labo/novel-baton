<template>
  <v-card class="mx-auto py-6">
    <v-card-title class="display-2">{{ title }}</v-card-title>
    <v-card-text>
      <p>作成日：2019/11/02</p>
      <p class="display-1 text--primary mt-12">文章（作成途中）</p>
      <div class="text--primary">{{ content }}:{{ nextOrder }}</div>
      <p class="display-1 text--primary mt-12">
        文章を追加する
      </p>
      <div class="text--primary">
        <v-textarea
          v-model="newContent"
          :rules="postRules"
          label="140文字以内で入力してね"
          rows="10"
          filled
        >
        </v-textarea>
      </div>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn raised large color="grey lighten-1 accent-4" @click="goback">
        戻る
      </v-btn>
      <v-btn raised large color="primary accent-4" @click="post">
        追加する
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapState } from 'vuex'
import firebase from '~/plugins/firebase'
export default {
  data: () => ({
    valid: true,
    name: '',
    postRules: [
      (v) => !!v || '文章を入力してください',
      (v) => (v && v.length <= 140) || '文章は140文字以内で入力してください'
    ],
    title: '',
    content: [],
    nextOrder: 0,
    newContent: '',
    postUsers: []
  }),
  computed: {
    ...mapState(['user'])
  },
  mounted() {
    const db = firebase.firestore()
    const docRef = db.collection('novel').doc(this.$route.params.id)
    docRef.get().then((doc) => {
      const data = doc.data()
      this.title = data.title
    })
    docRef
      .collection('content')
      .orderBy('order')
      .get()
      .then((querySnapshot) => {
        db.collection('user')
          .where('posts', 'array-contains', this.$route.params.id)
          .get()
          .then((userQuerySnapshot) => {
            let arrays = []
            userQuerySnapshot.forEach((doc, index) => {
              const raw = doc.data()
              raw.id = doc.id
              arrays.push(raw)
            })
            this.postUsers = arrays
            arrays = []
            querySnapshot.forEach((doc, index) => {
              const raw = doc.data()
              arrays.push(raw)
              const postUserIndex = this.postUsers.findIndex(
                (item) => item.id === raw.userUid
              )
              raw.photoURL = this.postUsers[postUserIndex].photoURL
              this.nextOrder = raw.order + 1
            })
            this.content = arrays
          })
      })
  },
  methods: {
    goback() {
      this.$router.go(-1)
    },
    post() {
      const db = firebase.firestore()
      const user = this.$store.state.user
      db.collection('novel')
        .doc(this.$route.params.id)
        .update({
          postUsers: firebase.firestore.FieldValue.arrayUnion(user.uid),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        })
      db.collection('novel')
        .doc(this.$route.params.id)
        .collection('content')
        .add({
          body: this.newContent,
          order: this.nextOrder,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          userUid: user.uid
        })
      db.collection('user')
        .doc(user.uid)
        .update({
          posts: firebase.firestore.FieldValue.arrayUnion(this.$route.params.id)
        })
      this.$router.push({ path: '/' })
    }
  }
}
</script>
