// src/components/ItemDetail.jsx
import React from 'react';
import ItemCount from './ItemCount';
import './ItemDetail.css';

function ItemDetail({ producto }) {
  return (
    <div className="itemDetail">
      <div className="itemDetail__imgContainer">
        <img
          src={producto.img}
          alt={producto.name}
          className="itemDetail__img"
        />
      </div>
      <div className="itemDetail__info">
        <h2>{producto.name}</h2>
        <p className="itemDetail__price">Precio: ${producto.price}</p>
        <p className="itemDetail__desc">{producto.description}</p>
        {/* Aquí va el contador para agregar al carrito */}
        <ItemCount stock={10} initial={1} onAdd={(cantidad) => {
          alert(`Agregaste ${cantidad} unidades de "${producto.name}" al carrito.`);
          // En un proyecto real, aquí conectarías con el contexto/carrito
        }} />
      </div>
    </div>
  );
}

export default ItemDetail;
