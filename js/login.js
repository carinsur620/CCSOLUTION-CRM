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




// LOGIN

document
.getElementById("loginForm")
.addEventListener("submit", async function(e){


e.preventDefault();



const email =
document.getElementById("username").value.trim();



const password =
document.getElementById("password").value;



const errorMessage =
document.getElementById("error");



try{


await signInWithEmailAndPassword(
auth,
email,
password
);



localStorage.setItem(
"loggedIn",
"true"
);



window.location.href = "./dashboard.html";



}

catch(err){

console.log(err);

let errorMessage =
document.getElementById("error");

errorMessage.innerHTML =
"Wrong email or password";

}



});