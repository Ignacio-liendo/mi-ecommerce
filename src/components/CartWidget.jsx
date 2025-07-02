// src/components/CartWidget.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './context/CartContext';
// SIN IMPORT DE CSS AQUÍ

const CartWidget = () => {
    const { totalQuantity } = useContext(CartContext);

    if (totalQuantity === 0) {
        return null;
    }

    return (
        <Link to="/cart" className="CartWidget">
            🛒
            <span>{totalQuantity}</span>
        </Link>
    );
};

export default CartWidget;