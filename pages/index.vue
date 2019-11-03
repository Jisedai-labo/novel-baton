<template>
  <v-layout column justify-center>
    <v-tabs v-model="tab" background-color="transparent" grow>
      <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="text in texts" :key="text">
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="4"
              v-for="(t, key, index) in text"
              :key="index"
              class="d-flex"
            >
              <v-card width="100%">
                <v-card-title>
                  Unlimited music now
                </v-card-title>
                <v-card-text>
                  {{ t }}
                </v-card-text>
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
    const init = [911111, 88, 64, 86, 111111, 5555]
    const good = [
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      'bb',
      'cc',
      'ddddddd'
    ]
    return {
      datas: [
        {title: '桃太郎',
         content: [
           {detail: "dafadfa"},
           {detail: "daaaaaa"}
         ]
        },
        {title: 'delta大冒険',
         content: [
           {detail: "dafadfa"},
           {detail: "daaaaaa"}
         ]
        },
        {title: '神々',
         content: [
           {detail: "dafadfa"},
           {detail: "daaaaaa"}
         ]
        }
      ],
      tab: null,
      items: ['新着順', 'いいね順'],
      texts: [init, good]
    }
  }
}
</script>
