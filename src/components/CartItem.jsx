import React from 'react';
import { useCart } from '../context/CartContext';
import './CartItem.css'; // Crea este archivo CSS

const CartItem = ({ id, name, price, quantity, image }) => {
  const { removeItem } = useCart();

  return (
    <div className="cart-item">
      <img src={image} alt={name} className="cart-item-image" />
      <div className="cart-item-details">
        <h3>{name}</h3>
        <p>Cantidad: {quantity}</p>
        <p>Precio unitario: ${price}</p>
        <p>Subtotal: ${(price * quantity).toFixed(2)}</p>
      </div>
      <button onClick={() => removeItem(id)} className="cart-item-remove-button">
        Remover
      </button>
    </div>
  );
};

export default CartItem;