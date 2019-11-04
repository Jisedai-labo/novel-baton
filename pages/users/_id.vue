<template>
  <v-layout column justify-center>
    <v-card class="mb-4 pa-4">
      <v-row>
        <v-col cols="3" sm="2">
          <img :src="photoURL" class="icon" width="100%" />
        </v-col>
        <v-col cols="9" sm="10">
          <p class="title mb-1">{{ user.name }}</p>
          <p class="body-1 mb-1">投稿数：{{ user.name }}</p>
          <p class="body-1 mb-1">いいね数：{{ user.name }}</p>
          <p class="body-1 mb-1">ブックマーク数：{{ user.name }}</p>
        </v-col>
      </v-row>
    </v-card>
    <v-card>
      <v-tabs v-model="tab" background-color="transparent" grow>
        <v-tab v-for="(item, index) in items" :key="index">{{ item }}</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(novel, novel_index) in novels" :key="novel_index">
          <v-container>
            <v-row>
              <v-col
                v-for="(n, index) in novel"
                :key="index"
                cols="12"
                sm="6"
                md="4"
                class="d-flex"
              >
                <v-hover v-slot:default="{ hover }">
                  <v-card width="100%" :elevation="hover ? 6 : 2">
                    <nuxt-link
                      :to="n.url"
                      class="d-block"
                      style="height: 100%;"
                    >
                      <v-card-title>{{ n.title }}</v-card-title>
                      <v-card-text>{{ n.headline }}</v-card-text>
                    </nuxt-link>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <div v-if="$store.state.post">
      <v-snackbar v-model="$store.state.post">
        投稿が完了しました
      </v-snackbar>
    </div>
    <div class="post-btn primary">
      <nuxt-link to="/post" class="d-block">
        <v-icon color="white">mdi-message-plus-outline</v-icon>
      </nuxt-link>
    </div>
  </v-layout>
</template>
<script>
import { mapActions } from 'vuex'
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      tab: null,
      items: ['投稿履歴', 'いいね'],
      novels: [],
      user: {},
      photoURL: []
    }
  },
  mounted() {
    setTimeout(this.closeModal, 3000)
    const db = firebase.firestore()
    db.collection('user')
      .doc(this.$route.params.id)
      .get()
      .then((doc) => {
        this.user = doc.data()
        this.photoURL = doc.data().photoURL.replace('normal', '400x400')
      })
    const arrays = []
    db.collection('novel')
      .where('postUsers', 'array-contains', this.$route.params.id)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // this.novels = doc.data()
          const raw = doc.data()
          raw.url = '/posts/' + doc.id
          arrays.push(raw)
        })
      })
    const favoriteArray = []
    db.collection('novel')
      .where('favoritedBy', 'array-contains', this.$route.params.id)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // this.novels = doc.data()
          const raw = doc.data()
          raw.url = '/posts/' + doc.id
          favoriteArray.push(raw)
        })
      })
    this.post_novels = arrays
    this.favorite_novels = favoriteArray
    this.novels = [this.post_novels, this.favorite_novels]
  },
  methods: {
    ...mapActions(['setPost']),
    closeModal() {
      this.setPost(false)
    }
  }
}
</script>
<style scoped>
.icon,
.name {
  color: #000;
  text-decoration: none;
  cursor: pointer;
  float: left;
}
</style>
