import React, {use, useState} from 'react';
import ProductCard from '../components/ProductCard';


export default function UsersProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            setError(null);
            try { //get current user
                const meResponse = await api.get('/api/accounts/me/');
                const userId = meResponse.data.id;
                setUsername(meResponse.data.username);
                //get products for current user
                const productsResponse = await api.get(`/api/products/?seller=${userId}`);
                setProducts(productsResponse.data);
            } catch (err) {
                console.error('Error fetching user products:', err);
                if (err.response && err.response.status === 401) {
                    setError('You must be logged in to view your products.');
                } else {
                    setError('Failed to load products. Please try again later.');
                }
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) {
        return <div>Loading your products...</div>;
    }
    if (error) {
        return <div>{error}</div>;
    }
    return (
        <div>
            <h1>{username ? `${username}'s products` : "Your products"}</h1>
            {products.length === 0 ? (
                <p>You have not added any products yet.</p>
            ) : (
                <div className="product-grid">
                    {products.map(product => (
                        <ProductCard
                            key={product.id}
                            title={product.title}
                            description={product.description}
                            price={product.price}
                            image={product.image}
                            onAdd={() => console.log('add',p.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}