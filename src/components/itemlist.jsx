import React from 'react';
import { Link } from 'react-router-dom';
import './ItemList.css';

function ItemList({ products }) { // <<-- PROP 'products' CORREGIDA AQUÍ
  return (
    <div className="itemList">
      {products.map((prod) => (
        <div key={prod.id} className="itemCard">
          <Link to={`/item/${prod.id}`} className="itemLink">
            <img
              src={prod.image} // <<-- CAMPO 'image' CORREGIDO AQUÍ
              alt={prod.name}
              className="itemCard__img"
            />
            <h3 className="itemCard__title">{prod.name}</h3>
            <p className="itemCard__price">${prod.price}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ItemList;
