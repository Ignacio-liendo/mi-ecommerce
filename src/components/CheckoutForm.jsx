import React, { useState } from 'react';

const CheckoutForm = ({ onConfirm }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const userData = { name, phone, email };
        onConfirm(userData);
    };

    return (
        <div className="CheckoutForm">
            <form onSubmit={handleSubmit}>
                <label className="Label">
                    Nombre Completo
                    <input className="Input" type="text" value={name} onChange={({ target }) => setName(target.value)} required />
                </label>
                <label className="Label">
                    Teléfono
                    <input className="Input" type="tel" value={phone} onChange={({ target }) => setPhone(target.value)} required />
                </label>
                <label className="Label">
                    Email
                    <input className="Input" type="email" value={email} onChange={({ target }) => setEmail(target.value)} required />
                </label>
                <button type="submit" className="Button">Crear Orden</button>
            </form>
        </div>
    );
};
export default CheckoutForm;