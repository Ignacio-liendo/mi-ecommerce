// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css' // BORRAMOS ESTA LÍNEA PORQUE YA NO EXISTE
import './App.css'   // <-- ¡NUESTRA HOJA DE ESTILOS PRINCIPAL!

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)