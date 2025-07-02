import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../services/firebase.js';
import Item from './Item';
// SIN IMPORT DE CSS

const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    const collectionRef = categoryId 
      ? query(collection(db, 'products'), where('category', '==', categoryId))
      : collection(db, 'products');

    getDocs(collectionRef)
      .then(response => {
        const productsAdapted = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setItems(productsAdapted);
      })
      .finally(() => setLoading(false));
  }, [categoryId]);

  return (
    <div className="ItemListContainer">
      <h1>{categoryId ? `Categoría: ${categoryId}` : 'Nuestro Catálogo'}</h1>
      <div className="ItemList">
        {items.map(item => <Item key={item.id} {...item} />)}
      </div>
    </div>
  );
};
export default ItemListContainer;