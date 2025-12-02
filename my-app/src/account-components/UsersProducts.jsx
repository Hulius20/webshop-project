import React, {useEffect, useState} from 'react';
import api from '../api/axiosWithAuth.jsx';
import ProductCardAccount from './ProductCardAccount.jsx';
import '../styles/ProductCard.css';

export default function UsersProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            setError(null);
            try {
                const meRes = await api.get('/api/accounts/me/');
                const userId = meRes.data.id;
                setUsername(meRes.data.username);

                const prodRes = await api.get(`/api/products/?seller=${userId}`);
                setProducts(prodRes.data);
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

    if (loading) return <div>Loading your products...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>{username ? `${username}'s products` : 'Your products'}</h1>

            {products.length === 0 ? (
                <p>No products listed yet.</p>
            ) : (
                <section className="product-grid">
                    {products.map(product => (
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