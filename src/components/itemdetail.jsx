import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './context/CartContext';
import ItemCount from './ItemCount';

const ItemDetail = ({ id, name, img, category, description, price, stock }) => {
  const [quantityAdded, setQuantityAdded] = useState(0);
  const { addItem } = useContext(CartContext);

  const handleOnAdd = (quantity) => {
    setQuantityAdded(quantity);
    // Pasamos el objeto completo al carrito, incluyendo la imagen
    addItem({ id, name, price, stock, img }, quantity);
  };

  return (
    <article className="ItemDetail">
      <picture>
        <img src={img} alt={name} className="ItemImg" />
      </picture>
      <div className="DetailContent">
        <p className="Category">{category}</p>
        <h2>{name}</h2>
        <p className="Description">{description}</p>
        <p className="Price">${new Intl.NumberFormat('es-AR').format(price)}</p>
        <footer>
          {quantityAdded > 0 ? (
            <Link to='/cart' className='Option'>Terminar Compra</Link>
          ) : (
            <ItemCount initial={1} stock={stock} onAdd={handleOnAdd} />
          )}
        </footer>
      </div>
    </article>
  );
};
export default ItemDetail;