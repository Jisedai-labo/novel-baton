<template>
  <v-layout column justify-center>
    <img :src="photoURL" width="134" class="icon" />
    <b class="name">{{ user.displayName }}</b>
    <v-tabs v-model="tab" background-color="transparent" grow>
      <v-tab v-for="(item, index) in items" :key="index">{{ item }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-container>
          <v-row>
            <v-col
              v-for="(history, index) in histories"
              :key="index"
              cols="12"
              sm="6"
              md="4"
              class="d-flex"
            >
              <v-card width="100%">
                <v-card-title>{{ history.title }}</v-card-title>
                <v-card-text>{{ history.headline }}</v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
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
  </v-layout>
</template>
<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      tab: null,
      datas: [''],
      items: ['投稿履歴', 'ブックマーク', 'いいね'],
      all: [],
      histories: [],
      user: {},
      photoURL: []
    }
  },
  beforeCreate() {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user
      this.photoURL = user.photoURL.replace('normal', '400x400')
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
