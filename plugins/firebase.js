import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyAtIYohuNrq6Ys52rdnItJHiorVtGWuknw',
    authDomain: 'novel-baton.firebaseapp.com',
    databaseURL: 'https://novel-baton.firebaseio.com',
    projectId: 'novel-baton',
    storageBucket: 'novel-baton.appspot.com',
    messagingSenderId: '1046682947476',
    appId: '1:1046682947476:web:18dd696b0d8749f6334981',
    measurementId: 'G-438PYLZL92'
  })
}

export default firebase
