<template>
  <v-app>
    <!-- ヘッダー内容 -->
    <v-app-bar app>
      <v-toolbar-title>
        <nuxt-link to="/" class="logo">Novel Baton</nuxt-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text to="/about">
          <v-icon>mdi-help-box</v-icon>
        </v-btn>
        <v-btn v-if="isAuthenticated" text :to="userURL">
          <v-icon>mdi-human-greeting</v-icon>
        </v-btn>
        <v-btn v-if="isAuthenticated" text @click.stop="dialog = true">
          <v-icon>mdi-logout-variant</v-icon>
        </v-btn>
        <v-btn v-else text @click="login">
          <v-icon>mdi-login-variant</v-icon>
        </v-btn>
        <v-dialog v-model="dialog" max-width="400">
          <v-card>
            <v-card-title class="headline"
              >本当にログアウトしますか？</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="green darken-1" text @click="dialog = false">
                キャンセル
              </v-btn>

              <v-btn color="green darken-1" text @click="logout">
                ログアウト
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer app absolute>
      <span>&copy; gyouza</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      userURL: '',
      dialog: false
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['isAuthenticated'])
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setUser(user)
      this.userURL = '/users/' + user.uid
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
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                twitterId: result.additionalUserInfo.profile.screen_name
              })
            } else {
              const data = {
                name: result.user.displayName,
                photoURL: result.user.photoURL,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                twitterId: result.additionalUserInfo.profile.screen_name
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
      this.dialog = false
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
.v-toolbar__items .v-btn {
  min-width: auto !important;
}
.post-btn {
  display: block;
  position: fixed;
  bottom: 8%;
  right: 5%;
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  border-radius: 25px;
  transition: 0.4s;
}
.post-btn:hover {
  opacity: 0.7;
  transition: 0.4s;
}
a {
  color: black;
  text-decoration: none;
}
</style>
