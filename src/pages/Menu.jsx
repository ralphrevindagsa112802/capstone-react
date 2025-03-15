import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Swal from 'sweetalert2'

const PublicMenu = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://yappari-coffee-bar.shop/api/getMenuItems?category=${selectedCategory}`)
      .then(response => {
        console.log("Raw API Response:", response); // Logs the full response
        if (response.data.success) {
          console.log("Menu Data:", response.data.data); // Logs the menu items
          setFoodItems(response.data.data);
        } else {
          console.error("API Error:", response.data.message);
        }
      })
      .catch(error => console.error("Fetch Error:", error));
  }, [selectedCategory]);  

  // Handler for Add to Cart
  const handleAddToCart = (food) => {
    // Here, since the user is not signed in, redirect them
    Swal.fire({
      title: 'Info!',
      text: 'Please sign up or log in to add items to your cart!',
      icon: 'info',
      confirmButtonText: 'OK',
    }).then(() => {
      setTimeout(() => {
        navigate("/login")
      }, 500);
    }) // Adjust the route as needed
  };

  return (
    <div className="bg-[#DCDEEA]">
      <Navbar/>
      <div className="flex flex-col md:flex-row justify-center items-start w-full py-6 px-4 md:px-14 h-full md:gap-12 md:mt-34 mt-18">
        {/* Small floating up button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-[#1C359A] text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg z-50 hover:bg-blue-800"
          aria-label="Scroll to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>

        {/* Desktop Categories Sidebar */}
        <div className="hidden md:flex w-60 h-auto items-center flex-col p-4">
          <h2 className="text-lg font-bold text-[#1C359A] text-center mb-4">Categories</h2>
          <ul className="space-y-4">
            <li onClick={() => setSelectedCategory("All")}
                className={`flex items-center space-x-3 p-3 shadow rounded-lg hover:bg-blue-100 cursor-pointer 
                ${selectedCategory === "All" ? "bg-blue-300" : "bg-white"}`}>
              <img src="/img/YCB LOGO (BLACK).png" alt="All" className="w-8 h-8 object-contain" />
              <span className="text-sm font-bold">All</span>
            </li>
           
            <li onClick={() => setSelectedCategory("Classic Coffee")}
                className={`flex items-center space-x-3 p-3 shadow rounded-lg hover:bg-blue-100 cursor-pointer 
                ${selectedCategory === "Classic Coffee" ? "bg-blue-300" : "bg-white"}`}>
              <img src="/img/cafeviennaNobg.png" alt="Classic Coffees" className="w-8 h-8 object-contain" />
              <span className="text-sm font-bold">Classic Coffees</span>
            </li>

            <li onClick={() => setSelectedCategory("Frappes")}
                className={`flex items-center space-x-3 p-3 shadow rounded-lg hover:bg-blue-100 cursor-pointer 
                ${selectedCategory === "Frappes" ? "bg-blue-300" : "bg-white"}`}>
                <img src="/img/SMOOTHIES AND FRAPPES/Strawberry Frappe.jpg" alt="Frappes" className="w-8 h-8 object-fill rounded-xl" />
                <span className="text-sm font-bold">Frappes</span>
            </li>

            <li onClick={() => setSelectedCategory("Smoothies")}
                className={`flex items-center space-x-3 p-3 shadow rounded-lg hover:bg-blue-100 cursor-pointer 
                ${selectedCategory === "Smoothies" ? "bg-blue-300" : "bg-white"}`}>
                <img src="/img/SMOOTHIES AND FRAPPES/Strawberry Smoothie.jpg" alt="Smoothies" className="w-8 h-8 object-fill rounded-xl" />
                <span className="text-sm font-bold">Smoothies</span>
            </li>

            <li onClick={() => setSelectedCategory("Refreshers")}
                className={`flex items-center space-x-3 p-3 shadow rounded-lg hover:bg-blue-100 cursor-pointer 
                ${selectedCategory === "Refreshers" ? "bg-blue-300" : "bg-white"}`}>
                <img src="/img/REFRESHERS/BLUE BUTTERFLY PEA LEMONADE ICON.jpg" alt="Refreshers" className="w-8 h-8 object-fill rounded-xl" />
                <span className="text-sm font-bold">Refreshers</span>
            </li>

            <li onClick={() => setSelectedCategory("Milk Drinks")}
                className={`flex items-center space-x-3 p-3 shadow rounded-lg hover:bg-blue-100 cursor-pointer 
                ${selectedCategory === "Milk Drinks" ? "bg-blue-300" : "bg-white"}`}>
                <img src="/img/MILK DRINKS/Mango Milk.jpg" alt="Milk Drinks" className="w-8 h-8 object-fill rounded-xl" />
                <span className="text-sm font-bold">Milk Drinks</span>
            </li>

            <li onClick={() => setSelectedCategory("Rice Meal")}
                className={`flex items-center space-x-3 p-3 shadow rounded-lg hover:bg-blue-100 cursor-pointer 
                ${selectedCategory === "Rice Meal" ? "bg-blue-300" : "bg-white"}`}>
                <img src="/img/porkcurry.jpg" alt="Rice Meals" className="w-8 h-8 object-fill rounded-xl" />
                <span className="text-sm font-bold">Rice Meals</span>
            </li>

            <li onClick={() => setSelectedCategory("Snacks and Pasta")}
                className={`flex items-center space-x-3 p-3 shadow rounded-lg hover:bg-blue-100 cursor-pointer 
                ${selectedCategory === "Snacks and Pasta" ? "bg-blue-300" : "bg-white"}`}>
                <img src="/img/seafoodpasta.jpg" alt="Snacks and Pasta" className="w-8 h-8 object-fill rounded-xl" />
                <span className="text-sm font-bold">Snacks and Pasta</span>
            </li>
          </ul>
        </div>

        {/* Menu section */}
        <div id="best-seller" className="flex flex-col justify-center items-center w-full md:w-[75%] space-y-4">
          <div className="w-full flex flex-col">
            {/* Header with menu and dropdown for mobile */}
            <div className="w-full flex justify-between items-center px-4 py-4 md:h-16 relative">
              <h1 className="text-[#1C359A] font-bold text-lg">All Menu</h1>

              {/* Mobile dropdown button */}
              <div className="relative md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="bg-[#1C359A] text-white font-bold py-2 px-4 rounded flex items-center"
                >
                  Categories <span className="ml-2">▼</span>
                </button>

                {/* Mobile dropdown menu */}
                {isMobileMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 w-64 bg-white rounded-lg shadow-lg z-50">
                    <h2 className="text-lg font-bold text-[#1C359A] text-center py-2 border-b">Categories</h2>
                    <ul className="p-2">
                      <li onClick={() => {
                        setSelectedCategory("All");
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-100 cursor-pointer 
                        ${selectedCategory === "All" ? "bg-blue-300" : "bg-white"}`}>
                        <img src="/img/YCB LOGO (BLACK).png" alt="All" className="w-6 h-6 object-contain" />
                        <span className="text-sm font-bold">All</span>
                      </li>

                      <li onClick={() => {
                        setSelectedCategory("Classic Coffee");
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-100 cursor-pointer 
                        ${selectedCategory === "Classic Coffee" ? "bg-blue-300" : "bg-white"}`}>
                        <img src="/img/cafeviennaNobg.png" alt="Classic Coffees" className="w-6 h-6 object-contain" />
                        <span className="text-sm font-bold">Classic Coffees</span>
                      </li>

                      <li onClick={() => {
                        setSelectedCategory("Frappes");
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-100 cursor-pointer 
                        ${selectedCategory === "Frappes" ? "bg-blue-300" : "bg-white"}`}>
                        <img src="/img/SMOOTHIES AND FRAPPES/Strawberry Frappe.jpg" alt="Frappes" className="w-6 h-6 object-fill rounded-xl" />
                        <span className="text-sm font-bold">Frappes</span>
                      </li>

                      <li onClick={() => {
                        setSelectedCategory("Smoothies");
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-100 cursor-pointer 
                        ${selectedCategory === "Smoothies" ? "bg-blue-300" : "bg-white"}`}>
                        <img src="/img/SMOOTHIES AND FRAPPES/Strawberry Smoothie.jpg" alt="Smoothies" className="w-6 h-6 object-fill rounded-xl" />
                        <span className="text-sm font-bold">Smoothies</span>
                      </li>

                      <li onClick={() => {
                        setSelectedCategory("Refreshers");
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-100 cursor-pointer 
                        ${selectedCategory === "Refreshers" ? "bg-blue-300" : "bg-white"}`}>
                        <img src="/img/REFRESHERS/BLUE BUTTERFLY PEA LEMONADE ICON.jpg" alt="Refreshers" className="w-6 h-6 object-fill rounded-xl" />
                        <span className="text-sm font-bold">Refreshers</span>
                      </li>

                      <li onClick={() => {
                        setSelectedCategory("Milk Drinks");
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-100 cursor-pointer 
                        ${selectedCategory === "Milk Drinks" ? "bg-blue-300" : "bg-white"}`}>
                        <img src="/img/MILK DRINKS/Mango Milk.jpg" alt="Milk Drinks" className="w-6 h-6 object-fill rounded-xl" />
                        <span className="text-sm font-bold">Milk Drinks</span>
                      </li>

                      <li onClick={() => {
                        setSelectedCategory("Rice Meal");
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-100 cursor-pointer 
                        ${selectedCategory === "Rice Meal" ? "bg-blue-300" : "bg-white"}`}>
                        <img src="/img/porkcurry.jpg" alt="Rice Meals" className="w-6 h-6 object-fill rounded-xl" />
                        <span className="text-sm font-bold">Rice Meals</span>
                      </li>

                      <li onClick={() => {
                        setSelectedCategory("Snacks and Pasta");
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-100 cursor-pointer 
                        ${selectedCategory === "Snacks and Pasta" ? "bg-blue-300" : "bg-white"}`}>
                        <img src="/img/seafoodpasta.jpg" alt="Snacks and Pasta" className="w-6 h-6 object-fill rounded-xl" />
                        <span className="text-sm font-bold">Snacks and Pasta</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Desktop cart icon */}
              <div className="hidden md:block relative z-10">
                <img src="/img/cart.png" alt="Cart" className="h-6 w-6"/>
              </div>

              {/* Mobile cart icon */}
              <div className="md:hidden">
                <img src="/img/cart.png" alt="Cart" className="h-6 w-6"/>
              </div>
            </div>
            <hr className="border-t border-black mx-4 my-2 w-auto"/>
            
            {/* Responsive grid for food items */}
            <div className="container-fluid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 p-2">
              {foodItems
                .filter(food => selectedCategory === "All" || food.category === selectedCategory)
                .flatMap(food => {
                  // Create an array to hold only available sizes
                  const availableSizes = [];
                  
                  if (food.availability_small === "Available") {
                    availableSizes.push({ size: "Small", price: food.price_small });
                  }
                  if (food.availability_medium === "Available") {
                    availableSizes.push({ size: "Medium", price: food.price_medium });
                  }
                  if (food.availability_large === "Available") {
                    availableSizes.push({ size: "Large", price: food.price_large });
                  }

                  // If no sizes are available, exclude this item
                  if (availableSizes.length === 0) return [];

                  return [{ ...food, availableSizes }];
                })
                .map(food => (
                  <div key={food.food_id} className="w-full bg-[#DCDEEA] flex flex-col pt-4 h-auto rounded-lg shadow-lg">
                                    <div className="w-full flex flex-wrap justify-center gap-4">
                                    <img src={food.image_path} alt={food.food_name} className="w-[213px] h-48 rounded-md object-cover"/>
                    </div>
                    <div className="bg-white rounded-md w-full mt-4 p-5 flex flex-col h-full">
                    <div className="text-[#1C359A] font-bold flex">{food.food_name}</div>
                      <div className="text-justify opacity-55">{food.description}</div>
                      <div className="mt-auto pt-4">
                      <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold">₱{food.price_small}</span>
                              <button 
                                  onClick={handleAddToCart} // Open the popup
                                  className="bg-[#DCDEEA] text-[#1C359A] text-sm font-bold py-2 px-6 rounded flex items-center gap-2 hover:bg-gray-300 cursor-pointer">
                                  <img src="/img/cart.png" alt="Add Icon" className="w-4 h-4"/>
                                  <span>Add</span>
                              </button>
                          </div>

                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>

      <Footer />
      
    </div>
  );
};

export default PublicMenu;
