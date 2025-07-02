import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/context/CartContext';
import Navbar from './components/Navbar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import Cart from './components/Cart'; // Importamos el componente del carrito

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CartProvider>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<ItemListContainer />} />
              <Route path="/category/:categoryId" element={<ItemListContainer />} />
              <Route path="/item/:itemId" element={<ItemDetailContainer />} />
              <Route path="/cart" element={<Cart />} /> {/* RUTA DEL CARRITO AÑADIDA */}
              {/* Añade aquí la ruta para Checkout si la tienes */}
            </Routes>
          </main>
        </CartProvider>
      </BrowserRouter>
    </div>
  );
}
export default App;