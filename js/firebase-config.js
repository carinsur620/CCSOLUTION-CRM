import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC5jyf2B1qjKz00K57sjdSMCTdv2QV7tMY",
  authDomain: "ccsolution-crm.firebaseapp.com",
  projectId: "ccsolution-crm",
  storageBucket: "ccsolution-crm.firebasestorage.app",
  messagingSenderId: "853275270526",
  appId: "1:853275270526:web:53d1eb278bd5e99b7b672f",
  measurementId: "G-P711W0SCS1"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);