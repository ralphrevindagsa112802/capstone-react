import React from "react";

const MenuPopup = ({ food, onClose, onAddToCart }) => {
  if (!food) return null;

  const handleAddToCart = () => {
    onAddToCart(food);
    alert(`${food.food_name} has been added to your cart!`); // ✅ Alert after adding to cart
    onClose(); // Close popup after adding to cart
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#DCDEEA] rounded-lg p-6 w-2/3 h-2/3 shadow-2xl">
        <button onClick={onClose} className="text-gray-500 text-sm mb-2">← Back</button>

        <div className="grid grid-cols-2 gap-4">
          <img src={food.food_img} className="w-full h-40 object-cover rounded-lg" alt={food.food_name} />
          <div>
            <h3 className="text-xl font-bold">{food.food_name}</h3>
            <p className="text-gray-600 text-sm">{food.food_description}</p>

            <div className="mt-2">
              <span className="font-bold">Price:</span>
              <p className="text-lg">₱{food.food_price}</p>
            </div>

            <button 
              onClick={handleAddToCart} 
              className="bg-blue-600 text-white px-4 py-2 mt-4 rounded-md w-full"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPopup
