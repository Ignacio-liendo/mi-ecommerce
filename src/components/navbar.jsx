import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import CartWidget from './CartWidget';
import './Navbar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <h1>Mi E-commerce</h1>
      </Link>
      <div className="navbar-links">
        <NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''}>
          Inicio
        </NavLink>
        <NavLink to="/category/electronica" className={({ isActive }) => isActive ? 'active-link' : ''}>
          Electrónica
        </NavLink>
        <NavLink to="/category/indumentaria" className={({ isActive }) => isActive ? 'active-link' : ''}>
          Indumentaria
        </NavLink>
        <NavLink to="/category/hogar" className={({ isActive }) => isActive ? 'active-link' : ''}>
          Hogar
        </NavLink>
      </div>
      <CartWidget />
    </nav>
  );
};

export default NavBar;
