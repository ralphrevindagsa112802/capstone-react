import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import axios from "axios";
import UserNavbar from "../../components/UserNavbar";
import Footer from "../../components/Footer";

const UserCart = () => {
    const { cartItems, setCartItems } = useCart();
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const total = cartItems.reduce((sum, item) => sum + item.food_price * item.quantity, 0);
        setTotalAmount(total);
    }, [cartItems]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const items = cartItems.map(item => ({
            food_id: item.food_id, // Correct JSON key
            quantity: item.quantity,
            price: item.food_price
        }));

        console.log("Sending data:", { items });

        try {
            const response = await axios.post(
                "http://localhost/capstone-react/api/submitOrders.php",
                JSON.stringify({ items }),
                { headers: { "Content-Type": "application/json" }, withCredentials: true }
            );

            if (response.data.success) {
                alert(`Order submitted! Order ID: ${response.data.order_id}`);
                setCartItems([]); // Clear cart
            } else {
                alert(`Error: ${response.data.message}`);
            }
        } catch (error) {
            console.error("Error submitting order:", error);
            alert("Failed to submit order. Please try again.");
        }
    };

    return (
        <div>
            <UserNavbar />
            <div className="container mx-auto pt-6 px-4 md:px-36">
                <h1 className="text-lg font-bold">Your Cart</h1>
                <hr />

                <form onSubmit={handleSubmit}>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-2">Product</th>
                                <th className="text-center py-2">Quantity</th>
                                <th className="text-center py-2">Price</th>
                                <th className="text-center py-2">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.food_id} className="border-b">
                                    <td className="py-4">{item.food_name}</td>
                                    <td className="text-center py-4">{item.quantity}</td>
                                    <td className="text-center py-4">₱{item.food_price}</td>
                                    <td className="text-center py-4">₱{item.food_price * item.quantity}</td>
                                </tr>
                            ))}
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
            <Footer />
        </div>
    );
};

export default UserCart
