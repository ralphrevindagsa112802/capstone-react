import React from "react";
import { useState} from "react";
import Swal from "sweetalert2";

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
    Swal.fire("Success", `${food.food_name} (${selectedSize}) added to your cart for ₱${selectedPrice}!`, "success", {timer: 3000});
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-xs flex w-full justify-center items-center z-[50] p-4">
      <div className="bg-white rounded-lg p-4 md:p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} data-testid='back-button' className="text-[#1C359A] text-sm mb-2">← Back</button>

        {/* Change from grid to flex column on mobile, grid on larger screens */}

        <div className="flex flex-col md:grid md:grid-cols-2 md:gap-10">
          <img src={food.image_path}
            className="w-full h-48 sm:h-64 md:h-96 object-cover rounded-lg"
            alt={food.food_name} />
          <div className="mt-4 md:mt-0">
            <h3 className="text-xl font-bold text-[#1C359A] underline">{food.food_name}</h3>
            <p className="text-gray-600 text-sm mt-2">{food.description}</p>
            {food.allergen && (
              <div className="bg-[#DCDEEA] border-l-4 border-[#1C359A] text-black p-2 rounded-md mt-2">
                <h3 className="font-semibold text-xs">Ingredient Notice</h3>
                <p className="text-xs italic">Contains: {food.allergen}</p>
              </div>
            )}
            {/* Size Selection */}
            <div className="mt-4">
              <span className="text-[#1C359A] font-bold">Size:</span>
              <select value={selectedSize} onChange={handleSizeChange} className="block w-full p-2 mt-1 border rounded">
                {sizeOptions.map((option) => (
                  <option key={option.size} data-testid='combobox' value={option.size}>{option.size}</option>
                ))}
              </select>
            </div>

            {/* Display updated price */}
            <div className="mt-4">
              <span className="text-[#1C359A] font-bold">Price:</span>
              <p className="text-lg" data-testid='price'>₱{selectedPrice}</p>
            </div>

            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-4 py-2 mt-4 rounded-md w-full"
              data-testid='add-to-cart'
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
