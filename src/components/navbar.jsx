// src/components/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import CartWidget from './CartWidget';

const categorias = [
  { id: 'all', label: 'Todos' },
  { id: 'remeras', label: 'Remeras' },
  { id: 'pantalones', label: 'Pantalones' },
  { id: 'calzado', label: 'Calzado' },
  { id: 'campañas', label: 'Campañas' },
  // Agrega/ajusta más categorías según tu servicio
];

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <NavLink to="/">
          <h2>MiEcommerce</h2>
        </NavLink>
      </div>
      <ul className="navbar__list">
        {categorias.map((cat) => (
          <li key={cat.id} className="navbar__item">
            {cat.id === 'all' ? (
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'active navlink' : 'navlink'
                }
              >
                {cat.label}
              </NavLink>
            ) : (
              <NavLink
                to={`/category/${cat.id}`}
                className={({ isActive }) =>
                  isActive ? 'active navlink' : 'navlink'
                }
              >
                {cat.label}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
      <div className="navbar__cart">
        <CartWidget />
      </div>
    </nav>
  );
}

export default Navbar;
