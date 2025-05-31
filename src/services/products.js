// src/services/products.js

// Aquí estamos simulando una “base de datos” de productos con un array.
// Cada objeto tiene id, nombre, categoría, precio, imagen y descripción.

const products = [
  {
    id: '1',
    name: 'Remera Manga Corta',
    category: 'remeras',
    price: 1500,
    img: 'https://via.placeholder.com/200x200?text=Remera+1',
    description: 'Remera de algodón manga corta. Disponible en varios colores.',
  },
  {
    id: '2',
    name: 'Remera Manga Larga',
    category: 'remeras',
    price: 2000,
    img: 'https://via.placeholder.com/200x200?text=Remera+2',
    description: 'Remera de algodón manga larga. Diseño unisex.',
  },
  {
    id: '3',
    name: 'Pantalón Jeans',
    category: 'pantalones',
    price: 4000,
    img: 'https://via.placeholder.com/200x200?text=Pantalon+1',
    description: 'Jeans clásico, corte recto. Colores: azul oscuro y negro.',
  },
  {
    id: '4',
    name: 'Zapatillas Deportivas',
    category: 'calzado',
    price: 5500,
    img: 'https://via.placeholder.com/200x200?text=Zapatillas',
    description: 'Zapatillas cómodas para deporte. Tallas 35 a 45.',
  },
  {
    id: '5',
    name: 'Campera Abrigo',
    category: 'campañas',
    price: 7500,
    img: 'https://via.placeholder.com/200x200?text=Campera',
    description: 'Campera gruesa para invierno. Impermeable y desmontable.',
  },
  // Puedes agregar más productos aquí con distintas categorías...
];

/**
 * getProducts: retorna todos los productos después de un delay simulado.
 */
export function getProducts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 500); // 500ms de “carga”
  });
}

/**
 * getProductById: busca un producto por su id.
 */
export function getProductById(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = products.find((prod) => prod.id === id);
      if (product) resolve(product);
      else reject(new Error('Producto no encontrado'));
    }, 500);
  });
}

/**
 * getProductsByCategory: filtra productos según categoría.
 */
export function getProductsByCategory(categoryId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = products.filter(
        (prod) => prod.category === categoryId
      );
      resolve(filtered);
    }, 500);
  });
}
