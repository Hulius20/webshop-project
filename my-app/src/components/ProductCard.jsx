import React from "react";
import '../styles/ProductCard.css';

export default function ProductCard({title,price ,image , description, onAdd}){
    return(
        <article className="product-card">
            <div className="product-media">
                <img src={image} alt={title}/>
            </div>
            <div className="product-body">
                <h2 className="product-title">{title}</h2>
                <p className="product-description">{description}</p>
                <div className="product-footer">
                    <span className="product-price">€{price}</span>
                    <button className="product-btn" onClick={onAdd}>Add to Cart</button>
                </div>
            </div>
        </article>
    );
}
