import React from "react";
import { useEffect, useState, useContext, } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import Swal from "sweetalert2";

const Paymaya = () => {
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

    try {
      const response = await axios.post(
        "https://yappari-coffee-bar.shop/api/submitOrders", // ✅ Use correct API
        requestData,
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      if (response.data.success) {
        setCartItems([]); // ✅ Clear cart after order
        localStorage.removeItem("checkoutOrder");
        localStorage.removeItem("totalAmount");
        localStorage.removeItem("shipping_method");
        Swal.fire("Success", `Order placed successfully! Order ID: ${response.data.order_id}`, "success", {timer: 3000});
        navigate("/user/cart"); // ✅ Redirect to confirmation page
      } else {
        Swal.fire("Error", `"Order submission failed: ${response.data.message}`, "success", {timer: 3000});
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      Swal.fire("Success", `Failed to place order. Please try again.`, "success", {timer: 3000});
    }
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen w-full bg-gray-100">
  {/* Header */}
  <div className="w-full bg-[#00b464] text-white flex items-center justify-between p-4 md:p-6">
    <button 
      className="text-sm"
      onClick={() => navigate("/user/home")}
    >
      &lt; back
    </button>
    <div className="flex-1 text-center text-lg md:text-xl font-bold">Maya</div>
    <div className="w-8"></div> {/* Spacer for alignment */}
  </div>

  {/* QR Code Section */}
  <div className="relative bg-white shadow-lg rounded-lg p-4 md:p-8 text-center w-11/12 md:w-4/5 lg:w-3/5 max-w-xl mt-4 md:mt-[-50px] z-10 mx-2">
    <p className="text-[#00b464] font-medium text-sm md:text-base">A safer way to pay!</p>
    <p className="text-gray-600 mb-4 text-xs md:text-sm">
      Log in to Maya and scan this QR with the QR scanner.
    </p>
    <div className="flex justify-center">
      <img
        src="../img/cashg-payment.jpg"
        alt="GCash QR Code"
        className="w-52 h-52 md:w-72 md:h-72"
      />
    </div>
    {/* Confirm Payment Button */}
    <button
      onClick={handleConfirmPayment}
      className="mt-4 md:mt-6 bg-[#00b464] hover:bg-[#b1bef3] active:bg-[#2ff29e] cursor-pointer text-white w-full py-2 md:py-3 rounded-lg text-base md:text-lg font-bold transition duration-200"
    >
      Confirm Payment
    </button>
  </div>
</div>
  );
};

export default Paymaya;
