import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Asegúrate de que esta ruta sea correcta
import './index.css'; // Asegúrate de que esta ruta sea correcta

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ¡IMPORTANTE! Aquí NO debe haber ningún <BrowserRouter> */}
    <App />
  </React.StrictMode>,
);