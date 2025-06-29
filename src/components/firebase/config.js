// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with your web app's Firebase configuration
// Para Firebase JS SDK v7.20.0 y versiones posteriores, measurementId es opcional
const firebaseConfig = {
  apiKey: "AIzaSyCU8OvQGbqhTAA-tZjYtqOXR_vWPIcXTqQ", // <--- VERIFICA QUE ESTO ESTÉ CON TUS DATOS REALES DE FIREBASE
  authDomain: "mi-ecommerce-57fa9.firebaseapp.com", // <--- VERIFICA QUE ESTO ESTÉ CON TUS DATOS REALES DE FIREBASE
  projectId: "mi-ecommerce-57fa9", // <--- VERIFICA QUE ESTO ESTÉ CON TUS DATOS REALES DE FIREBASE
  storageBucket: "mi-ecommerce-57fa9.firebasestorage.app", // <--- VERIFICA QUE ESTO ESTÉ CON TUS DATOS REALES DE FIREBASE
  messagingSenderId: "1086030756186", // <--- VERIFICA QUE ESTO ESTÉ CON TUS DATOS REALES DE FIREBASE
  appId: "1:1086030756186:web:10d05747e7ca8152491b63", // <--- VERIFICA QUE ESTO ESTÉ CON TUS DATOS REALES DE FIREBASE
  // Opcional, solo si usas Google Analytics
  measurementId: "G-VB6NMCX48Q" // <--- VERIFICA QUE ESTO ESTÉ CON TUS DATOS REALES DE FIREBASE
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ¡¡¡ASEGÚRATE DE QUE ESTA LÍNEA ESTÉ PRESENTE Y SIN ERRORES!!!
export const db = getFirestore(app);