<template>
  <div>
    <!-- ログイン中に表示される画面 -->
    <div v-if="isAuthenticated">
      {{ user }}でログイン中です
      <br />
      <button @click="logout">ログアウト</button>
      <br />
      <a href="/member-page">メンバーページへ</a>
    </div>
    <!-- ログインしていない時に表示される画面 -->
    <div v-else>
      メール
      <br />
      <input v-model="email" type="text" />
      <br />パスワード
      <br />
      <input v-model="password" type="password" />
      <br />
      <button @click="login">ログイン</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['isAuthenticated'])
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setUser(user)
    })
  },
  methods: {
    ...mapActions(['setUser']),
    login() {
      const provider = new firebase.auth.TwitterAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          const db = firebase.firestore()
          const docRef = db
            .collection('user')
            .doc(result.credential.accessToken)
          docRef.get().then(function(doc) {
            if (doc.exists) {
              docRef.update({
                name: result.user.displayName,
                photoURL: result.user.photoURL
              })
            } else {
              const data = {
                name: result.user.displayName,
                photoURL: result.user.photoURL
              }
              db.collection('user')
                .doc(result.credential.accessToken)
                .set(data)
            }
          })
          // ログインしたら飛ぶページを指定
        })
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.setUser(null)
        })
        .catch((error) => {
          alert(error)
        })
    }
  }
}
</script>
