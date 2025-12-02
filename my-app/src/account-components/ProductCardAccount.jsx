import React, { useState } from 'react';
import api from '../api/axiosWithAuth.jsx';
import '../styles/ProductCard.css';

export default function ProductCardAccount({ product, onToggleSale }) {
  const { id, title, price, image, description } = product;
  const forSale = product.for_sale ?? product.forSale ?? true;
  const [loading, setLoading] = useState(false);

  const toggleSale = async () => {
    setLoading(true);
    try {
      const res = await api.patch(`/api/products/${id}/`, { for_sale: !forSale });
      if (onToggleSale) onToggleSale(res.data);
    } catch (err) {
      console.error('Failed to toggle sale status', err);
      alert('Could not update sale status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="product-card">
      <div className="product-media">
        <img src={image} alt={title} />
      </div>
      <div className="product-body">
        <h3 className="product-title">{title}</h3>
        {description && <p className="product-description">{description}</p>}
        <div className="product-footer">
          <strong className="product-price">€{Number(price).toFixed(2)}</strong>
          <button className="product-btn" onClick={toggleSale} disabled={loading}>
            {forSale ? 'Remove from sale' : 'Put on sale'}
          </button>
        </div>
      </div>
    </article>
  );
}