import React, { useState, useEffect } from 'react';
import './ItemCount.css'; // Asegúrate de que este archivo CSS exista

const ItemCount = ({ stock, initial, onAdd }) => {
  const [quantity, setQuantity] = useState(initial);

  useEffect(() => {
    setQuantity(initial);
  }, [initial]);

  const increment = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) { // Mínimo 1 unidad
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="item-count">
      <div className="controls">
        <button onClick={decrement}>-</button>
        <span className="quantity">{quantity}</span>
        <button onClick={increment}>+</button>
      </div>
      <button
        onClick={() => onAdd(quantity)}
        disabled={stock === 0}
        className="add-to-cart-button"
      >
        Agregar al Carrito
      </button>
      {stock === 0 && <p className="stock-message">No hay stock disponible</p>}
    </div>
  );
};

export default ItemCount;