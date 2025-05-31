// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2pWXhRqChrr4yEzaNeL1fLR3a0OMGfiE",
  authDomain: "netflixgpt-b1b67.firebaseapp.com",
  projectId: "netflixgpt-b1b67",
  storageBucket: "netflixgpt-b1b67.firebasestorage.app",
  messagingSenderId: "882367429412",
  appId: "1:882367429412:web:62f0d718ffae12183ad1b1",
  measurementId: "G-12P1F6NXG1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();