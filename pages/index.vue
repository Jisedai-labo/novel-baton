<template>
  <v-layout column justify-center>
    <v-tabs v-model="tab" background-color="transparent" grow>
      <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
    </v-tabs>
    {{ novels }}
    {{ numbera }}
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="text in texts" :key="text">
        <v-container>
          <v-row>
            <v-col
              v-for="(t, key, index) in text"
              :key="index"
              cols="12"
              sm="6"
              md="4"
              class="d-flex"
            >
              <v-card width="100%">
                <v-card-title>Unlimited music now</v-card-title>
                <v-card-text>{{ t }}</v-card-text>
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
    const init = [911111, 88, 64, 86, 111111, 5555]
    const good = [
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      'bb',
      'cc',
      'ddddddd'
    ]
    return {
      novels: [''],
      tab: null,
      items: ['新着順', 'いいね順'],
      texts: [init, good],
      numbera: 1
    }
  },
  mounted() {
    this.numbera = 2
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
    this.novels = arrays
  }
}
</script>
