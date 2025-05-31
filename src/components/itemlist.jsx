import { Link } from 'react-router-dom';

function ItemList({ products }) {
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h4>{product.name}</h4>
          <p>{product.description}</p>
          <Link to={`/item/${product.id}`}>Ver detalle</Link>
        </div>
      ))}
    </div>
  );
}

export default ItemList;
