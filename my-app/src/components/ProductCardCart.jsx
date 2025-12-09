import React from 'react';
import useCart from '../hooks/useCart.jsx';
import '../styles/Cart.css'; // reuse card styles (or import a cart-specific CSS)

export default function ProductCardCart({ id, title, price, image, description, }) {
  const { removeFromCart } = useCart();

  return (
    <li className="cart-item" data-id={id}>
      <img className="cart-img" src={image} alt={title} />
      <div className="cart-details">
        <strong className="cart-item-title">{title}</strong>
        
        {description && <p className="cart-item-desc">{description}</p>}
      </div>
      <div className="cart-actions">
        <div className="cart-item-price">{`€${Number(price).toFixed(2)}`}</div>
        <button className="cart-remove-btn" onClick={() => removeFromCart(id)}>Remove</button>
      </div>
    </li>
  );
}