<template>
  <v-layout>
    <v-tabs v-model="tab" background-color="transparent" grow>
      <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <!-- 投稿履歴 -->
      <v-tab-item>
        <v-container>
          <v-row>
            <v-col
              v-for="history in histories"
              :key="history"
              cols="12"
              sm="6"
              md="4"
              class="d-flex"
            >
              <v-card width="100%">
                <v-card-title>{{ hisotry.title }}</v-card-title>
                <v-card-text>{{ history.headline }}</v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
      <v-tab-item v-for="novel in all" :key="novel">
        <v-container>
          <v-row>
            <v-col
              v-for="(n, index) in n"
              :key="n"
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
export default {
  data() {
    return {
      datas: [''],
      items: ['投稿履歴', 'ブックマーク一覧', 'いいね一覧'],
      all: [[{"novel-title": "bbbbbbb","novel-headline": "aaaaaaaaaaa","novel-id":1}],[{"novel-title": "cccc","novel-headline": "dddd","novel-id":2}]],
      histories: [{"novel-title": "dleta大冒険","novel-headline": "aaaaaaaaaaa","novel-id":1}]
    }
  }
    mounted() {
      const db = firebase.firestore()
      const arrays = []
      db.collection('user')
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            arrays.push(doc.data())
          })
        })
      this.datas = arrays
      this.histories = arrays
      this.all = [this.datas, this.datas]
    }
}
</script>
