// src/components/CheckoutForm.jsx
import React, { useState } from 'react';


const CheckoutForm = ({ onConfirm }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onConfirm({ name, phone, email });
    };

    return (
        <div className="CheckoutForm">
            <form onSubmit={handleSubmit}>
                <label>Nombre
                    <input type="text" value={name} onChange={({ target }) => setName(target.value)} required/>
                </label>
                <label>Teléfono
                    <input type="text" value={phone} onChange={({ target }) => setPhone(target.value)} required/>
                </label>
                <label>Email
                    <input type="email" value={email} onChange={({ target }) => setEmail(target.value)} required/>
                </label>
                <button type="submit">Crear Orden</button>
            </form>
        </div>
    );
};

export default CheckoutForm;
