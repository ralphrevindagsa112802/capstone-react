import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import axios from "axios";
import UserNavbar from "../../components/UserNavbar";
import Footer from "../../components/Footer";

const UserCart = () => {
    const { cartItems, removeFromCart, setCartItems } = useContext(CartContext);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const total = cartItems.reduce((sum, item) => sum + item.food_price * item.quantity, 0);
        setTotalAmount(total);
    }, [cartItems]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        console.log("Submitting order with cart items:", cartItems);
    
        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }
    
        // Convert food_id and food_price to proper numbers
        const formattedCartItems = cartItems.map((item) => ({
            food_id: parseInt(item.food_id, 10), // Convert to integer
            size: item.size || "Regular", // 🔹 Ensure size is always sent
            food_price: parseFloat(item.food_price), // Convert to float
            quantity: parseInt(item.quantity, 10), // Convert to integer
        }));
    
        try {
            const response = await axios.post(
                'http://localhost/capstone-react/api/submitOrders.php',
                { items: formattedCartItems }, // Send formatted data
                { headers: { "Content-Type": "application/json" }, withCredentials: true }
            );
    
            console.log("Server Response:", response.data);
    
            if (response.data.success) {
                alert(`Order submitted successfully! Order ID: ${response.data.order_id}`);
                setCartItems([]); // Clear cart after checkout 
            } else {
                alert(`Error: ${response.data.message || "Failed to place order"}`);
            }
        } catch (error) {
            console.error("Error submitting order:", error.response?.data || error.message);
            alert("Failed to submit order. Please try again.");
        }
    };
    
    

    return (
        <div>
            <UserNavbar />
            <div className="flex flex-row bg-[#1C359A] py-10 px-4 md:px-36 mt-32">
                <div className="flex flex-row absolute -mb-42 md:flex-row">
                    <div className="w-40 h-40 shadow-2xl rounded-full bg-white flex items-center justify-center text-[#1C359A] text-2xl md:text-4xl">
                        <span id="userInitials">--</span>
                    </div>
                    <div className="mt-8 md:mt-8 md:ml-4 text-center md:text-left">
                        <h2 className="text-lg md:text-xl text-white font-semibold" id="userName">
                            Loading...
                        </h2>
                        <p className="text-sm text-white" id="userAddress">Loading...</p>
                    </div>
                </div>
                <button
                    id="editProfileBtn"
                    className="md:mt-8 mt-8 md:ml-auto px-4 py-2 bg-white text-black font-bold rounded-md"
                >
                    Edit Profile
                </button>
            </div>

            <div className="container mx-auto pt-6 px-4 md:px-36 flex flex-col md:flex-row w-full">
                <aside className="w-full mt-12 md:w-64 h-auto md:h-screen py-4 flex flex-col space-y-6">
                <nav className="space-y-4">
                        <Link to="/user/account" className="flex items-center space-x-4 text-gray-800 hover:text-blue-600">
                            <span className="font-semibold">User Profile</span>
                        </Link>
                        <Link to="/user/cart" className="flex items-center space-x-4 text-gray-800 hover:text-blue-600">
                            <span className="font-semibold">Cart</span>
                        </Link>
                        <Link to="/user/orderstatus" className="flex items-center space-x-4 text-gray-800 hover:text-blue-600">
                            <span className="font-semibold">Order Status</span>
                        </Link>
                        <Link to="/user/orderhistory" className="flex items-center space-x-4 text-gray-800 hover:text-blue-600">
                            <span className="font-semibold">Order History</span>
                        </Link>
                    </nav>
                    <div className="mt-6">
                        <button className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700">
                            <img src="path-to-sign-out-icon.svg" alt="Sign Out" className="w-5 h-5 mr-2" />
                            SIGN OUT
                        </button>
                    </div>
                </aside>

                <div className="w-full mx-auto bg-white p-6">
                    <form onSubmit={handleSubmit} id="cartForm">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-2">Product Details</th>
                                    <th className="text-center py-2">Quantity</th>
                                    <th className="text-center py-2">Price</th>
                                    <th className="text-center py-2">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.length > 0 ? (cartItems.map((item) => (
                                    <tr key={item.food_id} className="border-b">
                                        <td className="py-4 flex items-center">
                                            <img src={item.image_path} alt={item.food_name} className="w-16 h-16 rounded-md object-cover mr-4" />
                                            <div>
                                                <h3 className="font-semibold">{item.food_name}</h3>
                                            </div>
                                        </td>
                                        <td className="text-center py-4">{item.quantity}</td>
                                        <td className="text-center py-4">₱{item.food_price}</td>
                                        <td className="text-center py-4">₱{(item.food_price * item.quantity)}</td>
                                        <td>
                                            <div>
                                                <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" 
                                                onClick={(e) => {
                                                    e.preventDefault(); // ✅ Prevent form submission
                                                    removeFromCart(item.food_id, item.size); // ✅ Remove by size as well
                                                }}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </td>
                                            
                                    </tr>
                                ))) : (
                                    <tr>
                                        <td className="py-4 flex items-center">
                                            <p className="font-semibold">Your cart is empty</p>
                                        </td>
                                    </tr>
                                  )
                                }
                                
                            </tbody>
                        </table>

                        <div className="mt-6 flex justify-between">
                            <div className="text-lg font-semibold">Total: ₱{totalAmount}</div>
                            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                Proceed to Checkout
                            </button>
                            
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserCart