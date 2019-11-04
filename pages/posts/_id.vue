<template>
  <v-card class="mx-auto py-6">
    <v-card-title class="display-2">タイトル: {{ title }}</v-card-title>
    <v-card-text>
      <p>作成日：2019/11/02</p>
      <p class="display-1 text--primary mt-12">
        文章（作成途中）
      </p>
      <div class="text--primary">{{ content }}:{{ nextOrder }}</div>
      <p class="display-1 text--primary mt-12">
        文章を追加する
      </p>
      <div class="text--primary">
        <v-textarea
          :rules="postRules"
          label="140文字以内で入力してね"
          rows="10"
          filled
        >
        </v-textarea>
      </div>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn raised large color="grey lighten-1 accent-4">
        戻る
      </v-btn>
      <v-btn raised large color="primary accent-4">
        追加する
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
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
    nextOrder: 0
  }),
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
        const arrays = []
        querySnapshot.forEach((doc, index) => {
          const raw = doc.data()
          arrays.push(raw)
          this.nextOrder = raw.order + 1
        })
        this.content = arrays
      })
  },
  methods: {
    post() {
      // const db = firebase.firestore()
    }
  }
}
</script>
