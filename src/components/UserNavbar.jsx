import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from 'react-router-dom';
import { FaUser, FaSignOutAlt } from "react-icons/fa";

const UserNavbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  // Handle Logout
  const handleLogout = () => {
    sessionStorage.removeItem("user_id"); // ✅ Remove user session
    sessionStorage.removeItem("user_name");
    localStorage.removeItem("cartItems_guest"); // ✅ Remove guest cart
    window.location.reload(); // ✅ Reload to apply changes
    setCartItems([]); // Clear cart state
    navigate("/user/logout");
  };



  return (
    <nav className="bg-white shadow-md fixed top-0 z-50 w-full">
      <div className="container mx-auto flex items-center justify-between py-6 px-16 md:px-22">

        {/* Cart Icon (Mobile Only) */}
        <button className="md:hidden">
          <img src="../img/cart.png" alt="Cart" className="h-6 w-6" />
        </button>

        <div className="flex items-center justify-center dm:justify-start w-full md:w-auto">
          <img src="../img/YCB LOGO (BLUE).png" alt="Logo" className="h-24 w-auto object-contain block" />
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden">
          {isMobileMenuOpen ? (
            <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>



        {/**desktop navigation */}
        <div className="hidden md:flex space-x-16">
          <Link to="/user/home" className="uppercase text-black font-bold tracking-wide text-sm ">Home</Link>
          <Link to="/user/menu" className="uppercase text-black font-bold tracking-wide text-sm">Menu</Link>
          <Link to="/user/company" className="uppercase text-black font-bold tracking-wide text-sm">Company</Link>
          <Link to="/user/special" className="uppercase text-black font-bold tracking-wide text-sm">Special</Link>
          <Link to="/user/contact" className="uppercase text-black font-bold tracking-wide text-sm">Contact</Link>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="absolute top-36 left-0 w-full bg-white shadow-lg md:hidden">
            <div className="flex flex-col p-4 space-y-4">
              <Link to="/user/home" className="border-l-3 border-black pl-3 uppercase font-light text-sm">Home</Link>
              <Link to="/user/menu" className="border-l-3 border-black pl-3 uppercase font-light text-sm">Menu</Link>
              <Link to="/user/company" className="border-l-3 border-black pl-3 uppercase font-light text-sm">Company</Link>
              <Link to="/user/special" className="border-l-3 border-black pl-3 uppercase font-light text-sm">Special</Link>
              <Link to="/user/contact" className="border-l-3 border-black pl-3 uppercase font-light text-sm">Contact</Link>
              <hr className="border border-black w-full"/>
              <div className="flex flex-col gap-6 w-full h-full items-center justify-center">
                <div className="flex flex-row justify-center items-center gap-4">
                  <img src="../img/user.png" className="w-6 h-6" alt="" />
                  <Link to="/user/account" className="uppercase text-[#1C359A] font-bold text-sm">Account</Link>
                </div>
                <div className="flex flex-row justify-center items-center gap-4">
                  <img src="../img/logout.png" className="w-6 h-6" alt="" />
                  <Link to="/" className="uppercase text-[#1C359A] font-bold text-sm">Logout</Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Profile Button & Notification Button (Hidden on Mobile) */}

        <div className=" gap-5 items-center hidden md:flex">
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
              <div id="profileDropdown" className="absolute right-22 mt-10 w-64 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
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
                <Link to="/user/logout" onClick={handleLogout} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Log Out</Link>
              </div>
            )}
          </div>
        </div>


      </div>


    </nav>

  )
}

export default UserNavbar