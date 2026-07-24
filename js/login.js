// ==========================================
// CCSOLUTION CRM
// FIREBASE LOGIN
// Firebase Modular SDK
// ==========================================

import { auth, db } from "./firebase-config.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


// LOGIN FORM

document
.getElementById("loginForm")
.addEventListener("submit", async (e)=>{


    e.preventDefault();


    const email =
    document.getElementById("username").value.trim();


    const password =
    document.getElementById("password").value;


    const errorMessage =
    document.getElementById("error");



    try{


        // Firebase Authentication Login

        const userCredential =
        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );


        const uid =
userCredential.user.uid;

console.log("LOGIN UID:", uid);



        // Get user profile from Firestore

        const userRef =
        doc(db,"users",uid);


        const userSnap =
        await getDoc(userRef);



        if(!userSnap.exists()){


            errorMessage.innerHTML =
            "User profile not found in database.";

            return;

        }



        const userData =
        userSnap.data();



        // Save session information

        localStorage.setItem(
            "loggedIn",
            "true"
        );


        localStorage.setItem(
            "uid",
            uid
        );


        localStorage.setItem(
            "role",
            userData.role || "agent"
        );


        localStorage.setItem(
            "name",
            userData.name || "Agent"
        );



        // Redirect

        window.location.href =
        "dashboard.html";



    }
    catch(error){


        console.error(error);


        errorMessage.innerHTML =
        error.code + " : " + error.message;


    }


});