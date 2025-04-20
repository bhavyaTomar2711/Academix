
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMuBeAYBxLuLTFg-lnRWyKRMvN2_bJClo",
  authDomain: "academix-4e29d.firebaseapp.com",
  databaseURL: "https://academix-4e29d-default-rtdb.firebaseio.com",
  projectId: "academix-4e29d",
  storageBucket: "academix-4e29d.firebasestorage.app",
  messagingSenderId: "557049014238",
  appId: "1:557049014238:web:4f2477516e444fd4cf1f4f",
  measurementId: "G-LHNRZW0FNM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
 
export { auth, db };