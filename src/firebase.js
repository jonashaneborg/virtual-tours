import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init
const firebaseConfig = {
  apiKey: "AIzaSyDuLHwUCAKnjzZ-ZGWGSHAbpDzPgy3qM0c",
  authDomain: "vue-app-a4d41.firebaseapp.com",
  databaseURL: "https://vue-app-a4d41.firebaseio.com",
  projectId: "vue-app-a4d41",
  storageBucket: "vue-app-a4d41.appspot.com",
  messagingSenderId: "1093970165984",
  appId: "1:1093970165984:web:c2b0a52a0bcd41c6319085",
  measurementId: "G-4JGQ05CEW2"
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const toursCollection = db.collection('tours')

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  toursCollection
}
