import React from 'react';
import CheckoutForm from './CheckoutForm'; // Nuevo componente
import './Checkout.css'; // Crea este archivo CSS

const Checkout = () => {
  return (
    <div className="checkout-container">
      <h1>Finalizar Compra</h1>
      <CheckoutForm />
    </div>
  );
};

export default Checkout;