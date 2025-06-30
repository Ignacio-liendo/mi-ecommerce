import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from './ItemDetail';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config'; // <<-- RUTA CORREGIDA AQUÍ
import './ItemDetailContainer.css';

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { itemId } = useParams();

  useEffect(() => {
    setLoading(true);
    const docRef = doc(db, 'products', itemId);
    getDoc(docRef)
      .then(snapshot => {
        if (snapshot.exists()) {
          setProduct({ id: snapshot.id, ...snapshot.data() });
        } else {
          console.log("No such document!");
          setProduct(null);
        }
      })
      .catch(error => {
        console.error("Error fetching product detail:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [itemId]);

  return (
    <div className="item-detail-container">
      {loading ? (
        <p>Cargando detalle del producto...</p>
      ) : product ? (
        <ItemDetail item={product} />
      ) : (
        <p>Producto no encontrado.</p>
      )}
    </div>
  );
};

export default ItemDetailContainer;
