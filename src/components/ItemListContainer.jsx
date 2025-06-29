import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from './ItemList'; // Asegúrate de la ruta correcta
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config'; // Asegúrate de la ruta correcta
import './ItemListContainer.css'; // Asegúrate de que este archivo CSS exista

const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    const productsRef = collection(db, 'products'); // 'products' es el nombre de tu colección en Firestore

    const q = categoryId
      ? query(productsRef, where('category', '==', categoryId))
      : productsRef;

    getDocs(q)
      .then(snapshot => {
        const productsDB = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsDB);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId]);

  return (
    <div className="item-list-container">
      <h2>{greeting} {categoryId ? `: ${categoryId.toUpperCase()}` : ''}</h2>
      {loading ? (
        <p>Cargando productos...</p> // Puedes reemplazar esto con un loader más sofisticado
      ) : products.length > 0 ? (
        <ItemList products={products} />
      ) : (
        <p>No se encontraron productos en esta categoría.</p>
      )}
    </div>
  );
};

export default ItemListContainer;