import { useState } from "react";
import api from "../api/axiosWithAuth.jsx";
import '../styles/Account.css';

export default function AddProduct({ onProductAdded }) {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                title,
                price,
                description,
            };
            if (image && image.trim() !== "") payload.image = image.trim();
            const response = await api.post("/api/products/", payload);
            alert("Product added successfully!");
            setTitle("");
            setPrice("");
            setDescription("");
            setImage("");
            onProductAdded(response.data);
        } catch (error) {
            alert("Error adding product. Please try again.");
            console.error(error);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="add-product-form">
            <h3>Add product to sale</h3>
            <input
                type="text"
                placeholder="Product Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Price (€)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />
            <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Image URL (optional)"
                value={image}
                onChange={(e) => setImage(e.target.value)}
            />
            <button type="submit">Add Product</button>
        </form>
    );
}