import React, { useState } from 'react';
import api from '../api/axiosWithAuth.jsx';
import '../styles/ProductCard.css';

export default function ProductCardAccount({ product, onToggleSale }) {
  const { id, title, price, image, description, created_at } = product;
  const forSale = product.for_sale ?? product.forSale ?? true;
  const [loading, setLoading] = useState(false);

  const [editing, setEditing] = useState(false);
  const [newPrice, setNewPrice] = useState(String(price ?? ''));
  const [savingPrice, setSavingPrice] = useState(false);

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

  const startEdit = () => {
    setNewPrice(String(price ?? ''));
    setEditing(true);
  }
  const cancelEdit = () => {
    setEditing(false);
    setNewPrice(String(price ?? ''));
  }
  const saveNewPrice = async () => {  
    const parsedPrice = parseFloat(newPrice);
    if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
      alert('Please enter a valid non-negative price.');
      return;
    }
    setSavingPrice(true);
    try {
      const res = await api.patch(`/api/products/${id}/`, { price: parsedPrice });
      if (onToggleSale) onToggleSale(res.data);
      setEditing(false);
    } catch (err) {
      console.error('Failed to update price', err);
      alert('Could not update price.');
    } finally {
      setSavingPrice(false);
    }
  };

  return (
    <article className="product-card">
      <div className="product-media">
        <img src={image} alt={title} />
      </div>
      <div className="product-body">
        <h3 className="product-title">{title}</h3>
        {created_at && <p className="product-date">Added on: {new Date(created_at).toLocaleDateString()}</p>}
        {description && <p className="product-description">{description}</p>}
        <div className="product-footer">
         <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8}}>
          {!editing ? (
             <>
               <strong className="product-price">€{Number(price).toFixed(2)}</strong>
               <div style={{display:'flex', gap:8}}>
                 <button className="product-btn" onClick={startEdit}>Edit price</button>
                 <button className="product-btn" onClick={toggleSale} disabled={loading}>
                   {forSale ? 'Remove from sale' : 'Put on sale'}
                 </button>
               </div>
             </>
           ) : (
             <>
               <input
                 type="number"                 step="0.01"
                 value={newPrice}
                 onChange={(e) => setNewPrice(e.target.value)}
                 style={{width: '100px'}}
                 disabled={savingPrice}
               />
               <div style={{display:'flex', gap:8}}>
                 <button className="product-btn" onClick={saveNewPrice} disabled={savingPrice}>
                   {savingPrice ? 'Saving…' : 'Save'}
                 </button>
                 <button className="product-btn" onClick={cancelEdit} disabled={savingPrice}>Cancel</button>
               </div>
           </>
         )}
        </div>
        </div>
      </div>
    </article>
  );
}