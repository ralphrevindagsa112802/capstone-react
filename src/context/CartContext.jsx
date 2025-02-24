import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => { 

  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser && storedUser.id) {
      setUserId(storedUser.id);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const savedCart = localStorage.getItem(`cartItems_${userId}`);
      setCartItems(savedCart ? JSON.parse(savedCart) : []);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      localStorage.setItem(`cartItems_${userId}`, JSON.stringify(cartItems));
    }
  }, [cartItems, userId]);

  const addToCart = (food) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find(item => item.food_id === food.food_id && item.size === food.size);
      
      if (existingItem) {
        // If same food_id and size exist, update quantity
        return prevCart.map(item =>
          item.food_id === food.food_id && item.size === food.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Otherwise, add new item
        return [...prevCart, { ...food, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (foodId, size) => {
    setCartItems((prevCart) =>
      prevCart.filter(item => !(item.food_id === foodId && item.size === size))
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
