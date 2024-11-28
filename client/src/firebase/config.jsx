// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCvZXiJ5rxDJ3T9VI90LllzrUokSXdJGI",
  authDomain: "note-app-1398f.firebaseapp.com",
  projectId: "note-app-1398f",
  storageBucket: "note-app-1398f.firebasestorage.app",
  messagingSenderId: "794738252253",
  appId: "1:794738252253:web:4b74b0b7b4ae24bb24fe34",
  measurementId: "G-F0J00NFD1J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);