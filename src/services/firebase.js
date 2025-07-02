// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TUS CREDENCIALES DE FIREBASE (¡USA LAS TUYAS!)
const firebaseConfig = {
  apiKey: "AIzaSyCU8OvQGbqhTAA-tZjYtqOXR_vWPIcXTqQ",
  authDomain: "mi-ecommerce-57fa9.firebaseapp.com",
  projectId: "mi-ecommerce-57fa9",
  storageBucket: "mi-ecommerce-57fa9.firebasestorage.app",
  messagingSenderId: "1086030756186",
  appId: "1:1086030756186:web:10d05747e7ca8152491b63",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
