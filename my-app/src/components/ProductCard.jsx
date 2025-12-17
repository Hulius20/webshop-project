import React, { useState } from "react";
import '../styles/ProductCard.css';
import useCart from "../hooks/useCart.jsx";

export default function ProductCard({id,title,price ,image , description, onAdd, created_at, isLoggedIn}){

    const {addToCart} = useCart();
    
    const handleAddToCart = () => {
        addToCart({id,title, price, image, description});
        onAdd?.();
    };
    
    return(
        <article className="product-card">
            <div className="product-media">
                <img src={image} alt={title}/>
            </div>
            <div className="product-body">
                <h3 className="product-title">{title}</h3>
                {created_at && <p className="product-date">Added on: {new Date(created_at).toLocaleDateString()}</p>}
                {description && <p className="product-description">{description}</p>}
                <div className="product-footer">
                    <strong className="product-price">€{Number(price).toFixed(2)}</strong>
                    {isLoggedIn ? (
                        <button className="product-btn" onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                    ) : (
                        <p style={{ color: '#999', fontSize: '0.9rem' }}>Login to add to cart</p>
                    )}
                </div>
            </div>
        </article>
    );
}
