import ProductCard from '../components/ProductCard.jsx'
import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar.jsx';
import publicApi from '../api/axiosPublic.jsx';
import apiAuth from '../api/axiosWithAuth.jsx'; // authenticated client


export default function Home() {
    const [searchQuery, setSearchQuery] = useState('')
    const [products, setProducts] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        // Fetch products from API
        fetchProducts();
        fetchCurrentUser();
    }, []);

    // refresh current user when auth state changes
    useEffect(() => {
        const onLogin = () => fetchCurrentUser();
        const onLogout = () => setCurrentUserId(null);
        window.addEventListener('userLoggedIn', onLogin);
        window.addEventListener('userLoggedOut', onLogout);
        return () => {
            window.removeEventListener('userLoggedIn', onLogin);
            window.removeEventListener('userLoggedOut', onLogout);
        };
    }, []);

    async function fetchCurrentUser() {
        try {
            const res = await apiAuth.get('/api/accounts/me/');
            setCurrentUserId(res.data?.id ?? null);
        } catch (err) {
            // not logged in / invalid token -> treat as anonymous
            setCurrentUserId(null);
        }
    }

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
            const response = await publicApi.get('/api/products/');
            setProducts(response.data || []);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleAddToCart = (productId) => {
        console.log(`Product ${productId} added to cart.`);
        //implement add to cart functionality here
    };

    // Only show products that are for sale (treat missing flag as true)
    const visibleProducts = products
        .filter(p => (p.for_sale === undefined) ? true : Boolean(p.for_sale))
        .filter(p => {
            // hide products that belong to current logged-in user
            if (!currentUserId) return true; // anonymous viewers see everything for sale
            return String(p.seller) !== String(currentUserId);
        });

    return (
        <>
            <div className="search-section">
                <SearchBar onSearch={setSearchQuery} />
            </div>
            <div>
                <section className="product-grid">
                    {visibleProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
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
