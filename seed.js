// seed.js
import { collection, addDoc } from "firebase/firestore";
import { db } from "./src/services/firebase.js"; // Asegúrate que la ruta a tu config sea correcta

// --- LISTA DE PRODUCTOS A CARGAR ---
// Pega aquí la lista de productos. Puedes agregar o quitar los que quieras.
const products = [
  {
    name: 'Laptop MSI Katana',
    price: 2000000,
    category: 'notebooks',
    img: 'https://asset.msi.com/resize/image/global/product/product_16363403946a691286196096530335804899587391.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png',
    stock: 7,
    description: 'Notebook especializada para gaming, con procesador Intel y placa RTX 4060.'
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    price: 1850000,
    category: 'celulares',
    img: 'https://images.samsung.com/is/image/samsung/p6pim/ar/2401/gallery/ar-galaxy-s24-ultra-sm-s928bztgaro-539311218?$650_519_PNG$',
    stock: 15,
    description: 'El celular más potente con IA integrada y la mejor cámara del mercado.'
  },
  {
    name: 'iPhone 15 Pro',
    price: 1950000,
    category: 'celulares',
    img: 'https://www.apple.com/v/iphone-15-pro/c/images/overview/design/design_display_s_1_endframe__c843z1c3pyyq_large.jpg',
    stock: 10,
    description: 'Diseño de titanio, chip A17 Pro y un sistema de cámaras Pro más versátil.'
  },
  {
    name: 'iPad Air (M2)',
    price: 980000,
    category: 'tablets',
    img: 'https://www.apple.com/v/ipad-air/t/images/overview/design/design_hero_1_endframe__d8p73yr6hpci_large.jpg',
    stock: 12,
    description: 'Potencia increíble con el chip M2 en un diseño delgado y ligero.'
  }
];

// --- SCRIPT DE CARGA ---
const productsRef = collection(db, "products");

const seedProducts = async () => {
    console.log("Iniciando el proceso de carga de productos...");

    // Usamos Promise.all para esperar a que todas las cargas terminen.
    await Promise.all(products.map(item => {
        return addDoc(productsRef, item)
            .then(docRef => {
                console.log(`✅ Producto agregado: ${item.name} (ID: ${docRef.id})`);
            })
            .catch(error => {
                console.error(`❌ Error al agregar producto ${item.name}: `, error);
            });
    }));

    console.log("¡Proceso de carga finalizado!");
    // Node.js no cierra la conexión de Firebase automáticamente, 
    // pero para un script simple como este, no es un problema.
};

seedProducts();
