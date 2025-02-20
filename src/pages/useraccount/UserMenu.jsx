import React, { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../../components/UserNavbar";
import Footer from "../../components/Footer";
import { useCart } from "../../context/CartContext"; // Import context

const UserMenu = () => {
    const { addToCart } = useCart(); // Use context
    const [foodItems, setFoodItems] = useState([]);

    useEffect(() => {
        axios.get("http://localhost/capstone-react/api/getFoodItems.php")
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
        <div className="bg-[#DCDEEA]">
            <UserNavbar />
            <div className="container mx-auto mt-32">
                <h1 className="text-[#1C359A] font-bold text-lg text-center">All Menu</h1>
                <hr className="border-t border-black mx-4 my-2 w-full" />

                <div className="grid grid-cols-3 gap-36 p-5">
                    {foodItems.map(food => (
                        <div key={food.food_id} className="w-72 bg-[#DCDEEA] flex flex-col pt-4 h-auto rounded-lg shadow-lg">
                            <div className="w-full flex justify-center">
                                <img src={food.food_img} alt={food.food_name} className="w-[213px] h-48 rounded-md object-cover" />
                            </div>
                            <div className="bg-white rounded-md h-full w-full mt-4 p-5 flex flex-col">
                                <div className="text-[#1C359A] font-bold">{food.food_name}</div>
                                <div className="text-justify opacity-55">{food.food_description}</div>
                                <div className="flex flex-row-reverse justify-between pt-4 mt-auto items-center">
                                    <div className="price text-sm font-semibold">₱{food.food_price}</div>
                                    <button
                                        onClick={() => addToCart(food)}
                                        className="bg-[#DCDEEA] text-[#1C359A] text-sm font-bold py-2 px-6 rounded flex items-center gap-2"
                                    >
                                        <img src="../img/cart.png" alt="Add Icon" className="w-4 h-4" />
                                        <span>Add</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserMenu
