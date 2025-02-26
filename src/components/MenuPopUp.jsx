import { useState } from "react";

const MenuPopup = ({ food, onClose, onAddToCart }) => {
  
  if (!food) return null;

  // Define size options and corresponding prices
  const sizeLabels = {
    "Rice Meal": { small: "Regular", medium: "Large", large: "Extra Large" },
    "Classic Coffee": { small: "Small", medium: "Medium", large: "Large" },
    "Frappes": { small: "Small", medium: "Medium", large: "Large" },
    "Smoothies": { small: "Small", medium: "Medium", large: "Large" },
    "Refreshers": { small: "Small", medium: "Medium", large: "Large" },
    "Milk Drinks": { small: "Small", medium: "Medium", large: "Large" },
    "Dessert": { small: "Regular" }, // Only has one size
    "Snacks and Pasta": { small: "Regular", medium: "Large", large: "Extra Large" }
  };
  
  // Get category-specific labels or default to generic
  const labels = sizeLabels[food.category] || { small: "Small", medium: "Medium", large: "Large" };
  
  const sizeOptions = [];
  if (food.availability_small === "Available") {
    sizeOptions.push({ size: labels.small, price: food.price_small });
  }
  if (food.availability_medium === "Available") {
    sizeOptions.push({ size: labels.medium, price: food.price_medium });
  }
  if (food.availability_large === "Available") {
    sizeOptions.push({ size: labels.large, price: food.price_large });
  }

  const [selectedSize, setSelectedSize] = useState(sizeOptions[0]?.size || labels.small);
  const [selectedPrice, setSelectedPrice] = useState(sizeOptions[0]?.price || food.price_small);


  const handleSizeChange = (e) => {
    const newSize = e.target.value;
    const newPrice = sizeOptions.find(option => option.size === newSize)?.price || food.price_small;
    
    setSelectedSize(newSize);
    setSelectedPrice(newPrice);
  };
  

  const handleAddToCart = () => {
    onAddToCart({ ...food, size: selectedSize, food_price: selectedPrice, quantity: 1 });
    alert(`${food.food_name} (${selectedSize}) added to your cart for ₱${selectedPrice}!`);
    onClose();
  };

  return (
    <div className=" fixed inset-0 bg-opacity-50 backdrop-blur-xs flex w-full justify-center items-center z-[50] ">
      <div className="bg-white rounded-lg p-6 w-2/3 h-2/3">
        <button onClick={onClose} className="text-[#1C359A] text-sm mb-2">← Back</button>

        <div className="grid grid-cols-2 gap-10">
          <img src={food.image_path} className="w-full h-96 object-cover rounded-lg" alt={food.food_name} />
          <div className="">
            <h3 className="text-xl font-bold text-[#1C359A] underline">{food.food_name}</h3>
            <p className="text-gray-600 text-sm">{food.description}</p>

            {/* Size Selection */}
            <div className="mt-4">
              <span className="text-[#1C359A] font-bold">Size:</span>
              <select value={selectedSize} onChange={handleSizeChange} className="block w-full p-2 mt-1 border rounded">
                {sizeOptions.map((option) => (
                  <option key={option.size} value={option.size}>{option.size}</option>
                ))}
              </select>
            </div>

            {/* Display updated price */}
            <div className="mt-4">
              <span className="text-[#1C359A] font-bold">Price:</span>
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
