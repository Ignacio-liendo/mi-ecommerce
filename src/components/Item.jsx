import React from 'react';
import { Link } from 'react-router-dom';
// SIN IMPORT DE CSS

const Item = ({ id, name, img, price, stock }) => {
  return (
    <article className="CardItem">
      <header>
        <h2>{name}</h2>
      </header>
      <picture>
        <img src={img} alt={name} className="ItemImg" />
      </picture>
      <section>
        <p className="Price">${new Intl.NumberFormat('es-AR').format(price)}</p>
        <p className="Stock">Stock disponible: {stock}</p>
      </section>
      <footer>
        <Link to={`/item/${id}`} className="Option">Ver detalle</Link>
      </footer>
    </article>
  );
};
export default Item;