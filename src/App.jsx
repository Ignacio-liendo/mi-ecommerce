// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import NotFound from './components/NotFound';
import './App.css'; // estilos globales de App si tuvieras

function App() {
  return (
    <div className="App">
      <Navbar />

      <main>
        <Routes>
          {/* Ruta principal: catálogo completo */}
          <Route path="/" element={<ItemListContainer />} />

          {/* Ruta por categoría */}
          <Route path="/category/:categoryId" element={<ItemListContainer />} />

          {/* Ruta detalle de producto */}
          <Route path="/item/:itemId" element={<ItemDetailContainer />} />

          {/* Ruta 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
