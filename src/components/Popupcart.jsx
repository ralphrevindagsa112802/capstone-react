import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingCart, X } from 'lucide-react';

const PopupCart = ({ isOpen, onClose, onUpdateCartItems }) => {
    const { cartItems } = useContext(CartContext);

    useEffect(() => {
        // When cart items change, update the parent component
        onUpdateCartItems(cartItems);
    }, [cartItems, onUpdateCartItems]);

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
                className="fixed bottom-4 right-4 left-4 sm:left-auto sm:w-96 z-45 bg-white shadow-2xl rounded-xl border border-gray-200 overflow-hidden max-w-md mx-auto"
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
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* View Cart Action */}
                        <div className="p-3 sm:p-4 bg-gray-50 border-t">
                            <Link 
                                to="/user/cart" 
                                onClick={onClose}
                                className="w-full text-center bg-[#1C359A] text-white py-2 sm:py-3 rounded-lg hover:bg-blue-800 transition-colors flex items-center justify-center space-x-2 text-xs sm:text-base"
                            >
                                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span>View Cart</span>
                            </Link>
                        </div>
                    </>
                )}
            </motion.div>
        </AnimatePresence>
    );
};

export default PopupCart;