import React, { useState } from 'react';
import { useCart } from '../context/CartContext'; // <<-- CORREGIDO: Ruta ajustada
import { db } from '../firebase/config'; // <<-- CORREGIDO: Ruta ajustada
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
  const [displayMessage, setDisplayMessage] = useState(''); // Nuevo estado para mensajes al usuario
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'confirmEmail' || e.target.name === 'email') {
      setEmailError(false); // Resetea el error al escribir
      setDisplayMessage(''); // Limpia el mensaje de error al cambiar el email
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOrderId(''); // Resetea cualquier ID de orden previo
    setDisplayMessage(''); // Limpia mensajes anteriores

    if (formData.email !== formData.confirmEmail) {
      setEmailError(true);
      setDisplayMessage('Los emails no coinciden. Por favor, verifícalos.');
      setLoading(false);
      return;
    }
    
    // Si el carrito está vacío, no se puede finalizar la compra
    if (cart.length === 0) {
      setDisplayMessage('Tu carrito está vacío. Agrega productos para continuar.');
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

    // Verificación de stock y preparación del batch
    for (const cartItem of cart) {
      const docRef = doc(db, 'products', cartItem.id);
      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const productData = docSnap.data();
          if (productData.stock >= cartItem.quantity) {
            batch.update(docRef, { stock: productData.stock - cartItem.quantity });
          } else {
            outOfStock.push({ id: cartItem.id, name: cartItem.name, availableStock: productData.stock });
          }
        } else {
          // Producto no encontrado en la base de datos
          outOfStock.push({ id: cartItem.id, name: cartItem.name, availableStock: 0, notFound: true });
        }
      } catch (error) {
        console.error("Error al verificar stock para:", cartItem.name, error);
        outOfStock.push({ id: cartItem.id, name: cartItem.name, error: true });
      }
    }

    if (outOfStock.length === 0) {
      try {
        await batch.commit(); // Actualiza el stock en la base de datos
        const docRef = await addDoc(collection(db, 'orders'), order); // Crea la orden
        setOrderId(docRef.id);
        clearCart(); // Vacía el carrito después de una compra exitosa
      } catch (error) {
        console.error("Error al procesar la compra o guardar la orden:", error);
        setDisplayMessage("Hubo un error al procesar tu compra. Por favor, inténtalo de nuevo.");
      } finally {
        setLoading(false);
      }
    } else {
      // Manejo de productos sin stock
      const stockMessages = outOfStock.map(item => {
        if (item.notFound) return `${item.name} (ya no disponible)`;
        if (item.error) return `${item.name} (error al verificar stock)`;
        return `${item.name} (stock disponible: ${item.availableStock || 0})`;
      }).join(', ');
      setDisplayMessage(`Algunos productos no tienen suficiente stock: ${stockMessages}. Por favor, ajusta tu carrito.`);
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
      {displayMessage && <p className="error-message">{displayMessage}</p>} {/* Muestra el mensaje aquí */}
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
