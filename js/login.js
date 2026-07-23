// ==========================================
// CCSOLUTION CRM
// FIREBASE LOGIN
// ==========================================

// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5jyf2B1qjKz00K57sjdSMCTdv2QV7tMY",
  authDomain: "ccsolution-crm.firebaseapp.com",
  projectId: "ccsolution-crm",
  storageBucket: "ccsolution-crm.firebasestorage.app",
  messagingSenderId: "853275270526",
  appId: "1:853275270526:web:53d1eb278bd5e99b7b672f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

// LOGIN
document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {

    e.preventDefault();

    const email =
      document.getElementById("username").value.trim();

    const password =
      document.getElementById("password").value;

    const errorMessage =
      document.getElementById("error");

    try {

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const uid = userCredential.user.uid;

      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        errorMessage.innerHTML = "User profile not found.";
        return;
      }

      const userData = userSnap.data();

      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("uid", uid);
      localStorage.setItem("role", userData.role);
      localStorage.setItem("name", userData.name);

      window.location.href = "./dashboard.html";

    } catch (err) {

      console.error(err);

      errorMessage.innerHTML = "Wrong email or password";

    }

  });