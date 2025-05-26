import firebase from 'firebase/app';
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBistMbG8Uy306LdzFgQdAIEvfkFUATBrM",
  authDomain: "project-planner-shinah.firebaseapp.com",
  projectId: "project-planner-shinah",
  storageBucket: "project-planner-shinah.firebasestorage.app",
  messagingSenderId: "760867333442",
  appId: "1:760867333442:web:38a29ec477a636d0cb54db"
};

// initialize firebase
firebase.initializeApp(firebaseConfig)

// database setup
let db=firebase.firestore();

let timestamp=firebase.firestore.FieldValue.serverTimestamp;

export { db, timestamp };