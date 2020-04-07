import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore' // <- needed if using firestore

//firebase config
const fbConfig = {
  apiKey: "AIzaSyCYnzL0jsdr0eErI74VedANNoseVfYsIkI",
  authDomain: "electronics-template.firebaseapp.com",
  databaseURL: "https://electronics-template.firebaseio.com",
  projectId: "electronics-template",
  storageBucket: "electronics-template.appspot.com",
  messagingSenderId: "807802334387",
  appId: "1:807802334387:web:49c900401304a6063294c6",
  measurementId: "G-FH221XRGNM"
}

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  // useFirestoreForProfile: true // <--Firestore for Profile instead of Realtime DB
}

// Initialize firebase instance
firebase.initializeApp(fbConfig)

// Initialize other services on firebase instance
firebase.firestore() // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

export default firebase;
export { rrfConfig };