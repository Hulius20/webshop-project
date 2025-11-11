import ProductCard from '../components/ProductCard.jsx'
import React from 'react';


function Home() {
    const sampleProducts = [
        {id:1, title: 'Product 1', description: 'This is product 1', price: 19.99, image: 'https://via.placeholder.com/150'},
        {id:2, title: 'Product 2', description: 'This is product 2', price: 29.99, image: 'https://via.placeholder.com/150'},
        {id:3, title: 'Product 3', description: 'This is product 3', price: 39.99, image: 'https://via.placeholder.com/150'},
    ]
  return (
    <div>
        <section className="product-grid">
            {sampleProducts.map(product => (
                <ProductCard
                    key={product.id}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    image={product.image}
                    onAdd={() => alert(`Added ${product.title} to cart!`)}
                />
            ))} 
        </section>
    </div>
    )
}
export default Home