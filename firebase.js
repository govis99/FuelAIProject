import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth';  // Import Firebase Auth

const firebaseConfig = {
    apiKey: "AIzaSyDBm0IWyqZT3qFUjxTL_Lx7oy-deNmWoow",
    authDomain: "firestore-auth-71908.firebaseapp.com",
    projectId: "firestore-auth-71908",
    storageBucket: "firestore-auth-71908.appspot.com",
    messagingSenderId: "825383727369",
    appId: "1:825383727369:web:5ed7c74e0188e5105d63d8",
    measurementId: "G-Z9CMHXB6CD"
  };
const app = firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()
export const auth = firebase.auth();  // Export Firebase Auth