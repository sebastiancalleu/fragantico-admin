// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Import the functions you need from the SDKs you need
const firebaseConfig = {
  apiKey: "AIzaSyAuM5vEaEHYg0oDypnCfFtVzv0E4DTYocU",
  authDomain: "fragantico-df6fc.firebaseapp.com",
  projectId: "fragantico-df6fc",
  storageBucket: "fragantico-df6fc.firebasestorage.app",
  messagingSenderId: "631705028610",
  appId: "1:631705028610:web:1ba32afb58d3b88448bf1b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);