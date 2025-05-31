// src/components/ItemCount.jsx
import React, { useState } from 'react';
import './itemcount.css';

function ItemCount({ stock, initial, onAdd }) {
  const [cantidad, setCantidad] = useState(initial);

  const handleSumar = () => {
    if (cantidad < stock) {
      setCantidad((prev) => prev + 1);
    }
  };

  const handleRestar = () => {
    if (cantidad > 1) {
      setCantidad((prev) => prev - 1);
    }
  };

  const handleAgregar = () => {
    onAdd(cantidad);
  };

  return (
    <div className="itemCount">
      <div className="itemCount__controls">
        <button onClick={handleRestar} className="itemCount__btn">−</button>
        <span className="itemCount__qty">{cantidad}</span>
        <button onClick={handleSumar} className="itemCount__btn">+</button>
      </div>
      <button onClick={handleAgregar} className="itemCount__addButton">
        Agregar al carrito
      </button>
    </div>
  );
}

export default ItemCount;
