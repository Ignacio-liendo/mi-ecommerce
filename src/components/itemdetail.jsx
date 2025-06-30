import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ItemCount from './ItemCount';
import { useCart } from '../context/CartContext'; // <<-- RUTA CORREGIDA AQUÍ
import './ItemDetail.css';

const ItemDetail = ({ item }) => {
  const [quantityAdded, setQuantityAdded] = useState(0);
  const { addItem, isInCart, cart } = useCart(); // Agregado 'cart' para acceder a la cantidad existente

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
              // Inicializa ItemCount con la cantidad actual si el producto ya está en el carrito
              <ItemCount 
                stock={item.stock} 
                initial={isInCart(item.id) ? (cart.find(cartItem => cartItem.id === item.id)?.quantity || 1) : 1} 
                onAdd={handleOnAdd} 
              />
            )
          )
        }
      </div>
    </div>
  );
};

export default ItemDetail;
