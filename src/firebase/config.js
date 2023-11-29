//
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
//
const firebaseConfig = {
  apiKey: "AIzaSyBD6-dv1OFowYWZ7NtzsJP8O-UGg7ElHfs",
  authDomain: "munies-89395.firebaseapp.com",
  projectId: "munies-89395",
  storageBucket: "munies-89395.appspot.com",
  messagingSenderId: "180472283349",
  appId: "1:180472283349:web:6dbb542815628eee5be25c",
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };
