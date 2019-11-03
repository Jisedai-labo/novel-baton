<template>
  <v-layout column justify-center>
    <p>{{ user }}</p>
    <br />
    <v-tabs v-model="tab" background-color="transparent" grow>
      <v-tab v-for="(item, index) in items" :key="index">{{ item }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <!-- 投稿履歴 -->
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
import { mapState } from 'vuex'
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      tab: null,
      datas: [''],
      items: ['投稿履歴', 'ブックマーク一覧', 'いいね一覧'],
      all: [],
      histories: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      const db = firebase.firestore()
      const marks = []
      const likes = []
      const histories = []
      db.collection('user')
        .doc(user.uid)
        .collection('bookmark')
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            marks.push(doc.data())
          })
        })
      db.collection('user')
        .doc(user.uid)
        .collection('like')
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            likes.push(doc.data())
          })
        })

      db.collection('user')
        .doc(user.uid)
        .collection('post_history')
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            histories.push(doc.data())
          })
        })
      console.log(histories)
      this.histories = histories
      this.all = [likes, marks]
    })
  }
}
</script>
