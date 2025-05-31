import ItemCount from './itemcount';

function ItemDetail({ product }) {
  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <ItemCount />
    </div>
  );
}

export default ItemDetail;
