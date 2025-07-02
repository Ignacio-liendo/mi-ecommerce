import React, { useContext } from 'react';
import { CartContext } from './context/CartContext';

const CartItem = ({ id, name, price, quantity, img }) => {
    const { removeItem } = useContext(CartContext);

    return (
        <div className="CartItem">
            <img src={img} alt={name} className="ItemImg" />
            <h4>{name}</h4>
            <p>Cantidad: {quantity}</p>
            <p>Subtotal: ${new Intl.NumberFormat('es-AR').format(price * quantity)}</p>
            <button onClick={() => removeItem(id)} className="RemoveButton">Eliminar</button>
        </div>
    );
};
export default CartItem;
