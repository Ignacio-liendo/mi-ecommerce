import React from 'react';
import NavBar from './components/navbar';
import ItemListContainer from './components/itemlistconteiner';

function App() {
  return (
    <div>
      <NavBar />
      <ItemListContainer greeting="¡Bienvenido a nuestra tienda online!" />
    </div>
  );
}

export default App;
