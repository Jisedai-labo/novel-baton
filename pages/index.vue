<template>
  <v-layout column justify-center align-center>
    <!-- <v-flex xs12 sm8 md6> -->
    <div class="text-center">
      <ul id="titles">
        <li v-for="(item, index) in items" :key="index">
          {{ item.title }}
        </li>
      </ul>
    </div>
    <!-- </v-flex> -->
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: '桃太郎' },
        { title: 'delta大冒険' },
        { title: '神々の誕生' }
      ]
    }
  }
}
</script>
