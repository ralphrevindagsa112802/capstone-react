import React from "react";

const Payment = () => {
  const handleConfirmPayment = () => {
    // Simulating saving order details (Replace with API call)
    fetch("https://yappari-coffee-bar.shop/api/save-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: 1, // Replace with actual logged-in user ID
        status: "Paid",
        paymentMethod: "GCash",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Payment confirmed! Your order is now being processed.");
          // Redirect or update order status here
        } else {
          alert("Payment failed. Please try again.");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen h-screen bg-gray-100">
      {/* Header */}
      <div className="w-full bg-[#1C359A] text-white flex items-center justify-between h-42 p-6">
        <button className="text-sm">&lt; back</button>
        <div className="flex-1 text-center text-xl font-bold">GCash</div>
      </div>

      {/* QR Code Section Overlapping Header */}
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
