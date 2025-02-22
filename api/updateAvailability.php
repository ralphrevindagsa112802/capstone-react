<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include "db.php"; // Ensure this file correctly connects to your DB

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['food_id']) && isset($data['availability'])) {
    $food_id = $data['food_id'];
    $availability = $data['availability'];

    $query = "UPDATE food SET availability = '$availability' WHERE food_id = $food_id";
    if (mysqli_query($conn, $query)) {
        echo json_encode(["message" => "Availability updated"]);
    } else {
        echo json_encode(["error" => mysqli_error($conn)]);
    }
} else {
    echo json_encode(["error" => "Invalid input"]);
}
?>




admin availability menu

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import axios from "axios";

const MenuTable = ({ menuItems, updateAvailability }) => {
    const [dropdownOpen, setDropdownOpen] = useState(null);

    const toggleDropdown = (id) => {
        setDropdownOpen(dropdownOpen === id ? null : id);
    };

    const handleAvailabilityChange = async (id, status) => {
        console.log(`Updating availability for ID ${id} to ${status}`); // Debugging log
        await updateAvailability(id, status);
        setDropdownOpen(null); // Close dropdown after selection
    };

    return (
        <div className="p-2 w-full mt-6 rounded-2xl">
            <table className="w-full bg-white opacity-90 rounded-2xl">
                <thead>
                    <tr className="border-t border-4 border-[#DCDEEA]">
                        <th className="p-3 text-left text-[#808080]">
                            <input type="checkbox" />
                        </th>
                        <th className="px-4 py-2 text-left text-sm text-[#808080]">Name</th>
                        <th className="px-4 py-2 text-left text-sm text-[#808080]">Category</th>
                        <th className="px-4 py-2 text-left text-sm text-[#808080]">Price</th>
                        <th className="px-4 py-2 text-left text-sm text-[#808080]">Size</th>
                        <th className="px-4 py-2 text-left text-sm text-[#808080]">Availability</th>
                        <th className="px-4 py-2 text-left text-sm text-[#808080]">Description</th>
                        <th className="px-4 py-2 text-left text-sm text-[#808080]">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {menuItems.length > 0 ? (
                        menuItems.map((item) => (
                            <tr key={item.food_id} className="border-t border-4 border-[#DCDEEA] hover:bg-gray-100">
                                <td className="p-3">
                                    <input type="checkbox" />
                                </td>
                                <td className="px-4 py-2">{item.food_name}</td>
                                <td className="px-4 py-2">{item.category}</td>
                                <td className="px-4 py-2">₱{item.food_price}</td>
                                <td className="px-4 py-2">{item.food_size}</td>
                                <td className="px-4 py-2 font-bold text-blue-700">{item.availability}</td>
                                <td className="px-4 py-2">{item.food_description}</td>
                                <td className="px-4 py-2 relative">
                                    <button onClick={() => toggleDropdown(item.food_id)} className="p-2">
                                        <FaEllipsisV />
                                    </button>
                                    {dropdownOpen === item.food_id && (
                                        <div className="absolute right-0 bg-white border rounded shadow-lg w-36">
                                            <button
                                                onClick={() => handleAvailabilityChange(item.food_id, "Available")}
                                                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                            >
                                                Available
                                            </button>
                                            <button
                                                onClick={() => handleAvailabilityChange(item.food_id, "Not Available")}
                                                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                            >
                                                Not Available
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="border px-4 py-2 text-center text-gray-500">
                                No menu items available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

const AdminMenu = () => {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = () => {
        axios
            .get("http://localhost/capstone-react/api/getMenuItems.php")
            .then((response) => setMenuItems(response.data))
            .catch((error) => console.error("Error fetching menu items:", error));
    };

    const updateAvailability = async (id, status) => {
        try {
            const response = await axios.post("http://localhost/capstone-react/api/updateAvailability.php", {
                food_id: id,
                availability: status,
            });

            console.log("API Response:", response.data); // Debugging log
            fetchMenuItems(); // Refresh menu items after updating availability
        } catch (error) {
            console.error("Error updating availability:", error);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-[#DCDEEA]">
            {/* Navbar */}
            <div className="w-full flex items-center justify-between py-4 px-12 shadow-md bg-white">
                <div className="flex items-center">
                    <img className="h-20 w-auto" src="../img/YCB LOGO (BLUE).png" alt="Logo" />
                </div>
                <div className="text-xl text-[#1C359A] font-bold">Admin</div>
            </div>

            {/* Sidebar & Main Content */}
            <div className="flex flex-row h-full">
                {/* Sidebar */}
                <div className="w-64 bg-white shadow-md h-full flex flex-col p-4">
                    <nav className="flex flex-col space-y-4">
                        <Link to="/admin/dashboard" className="font-bold p-3 hover:bg-gray-200 text-gray-800">
                            Orders
                        </Link>
                        <Link to="/admin/menu" className="font-bold p-3 hover:bg-gray-200 text-gray-800">
                            Menu
                        </Link>
                    </nav>
                    <button className="mt-20 font-bold bg-[#1C359A] text-white px-4 py-2 rounded-lg hover:bg-blue-800">
                        SIGN OUT
                    </button>
                </div>

                {/* Main Content */}
                <div className="flex-1 w-full p-6 overflow-auto bg-[#DCDEEA]">
                    <div className="w-full flex justify-between">
                        <div className="text-[#1C359A] text-lg font-bold">Order Management</div>
                    </div>

                    {/* Menu Table */}
                    <MenuTable menuItems={menuItems} updateAvailability={updateAvailability} />
                </div>
            </div>
        </div>
    );
};

export default AdminMenu;
