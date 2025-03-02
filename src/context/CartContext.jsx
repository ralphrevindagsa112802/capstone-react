import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({children}) => { 
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

  const logoutUser = async () => {
      try {
        await fetch("http://localhost/capstone-react/api/logout.php", {
            method: "POST",
            credentials: "include",
        });
        
        sessionStorage.removeItem("user_id"); // ✅ Remove user session
        sessionStorage.removeItem("user_name");
        localStorage.removeItem("cartItems_guest"); // ✅ Remove guest cart
        setUserId(null);
        setCartItems([]); // ✅ Clear cart
    } catch (error) {
        console.error("Logout failed:", error);
    }
  };
  
  

  // ✅ Load correct cart initially (User's cart if logged in, otherwise Guest cart)
  const initialCart = JSON.parse(localStorage.getItem(userId ? `cartItems_${userId}` : "cartItems_guest")) || [];
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : []; // ✅ Always an array, never null
  });
  

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
    if (userId) {
      localStorage.setItem(`cartItems_${userId}`, JSON.stringify(cartItems));
    } else {
      localStorage.setItem("cartItems_guest", JSON.stringify(cartItems));
    }
  }, [cartItems, userId]);  

  // ✅ Add item to cart (Ensures correct merging of items)
  const addToCart = (food) => {
  
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
    setCartItems((prevCart) => {
      const updatedCart = prevCart.filter(item => !(item.food_id === foodId && item.size === size));
      
      // ✅ Update localStorage
      if (userId) {
        localStorage.setItem(`cartItems_${userId}`, JSON.stringify(updatedCart));
      } else {
        localStorage.setItem("cartItems_guest", JSON.stringify(updatedCart));
      }
  
      return updatedCart;
    });
  };
  

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, setCartItems, logoutUser }}>
      {children}
    </CartContext.Provider>
  );
};
