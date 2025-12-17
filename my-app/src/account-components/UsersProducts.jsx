import React, {useEffect, useState} from 'react';
import api from '../api/axiosWithAuth.jsx';
import ProductCardAccount from './ProductCardAccount.jsx';
import '../styles/ProductCard.css';

export default function UsersProducts() {
    const [products, setProducts] = useState([]);
    const [purchasedProducts, setPurchasedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all'); // 'all', 'for-sale', 'purchased', 'sold'

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            setError(null);
            try {
                const meRes = await api.get('/api/accounts/me/');
                const userId = meRes.data.id;
                setUsername(meRes.data.username);

                // Get products you're selling
                const prodRes = await api.get(`/api/products/?seller=${userId}`);
                setProducts(prodRes.data);

                // Get products you purchased (owned)
                const purchasedRes = await api.get(`/api/products/?buyer=${userId}`);
                setPurchasedProducts(purchasedRes.data);
            } catch (err) {
                console.error('Error fetching user products:', err);
                if (err?.response?.status === 401) {
                    setError('You must be logged in to view your products.');
                } else {
                    setError('Failed to load products.');
                }
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    // update product in list after backend returns updated object
    const handleToggleSale = (updatedProduct) => {
        setProducts(prev => prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p)));
    };

    // Filter products based on selected filter
    const filteredProducts = (() => {
        if (filter === 'purchased') {
            // Show all items you purchased (regardless of for_sale status)
            return purchasedProducts;
        }
        
        return products.filter(product => {
            if (filter === 'all') return true;
            if (filter === 'for-sale') return product.for_sale && !product.is_purchased;
            if (filter === 'sold') return product.is_purchased;
            return true;
        });
    })();

    if (loading) return <div>Loading your products...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>{username ? `${username}'s products` : 'Your products'}</h1>

            {/* Filter buttons */}
            <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button 
                    onClick={() => setFilter('all')}
                    style={{ 
                        padding: '0.5rem 1rem',
                        fontWeight: filter === 'all' ? 'bold' : 'normal',
                        backgroundColor: filter === 'all' ? '#007bff' : '#f0f0f0',
                        color: filter === 'all' ? 'white' : 'black',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    All
                </button>
                <button 
                    onClick={() => setFilter('for-sale')}
                    style={{ 
                        padding: '0.5rem 1rem',
                        fontWeight: filter === 'for-sale' ? 'bold' : 'normal',
                        backgroundColor: filter === 'for-sale' ? '#28a745' : '#f0f0f0',
                        color: filter === 'for-sale' ? 'white' : 'black',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    For Sale
                </button>
                <button 
                    onClick={() => setFilter('purchased')}
                    style={{ 
                        padding: '0.5rem 1rem',
                        fontWeight: filter === 'purchased' ? 'bold' : 'normal',
                        backgroundColor: filter === 'purchased' ? '#17a2b8' : '#f0f0f0',
                        color: filter === 'purchased' ? 'white' : 'black',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Purchased
                </button>
                <button 
                    onClick={() => setFilter('sold')}
                    style={{ 
                        padding: '0.5rem 1rem',
                        fontWeight: filter === 'sold' ? 'bold' : 'normal',
                        backgroundColor: filter === 'sold' ? '#ffc107' : '#f0f0f0',
                        color: filter === 'sold' ? 'black' : 'black',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Sold
                </button>
            </div>

            {filteredProducts.length === 0 ? (
                <p>No products found for this filter.</p>
            ) : (
                <section className="product-grid">
                    {filteredProducts.map(product => (
                        <ProductCardAccount
                            key={product.id}
                            product={product}
                            onToggleSale={handleToggleSale}
                        />
                    ))}
                </section>
            )}
        </div>
    );
}