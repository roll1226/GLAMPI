import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'
import 'firebase/storage'

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
}

export default !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app()
const firestore = firebase.firestore()
const functions = firebase.functions()
const storage = firebase.storage()
const auth = firebase.auth()
const twitterProvider = new firebase.auth.TwitterAuthProvider()
const facebookProvider = new firebase.auth.FacebookAuthProvider()
const timestamp = firebase.firestore.FieldValue.serverTimestamp()
const fieldValue = firebase.firestore.FieldValue

export { firestore }
export { auth }
export { functions }
export { storage }
export { twitterProvider }
export { facebookProvider }
export { timestamp }
export { fieldValue }
