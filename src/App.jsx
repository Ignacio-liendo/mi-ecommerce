import './App.css';
import NavBar from './components/navbar';
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from './components/itemdetailcontainer';
import NotFound from './components/notfound';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="*" element={<h2 style={{textAlign: "center"}}>Página no encontrada</h2>} />
        <Route path="/" element={<ItemListContainer />} />
        <Route path="/category/:categoryId" element={<ItemListContainer />} />
        <Route path="/item/:itemId" element={<ItemDetailContainer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
