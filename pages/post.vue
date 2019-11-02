<template>
  <v-card class="mx-auto py-6">
    <v-card-title class="display-2">
      新規投稿
    </v-card-title>
    <v-card-text>
      <p>作成日：2019/11/02</p>
      <p class="display-1 text--primary">
        タイトル
      </p>
      <div class="text--primary">
        <v-text-field
          :rules="titleRules"
          label="20文字以内で入力してね"
          required
          filled
        >
        </v-text-field>
      </div>
      <p class="display-1 text--primary mt-6">
        文章
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
        作成する
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    valid: true,
    name: '',
    titleRules: [
      (v) => !!v || 'タイトルは必須です',
      (v) => (v && v.length <= 20) || 'タイトルは20文字以内で入力してください'
    ],
    postRules: [
      (v) => !!v || '文章は必須です',
      (v) => (v && v.length <= 140) || '文章は140文字以内で入力してください'
    ]
  })
}
</script>
