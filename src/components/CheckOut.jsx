import { useEffect, useState, useContext, } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext"; // Import Cart Context
import Swal from "sweetalert2";

const CheckOut = () => {
  const navigate = useNavigate();
  const { setCartItems } = useContext(CartContext); // Clear cart after checkout
  const [cartItems, setCartItemsState] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingMethod, setShippingMethod] = useState();
  const [user, setUser] = useState({ name: "", address: "", phone: "", order_id: "", });
  const [paymentMethod, setPaymentMethod] = useState(); // ✅ Added state for payment method

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

   //Handles Shipping Method
   const handleShippingMethodChange = (method) => {
    if (method === "Delivery") {
      // Check if the user's address contains "Taguig"
      if (!user.address || !user.address.includes("Taguig")) {
        Swal.fire("Oops..", "Deliveries are only available to customers within Taguig.", "info", {timer: 3000});
        return; // Don't change shipping method
      }
    } 
    
    // If we passed validation or method isn't "Delivery", update the state
    setShippingMethod(method);
  };

  //handling payment gcash or paymaya
  const handlePayment = async () => {
    if (cartItems.length === 0) {
      Swal.fire("Warning", "Your cart is empty!", "warning", {timer: 3000});
      return;
    }
  
    // Double-check Taguig address requirement for delivery
    if (shippingMethod === "Delivery" && (!user.address || !user.address.includes("Taguig"))) {
      Swal.fire("Warning", "Deliveries are only available to customers within Taguig.", "warning", {timer: 3000});
      return;
    }
  
    // Payment Methods
    if (paymentMethod === "GCash") {
      localStorage.setItem("shipping_method", shippingMethod);
      localStorage.setItem("payment_method", paymentMethod);
      navigate("/user/payment");
      return;
    } else if (paymentMethod === "Paymaya") {
      localStorage.setItem("shipping_method", shippingMethod);
      localStorage.setItem("payment_method", paymentMethod);
      navigate("/user/payment");
      return;
    } else if (paymentMethod === "Cash on Delivery") {
      localStorage.setItem("shipping_method", shippingMethod);
      localStorage.setItem("payment_method", paymentMethod);
      navigate("/user/payment");
      return;
    } else {
      return;
    }
  };


  return (
    <div className='bg-[#DCDEEA]'>
     <div className="flex flex-col min-h-screen ">
  {/* Header */}
  <div className="flex items-center justify-center w-full shadow-md px-4 md:px-12 py-3 bg-white">
    <img src="../img/YCB LOGO (BLUE).png" alt="Logo" className="h-12 md:h-20 w-auto object-contain" />
  </div>

  {/* Main Content */}
  <div className="flex-grow p-4 md:p-6">
    <div className="max-w-6xl mx-auto rounded-lg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column - Checkout Information */}
        <div className="order-2 lg:order-1">
          <h2 className="text-xl font-bold text-[#1C359A] mb-4">Checkout</h2>
          
          {/* Delivery Address */}
          <div className="flex p-4 rounded-lg border-[2px] border-[#1C359A] gap-4">
            <div className="flex-shrink-0">
              <img src="../img/location.png" className="h-10 w-10 md:h-12 md:w-12" alt="Location" />
            </div>
            <div className="flex-grow">
              <p className="text-sm md:text-base">
               Name :  {user.name || "Loading..."} <span className="text-black font-light text-xs md:text-sm"> {user.phone || "Loading..."}</span>
              </p>
              <p className="text-xs md:text-sm text-gray-600">Address : {user.address || "Loading..."}</p>
            </div>
          </div>
          
          {/* Shipping Method */}
          <div className="mb-4 mt-6">
            <h2 className="text-xl font-bold text-[#1C359A] mb-4">Shipping Information</h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <label className="flex items-center gap-2 border-[#1C359A] border-[2px] rounded-lg p-3 w-full cursor-pointer">
                <input 
                  type="radio" 
                  name="shipping_method" 
                  value="Delivery" 
                  checked={shippingMethod === "Delivery"} 
                  onChange={() => handleShippingMethodChange("Delivery")} 
                  className="w-4 h-4"
                />
                <p className="font-semibold text-sm">Delivery</p>
              </label>
              <label className="flex items-center gap-2 border-[#1C359A] border-[2px] rounded-lg p-3 w-full cursor-pointer">
                <input 
                  type="radio" 
                  name="shipping_method" 
                  value="Pickup" 
                  checked={shippingMethod === "Pickup"} 
                  onChange={() => handleShippingMethodChange("Pickup")} 
                  className="w-4 h-4"
                />
                <p className="font-semibold text-sm">Pickup</p>
              </label>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-gray-100 p-4 md:p-6 rounded-lg shadow-md w-full mt-6">
            <h2 className="text-lg md:text-xl font-bold text-[#1C359A]">Payment details</h2>
            <p className="text-black mt-1 font-bold text-sm md:text-base">Payment method</p>

            {/* Payment Options */}
            <div className="mt-4 space-y-3">
              <label className="block cursor-pointer border-2 border-[#1C359A] rounded-lg p-3 hover:bg-blue-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="payment_method"
                    value="GCash"
                    checked={paymentMethod === "GCash"}
                    onChange={() => setPaymentMethod("GCash")}
                    className="w-4 h-4"
                  />
                  <span className="text-base md:text-lg font-semibold">GCash</span>
                  <img src="../img/gcash-icon.png" alt="GCash" className="w-5 h-5 md:w-6 md:h-6" />
                </div>
              </label>

              <label className="block cursor-pointer border-2 border-[#1C359A] rounded-lg p-3 hover:bg-blue-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="payment_method"
                    value="PayMaya"
                    checked={paymentMethod === "PayMaya"}
                    onChange={() => setPaymentMethod("PayMaya")}
                    className="w-4 h-4"
                  />
                  <span className="text-base md:text-lg font-semibold">PayMaya</span>
                  <img src="../img/paymaya-icon.png" alt="PayMaya" className="w-5 h-5 md:w-6 md:h-6" />
                </div>
              </label>

              <label className="block cursor-pointer border-2 border-[#1C359A] rounded-lg p-3 hover:bg-blue-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="payment_method"
                    value="Cash on Delivery"
                    checked={paymentMethod === "Cash on Delivery"}
                    onChange={() => setPaymentMethod("Cash on Delivery")}
                    className="w-4 h-4"
                  />
                  <span className="text-base md:text-lg font-semibold">Cash on Delivery</span>
                </div>
              </label>
            </div>

            <button className="mt-4 bg-[#1C359A] text-white w-full py-2 rounded-lg text-base md:text-lg font-bold hover:bg-blue-700 transition-colors">
              Edit
            </button>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="order-1 lg:order-2">
          <div className="sticky top-4">
            <h2 className="text-xl font-bold text-[#1C359A] mb-4">Your order</h2>
            <div className="bg-white p-4 rounded-lg border-[#1C359A] border-[2px] shadow-sm">
              <div className="max-h-64 overflow-y-auto">
                {cartItems?.map((item) => (
                  <div key={`${item.food_id}-${item.size}`} className="flex gap-4 items-center justify-between text-sm mb-3 pb-2 border-b last:border-0">
                  <img 
                              src={item.image_path} 
                              alt={item.food_name}
                              className="h-22 w-22 rounded-md object-cover"
                            />                    
                    <div className="flex-grow pr-2">
                      <p className="font-medium">{item.food_name} <span className="text-gray-600">({item.size})</span></p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">₱{item.food_price * item.quantity}</p>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <p>Subtotal</p>
                  <p>₱{totalAmount}</p>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <p>Shipping</p>
                  <p>Free</p>
                </div>
                <div className="flex justify-between font-bold text-[#1C359A] text-base md:text-lg mt-2">
                  <p>Total</p>
                  <p>₱{totalAmount}</p>
                </div>
              </div>
            </div>
            
            <button 
              onClick={handlePayment} 
              className="mt-4 bg-[#1C359A] text-white w-full py-3 rounded-lg text-base md:text-lg font-bold hover:bg-blue-700 transition-colors shadow-md"
            >
                Pay ₱{totalAmount}
                </button>
            
            <p className="text-xs md:text-sm text-gray-500 mt-4">
              *For pick-up customers, please arrive 20–30 minutes after receiving your order status "READY TO PICK-UP."
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  );
};

export default CheckOut;