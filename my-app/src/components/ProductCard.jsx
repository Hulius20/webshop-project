import React from "react";
import '../styles/ProductCard.css';
import useCart from "../hooks/useCart.jsx";

export default function ProductCard({id,title,price ,image , description, onAdd}){

    const {addToCart} = useCart();
    
    const handleAddToCart = () => {
        addToCart({id,title, price, image},1);
        if(onAdd) onAdd();
    };
    
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
                    <button className="product-btn" onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </article>
    );
}
