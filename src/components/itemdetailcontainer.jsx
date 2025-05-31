// src/components/ItemDetailContainer.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/products';
import ItemDetail from './ItemDetail';

function ItemDetailContainer() {
  const { itemId } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setProducto(null);
    setError(null);

    getProductById(itemId)
      .then((res) => {
        setProducto(res);
      })
      .catch((err) => {
        console.error('Error al traer el producto:', err);
        setError('No se encontró el producto.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [itemId]);

  if (loading) {
    return <p>Cargando detalle del producto...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      {producto && <ItemDetail producto={producto} />}
    </div>
  );
}

export default ItemDetailContainer;
