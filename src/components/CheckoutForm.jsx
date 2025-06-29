import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { db } from '../firebase/config';
import { collection, addDoc, Timestamp, writeBatch, getDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './CheckoutForm.css'; // Crea este archivo CSS

const CheckoutForm = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    confirmEmail: ''
  });
  const [emailError, setEmailError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'confirmEmail' || e.target.name === 'email') {
      setEmailError(false); // Resetea el error al escribir
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOrderId(''); // Resetea cualquier ID de orden previo

    if (formData.email !== formData.confirmEmail) {
      setEmailError(true);
      setLoading(false);
      return;
    }

    const order = {
      buyer: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email
      },
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      total: totalPrice,
      date: Timestamp.fromDate(new Date())
    };

    const batch = writeBatch(db);
    const outOfStock = [];

    for (const cartItem of cart) {
      const docRef = doc(db, 'products', cartItem.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && docSnap.data().stock >= cartItem.quantity) {
        batch.update(docRef, { stock: docSnap.data().stock - cartItem.quantity });
      } else {
        outOfStock.push({ id: cartItem.id, name: cartItem.name });
      }
    }

    if (outOfStock.length === 0) {
      try {
        await batch.commit(); // Actualiza el stock
        const docRef = await addDoc(collection(db, 'orders'), order); // Crea la orden
        setOrderId(docRef.id);
        clearCart();
      } catch (error) {
        console.error("Error al procesar la compra:", error);
        alert("Hubo un error al procesar tu compra. Por favor, inténtalo de nuevo.");
      } finally {
        setLoading(false);
      }
    } else {
      alert(`Los siguientes productos no tienen suficiente stock: ${outOfStock.map(item => item.name).join(', ')}. Por favor, ajusta tu carrito.`);
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="loading-message">Procesando tu compra...</p>;
  }

  if (orderId) {
    return (
      <div className="order-success-message">
        <h2>¡Gracias por tu compra!</h2>
        <p>Tu número de orden es: <strong>{orderId}</strong></p>
        <p>En breve recibirás un correo electrónico con los detalles de tu pedido.</p>
        <button onClick={() => navigate('/')} className="button-go-home">Volver al inicio</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h3>Datos de Contacto</h3>
      <div className="form-group">
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Teléfono:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirmEmail">Confirmar Email:</label>
        <input
          type="email"
          id="confirmEmail"
          name="confirmEmail"
          value={formData.confirmEmail}
          onChange={handleChange}
          required
        />
        {emailError && <p className="error-message">Los emails no coinciden.</p>}
      </div>
      <button type="submit" className="submit-order-button" disabled={loading}>
        Confirmar Compra
      </button>
    </form>
  );
};

export default CheckoutForm;