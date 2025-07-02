import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../services/firebase.js';
import ItemDetail from './ItemDetail';
// SIN IMPORT DE CSS

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  
  const { itemId } = useParams();

  useEffect(() => {
    getDoc(doc(db, 'products', itemId))
      .then(response => {
        setProduct({ id: response.id, ...response.data() });
      })
  }, [itemId]);

  return (
    <div className='ItemDetailContainer'>
        {product && <ItemDetail {...product} />}
    </div>
  )
}
export default ItemDetailContainer;