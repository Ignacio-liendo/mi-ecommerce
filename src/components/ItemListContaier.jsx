import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { pedirDatos } from "../helpers/pedirDatos";
import { Link } from "react-router-dom";
import "./ItemListContainer.css"; // ✅ Corregido

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    pedirDatos().then((res) => {
      if (categoryId) {
        setProductos(res.filter((prod) => prod.categoria === categoryId));
      } else {
        setProductos(res);
      }
    });
  }, [categoryId]);

  return (
    <div className="product-grid">
      {productos.map((producto) => (
        <div className="product-card" key={producto.id}>
          <h3>{producto.nombre}</h3>
          <p>{producto.descripcion}</p>
          <Link to={`/item/${producto.id}`}>Ver detalle</Link>
        </div>
      ))}
    </div>
  );
};

export default ItemListContainer;
import "./ItemListContainer.css";
