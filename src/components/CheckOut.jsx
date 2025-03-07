import { useEffect, useState, useContext, } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext"; // Import Cart Context

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

  //handling payment gcash or paymaya
  const handlePayment = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (paymentMethod === "GCash") {
      localStorage.setItem("shipping_method", shippingMethod);
      localStorage.setItem("payment_method", paymentMethod);
      navigate("/user/payment");
      return;
    }
  };


  return (
    <div className='bg-[#DCDEEA]'>
      <div className="flex items-center justify-center w-full shadow-md px-12 py-4 bg-white">
        <img src="../img/YCB LOGO (BLUE).png" alt="Logo" className="h-20 w-auto object-contain" />
      </div>

      <div className="min-h-screen p-6">
        <div className="max-w-6xl mx-auto rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <h2 className="text-xl font-bold text-[#1C359A] mb-4">Checkout</h2>
              <div className="flex p-4 rounded-lg border-[2px] border-[#1C359A] gap-6">
                <div>
                  <img src="../img/location.png" className="h-12 w-12" alt="" />
                </div>
                <div>
                  <p className="font-semibold">{user.name || "Loading..."} &nbsp; &nbsp; <span className="text-black font-sm font-light">{user.phone || "Loading..."}</span></p>
                  <p className="text-sm text-gray-600">{user.address || "Loading..."}</p>
                  <p className="text-sm text-gray-600">{user.order_id || "Loading..."}</p>
                </div>
              </div>
              <div className="mb-6 mt-6">
                <h2 className="text-xl font-bold text-blue-800 mb-4">Shipping Information</h2>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 border-[#1C359A] border-[2px] rounded-lg p-4 w-full">
                    <input type="radio" name="shipping_method" value="Delivery" checked={shippingMethod === "Delivery"} onChange={() => setShippingMethod("Delivery")} />
                    <p className="font-semibold text-sm">Delivery</p>
                  </label>
                  <label className="flex items-center gap-2 border-[#1C359A] border-[2px] rounded-lg p-4 w-full">
                    <input type="radio" name="shipping_method" value="Pickup" checked={shippingMethod === "Pickup"} onChange={() => setShippingMethod("Pickup")} />
                    <p className="font-semibold text-sm">Pick up</p>
                  </label>
                </div>
              </div>


              {/* Payment Method Section */}
              <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full mt-6">
                <h2 className="text-xl font-bold text-blue-900">Payment details</h2>
                <p className="text-black mt-1 font-bold">Payment method</p>

                {/* ✅ Payment Options */}
                <div className="mt-4 border-2 border-[#1C359A] rounded-lg p-4 flex items-center space-x-3">
                  <input
                    type="radio"
                    name="payment_method"
                    value="GCash"
                    checked={paymentMethod === "GCash"}
                    onChange={() => setPaymentMethod("GCash")}
                  />
                  <span className="text-lg font-semibold">GCash</span>
                  <img src="../img/gcash-icon.png" alt="GCash" className="w-6 h-6" />
                </div>

                <div className="mt-4 border-2 border-[#1C359A] rounded-lg p-4 flex items-center space-x-3">
                  <input
                    type="radio"
                    name="payment_method"
                    value="PayMaya"
                    checked={paymentMethod === "PayMaya"}
                    onChange={() => setPaymentMethod("PayMaya")}
                  />
                  <span className="text-lg font-semibold">PayMaya</span>
                  <img src="../img/paymaya-icon.png" alt="PayMaya" className="w-6 h-6" />
                </div>

                <button className="mt-3 bg-blue-800 text-white w-full py-2 rounded-lg text-lg font-bold">
                  Edit
                </button>
              </div>


            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1C359A] mb-4">Your order</h2>
              <div className="bg-gray-50 p-4 rounded-lg border-[#1C359A] border-[2px]">
                {cartItems?.map((item) => (
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