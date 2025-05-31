// src/components/ItemListContainer.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from './ItemList';
import { getProducts, getProductsByCategory } from '../services/products';
import './ItemListContainer.css';

function ItemListContainer() {
  const { categoryId } = useParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Si no hay categoryId o es 'all', traemos todos los productos
    if (!categoryId || categoryId === 'all') {
      getProducts()
        .then((res) => {
          setProductos(res);
        })
        .catch((err) => {
          console.error('Error trayendo productos:', err);
          setProductos([]);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      // Si hay categoryId, filtrar
      getProductsByCategory(categoryId)
        .then((res) => {
          setProductos(res);
        })
        .catch((err) => {
          console.error('Error trayendo categoría:', err);
          setProductos([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [categoryId]);

  return (
    <div className="itemListContainer">
      {loading ? (
        <p>Cargando productos...</p>
      ) : productos.length > 0 ? (
        <ItemList productos={productos} />
      ) : (
        <p>No hay productos para mostrar.</p>
      )}
    </div>
  );
}

export default ItemListContainer;
