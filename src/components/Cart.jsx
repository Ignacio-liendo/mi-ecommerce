import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import CartItem from './CartItem'; // Nuevo componente
import './Cart.css'; // Crea este archivo CSS

const Cart = () => {
  const { cart, clearCart, totalQuantity, totalPrice } = useCart();

  if (totalQuantity === 0) {
    return (
      <div className="cart-empty">
        <h1>Tu carrito está vacío</h1>
        <Link to="/" className="button-go-shopping">Ir a comprar</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Carrito de Compras</h1>
      <div className="cart-items">
        {cart.map(item => <CartItem key={item.id} {...item} />)}
      </div>
      <div className="cart-summary">
        <h3>Total de productos: {totalQuantity}</h3>
        <h2>Total: ${totalPrice.toFixed(2)}</h2>
      </div>
      <div className="cart-actions">
        <button onClick={() => clearCart()} className="button-clear-cart">Vaciar Carrito</button>
        <Link to="/checkout" className="button-checkout">Finalizar Compra</Link>
      </div>
    </div>
  );
};

export default Cart;