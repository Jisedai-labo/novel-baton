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
        <v-tab-item v-for="(novel, novel_index) in all" :key="novel_index">
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
                <v-card width="100%">
                  <v-card-title>{{ n.title }}</v-card-title>
                  <v-card-text>{{ n.headline }}</v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <div class="post-btn primary">
      <nuxt-link to="/post" class="d-block">
        <v-icon color="white">mdi-message-plus-outline</v-icon>
      </nuxt-link>
    </div>
  </v-layout>
</template>
<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      tab: null,
      items: ['投稿履歴', 'いいね', 'ブックマーク'],
      all: [],
      user: {},
      photoURL: []
    }
  },
  mounted() {
    const db = firebase.firestore()
    db.collection('user')
      .doc(this.$route.params.id)
      .get()
      .then((doc) => {
        this.user = doc.data()
        this.photoURL = doc.data().photoURL.replace('normal', '400x400')
      })
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
