// src/components/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{
      textAlign: 'center',
      padding: '2rem'
    }}>
      <h2>404 - Página no encontrada</h2>
      <p>La ruta a la que intentaste ingresar no existe.</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
}

export default NotFound;
