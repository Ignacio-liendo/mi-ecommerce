import { Link } from 'react-router-dom';
import CartWidget from './CartWidget';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/">Inicio</Link>
        <Link to="/category/electronica">Electrónica</Link>
        <Link to="/category/ropa">Ropa</Link>
        <Link to="/category/libros">Libros</Link>
      </div>
      <div className="nav-right">
        <CartWidget />
      </div>
    </nav>
  );
};

export default Navbar;
