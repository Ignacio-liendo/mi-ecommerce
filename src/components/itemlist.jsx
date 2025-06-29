import React from 'react';
import { Link } from 'react-router-dom';
import './ItemList.css';
import Item from './Item'; // Asegúrate de que este Item.jsx exista y sea el que esperas. Si no, quita esta línea.


// <<-- ¡¡CORREGIDO AQUÍ!!: 'productos' cambió a 'products'
function ItemList({ products }) { 
  return (
    <div className="itemList">
      {products.map((prod) => ( // <<-- Aquí ahora usa 'products'
        <div key={prod.id} className="itemCard">
          <Link to={`/item/${prod.id}`} className="itemLink">
            <img
              src={prod.image} // <<-- ¡¡CORREGIDO AQUÍ!!: 'prod.img' cambió a 'prod.image'
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