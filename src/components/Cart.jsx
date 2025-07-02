import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './context/CartContext';
import CartItem from './CartItem';

const Cart = () => {
  const { cart, clearCart, totalQuantity, totalPrice } = useContext(CartContext);

  if (totalQuantity === 0) {
    return (
      <div className="Cart-empty">
        <h1>Tu carrito está vacío</h1>
        <Link to='/' className='Option'>Ver productos</Link>
      </div>
    );
  }

  return (
    <div className="Cart">
      <h1>Tu Carrito</h1>
      <div>
        {cart.map(p => <CartItem key={p.id} {...p} />)}
      </div>
      <div className="Cart-summary">
        <h3>Total: ${new Intl.NumberFormat('es-AR').format(totalPrice)}</h3>
        <div>
          <button onClick={() => clearCart()} className="Button">Vaciar Carrito</button>
          <Link to='/checkout' className="Option">Finalizar Compra</Link>
        </div>
      </div>
    </div>
  );
};
export default Cart;