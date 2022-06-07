import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpECChd3rTFXzZmeFEFwKAMk8_o5qs8Ls",
  authDomain: "facebook-messenger-clone-619cb.firebaseapp.com",
  projectId: "facebook-messenger-clone-619cb",
  storageBucket: "facebook-messenger-clone-619cb.appspot.com",
  messagingSenderId: "372459518267",
  appId: "1:372459518267:web:c26d917de688e5ccbddf1e",
  measurementId: "G-FM4475MV72",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;
