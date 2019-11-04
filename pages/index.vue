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
                    <v-card-text>{{ t.headline }}</v-card-text>
                  </nuxt-link>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs-items>
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
      texts: [],
      novelId: this.$route.params.id
    }
  },
  mounted() {
    const db = firebase.firestore()
    const arrays = []
    db.collection('novel')
      .orderBy('updatedAt')
      .limit(100)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // this.novels = doc.data()
          const raw = doc.data()
          raw.url = 'posts/' + doc.id
          arrays.push(raw)
        })
      })
    this.newly_novels = arrays
    this.likely_novels = arrays
    this.texts = [this.newly_novels, this.likely_novels]
  }
}
</script>
<style scoped>
.v-application a {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
.post-btn {
  display: block;
  position: fixed;
  bottom: 8%;
  right: 5%;
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  border-radius: 25px;
  transition: 0.4s;
}
.post-btn:hover {
  opacity: 0.7;
  transition: 0.4s;
}
</style>
