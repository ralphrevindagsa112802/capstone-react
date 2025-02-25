import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext"; // Import Cart Context

const CheckOut = () => {
  const navigate = useNavigate();
  const { setCartItems } = useContext(CartContext); // Clear cart after checkout
  const [cartItems, setCartItemsState] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingMethod, setShippingMethod] = useState("delivery");
  const [user, setUser] = useState({ name: "", address: "" });

  useEffect(() => {
    // Load cart from local storage
    const storedCart = JSON.parse(localStorage.getItem("checkoutOrder")) || [];
    const storedTotal = localStorage.getItem("totalAmount") || 0;

    setCartItemsState(storedCart);
    setTotalAmount(storedTotal);

    // Fetch user details from API
    axios.get("http://localhost/capstone-react/api/getUserOrderDetails.php", { withCredentials: true })
      .then(response => {
        if (response.data.success) {
          setUser({ name: response.data.name, address: response.data.address });
        } else {
          console.error(response.data.message);
        }
      })
      .catch(error => console.error("Error fetching user details:", error));
  }, []);

  const handlePayment = async () => {
    if (cartItems.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const requestData = {
        items: cartItems.map((item) => ({
            food_id: item.food_id,
            size: item.size,
            food_price: item.food_price,
            quantity: item.quantity,
        })),
        shipping_method: shippingMethod,
        payment_method: "Gcash",
    };

    console.log("Sending Order Data:", requestData); // ✅ Debug the request being sent

    try {
        const response = await axios.post(
            "http://localhost/capstone-react/api/submitOrders.php", // ✅ Use correct API
            requestData,
            { headers: { "Content-Type": "application/json" }, withCredentials: true }
        );

        console.log("Server Response:", response.data); // ✅ Debug API response

        if (response.data.success) {
            alert(`Order placed successfully! Order ID: ${response.data.order_id}`);
            setCartItems([]); // ✅ Clear cart after order
            localStorage.removeItem("checkoutOrder");
            localStorage.removeItem("totalAmount");
            navigate("/user/cart"); // ✅ Redirect to confirmation page
        } else {
            alert("Order submission failed: " + response.data.message);
        }
    } catch (error) {
        console.error("Error submitting order:", error);
        alert("Failed to place order. Please try again.");
    }
  };


  return (
    <div className='bg-[#DCDEEA]'>
      <div className="flex items-center justify-center w-full shadow-md px-12 py-4 bg-white">
        <img src="../img/YCB LOGO (BLUE).png" alt="Logo" className="h-20 w-auto object-contain"/>
      </div>

      <div className="min-h-screen p-6">
        <div className="max-w-6xl mx-auto rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div>
              <h2 className="text-xl font-bold text-[#1C359A] mb-4">Checkout</h2>
              
              <div className="p-4 rounded-lg border-[2px] border-gray-200">
                <p className="font-semibold">{user.name || "Loading..."}</p>
                <p className="text-sm text-gray-600">{user.address || "Loading..."}</p>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-bold text-blue-800 mb-4">Shipping Information</h2>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 border-[#1C359A] border-[2px] rounded-lg p-4 w-full">
                    <input type="radio" name="shipping-method" value="delivery" checked={shippingMethod === "delivery"} onChange={() => setShippingMethod("delivery")} />
                    <p className="font-semibold text-sm">Delivery</p>
                  </label>
                  <label className="flex items-center gap-2 border-[#1C359A] border-[2px] rounded-lg p-4 w-full">
                    <input type="radio" name="shipping-method" value="pickup" checked={shippingMethod === "pickup"} onChange={() => setShippingMethod("pickup")} />
                    <p className="font-semibold text-sm">Pick up</p>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1C359A] mb-4">Your order</h2>
              <div className="bg-gray-50 p-4 rounded-lg border-[#1C359A] border-[2px]">
                {cartItems.map((item) => (
                  <div key={`${item.food_id}-${item.size}`} className="flex justify-between text-sm mb-2">
                    <p>{item.food_name} ({item.size}) x {item.quantity}</p>
                    <p>₱{item.food_price * item.quantity}</p>
                  </div>
                ))}
                <div className="border-t pt-4 mt-4 flex justify-between font-semibold text-gray-800">
                  <p>Total</p>
                  <p>₱{totalAmount}</p>
                </div>
              </div>
              <button onClick={handlePayment} className="mt-6 bg-blue-800 text-white w-full py-3 rounded-lg text-lg font-bold">
                Pay ₱{totalAmount}
              </button>
            </div>

            <p className="text-sm text-gray-500">
                  *For pick-up customers, please arrive 20–30 minutes after receiving your order status "READY TO PICK-UP."
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
