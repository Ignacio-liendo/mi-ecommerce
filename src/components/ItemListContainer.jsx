import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from './ItemList';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config'; // <<-- ¡¡CORREGIDO AQUÍ!!

const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    const productsRef = collection(db, 'products'); 

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
        setProducts([]); 
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId]);

  return (
    <div className="item-list-container">
      <h2>{greeting} {categoryId ? `: ${categoryId.toUpperCase()}` : ''}</h2>
      {loading ? (
        <p>Cargando productos...</p>
      ) : products && products.length > 0 ? (
        <ItemList products={products} />
      ) : (
        <p>No se encontraron productos en esta categoría.</p>
      )}
    </div>
  );
};

export default ItemListContainer;