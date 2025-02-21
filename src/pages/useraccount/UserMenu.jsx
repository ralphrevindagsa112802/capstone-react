import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserNavbar from "../../components/UserNavbar";
import Footer from "../../components/Footer";
import { CartContext } from "../../context/CartContext"; // Import context
import MenuPopup from "../../components/MenuPopUp"; // Import the new popup component

const UserMenu = () => {
    const { cartItems, addToCart } = useContext(CartContext); // Use context
    const [foodItems, setFoodItems] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null); // Track selected food item

    useEffect(() => {
        axios.get('http://localhost/capstone-react/api/getFoodItems.php')
            .then(response => {
                if (response.data.success) {
                    setFoodItems(response.data.data);
                } else {
                    console.error(response.data.message);
                }
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div className='bg-[#DCDEEA]'>
            <UserNavbar />
            <div className="flex mt-32">
                <div className="ml-8 w-60 h-screen p-4">
                    <h2 className="text-lg font-bold text-[#1C359A] text  -center mb-4">Categories</h2>
    
                    
                    <ul className="space-y-3">
                    <li className="flex items-center space-x-3 p-3 bg-white shadow rounded-lg hover:bg-blue-100 cursor-pointer">
                        <img src="../img/YCB LOGO (BLACK).png" alt="All" className="w-8 h-8 object-contain" />
                        <span className="text-sm font-bold">All</span>
                    </li>
                    <li className="flex items-center space-x-3 p-3 bg-white shadow rounded-lg hover:bg-blue-100 cursor-pointer">
                        <img src="../img/cafeviennaNobg.png" alt="classic Coffees" className="w-8 h-8 object-contain" />
                        <span className="text-sm font-bold">Classic Coffees</span>
                    </li>
                    <li className="flex items-center space-x-3 p-3 bg-white shadow rounded-lg hover:bg-blue-100 cursor-pointer">
                        <img src="../img/SMOOTHIES AND FRAPPES/Strawberry Frappe.jpg" alt="Frappes" className="w-8 h-8 object-fill rounded-xl	" />
                        <span className="text-sm font-bold">Frappes</span>
                    </li>
                    <li className="flex items-center space-x-3 p-3 bg-white shadow rounded-lg hover:bg-blue-100 cursor-pointer">
                        <img src="../img/SMOOTHIES AND FRAPPES/Strawberry Smoothie.jpg" alt="Smoothies" className="w-8 h-8 object-fill rounded-xl" />
                        <span className="text-sm font-bold">Smoothies</span>
                    </li>
                    <li className="flex items-center space-x-3 p-3 bg-white shadow rounded-lg hover:bg-blue-100 cursor-pointer">
                        <img src="../img/REFRESHERS/BLUE BUTTERFLY PEA LEMONADE ICON.jpg" alt="Refreshers" className="w-8 h-8 object-fill rounded-xl" />
                        <span className="text-sm font-bold">Refreshers</span>
                    </li>
                    <li className="flex items-center space-x-3 p-3 bg-white shadow rounded-lg hover:bg-blue-100 cursor-pointer ">
                        <img src="../img/MILK DRINKS/Mango Milk.jpg" alt="Milk Drinks" className="w-8 h-8 object-fill rounded-xl" />
                        <span className="text-sm font-bold">Milk Drinks</span>
                    </li>
                    <li className="flex items-center space-x-3 p-3 bg-white shadow rounded-lg hover:bg-blue-100 cursor-pointer">
                        <img src="../img/porkcurry.jpg" alt="Rice Meals" className="w-8 h-8 object-fill rounded-xl" />
                        <span className="text-sm font-bold">Rice Meals</span>
                    </li>
                    <li className="flex items-center space-x-3 p-3 bg-white shadow rounded-lg hover:bg-blue-100 cursor-pointer">
                        <img src="../img/seafoodpasta.jpg" alt="Snacks & Pasta" className="w-8 h-8 object-fill rounded-xl" />
                        <span className="text-sm font-bold">Snacks & Pasta</span>
                    </li>
                    </ul>
                </div>
    
                <div id="best-seller" className="w-full flex flex-col space-y-4 mt-4 py">
                    <div className="w-3/4 flex flex-col ml-9">
                        <div className="w-full h-16 flex justify-between items-center px-4 relative">
                        <h1 className="text-[#1C359A] font-bold text-lg">All Menu</h1>
                        <div className="relative z-10">
                            <img src="../img/cart.png" alt="Cart" className="h-6 w-6"/>
                        </div>
                        </div>
    
                        <hr className="border-t border-black mx-4 my-2 w-full"/>
    
                        {/* 🔹 Make the cards display in a row */}
                        <div className="container-fluid grid grid-cols-3 gap-36 p-5">
    
                        {/* 🔹Fetch Food Items */}
                        {foodItems.map(food => (
    
                            <div key={food.food_id} className="w-72 bg-[#DCDEEA] flex flex-col pt-4 h-auto rounded-lg shadow-lg">
                                <div className="w-full flex flex-wrap justify-center gap-4">
                                    <img src={food.food_img} alt="" className="w-[213px] h-48 rounded-md object-cover"/>
                                </div>
                                <div className="bg-white rounded-md h-full w-full mt-4 p-5 flex flex-col"> 
                                    <div className="text-[#1C359A] font-bold flex">{food.food_name}</div>
                                    <div className="text-justify opacity-55">{food.food_description}</div>
                                    <div className="flex flex-row-reverse justify-between pt-4 mt-auto items-center">
                                        <div className="price text-sm font-semibold">₱{food.food_price}</div>
                                            <button onClick={() => setSelectedFood(food)} // Open PopUp
                                            className="bg-[#DCDEEA] text-[#1C359A] text-sm font-bold py-2 px-6 rounded flex items-center gap-2 hover:bg-gray-300 cursor-pointer">
                                        <img src="../img/cart.png" alt="Add Icon" className="w-4 h-4"/>
                                        <span>Add</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        </div> {/* 🔹 End of row container */}
                    </div>
                </div>
    
            
        </div>        
            <Footer />

             {/* Render MenuPopup if a food item is selected */}
             {selectedFood && (
                <MenuPopup 
                    food={selectedFood} 
                    onClose={() => setSelectedFood(null)} 
                    onAddToCart={(food) => {
                        addToCart({...food, quantity: 1});
                        setSelectedFood(null);
                    }} 
                />
            )}
        </div>
      )
    }
    
    export default UserMenu
