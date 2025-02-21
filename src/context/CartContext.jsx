import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => { 

  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Get the logged-in user ID from localStorage/sessionStorage
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser && storedUser.id) {
      setUserId(storedUser.id);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      // Load cart for the specific user
      const savedCart = localStorage.getItem(`cartItems_${userId}`);
      setCartItems(savedCart ? JSON.parse(savedCart) : []);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      // Save cart for the specific user
      localStorage.setItem(`cartItems_${userId}`, JSON.stringify(cartItems));
    }
  }, [cartItems, userId]);

  const addToCart = (food) => {
    setCartItems((prevCart) => [...prevCart, food]);
  };

  const removeFromCart = (foodId) => {
    setCartItems((prevCart) => prevCart.filter(item => item.food_id !== foodId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart , setCartItems}}>
      {children}
    </CartContext.Provider>
  );
};
