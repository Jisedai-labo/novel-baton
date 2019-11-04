<template>
  <v-card>
    <v-card-title class="headline">About</v-card-title>
    <v-card-text>
      <p class="title mt-8">Essay Batonとは？</p>
      <p>Essay Batonは、1人が1文ずつ書いて一つの小説を完成させるゲームです。</p>
      <p class="title mt-12">使い方</p>
      <ol>
        <li class="mb-2">右上のボタンからログインします（Twitter認証）</li>
        <li class="mb-2">
          新しく小説を作成する場合は、右下の投稿ボタンから投稿画面に遷移します
        </li>
        <li class="mb-2">
          タイトルと小説の一文目を入力して「作成する」ボタンを押します
        </li>
        <li class="mb-2">
          他のユーザーが作成した小説に書き足す場合は、トップページから好きな小説を選んで文章を追加してください。
        </li>
        <li class="mb-2">
          気に入った文章は「いいね」を押すことでマイページから確認できます。
        </li>
      </ol>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn raised large color="primary accent-4" to="/">TOPへ戻る</v-btn>
    </v-card-actions>
  </v-card>
</template>
