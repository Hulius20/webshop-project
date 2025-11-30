import React, {useState} from "react";
import AddProduct from "../account-components/AddProduct.jsx";

export default function Account() {
    const [productAdded, setProductAdded] = useState(false);

    const handleProductAdded = () => {
        setProductAdded(!productAdded);
    };

    return (
        <>
            <div>
                <h1>Account Page</h1>
                <AddProduct onProductAdded={handleProductAdded} />
            </div>
            <div>
                <h2>Your Products</h2>
                {/* Here you can add a component to list the user's products */}
                
            </div>
        </>
    );
}