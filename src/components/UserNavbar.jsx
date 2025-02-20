import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from 'react-router-dom';

const UserNavbar = () => {
    
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);
    const [user, setUser] = useState(null);
    const location = useLocation();
    const cartItems = location.state?.cartItems || [];
  
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
          const response = await fetch("http://localhost/capstone-react/api/getUser.php", {
            method: "GET",
            credentials: "include", // Ensures session cookies are sent
          });
    
          const data = await response.json();
          if (data.success) {
            console.log(`Welcome, ${data.user.f_name} ${data.user.l_name}`);
            setUser(data.user); // Store user data in state
          } else {
            console.log("User not logged in");
          }
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

            <div className="md:hidden absolute left-4">
                <button className="text-black focus:outline-none">
                <img src="img/cart.png" alt="Cart" className="h-8 w-8"/>
                </button>
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
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 7.165 7 8.388 7 10v4c0 .217-.072.42-.196.58L5 17h5m5 0a3.001 3.001 0 01-6 0m6 0H9" />
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
                        <div id="profileDropdown" className="absolute right-22 mt-8 w-64 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                            {/* ✅ Profile Picture & Username Section */}
                            <div className="p-3 border-b border-gray-300">
                                <div className="flex items-center">
                                    <div id="profilePicture" className="w-10 h-10 bg-gray-300 rounded-full"></div>
                                    <div className="ml-3">
                                        {/* ✅ Display user name dynamically */}
                                            <Link to="/user/account" className="text-sm font-medium text-gray-800">
                                                {user ? `${user.f_name} ${user.l_name}` : "Guest"}
                                            </Link>
                                    </div>
                                </div>
                            </div>
                            <Link to="/user/account" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Account</Link>
                            <Link to={{ pathname: '/user/cart', state: { cartItems } }} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">My Cart</Link>
                            <Link to="/user/logout" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Log Out</Link>
                        </div>
                    )}
                </div>
            </div>


            <div className="md:hidden flex items-center">
                <button id="menu-button" className="text-[#1C359A] focus:outline-none">
               
                    <svg id="hamburger-icon" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                  
                    <svg id="close-icon" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hidden" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                </div>
            </div>

           
            <div id="mobile-menu"
                className="w-7/12 absolute right-0 top-0 h-full bg-white shadow-md space-y-4 flex flex-col items-center justify-start pt-20 pb-4 md:hidden">
                <a href="#home"
                className="font-bold uppercase text-sm block px-4 py-2 text-black hover:bg-gray-100 hover:w-full transition-all duration-300 text-center">Home</a>
                <a href="#menu"
                className="font-bold uppercase text-sm block px-4 py-2 text-black hover:bg-gray-100 hover:w-full transition-all duration-300 text-center">Menu</a>
                <a href="#company"
                className="font-bold uppercase text-sm block px-4 py-2 text-black hover:bg-gray-100 hover:w-full transition-all duration-300 text-center">Company</a>
                <a href="#special"
                className="font-bold uppercase text-sm block px-4 py-2 text-black hover:bg-gray-100 hover:w-full transition-all duration-300 text-center">Special</a>
                <a href="#contact"
                className="font-bold uppercase text-sm block px-4 py-2 text-black hover:bg-gray-100 hover:w-full transition-all duration-300 text-center">Contact</a>

                <hr className="w-7/12 border-black"/>
                <a href="#signin"
                className="bg-[#1C359A] text-white px-6 py-2.5 rounded-md text-xs font-medium w-3/12 text-center mt-4 hover:bg-[#162f81] transition-all duration-300">Sign
                In</a>
            </div>
        </nav>
    </div>
  )
}

export default UserNavbar