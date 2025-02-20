import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import UserNavbar from '../../components/UserNavbar';
import Footer from '../../components/Footer';

const UserCart = ({ setCartItems }) => {
    const location = useLocation();
    const cartItems = location.state?.cartItems || [];
    const [totalAmount, setTotalAmount] = useState(0);

    // Calculate total amount whenever cartItems change
    useEffect(() => {
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalAmount(total);
    }, [cartItems]);

    // Handle order submission
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Transform cartItems to match backend expectations
        const items = cartItems.map(item => ({
            foods_id: item.food_id, // Ensure this matches PHP expectation
            quantity: item.quantity,
            price: item.food_price
        }));
        
        console.log("Data being sent:", { items }); // Add this line
        try {
            const response = await axios.post(
                'http://localhost/capstone-react/api/submitOrders.php',
                { items },
                { withCredentials: true }
            );
            if (response.data.success) {
                alert(`Order submitted! Order ID: ${response.data.order_id}`);
                setCartItems([]); // Clear the cart after successful submission
            } else {
                alert(`Error: ${response.data.message}`);
            }
        } catch (error) {
            console.error('Error submitting order:', error);
            alert('Failed to submit order. Please try again.');
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
                        <a id="profile" href="UserAccount.jsx" className="flex items-center space-x-4">
                            <img src="path-to-user-profile-icon.svg" alt="User Profile" className="w-6 h-6" />
                            <span className="font-semibold">User profile</span>
                        </a>
                        <a id="cart" href="cart.html" className="flex items-center space-x-4 text-gray-800 hover:text-blue-600">
                            <img src="path-to-cart-icon.svg" alt="Cart" className="w-6 h-6" />
                            <span className="font-semibold">Cart</span>
                        </a>
                        <a id="orderstatus" href="orderstatus.html" className="flex items-center space-x-4 text-gray-800 hover:text-blue-600">
                            <img src="path-to-order-status-icon.svg" alt="Order Status" className="w-6 h-6" />
                            <span className="font-semibold">Order status</span>
                        </a>
                        <a id="orderhistory" href="orderhistory.html" className="flex items-center space-x-4 text-gray-800 hover:text-blue-600">
                            <img src="path-to-order-history-icon.svg" alt="Order History" className="w-6 h-6" />
                            <span className="font-semibold">Order History</span>
                        </a>
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
                            <tbody id="cartTableBody">
                                {cartItems.map((item) => (
                                    <tr key={item.id} className="border-b">
                                        <td className="py-4">
                                            <div className="flex items-center">
                                                <img src={item.image_url} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
                                                <div className="ml-4">
                                                    <h3 className="font-semibold">{item.name}</h3>
                                                    <p className="text-sm text-gray-600">{item.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-center py-4">{item.quantity}</td>
                                        <td className="text-center py-4">₱{item.price.toFixed(2)}</td>
                                        <td className="text-center py-4">₱{(item.price * item.quantity).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="mt-6 flex justify-between items-center">
                            <div className="text-lg font-semibold">Total: ₱{totalAmount.toFixed(2)}</div>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
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