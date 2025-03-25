import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingCart, Trash2, X } from 'lucide-react';
import Swal from 'sweetalert2';

const PopupCart = ({ isOpen, onClose, onUpdateCartItems }) => {
    const { cartItems, removeFromCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        // When cart items change, update the parent component
        onUpdateCartItems(cartItems);
    }, [cartItems, onUpdateCartItems]);
    
    // Calculate total amount
    useEffect(() => {
        const total = cartItems.reduce((sum, item) => sum + Number(item.food_price) * item.quantity, 0);
        setTotalAmount(total);
    }, [cartItems]);

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Your cart is empty!',
                confirmButtonColor: '#1C359A'
            });
            return;
        }

        // Save order details before navigating to checkout
        localStorage.setItem("checkoutOrder", JSON.stringify(cartItems));
        localStorage.setItem("totalAmount", totalAmount);

        // Close popup and navigate to checkout
        onClose();
        navigate("/user/checkout");
    };

    // Prevent rendering if not open
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div 
                key="popup-cart"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 20 
                }}
                className="fixed bottom-4 right-4 left-4 sm:left-auto sm:w-96 z-50 bg-white shadow-2xl rounded-xl border border-gray-200 overflow-hidden max-w-md mx-auto"
                style={{ 
                    backgroundColor: 'white', 
                    borderColor: '#1C359A20' 
                }}
            >
                {/* Header */}
                <div 
                    className="bg-[#1C359A] text-white p-4 flex justify-between items-center"
                    style={{ 
                        backgroundColor: '#1C359A', 
                        transition: 'background-color 0.3s ease' 
                    }}
                >
                    <div className="flex items-center space-x-2">
                        <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                        <h2 className="text-base sm:text-lg font-bold">Your Cart</h2>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="text-white hover:bg-blue-700 p-1 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                </div>

                {/* Empty Cart State */}
                {cartItems.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="p-4 sm:p-6 text-center"
                    >
                        <div className="text-gray-300 text-4xl sm:text-6xl mb-2 sm:mb-4">
                            <ShoppingCart className="mx-auto w-12 h-12 sm:w-20 sm:h-20" strokeWidth={1} />
                        </div>
                        <p className="font-semibold text-lg sm:text-xl text-gray-700">Your cart is empty</p>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">Add some delicious items to get started!</p>
                    </motion.div>
                ) : (
                    <>
                        {/* Cart Items */}
                        <div className="max-h-60 sm:max-h-80 overflow-y-auto">
                            <AnimatePresence mode="popLayout">
                                {cartItems.map((item) => (
                                    <motion.div 
                                        key={`${item.food_id}-${item.size}`}
                                        layout
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        transition={{ 
                                            type: "tween",
                                            duration: 0.2
                                        }}
                                        className="flex items-center p-3 sm:p-4 border-b hover:bg-gray-50 transition-colors"
                                    >
                                        <img 
                                            src={item.image_path} 
                                            alt={item.food_name} 
                                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover mr-3 sm:mr-4 shadow-md" 
                                        />
                                        <div className="flex-grow">
                                            <h3 className="font-bold text-[#1C359A] text-sm sm:text-base">{item.food_name}</h3>
                                            <p className="text-xs sm:text-sm text-gray-600">
                                                {item.size} | Qty: {item.quantity}
                                            </p>
                                            <p className="text-xs sm:text-sm font-bold text-green-600">
                                                ₱{(item.food_price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                        <button 
                                            onClick={() => removeFromCart(item.food_id, item.size)}
                                            className="text-red-500 hover:text-red-700 transition-colors ml-2"
                                        >
                                            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Total and Actions */}
                        <div className="p-3 sm:p-4 bg-gray-50 border-t">
                            <div className="flex justify-between mb-3 sm:mb-4">
                                <span className="text-base sm:text-lg font-semibold text-gray-700">Total:</span>
                                <span className="text-base sm:text-lg font-bold text-[#1C359A]">₱{totalAmount.toFixed(2)}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                <Link 
                                    to="/user/cart" 
                                    onClick={onClose}
                                    className="text-center bg-gray-200 text-gray-700 py-2 sm:py-3 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center space-x-2 text-xs sm:text-base"
                                >
                                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span>View Cart</span>
                                </Link>
                                <button 
                                    onClick={handleCheckout}
                                    className="bg-[#1C359A] text-white py-2 sm:py-3 rounded-lg hover:bg-blue-800 transition-colors flex items-center justify-center space-x-2 text-xs sm:text-base"
                                >
                                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span>Checkout</span>
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </motion.div>
        </AnimatePresence>
    );
};

export default PopupCart;