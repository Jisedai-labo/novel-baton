<template>
  <v-app>
    <!-- ヘッダー内容 -->
    <v-app-bar app>
      <v-toolbar-title>
        <nuxt-link to="/" class="logo">Novel Baton</nuxt-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text to="/mypage">
          <v-icon>mdi-human-greeting</v-icon>
        </v-btn>
        <v-btn v-if="isAuthenticated" text @click="logout">
          <v-icon>mdi-logout-variant</v-icon>
        </v-btn>
        <v-btn v-else text @click="login">
          <v-icon>mdi-login-variant</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer app>
      <span>&copy; 201911</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import firebase from '~/plugins/firebase'
export default {
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
          const docRef = db.collection('user').doc(result.user.uid)
          docRef.get().then(function(doc) {
            if (doc.exists) {
              docRef.update({
                name: result.user.displayName,
                photoURL: result.user.photoURL,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
              })
            } else {
              const data = {
                name: result.user.displayName,
                photoURL: result.user.photoURL,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
              }
              db.collection('user')
                .doc(result.user.uid)
                .set(data)
            }
          })
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
<style>
.v-toolbar__title .logo {
  display: block;
  color: #000;
  text-decoration: none;
}
</style>
