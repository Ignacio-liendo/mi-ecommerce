import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ItemCount from './ItemCount';
import { useCart } from '../context/CartContext'; // Asegúrate de la ruta correcta
import './ItemDetail.css'; // Asegúrate de que este archivo CSS exista

const ItemDetail = ({ item }) => {
  const [quantityAdded, setQuantityAdded] = useState(0);
  const { addItem, isInCart } = useCart();

  const handleOnAdd = (quantity) => {
    setQuantityAdded(quantity);
    addItem(item, quantity);
  };

  return (
    <div className="item-detail">
      <img src={item.image} alt={item.name} className="item-detail-image" />
      <div className="item-detail-info">
        <h2>{item.name}</h2>
        <p className="item-detail-description">{item.description}</p>
        <p className="item-detail-price">${item.price}</p>
        {
          item.stock === 0 ? (
            <p className="no-stock-message">Sin stock disponible</p>
          ) : (
            quantityAdded > 0 ? (
              <div className="item-added-actions">
                <Link to="/cart" className="go-to-cart-button">Terminar Compra</Link>
                <Link to="/" className="keep-shopping-button">Seguir Comprando</Link>
              </div>
            ) : (
              <ItemCount stock={item.stock} initial={isInCart(item.id) ? item.quantity : 1} onAdd={handleOnAdd} />
            )
          )
        }
      </div>
    </div>
  );
};

export default ItemDetail;