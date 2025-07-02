// src/components/Navbar.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import CartWidget from './CartWidget';
// SIN IMPORT DE CSS

const Navbar = () => {
  return (
    <nav className="Navbar">
      <Link to="/">
        {/* LOGO NUEVO */}
        <div className="Logo">
          <svg width="100%" height="100%" viewBox="0 0 200 40" preserveAspectRatio="xMinYMid meet">
            <text 
              x="10" 
              y="30" 
              fontFamily="Inter, sans-serif" 
              fontSize="30" 
              fontWeight="bold" 
              fill="white">
              TECH
              <tspan fill="#ef4444">HOUSE</tspan>
            </text>
          </svg>
        </div>
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