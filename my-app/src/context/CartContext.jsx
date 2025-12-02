import React, { createContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const LOCAL_KEY = "cart";

function makeLocalId(){
    return `local_${Date.now()}_${Math.random().toString(36).substr(2,9)}`;
}

function reducer(state, action) {
    switch (action.type) {
        case "INIT":
            return action.payload || [];
        case 'ADD': {
            const incoming = { ...action.payload};
            // prevent duplicates: if item with same id exists, keep state unchanged
            if (incoming.id === undefined || incoming.id === null || incoming.id === '') {
                incoming.id = makeLocalId();
            }
            const exists = state.some(i => String(i.id) === String(incoming.id));
            if (exists) return state;
         return [...state, incoming];
        }
        case 'REMOVE':
            return state.filter(i => String(i.id) !== String(action.payload));
        case "CLEAR":
            return [];
        default:
            return state;
    }
}

export function CartProvider({ children }) {
    const [cart, dispatch] = useReducer(reducer, []);

    useEffect(() => {
        try{
            const storedCart = localStorage.getItem(LOCAL_KEY);
            if (storedCart) {
                dispatch({ type: "INIT", payload: JSON.parse(storedCart) });
            }
        } catch (e) {
            console.error("Failed to load cart from localStorage", e);

        }
    }, []);

    useEffect(() => {
        try{
            localStorage.setItem(LOCAL_KEY, JSON.stringify(cart));
        } catch (e) {
            console.error("Failed to save cart to localStorage", e);
        }   
    }, [cart]);

    const addToCart = (product) => {
        const item =
            { id: product.id, title: product.title, price: product.price, image: product.image };
            dispatch({ type: "ADD", payload: item });
    };
    const removeFromCart = (id) => {
        dispatch({ type: "REMOVE", payload:  id });
    };
    const clearCart = () => {
        dispatch({ type: "CLEAR" });
    };

    const totalCount = cart.length;
    const totalPrice = cart.reduce((total, item) => total + Number(item.price || 0), 0);
    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalCount, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
}
export default CartContext;

