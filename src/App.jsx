import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/context/CartContext'; // Asegúrate de esta ruta
import NavBar from './components/Navbar'; // Nombre del archivo Navbar
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import Cart from './components/Cart'; // Nuevo componente
import Checkout from './components/Checkout'; // Nuevo componente
import NotFound from './components/NotFound'; // Ya lo tienes
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<ItemListContainer greeting="¡Bienvenido a nuestra tienda!" />} />
          <Route path="/category/:categoryId" element={<ItemListContainer greeting="Productos por Categoría" />} />
          <Route path="/item/:itemId" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} /> {/* Ruta para 404 */}
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;