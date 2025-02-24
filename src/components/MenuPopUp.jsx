import React, { useState } from "react";

const MenuPopup = ({ food, onClose, onAddToCart }) => {
  if (!food) return null;

  // Define size options and corresponding prices
  const sizeOptions =
    food.category === "Rice Meal"
      ? [{ size: "Regular", price: food.price_small }, { size: "Large", price: food.price_large }]
      : food.category === "Drink"
      ? [{ size: "Small", price: food.price_small }, { size: "Medium", price: food.price_medium }, { size: "Large", price: food.price_large }]
      : food.category === "Dessert"
      ? [{ size: "Regular", price: food.price_small }]
      : [];

  const [selectedSize, setSelectedSize] = useState(sizeOptions[0]?.size || "Regular");
  const [selectedPrice, setSelectedPrice] = useState(sizeOptions[0]?.price || food.food_price);

  const handleSizeChange = (e) => {
    const newSize = e.target.value;
    const newPrice = sizeOptions.find((option) => option.size === newSize)?.price || food.food_price;
    setSelectedSize(newSize);
    setSelectedPrice(newPrice);
  };

  const handleAddToCart = () => {
    onAddToCart({ ...food, size: selectedSize, food_price: selectedPrice, quantity: 1 });
    alert(`${food.food_name} (${selectedSize}) added to your cart for ₱${selectedPrice}!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-blend-hue bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#DCDEEA] rounded-lg p-6 w-2/3 h-auto">
        <button onClick={onClose} className="text-gray-500 text-sm mb-2">← Back</button>

        <div className="grid grid-cols-2 gap-4">
          <img src={food.image_path} className="w-full h-40 object-cover rounded-lg" alt={food.food_name} />
          <div>
            <h3 className="text-xl font-bold">{food.food_name}</h3>
            <p className="text-gray-600 text-sm">{food.food_description}</p>

            {/* Size Selection */}
            <div className="mt-2">
              <span className="font-bold">Size:</span>
              <select value={selectedSize} onChange={handleSizeChange} className="block w-full p-2 mt-1 border rounded">
                {sizeOptions.map((option) => (
                  <option key={option.size} value={option.size}>{option.size}</option>
                ))}
              </select>
            </div>

            {/* Display updated price */}
            <div className="mt-2">
              <span className="font-bold">Price:</span>
              <p className="text-lg">₱{selectedPrice}</p>
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

export default MenuPopup;
