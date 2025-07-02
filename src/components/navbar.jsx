// src/components/Navbar.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import CartWidget from './CartWidget';
// SIN IMPORT DE CSS AQUÍ

const Navbar = () => {
  return (
    <nav className="Navbar">
      <Link to="/">
        <h3>Mi E-commerce</h3>
      </Link>
      <div className="Categories">
        <NavLink to="/category/celulares" className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>Celulares</NavLink>
        <NavLink to="/category/tablets" className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>Tablets</NavLink>
        <NavLink to="/category/notebooks" className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>Notebooks</NavLink>
      </div>
      <CartWidget />
    </nav>
  );
};

export default Navbar;