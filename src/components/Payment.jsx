import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    // ✅ Retrieve order ID from localStorage (set during checkout)
    const storedOrderId = localStorage.getItem("orderId");
    if (storedOrderId) {
      setOrderId(storedOrderId);
    } else {
      console.error("No order ID found in localStorage.");
    }
  }, []);

  const handleConfirmPayment = async () => {
    if (!orderId) {
      alert("No order found. Please try again.");
      return;
    }

    try {
      const response = await fetch("https://yappari-coffee-bar.shop/api/save-order.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: orderId,
          status: "Paid",
          paymentMethod: "GCash",
        }),
        credentials: "include",
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (data.success) {
        alert("Payment confirmed! Your order is now being processed.");
        navigate(`/user-status?order_id=${data.order_id}`);
      } else {
        alert("Payment failed: " + data.message);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("An error occurred. Please check your connection and try again.");
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
