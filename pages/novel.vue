<template>
  <v-card class="mx-auto py-6">
    <v-card-title class="display-2">
      タイトルが入ります！！！！！！！
    </v-card-title>
    <v-card-text>
      <p>作成日：2019/11/02</p>
      <p class="display-1 text--primary mt-12">
        文章（作成途中）
      </p>
      <div class="text--primary">
        ここに文章が入ります。ここに文章が入ります。ここに文章が入ります。ここに文章が入ります。ここに文章が入ります。ここに文章が入ります。ここに文章が入ります。ここに文章が入ります。ここに文章が入ります。ここに文章が入ります。ここに文章が入ります。ここに文章が入ります。ここに文章が入ります。ここに文章が入ります。ここに文章が入ります。ここに文章が入ります。ここに文章が入ります。ここに文章が入ります。ここに文章が入ります。ここに文章が入ります。ここに文章が入ります。
      </div>
      <p class="display-1 text--primary mt-12">
        文章を追加する
      </p>
      <div class="text--primary">
        <v-textarea
          :rules="postRules"
          label="140文字以内で入力してね"
          rows="10"
          filled
        >
        </v-textarea>
      </div>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn raised large color="grey lighten-1 accent-4">
        戻る
      </v-btn>
      <v-btn raised large color="primary accent-4">
        追加する
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    valid: true,
    name: '',
    postRules: [
      (v) => !!v || '文章を入力してください',
      (v) => (v && v.length <= 140) || '文章は140文字以内で入力してください'
    ]
  })
}
</script>
