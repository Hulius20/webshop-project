import React, { useState } from 'react';
import useCart from '../hooks/useCart.jsx';
import ProductCardCart from '../components/ProductCardCart.jsx';
import api from '../api/axiosWithAuth.jsx';
import '../styles/Cart.css';

function Cart() {
  const { cart, clearCart, totalCount, totalPrice, removeFromCart, updateCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [priceChanges, setPriceChanges] = useState({});
  const [unavailableItems, setUnavailableItems] = useState([]);

  const handleCheckout = async () => {
    setLoading(true);
    setPriceChanges({});
    setUnavailableItems([]);

    try {
      // Step 1: Verify all items still exist and check prices
      const verificationPromises = cart.map(item =>
        api.get(`/api/products/${item.id}/`)
          .then(res => ({ id: item.id, data: res.data, available: true }))
          .catch(() => ({ id: item.id, available: false }))
      );

      const verifications = await Promise.all(verificationPromises);

      // Check for unavailable or no longer for sale items
      const unavailable = verifications.filter(v => 
        !v.available || !v.data.for_sale
      ).map(v => v.id);
      
      if (unavailable.length > 0) {
        setUnavailableItems(unavailable);
        setLoading(false);
        return;
      }

      // Check for price changes
      const priceChanged = {};
      verifications.forEach(verification => {
        const cartItem = cart.find(item => item.id === verification.id);
        if (Number(verification.data.price) !== Number(cartItem.price)) {
          priceChanged[verification.id] = {
            oldPrice: cartItem.price,
            newPrice: verification.data.price
          };
        }
      });

      if (Object.keys(priceChanged).length > 0) {
        setPriceChanges(priceChanged);
        setLoading(false);
        return;
      }

      // Step 2: If all checks pass, purchase each item
      const purchasePromises = cart.map(item =>
        api.post(`/api/products/${item.id}/purchase/`)
      );

      await Promise.all(purchasePromises);

      // Step 3: Clear cart on successful purchase
      clearCart();
      alert('Purchase successful! Items are now in your inventory.');

    } catch (err) {
      console.error('Checkout error:', err);
      alert('Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePrices = () => {
    // Update cart items with new prices from priceChanges
    Object.entries(priceChanges).forEach(([itemId, prices]) => {
      updateCart(Number(itemId), { price: Number(prices.newPrice) });
    });
    // Clear price changes and try checkout again
    setPriceChanges({});
  };

  const handleRemoveUnavailable = (itemId) => {
    removeFromCart(itemId);
    setUnavailableItems(prev => prev.filter(id => id !== itemId));
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Cart</h1>

      {cart.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <>
          {/* Unavailable items notification */}
          {unavailableItems.length > 0 && (
            <div className="cart-notification unavailable-notification">
              <p>⚠️ The following items are no longer available:</p>
              <ul>
                {unavailableItems.map(itemId => {
                  const item = cart.find(i => i.id === itemId);
                  return (
                    <li key={itemId}>
                      {item.title}
                      <button 
                        onClick={() => handleRemoveUnavailable(itemId)}
                        className="remove-btn"
                      >
                        Remove
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Price changes notification */}
          {Object.keys(priceChanges).length > 0 && (
            <div className="cart-notification price-change-notification">
              <p>⚠️ Price changes detected:</p>
              <ul>
                {Object.entries(priceChanges).map(([itemId, prices]) => {
                  const item = cart.find(i => i.id === Number(itemId));
                  return (
                    <li key={itemId}>
                      <span>{item.title}: €{Number(prices.oldPrice).toFixed(2)} → €{Number(prices.newPrice).toFixed(2)}</span>
                    </li>
                  );
                })}
              </ul>
              <button onClick={handleUpdatePrices} className="update-prices-btn">
                Continue with new prices
              </button>
            </div>
          )}

          <ul className="cart-list">
            {cart.map(item => (
              <div key={String(item.id)} style={{ position: 'relative' }}>
                <ProductCardCart
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  image={item.image}
                  description={item.description}
                />
                {priceChanges[item.id] && (
                  <div className="price-change-indicator">
                    Price changed: €{Number(priceChanges[item.id].newPrice).toFixed(2)}
                  </div>
                )}
                {unavailableItems.includes(item.id) && (
                  <div className="unavailable-indicator">
                    Not available
                  </div>
                )}
              </div>
            ))}
          </ul>

          <div className="cart-summary">
            <div>Total items: <span className="cart-summary-value">{totalCount}</span></div>
            <div>Total price: <span className="cart-summary-value">€{totalPrice.toFixed(2)}</span></div>
            <div className="cart-summary-actions">
              <button 
                className="checkout-btn" 
                onClick={handleCheckout}
                disabled={loading || unavailableItems.length > 0}
              >
                {loading ? 'Processing...' : 'Pay'}
              </button>
              <button className="clear-btn" onClick={clearCart}>Clear Cart</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;