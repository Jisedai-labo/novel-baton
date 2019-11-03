<template>
  <v-app>
    <!-- ヘッダー内容 -->
    <v-app-bar app>
      <v-toolbar-title>Novel Baton</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text>about</v-btn>
        <v-btn text>mypage</v-btn>
        <v-btn v-if="isAuthenticated" text @click="logout">logout</v-btn>
        <v-btn v-else text @click="login">login</v-btn>
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
                update_timestamp: firebase.firestore.FieldValue.serverTimestamp()
              })
            } else {
              const data = {
                name: result.user.displayName,
                photoURL: result.user.photoURL,
                insert_timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                update_timestamp: firebase.firestore.FieldValue.serverTimestamp()
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
