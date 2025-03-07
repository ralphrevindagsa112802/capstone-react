import { useEffect, useState, useContext, } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";

const Payment = () => {
  const navigate = useNavigate();
  const { setCartItems } = useContext(CartContext); // Clear cart after checkout
  const [cartItems, setCartItemsState] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [user, setUser] = useState({ name: "", address: "", phone: "", order_id: "", });

  useEffect(() => {
    // Load cart from local storage
    const storedCart = JSON.parse(localStorage.getItem("checkoutOrder")) || [];
    const storedTotal = localStorage.getItem("totalAmount") || 0;

    setCartItemsState(storedCart);
    setTotalAmount(storedTotal);

    // Fetch user details from API
    axios.get("https://yappari-coffee-bar.shop/api/getUserOrderDetails", { withCredentials: true })
      .then(response => {
        if (response.data.success) {
          setUser({ name: response.data.name, address: response.data.address, phone: response.data.phone, orders_id: response.data.orders_id });
        } else {
          console.error(response.data.message);
        }
      })
      .catch(error => console.error("Error fetching user details:", error));
  }, []);

  const handleConfirmPayment = async () => {
    const shippingMethod = localStorage.getItem("shipping_method");
    const paymentMethod = localStorage.getItem("payment_method");

    const requestData = {
      items: cartItems?.map((item) => ({
        food_id: item.food_id,
        size: item.size,
        food_price: item.food_price,
        quantity: item.quantity,
      })),
      shipping_method: shippingMethod,
      payment_method: paymentMethod, // ✅ Sends selected payment method
    };

    console.log("Sending Order Data:", requestData); // ✅ Debug the request being sent

    try {
      const response = await axios.post(
        "https://yappari-coffee-bar.shop/api/submitOrders", // ✅ Use correct API
        requestData,
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      console.log("Server Response:", response.data); // ✅ Debug API response

      if (response.data.success) {
        setCartItems([]); // ✅ Clear cart after order
        localStorage.removeItem("checkoutOrder");
        localStorage.removeItem("totalAmount");
        localStorage.removeItem("shipping_method");
        alert(`Order placed successfully! Order ID: ${response.data.order_id}`);
        navigate("/user/cart"); // ✅ Redirect to confirmation page
        window.location.reload();
      } else {
        alert("Order submission failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen h-screen bg-gray-100">
      {/* Header */}
      <div className="w-full bg-[#022DB8] text-white flex items-center justify-between h-42 p-6">
        <button className="text-sm">&lt; back</button>
        <div className="flex-1 text-center text-xl font-bold">GCash</div>
      </div>

      {/* QR Code Section */}
      <div className="relative bg-white shadow-lg rounded-lg p-8 text-center w-[60%] max-w-xl mt-[-50px] z-10">
        <p className="text-blue-600 font-medium">A safer way to pay!</p>
        <p className="text-gray-600 mb-4">
          Log in to GCash and scan this QR with the QR scanner.
        </p>
        <div className="flex justify-center">
          <img
            src="/mnt/data/image.png"
            alt="GCash QR Code"
            className="w-48 h-48"
          />
        </div>

        {/* Confirm Payment Button */}
        <button
          onClick={handleConfirmPayment}
          className="mt-6 bg-[#1C359A] hover:bg-[#b1bef3] cursor-pointer text-white w-full py-3 rounded-lg text-lg font-bold"
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
};

export default Payment;
