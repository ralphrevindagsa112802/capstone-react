import React from "react";
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaHome, FaUtensils, FaBuilding, FaStar, FaEnvelope, FaShoppingCart } from "react-icons/fa";
import '../css/Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [error, setError] = useState(null);
  const mobileMenuRef = useRef(null);
  const location = useLocation();
  const currentPath = location.pathname;

  // Close mobile menu if clicking outside
  useEffect(() => {
    const handleMobileMenuClickOutside = (event) => {
      // Only check if menu is open and not when clicking the toggle button itself
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest('[data-menu-toggle="true"]')
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleMobileMenuClickOutside);
    return () => {
      document.removeEventListener("click", handleMobileMenuClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  // Define mobile menu item links with icons for better UX
  const menuItems = [
    { path: "/", name: "Home", icon: <FaHome className="w-4 h-4" /> },
    { path: "/menu", name: "Menu", icon: <FaUtensils className="w-4 h-4" /> },
    { path: "/company", name: "Company", icon: <FaBuilding className="w-4 h-4" /> },
    { path: "/special", name: "Special", icon: <FaStar className="w-4 h-4" /> },
    { path: "/contact", name: "Contact", icon: <FaEnvelope className="w-4 h-4" /> },
  ];

  return (
    <nav className="bg-white shadow-md fixed top-0 z-50 w-full">
      <div className="container mx-auto flex items-center justify-between py-3 sm:py-4 md:py-6 px-4 sm:px-8 md:px-16 lg:px-22">
        {/* Mobile: Left Side with Cart */}
        <div className="md:hidden flex items-center space-x-3">
          <Link to="/signin" className="text-black focus:outline-none">
            <div className="w-7 h-7 md:w-8 md:h-8 bg-[#1C359A] rounded-full flex items-center justify-center shadow-md hover:bg-blue-700 transition cursor-pointer">
              <FaShoppingCart className="h-3 w-3 md:h-4 md:w-4 text-white" />
            </div>
          </Link>
        </div>

        {/* Logo - Centered on mobile, left-aligned on desktop */}
        <div className="flex items-center justify-center md:justify-start">
          <a href="/">
            <img
              src="../img/YCB LOGO (BLUE).png"
              alt="Logo"
              className="h-16 sm:h-20 md:h-24 max-w-full object-scale-down cursor-pointer"
            />
          </a>
        </div>

        {/* Hamburger Menu Button (Mobile) */}
        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex items-center justify-center z-50 relative"
          data-menu-toggle="true"
        >
          <div
            className={`transition-all duration-300 ${isMobileMenuOpen ? 'bg-white text-[#1C359A]' : 'bg-[#1C359A] text-white'} p-2 rounded-full shadow-md`}
            data-menu-toggle="true"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="h-4 w-4 sm:h-5 sm:w-5" data-menu-toggle="true" />
            ) : (
              <FaBars className="h-4 w-4 sm:h-5 sm:w-5" data-menu-toggle="true" />
            )}
          </div>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:space-x-8 lg:space-x-16">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`uppercase font-bold tracking-wide text-xs lg:text-sm transition-colors ${currentPath === item.path ? "text-[#1C359A]" : "text-black hover:text-[#1C359A]"
                }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Sign In Button (Desktop) */}
        <div className="hidden md:block">
          <Link to="/signin" className="bg-[#1C359A] text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-[#162f81] transition-all duration-300">
            Sign In
          </Link>
        </div>

        {/* Mobile Navigation - Full screen overlay with animation */}
        <div
          className={`fixed inset-0 bg-white z-40 md:hidden transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          ref={mobileMenuRef}
        >
          <div className="flex flex-col h-full pt-24 px-8">
            {/* Mobile Menu Items */}
            <div className="flex flex-col space-y-6">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center space-x-4 text-lg font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentPath === item.path ? "bg-[#1C359A]/10" : "bg-gray-100"
                    }`}>
                    <span className="text-[#1C359A]">
                      {item.icon}
                    </span>
                  </div>
                  <span className={currentPath === item.path ? "text-[#1C359A]" : "text-gray-800 hover:text-[#1C359A]"}>
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-8"></div>

            {/* Cart Link */}
            <div className="flex flex-col space-y-6">
              <Link
                to="/signin"
                className={`flex items-center space-x-4 text-lg font-medium transition-colors ${currentPath === "/sigin" ? "text-[#1C359A]" : "text-gray-800 hover:text-[#1C359A]"
                  }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentPath === "/sigin" ? "bg-[#1C359A]/10" : "bg-gray-100"
                  }`}>
                  <FaShoppingCart className="w-4 h-4 text-[#1C359A]" />
                </div>
                <span>Cart</span>
              </Link>

              {/* Sign In Button */}
              <Link
                to="/signin"
                className="flex items-center justify-center bg-[#1C359A] text-white py-3 px-4 rounded-md text-base font-medium hover:bg-[#162f81] transition-all duration-300 mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;