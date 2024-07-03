// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDofc-G4iQ3jLdW57IZHJnm33zPTsFTuiw",
    authDomain: "netflixgpt-dcca7.firebaseapp.com",
    projectId: "netflixgpt-dcca7",
    storageBucket: "netflixgpt-dcca7.appspot.com",
    messagingSenderId: "193138701468",
    appId: "1:193138701468:web:2f10613b8e155fe30a2959",
    measurementId: "G-089JSJ8L6X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);