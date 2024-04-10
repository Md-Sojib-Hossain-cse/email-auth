// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBCXgIT1TWyZtT-uc_afGsmcNKk3ia9pQU",
    authDomain: "user-email-pass-auth-e9bc3.firebaseapp.com",
    projectId: "user-email-pass-auth-e9bc3",
    storageBucket: "user-email-pass-auth-e9bc3.appspot.com",
    messagingSenderId: "832786843111",
    appId: "1:832786843111:web:9d6a4dc00127563047e942"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;