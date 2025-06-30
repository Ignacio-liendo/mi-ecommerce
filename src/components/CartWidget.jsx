import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // <<-- RUTA CORREGIDA AQUÍ
import './CartWidget.css';

const CartWidget = () => {
  const { totalQuantity } = useCart();

  return (
    <Link to="/cart" className="cart-widget" style={{ display: totalQuantity > 0 ? 'flex' : 'none' }}>
      <img src="/assets/cart-icon.png" alt="Carrito de compras" className="cart-icon" /> {/* Asegúrate de tener un icono en public/assets */}
      <span className="cart-count">{totalQuantity}</span>
    </Link>
  );
};

export default CartWidget;
