import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => { 
  // ✅ Initialize userId properly
  const [userId, setUserId] = useState(sessionStorage.getItem("user_id") || null);

  useEffect(() => {
    const handleSessionChange = () => {
      setUserId(sessionStorage.getItem("user_id")); // ✅ Updates when user logs in/out
    };

    window.addEventListener("storage", handleSessionChange); // ✅ Listens for sessionStorage changes

    return () => {
      window.removeEventListener("storage", handleSessionChange); // ✅ Cleanup event listener
    };
  }, []);

  const logoutUser = () => {
    sessionStorage.removeItem("user_id"); // ✅ Clear session
    setUserId(null);
    setCartItems([]); // ✅ Clear cart
  };
  
  

  // ✅ Load correct cart initially (User's cart if logged in, otherwise Guest cart)
  const initialCart = JSON.parse(localStorage.getItem(userId ? `cartItems_${userId}` : "cartItems_guest")) || [];
  const [cartItems, setCartItems] = useState(initialCart);

  // ✅ Load user's cart when userId changes (prevents losing cart on refresh)
  useEffect(() => {
    const storedUserId = sessionStorage.getItem("user_id");
  
    if (storedUserId !== userId) {
      setUserId(storedUserId);
    }
  
    if (storedUserId) {
      const savedCart = localStorage.getItem(`cartItems_${storedUserId}`);
      setCartItems(savedCart ? JSON.parse(savedCart) : []);
    } else {
      setCartItems([]); // ✅ Reset cart when user logs out or session ends
    }
  }, [userId]);
  
  

  // ✅ Save cart changes to localStorage (prevents overwriting with empty cart)
  useEffect(() => {
    if (cartItems.length > 0) { 
      if (userId) {
        localStorage.setItem(`cartItems_${userId}`, JSON.stringify(cartItems));
      } else {
        localStorage.setItem("cartItems_guest", JSON.stringify(cartItems));
      }
    }
  }, [cartItems, userId]);  

  // ✅ Add item to cart (Ensures correct merging of items)
  const addToCart = (food) => {
    if (!userId) {
      alert("Please log in to add items to your cart.");
      return;
    }
  
    setCartItems((prevCart) => {
      const existingItem = prevCart.find(item => item.food_id === food.food_id && item.size === food.size);
  
      if (existingItem) {
        return prevCart.map(item =>
          item.food_id === food.food_id && item.size === food.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...food, quantity: 1 }];
      }
    });
  };  
  

  // ✅ Remove item from cart
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
