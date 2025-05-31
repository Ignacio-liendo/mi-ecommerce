const products = [
  { id: '1', name: 'Televisor', description: 'Smart TV 42"', category: 'electronics' },
  { id: '2', name: 'Remera', description: 'Remera algodón', category: 'clothing' },
  { id: '3', name: 'Libro JS', description: 'Aprende JavaScript', category: 'books' },
  { id: '4', name: 'Auriculares', description: 'Bluetooth', category: 'electronics' }
];

export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 500);
  });
};

export const getProductById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(products.find(p => p.id === id)), 500);
  });
};
