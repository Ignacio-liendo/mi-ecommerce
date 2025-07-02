// src/components/Checkout.jsx
import React, { useState, useContext } from 'react';
import { collection, addDoc, serverTimestamp, writeBatch, doc } from 'firebase/firestore';
import { db } from '../services/firebase.js'; // RUTA CORREGIDA
import { CartContext } from './context/CartContext';
import CheckoutForm from './CheckoutForm';


const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState('');
    const { cart, totalPrice, clearCart } = useContext(CartContext);

    const createOrder = async ({ name, phone, email }) => {
        setLoading(true);
        try {
            const orderData = {
                buyer: { name, phone, email },
                items: cart,
                total: totalPrice,
                date: serverTimestamp()
            };

            const orderRef = await addDoc(collection(db, 'orders'), orderData);
            
            const batch = writeBatch(db);
            cart.forEach(item => {
                const productRef = doc(db, 'products', item.id);
                const newStock = item.stock - item.quantity; 
                batch.update(productRef, { stock: newStock });
            });
            await batch.commit();

            setOrderId(orderRef.id);
            clearCart();
        } catch (error) {
            console.error("Error al crear la orden:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <h1>Se está generando su orden...</h1>;
    }

    if (orderId) {
        return <h1>¡Gracias por tu compra! El ID de su orden es: {orderId}</h1>;
    }

    return (
        <div className="Checkout">
            <h1>Checkout</h1>
            <CheckoutForm onConfirm={createOrder} />
        </div>
    );
};

export default Checkout;