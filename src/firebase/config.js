// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCU8OvQGbqhTAA-tZjYtqOXR_vWPIcXTqQ",
  authDomain: "mi-ecommerce-57fa9.firebaseapp.com",
  projectId: "mi-ecommerce-57fa9",
  storageBucket: "mi-ecommerce-57fa9.firebasestorage.app",
  messagingSenderId: "1086030756186",
  appId: "1:1086030756186:web:10d05747e7ca8152491b63",
  measurementId: "G-VB6NMCX48Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);