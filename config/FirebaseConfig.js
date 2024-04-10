// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASEAPI_KEY,
  authDomain: "meeting-schedule-58b6b.firebaseapp.com",
  projectId: "meeting-schedule-58b6b",
  storageBucket: "meeting-schedule-58b6b.appspot.com",
  messagingSenderId: "314373791622",
  appId: "1:314373791622:web:ce68c120aa57db4bd6d607",
  measurementId: "G-FT54PPP8MY",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
