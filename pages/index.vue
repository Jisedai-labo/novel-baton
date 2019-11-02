<template>
  <v-layout column justify-center>
    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="text in texts" :key="text">
        <v-card v-for="(t, key, index) in text" :key="index">
          <v-card-text>
            {{ t }}
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <!-- <ul>
      <li v-for="(item, index) in items" :key="index">{{ item.title }}</li>
    </ul> -->
  </v-layout>
</template>

<script>
export default {
  data() {
    const init = [92, 88, 64, 86]
    const good = ['aa', 'bb', 'cc']
    return {
      titles: [
        { title: '桃太郎' },
        { title: 'delta大冒険' },
        { title: '神々の誕生' }
      ],
      tab: null,
      items: ['新着順', 'いいね順'],
      texts: [init, good]
    }
  }
}
</script>
