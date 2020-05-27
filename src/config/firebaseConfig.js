import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore'; // <- needed if using firestore

// firebase config for electronics-template
// const fbConfig = {
//   apiKey: "AIzaSyCYnzL0jsdr0eErI74VedANNoseVfYsIkI",
//   authDomain: "electronics-template.firebaseapp.com",
//   databaseURL: "https://electronics-template.firebaseio.com",
//   projectId: "electronics-template",
//   storageBucket: "electronics-template.appspot.com",
//   messagingSenderId: "807802334387",
//   appId: "1:807802334387:web:49c900401304a6063294c6",
//   measurementId: "G-FH221XRGNM"
// }

// firebase config for ecom-cse
const fbConfig = {
  apiKey: 'AIzaSyDgLsvomzUN0uBvH-QvBjfp_yvBPgeSuR8',
  authDomain: 'ecom-cse.firebaseapp.com',
  databaseURL: 'https://ecom-cse.firebaseio.com',
  projectId: 'ecom-cse',
  storageBucket: 'ecom-cse.appspot.com',
  messagingSenderId: '535828749873',
  appId: '1:535828749873:web:c991827f83d3ecef83bf10',
  measurementId: 'G-898N0JYJT9',
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  // useFirestoreForProfile: true // <--Firestore for Profile instead of Realtime DB
};

// Initialize firebase instance
firebase.initializeApp(fbConfig);

// Initialize other services on firebase instance
firebase.firestore(); // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

firebase.firestore().enablePersistence()
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code === 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
  });

export default firebase;
export { rrfConfig };
