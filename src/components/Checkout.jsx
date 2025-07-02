import React, { useState, useContext } from 'react';
import { collection, addDoc, serverTimestamp, writeBatch, doc, getDocs, query, where, documentId } from 'firebase/firestore';
import { db } from '../services/firebase.js';
import { CartContext } from './context/CartContext';
import CheckoutForm from './CheckoutForm';

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState('');
    const { cart, totalPrice, clearCart } = useContext(CartContext);

    const createOrder = async ({ name, phone, email }) => {
        setLoading(true);
        try {
            const objOrder = {
                buyer: { name, phone, email },
                items: cart,
                total: totalPrice,
                date: serverTimestamp()
            };

            const batch = writeBatch(db);
            const outOfStock = [];
            const ids = cart.map(prod => prod.id);
            const productsRef = collection(db, 'products');
            const productsAddedFromFirestore = await getDocs(query(productsRef, where(documentId(), 'in', ids)));
            const { docs } = productsAddedFromFirestore;

            docs.forEach(doc => {
                const dataDoc = doc.data();
                const stockDb = dataDoc.stock;
                const productAddedToCart = cart.find(prod => prod.id === doc.id);
                const prodQuantity = productAddedToCart?.quantity;

                if (stockDb >= prodQuantity) {
                    batch.update(doc.ref, { stock: stockDb - prodQuantity });
                } else {
                    outOfStock.push({ id: doc.id, ...dataDoc });
                }
            });

            if (outOfStock.length === 0) {
                await batch.commit();
                const orderRef = await addDoc(collection(db, 'orders'), objOrder);
                setOrderId(orderRef.id);
                clearCart();
            } else {
                console.error('Hay productos que están fuera de stock');
            }
        } catch (error) {
            console.error("Error al crear la orden:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <h1 className="InfoMessage">Se está generando su orden...</h1>;
    }

    if (orderId) {
        return <h1 className="InfoMessage">¡Gracias por tu compra! El ID de su orden es: {orderId}</h1>;
    }

    return (
        <div className="Checkout">
            <h1>Checkout</h1>
            <CheckoutForm onConfirm={createOrder} />
        </div>
    );
};
export default Checkout;