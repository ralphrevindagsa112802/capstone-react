import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (food) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.food_id === food.food_id);

            if (existingItem) {
                return prevItems.map((item) =>
                    item.food_id === food.food_id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevItems, { ...food, quantity: 1 }];
            }
        });
        alert(`${food.food_name} added to cart!`);
    };

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};
