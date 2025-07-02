// src/components/ItemList.jsx
import React from 'react';
import Item from './Item';
// No se necesita importar CSS aquí, ya que el contenedor se encarga.

const ItemList = ({ items }) => {
  // El div debe tener exactamente esta clase para que el CSS del contenedor funcione.
  return (
    <div className="ItemList"> 
      {items.map(item => <Item key={item.id} {...item} />)}
    </div>
  );
};

export default ItemList;