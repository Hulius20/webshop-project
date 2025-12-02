import React from 'react';
import useCart from '../hooks/useCart.jsx';
import ProductCardCart from '../components/ProductCardCart.jsx';
import '../styles/Cart.css';

function Cart() {
  const { cart, clearCart, totalCount, totalPrice } = useCart();

  const handleCheckout = async () => {
    alert(`Checkout not implemented — ${totalCount} items, total €${totalPrice.toFixed(2)}`);
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Cart</h1>

      {cart.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map(item => (
              <ProductCardCart
                key={String(item.id)}
                id={item.id}
                title={item.title}
                price={item.price}
                image={item.image}
                description={item.description}
              />
            ))}
          </ul>

          <div className="cart-summary">
            <div>Total items: <span className="cart-summary-value">{totalCount}</span></div>
            <div>Total price: <span className="cart-summary-value">€{totalPrice.toFixed(2)}</span></div>
            <div className="cart-summary-actions">
              <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
              <button className="clear-btn" onClick={clearCart}>Clear Cart</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;