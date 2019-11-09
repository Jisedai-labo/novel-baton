<template>
  <v-card class="mx-auto py-6">
    <v-form ref="form" v-model="valid">
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-card-text>
        <div v-if="isAuthenticated" class="float-right">
          <v-btn
            v-if="isLiked"
            text
            class="pa-0"
            style="min-width: auto;"
            @click="dislike"
          >
            <v-icon color="pink">mdi-heart</v-icon>
          </v-btn>
          <v-btn
            v-else
            text
            class="pa-0"
            style="min-width: auto;"
            @click="like"
          >
            <v-icon color="pink">mdi-heart-outline</v-icon>
          </v-btn>
        </div>
        <a class="twitter-share-button" @click="popUpTweetWindow">Tweet</a>
        <p class="subtitle">更新日：{{ updatedAt }}</p>
        <p v-if="contents.length < 10" class="title text--primary mt-12">
          文章
        </p>
        <p v-if="contents.length < 10">
          現在{{ contents.length }}投稿です。あと{{
            10 - contents.length
          }}投稿で完結させてください。
        </p>
        <p v-else class="title text--primary mt-12">文章（完結）</p>
        <div class="text--primary">
          <div v-for="(content, index) in contents" :key="index">
            <v-row>
              <v-col cols="3" sm="2" lg="1">
                <nuxt-link class="d-block" :to="content.userURL">
                  <v-img
                    :src="content.photoURL"
                    aspect-ratio="1"
                    max-width="100"
                    class="circle"
                  ></v-img>
                </nuxt-link>
              </v-col>
              <v-col cols="9" sm="10" lg="11">
                <p>{{ content.body }}</p>
              </v-col>
            </v-row>
          </div>
        </div>
        <div v-if="contents.length < 10 && isAuthenticated">
          <p class="title text--primary mt-12">文章を追加する</p>
          <div class="text--primary">
            <v-textarea
              v-model="newContent"
              :rules="postRules"
              label="140文字以内で入力してね"
              rows="10"
              filled
            ></v-textarea>
          </div>
        </div>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn
          v-if="contents.length < 10 && isAuthenticated"
          raised
          large
          color="grey lighten-1 accent-4"
          @click="goback"
          >戻る</v-btn
        >
        <v-btn
          v-if="contents.length < 10 && isAuthenticated"
          :disabled="!valid"
          raised
          large
          color="primary accent-4"
          @click="post"
          >追加する</v-btn
        >
        <p v-if="contents.length >= 10">おわり</p>
        <p v-if="contents.length < 10 && !isAuthenticated">
          小説の続きを投稿したい場合はログインをしてください。
        </p>
      </v-card-actions>
    </v-form>
    <div v-if="$store.state.post">
      <v-snackbar v-model="$store.state.post">投稿が完了しました</v-snackbar>
    </div>
  </v-card>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex'
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
    contents: [],
    nextOrder: 0,
    newContent: '',
    postUsers: [],
    photoURL: [],
    isLiked: false,
    createdAt: [],
    updatedAt: '',
    TweetData: '',
    TweetURL: ''
  }),
  computed: {
    ...mapState(['user']),
    ...mapGetters(['isAuthenticated'])
  },
  mounted() {
    const db = firebase.firestore()
    const docRef = db.collection('novel').doc(this.$route.params.id)
    docRef.get().then((doc) => {
      const data = doc.data()
      this.title = data.title
      this.updatedAt =
        String(
          doc
            .data()
            .updatedAt.toDate()
            .getFullYear()
        ) +
        '年' +
        String(
          doc
            .data()
            .updatedAt.toDate()
            .getMonth() + 1
        ) +
        '月' +
        String(
          doc
            .data()
            .updatedAt.toDate()
            .getDate()
        ) +
        '日'
      if ('favoritedBy' in data) {
        if (data.favoritedBy.includes(this.$store.state.user.uid)) {
          this.isLiked = true
        } else {
          this.isLiked = false
        }
      } else {
        this.isLiked = false
      }
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
              raw.photoURL = this.postUsers[postUserIndex].photoURL.replace(
                'normal',
                '400x400'
              )
              raw.userURL = '/users/' + this.postUsers[postUserIndex].id
              this.nextOrder = raw.order + 1
            })
            this.contents = arrays
          })
      })
  },
  methods: {
    ...mapActions(['setPost']),
    popUpTweetWindow() {
      const hereURL = 'https://novel-baton.web.app' + this.$route.path
      const hashtags = 'novelbaton'

      const url = `https://twitter.com/intent/tweet?hashtags=${hashtags}&text=${this.title}&url=${hereURL}`
      const option = 'status=1,width=818,height=400,top=100,left=100'
      window.open(url, 'twitter', option)
    },
    like() {
      const db = firebase.firestore()
      db.collection('novel')
        .doc(this.$route.params.id)
        .update({
          favoritedBy: firebase.firestore.FieldValue.arrayUnion(
            this.$store.state.user.uid
          ),
          favoriteCount: firebase.firestore.FieldValue.increment(1)
        })
      this.isLiked = true
    },
    dislike() {
      const db = firebase.firestore()
      db.collection('novel')
        .doc(this.$route.params.id)
        .update({
          favoritedBy: firebase.firestore.FieldValue.arrayRemove(
            this.$store.state.user.uid
          ),
          favoriteCount: firebase.firestore.FieldValue.increment(-1)
        })
      this.isLiked = false
    },
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
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          order: this.nextOrder
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
      this.setPost(true)

      this.contents.push({
        body: this.newContent,
        order: this.nextOrder,
        photoURL: this.user.photoURL.replace('normal', '400x400'),
        userURL: '/users/' + this.postUsers.id
      })
      this.newContent = ' '
      scrollTo(0, 0)
      this.nextOrder = this.nextOrder + 1
    },
    closeModal() {
      this.setPost(false)
    }
  }
}
</script>
<style>
.circle .v-image__image {
  border-radius: 50%;
}
</style>
