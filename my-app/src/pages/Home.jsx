import ProductCard from '../components/ProductCard.jsx'
import React, {useState, useEffect, use} from 'react';
import SearchBar from '../components/SearchBar.jsx';
import api from '../api/axiosWithAuth.jsx';


export default function Home() {
    const [searchQuery, setSearchQuery] = useState('')
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products from API
        fetchProducts();
    }, []);

    useEffect(() => {
        // Refetch products when a user logs in
        const handleLogInEvent = () =>{
            fetchProducts();
        };
        window.addEventListener('logInEvent', handleLogInEvent);
        return () => {
            window.removeEventListener('logInEvent', handleLogInEvent);
        };
        
    }, []);

    useEffect(() => {
        // Refetch products when a product is added
        const handleProductAdded = () =>{
            fetchProducts();
        };
        window.addEventListener('productAdded', handleProductAdded);
        return () => {
            window.removeEventListener('productAdded', handleProductAdded);
        };
    }, []);
    const fetchProducts = async () => {
        try {
            const response = await api.get('/api/products/');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleAddToCart = (productId) => {
        console.log(`Product ${productId} added to cart.`);
        //implement add to cart functionality here
    };
    const sampleProducts = [
        {id:1, title: 'Product 1', description: 'This is product 1', price: 19.99, image: 'https://via.placeholder.com/150'},
        {id:2, title: 'Product 2', description: 'This is product 2', price: 29.99, image: 'https://via.placeholder.com/150'},
        {id:3, title: 'Product 3', description: 'This is product 3', price: 39.99, image: 'https://via.placeholder.com/150'},
        {id:4, title: 'Product 4', description: 'This is product 4', price: 49.99, image: 'https://via.placeholder.com/150'},
        {id:5, title: 'Product 5', description: 'This is product 5', price: 59.99, image: 'https://via.placeholder.com/150'},
        {id:6, title: 'Product 6', description: 'This is product 6', price: 69.99, image: 'https://via.placeholder.com/150'},
        {id:7, title: 'Product 7', description: 'This is product 7', price: 79.99, image: 'https://via.placeholder.com/150'},
        {id:8, title: 'Product 8', description: 'This is product 8', price: 89.99, image: 'https://via.placeholder.com/150'},
        {id:9, title: 'Product 9', description: 'This is product 9', price: 99.99, image: 'https://via.placeholder.com/150'},
        {id:10, title: 'Product 10', description: 'This is product 10', price: 109.99, image: 'https://via.placeholder.com/150'},
        {id:11, title: 'Product 11', description: 'This is product 11', price: 119.99, image: 'https://via.placeholder.com/150'},
        {id:12, title: 'Product 12', description: 'This is product 12', price: 129.99, image: 'https://via.placeholder.com/150'},
        {id:13, title: 'Product 13', description: 'This is product 13', price: 139.99, image: 'https://via.placeholder.com/150'},

    ]
  return (
    <>
    <div className="search-section">
        <SearchBar onSearch={setSearchQuery} />
      </div>
    <div>
        <section className="product-grid">
            {sampleProducts.map(product => (
                <ProductCard
                    key={product.id}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    image={product.image}
                    onAdd={() => handleAddToCart(product.id)}
                />
            ))} 
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    image={product.image}
                    onAdd={() => handleAddToCart(product.id)}
                />
            ))} 
        </section>
    </div>
    </>
    )
}
