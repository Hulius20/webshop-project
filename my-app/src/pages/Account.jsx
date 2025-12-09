import React, {useState} from "react";
import AddProduct from "../account-components/AddProduct.jsx";
import UsersProducts from "../account-components/UsersProducts.jsx";
import EditAccount from "../account-components/EditAccount.jsx";
import '../styles/Account.css';

export default function Account() {
    const [productAdded, setProductAdded] = useState(false);

    const handleProductAdded = () => {
        setProductAdded(!productAdded);
    };

    return (
        <>
            <div className="account-add-product">
                <h1>Account Page</h1>
                <AddProduct onProductAdded={handleProductAdded} />
            </div>
            <div className="account-edit">
                <h2>Edit Account Information</h2>
                <EditAccount />
            </div>
            <div className="account-users-products">
                <h2>Your Products</h2>
                <UsersProducts key={productAdded} />
                
            </div>
        </>
    );
}