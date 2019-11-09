<template>
  <v-layout column justify-center>
    <v-tabs v-model="tab" background-color="transparent" grow>
      <v-tab v-for="(item, item_index) in items" :key="item_index">
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(text, text_index) in texts" :key="text_index">
        <v-container>
          <v-row>
            <v-col
              v-for="(t, index) in text"
              :key="index"
              cols="12"
              sm="6"
              md="4"
              class="d-flex"
            >
              <v-hover v-slot:default="{ hover }">
                <v-card width="100%" :elevation="hover ? 6 : 2">
                  <nuxt-link :to="t.url" class="d-block" style="height: 100%;">
                    <v-card-title>{{ t.title }}</v-card-title>
                    <v-card-subtitle
                      >{{ t.createdAt }}
                      <div class="float-right">
                        <v-icon v-if="t.order >= 10" color="black" class="pr-2"
                          >mdi-book-lock</v-icon
                        >
                        <v-icon color="pink" class="pr-2">mdi-heart</v-icon>
                        {{ t.favCount }}
                      </div>
                    </v-card-subtitle>
                    <v-card-text>{{ t.headline }}</v-card-text>
                  </nuxt-link>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs-items>
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
      newly_novels: [],
      likely_novels: [],
      tab: null,
      items: ['更新順', 'いいね数順'],
      texts: [],
      novelId: this.$route.params.id,
      show: true
    }
  },
  mounted() {
    setTimeout(this.closeModal, 3000)
    const db = firebase.firestore()
    const arrays = []
    db.collection('novel')
      .orderBy('updatedAt', 'desc')
      .limit(100)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // this.novels = doc.data()
          const raw = doc.data()
          raw.url = 'posts/' + doc.id
          raw.createdAt =
            String(raw.createdAt.toDate().getFullYear()) +
            '年' +
            String(raw.createdAt.toDate().getMonth() + 1) +
            '月' +
            String(raw.createdAt.toDate().getDate()) +
            '日'
          if ('favoritedBy' in raw) {
            raw.favCount = raw.favoritedBy.length
          } else {
            raw.favCount = 0
          }
          arrays.push(raw)
        })
      })
    this.newly_novels = arrays
    const favoriteArrays = []
    db.collection('novel')
      .orderBy('favoriteCount', 'desc')
      .limit(100)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // this.novels = doc.data()
          const raw = doc.data()
          raw.url = 'posts/' + doc.id
          raw.createdAt =
            String(raw.createdAt.toDate().getFullYear()) +
            '年' +
            String(raw.createdAt.toDate().getMonth() + 1) +
            '月' +
            String(raw.createdAt.toDate().getDate()) +
            '日'
          if ('favoritedBy' in raw) {
            raw.favCount = raw.favoritedBy.length
          } else {
            raw.favCount = 0
          }
          favoriteArrays.push(raw)
        })
      })
    this.likely_novels = favoriteArrays
    this.texts = [this.newly_novels, this.likely_novels]
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
.v-application a {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
