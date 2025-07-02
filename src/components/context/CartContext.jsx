// src/components/context/CartContext.jsx
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItem = (item, quantity) => {
    if (!cart.some(prod => prod.id === item.id)) {
      setCart(prev => [...prev, { ...item, quantity }]);
    } else {
      console.error('El producto ya fue agregado al carrito.');
    }
  };

  const removeItem = (itemId) => {
    setCart(cart.filter(prod => prod.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, totalQuantity, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
