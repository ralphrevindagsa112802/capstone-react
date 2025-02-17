import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';

const UserNavbar = () => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);
    const [user, setUser] = useState(null); // Store user data

    // Function to toggle dropdown
    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    // Close dropdown if clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownVisible(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    // Fetch user data from the backend
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost/capstone-react/api/user.php", {
                    method: "GET",
                    credentials: "include", // Important for sessions
                    headers: { "Content-Type": "application/json" }
                });
    
                if (!response.ok) throw new Error("Failed to fetch user data");
    
                const data = await response.json();
                console.log("User Data:", data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
    
        fetchUserData();
    }, []);
    
    

    return (
        <div>
            <nav className="bg-white shadow-md fixed top-0 z-100 w-full">
                <div className="container mx-auto flex items-center justify-between py-6 px-12">

                    <div className="flex items-center justify-center md:justify-start w-full md:w-auto">
                        <img src="../img/YCB LOGO (BLUE).png" alt="Logo" className="h-20 w-auto object-contain block"/>
                    </div>

                    <div className="hidden md:flex space-x-16">
                        <Link to="/user/home" className="uppercase text-black font-bold tracking-wide text-xs">Home</Link>
                        <Link to="/user/menu" className="uppercase text-black font-bold tracking-wide text-xs">Menu</Link>
                        <Link to="/user/company" className="uppercase text-black font-bold tracking-wide text-xs">Company</Link>
                        <Link to="/user/special" className="uppercase text-black font-bold tracking-wide text-xs">Special</Link>
                        <Link to="/user/contact" className="uppercase text-black font-bold tracking-wide text-xs">Contact</Link>
                    </div>

                    <div className="flex gap-3 items-center">
                        {/* Notification Button */}
                        <div className="relative">
                            <button className="w-8 h-8 bg-[#1C359A] rounded-full flex items-center justify-center shadow-md hover:bg-blue-700 transition">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 7.165 7 8.388 7 10v4c0 .217-.072.42-.196.58L5 17h5m5 0a3.001 3.001 0 01-6 0m6 0H9"/>
                                </svg>
                            </button>
                            <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-600 border-2 border-white rounded-full"></span>
                        </div>

                        {/* Profile Button */}
                        <div className="flex" ref={dropdownRef}>
                            <button
                                id="profileButton"
                                onClick={toggleDropdown}
                                className="w-8 h-8 bg-[#1C359A] rounded-full shadow-md hover:bg-blue-700 transition relative">
                                <div className="w-full h-full bg-[#1C359A] rounded-full"></div>
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownVisible && (
                                <div id="profileDropdown" className="absolute right-0 mt-5 w-64 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                                    {/* ✅ Profile Picture & Username Section */}
                                    <div className="p-3 border-b border-gray-300">
                                        <div className="flex items-center">
                                            <div id="profilePicture" className="w-10 h-10 bg-gray-300 rounded-full"></div>
                                            <div className="ml-3">
                                                {/* ✅ Display user name dynamically */}
                                                <Link to="/user/account" className="text-sm font-medium text-gray-800">
                                                    {user ? user.firstname + " " + user.lastname : "User Name"}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <Link to="/user/account" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Account</Link>
                                    <Link to="/user/cart" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">My Cart</Link>
                                    <Link to="/user/logout" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Log Out</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default UserNavbar;
