// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCB0LzHf5ucIeHzrN38We9Sz-4LbPwobow",
  authDomain: "apostle-tag-app.firebaseapp.com",
  projectId: "apostle-tag-app",
  storageBucket: "apostle-tag-app.appspot.com",
  messagingSenderId: "1020405676704",
  appId: "1:1020405676704:web:b4dd9ad1c5f549c5ea27c5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
