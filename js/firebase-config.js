// ==========================================
// CCSOLUTION CRM
// FIREBASE CONFIGURATION
// Firebase Modular SDK
// ==========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { 
    getAuth 
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import { 
    getFirestore 
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


// Firebase Configuration

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


// Export Firebase services

export const auth = getAuth(app);

export const db = getFirestore(app);