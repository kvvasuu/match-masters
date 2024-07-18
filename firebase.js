// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAwLW6zzqRvbv442aBpMLDcOjmeod1vhA",
  authDomain: "match-masters-174d4.firebaseapp.com",
  projectId: "match-masters-174d4",
  storageBucket: "match-masters-174d4.appspot.com",
  messagingSenderId: "967071736292",
  appId: "1:967071736292:web:5c4660b90cc47426cd27f1",
  measurementId: "G-61XC3BMVWW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
