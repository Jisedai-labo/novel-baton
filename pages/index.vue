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
              <v-card width="100%">
                <v-card-title>{{ t.title }}</v-card-title>
                <v-card-text>{{ t.headline }}</v-card-text>
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
    // const init = [911111, 88, 64, 86, 111111, 5555]
    // const good = [
    //   'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    //   'bb',
    //   'cc',
    //   'ddddddd'
    // ]
    return {
      newly_novels: [],
      likely_novels: [],
      tab: null,
      items: ['新着順', 'いいね順'],
      texts: []
    }
  },
  mounted() {
    const db = firebase.firestore()
    const arrays = []
    db.collection('novel')
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // this.novels = doc.data()
          arrays.push(doc.data())
        })
      })
    this.newly_novels = arrays
    this.likely_novels = arrays
    this.texts = [this.newly_novels, this.likely_novels]
  }
}
</script>
