import { useState, useEffect, useRef, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { FaUser, FaSignOutAlt } from "react-icons/fa";

const UserNavbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { logoutUser } = useContext(CartContext);
  const dropdownRef = useRef(null);
  const [user, setUser] = useState(null);
  const [profileImageError, setProfileImageError] = useState(false);
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const notificationRef = useRef(null);
  const [error, setError] = useState(null);

  // Function to handle profile image loading errors
  const handleImageError = () => {
    console.log("Profile image failed to load");
    setProfileImageError(true);
  };

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
        const response = await fetch(
          "https://yappari-coffee-bar.shop/api/getUser",
          {
            method: "GET",
            credentials: "include", // Ensures session cookies are sent
          }
        );

        const data = await response.json();
        if (data.success) {
          console.log(`Welcome, ${data.user.f_name} ${data.user.l_name}`);
          console.log("User data:", data.user); // Log the full user data to see profile_pic
          // Reset image error state when new data is loaded
          setProfileImageError(false);
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

  //notification
  // Fetch order notifications from API
  useEffect(() => {
    // Declare interval variable outside the fetch function so we can clear it later
    let intervalId;

    const fetchNotifications = async () => {
      const userId = sessionStorage.getItem("user_id");

      try {
        const response = await axios.get(
          `https://yappari-coffee-bar.shop/api/getUserOrders?user_id=${userId}`,
          { withCredentials: true }
        );

        if (response.data.error) {
          setError(response.data.error);
        } else {
          setNotifications(response.data);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Failed to fetch orders.");
      }
    };

    // Call the function immediately when component mounts
    fetchNotifications();

    // Set up interval for periodic refreshes
    intervalId = setInterval(fetchNotifications, 10000);

    // Clean up function to clear interval when component unmounts
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  // Toggle notification dropdown
  const toggleNotification = (event) => {
    event.stopPropagation();
    setNotificationOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Function to determine if a valid profile picture is available
  const hasValidProfilePic = () => {
    return user && user.profile_pic && !profileImageError;
  };

  const getProfilePicUrl = () => {
    if (!user || !user.profile_pic) return null;

    // Check if the profile_pic is already a full URL
    if (user.profile_pic.startsWith("http")) {
      return user.profile_pic;
    }

    // Use the new endpoint
    return `https://yappari-coffee-bar.shop/fetch-profile-pic.php?filename=${user.profile_pic}`;
  };

  // Get count of active notifications
  const getActiveNotificationCount = () => {
    return notifications.filter(
      (notification) =>
        notification.order_status !== "Cancelled" &&
        notification.order_status !== "Order Received" &&
        notification.order_status !== "Completed"
    ).length;
  };
  return (
    <nav className="bg-white shadow-md fixed top-0 z-50 w-full">
      <div className="container mx-auto flex items-center justify-between py-3 sm:py-4 md:py-6 px-4 sm:px-8 md:px-16 lg:px-22">
        {/* Mobile: Left Side with Cart and Notification */}
        <div className="md:hidden flex items-center space-x-3">
          {/**  <Link to={{ pathname: '/user/cart', state: { cartItems } }} className="flex items-center justify-center">
            <img src="../img/cart.png" alt="Cart" className="h-5 w-5 sm:h-6 sm:w-6" />
          </Link>
          */}
          {/* Mobile Notification Button */}
          <div className="absolute">
            <button
              onClick={toggleNotification}
              className="w-7 h-7 md:w-8 md:h-8 bg-[#1C359A] rounded-full flex items-center justify-center shadow-md hover:bg-blue-700 transition cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 md:w-4 md:h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 7.165 7 8.388 7 10v4c0 .217-.072.42-.196.58L5 17h5m5 0a3.001 3.001 0 01-6 0m6 0H9"
                />
              </svg>
            </button>
            {getActiveNotificationCount() > 0 && (
              <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 md:w-2 md:h-2 bg-red-600 border-2 border-white rounded-full"></span>
            )}
          </div>
        </div>

        {/* Logo - Centered on mobile, left-aligned on desktop */}
      

        <div className="flex items-center justify-center md:justify-start">
          <img 
            src="../img/YCB LOGO (BLUE).png" 
            alt="Logo" 
            className="h-16 sm:h-20 md:h-24 max-w-full object-scale-down" 
          />
        </div>
        {/* Hamburger Menu (Mobile) */}
        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex items-center justify-center"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg
              className="h-5 w-5 sm:h-6 sm:w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-5 w-5 sm:h-6 sm:w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:space-x-8 lg:space-x-16">
          <Link
            to="/user/home"
            className="uppercase text-black font-bold tracking-wide text-xs lg:text-sm hover:text-[#1C359A] transition-colors"
          >
            Home
          </Link>
          <Link
            to="/user/menu"
            className="uppercase text-black font-bold tracking-wide text-xs lg:text-sm hover:text-[#1C359A] transition-colors"
          >
            Menu
          </Link>
          <Link
            to="/user/company"
            className="uppercase text-black font-bold tracking-wide text-xs lg:text-sm hover:text-[#1C359A] transition-colors"
          >
            Company
          </Link>
          <Link
            to="/user/special"
            className="uppercase text-black font-bold tracking-wide text-xs lg:text-sm hover:text-[#1C359A] transition-colors"
          >
            Special
          </Link>
          <Link
            to="/user/contact"
            className="uppercase text-black font-bold tracking-wide text-xs lg:text-sm hover:text-[#1C359A] transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Navigation - Full width dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden z-50">
            <div className="flex flex-col p-4 space-y-4">
              <Link
                to="/user/home"
                className="border-l-3 border-black pl-3 uppercase font-light text-sm"
              >
                Home
              </Link>
              <Link
                to="/user/menu"
                className="border-l-3 border-black pl-3 uppercase font-light text-sm"
              >
                Menu
              </Link>
              <Link
                to="/user/company"
                className="border-l-3 border-black pl-3 uppercase font-light text-sm"
              >
                Company
              </Link>
              <Link
                to="/user/special"
                className="border-l-3 border-black pl-3 uppercase font-light text-sm"
              >
                Special
              </Link>
              <Link
                to="/user/contact"
                className="border-l-3 border-black pl-3 uppercase font-light text-sm"
              >
                Contact
              </Link>
              
              <hr className="border border-black w-full" />
              <div className="flex flex-col gap-6 w-full py-2 items-center justify-center">
                <div className="flex flex-row justify-center items-center gap-4">
                  <img
                    src="../img/user.png"
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    alt="User icon"
                  />
                  <Link
                    to="/user/account"
                    className="uppercase text-[#1C359A] font-bold text-sm"
                  >
                    Account
                  </Link>
                </div>
                <div className="flex flex-row justify-center items-center gap-4">
                  <img
                    src="../img/logout.png"
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    alt="Logout icon"
                  />
                  <Link
                    to="/"
                    className="uppercase text-[#1C359A] font-bold text-sm"
                  >
                    Logout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Profile Button & Notification Button (Hidden on Mobile) */}
        <div className="gap-3 md:gap-5 items-center hidden md:flex">
          {/* Notification Button */}
          {/* Desktop Notification Button */}
          <div className="relative">
            <button
              onClick={toggleNotification}
              className="w-7 h-7 md:w-8 md:h-8 bg-[#1C359A] rounded-full flex items-center justify-center shadow-md hover:bg-blue-700 transition cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 md:w-4 md:h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 7.165 7 8.388 7 10v4c0 .217-.072.42-.196.58L5 17h5m5 0a3.001 3.001 0 01-6 0m6 0H9"
                />
              </svg>
            </button>
            {getActiveNotificationCount() > 0 && (
              <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 md:w-2 md:h-2 bg-red-600 border-2 border-white rounded-full"></span>
            )}
          </div>

          {/* Profile Button */}
          <div className="flex" ref={dropdownRef}>
            <button
              id="profileButton"
              onClick={toggleDropdown}
              className="w-7 h-7 md:w-8 md:h-8 bg-[#1C359A] rounded-full shadow-md hover:bg-blue-700 transition relative overflow-hidden"
            >
              {hasValidProfilePic() ? (
                <img
                  src={getProfilePicUrl()}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              ) : (
                <div className="w-full h-full bg-[#1C359A] rounded-full flex items-center justify-center">
                  <FaUser className="text-white text-xs md:text-sm" />
                </div>
              )}
            </button>

            {/* Dropdown Menu */}
            {isDropdownVisible && (
              <div
                id="profileDropdown"
                className="absolute right-4 sm:right-8 md:right-16 lg:right-22 mt-10 w-56 md:w-64 bg-white shadow-lg rounded-lg border border-gray-200 z-50"
              >
                {/* Profile Picture & Username Section */}
                <div className="p-3 border-b border-gray-300">
                  <div className="flex items-center">
                    <div
                      id="profilePicture"
                      className="w-8 h-8 md:w-10 md:h-10 bg-gray-300 rounded-full overflow-hidden"
                    >
                      {hasValidProfilePic() ? (
                        <img
                          src={getProfilePicUrl()}
                          alt="Profile"
                          className="w-full h-full object-cover"
                          onError={handleImageError}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                          <FaUser className="text-gray-600 text-xs md:text-sm" />
                        </div>
                      )}
                    </div>
                    <div className="ml-3">
                      <Link
                        to="/user/account"
                        className="text-xs md:text-sm font-medium text-gray-800"
                      >
                        {user ? `${user.f_name} ${user.l_name}` : "Guest"}
                      </Link>
                    </div>
                  </div>
                </div>
                <Link
                  to="/user/account"
                  className="block px-4 py-2 text-xs md:text-sm text-gray-800 hover:bg-gray-200"
                >
                  Account
                </Link>
                <Link
                  to={{ pathname: "/user/cart", state: { cartItems } }}
                  className="block px-4 py-2 text-xs md:text-sm text-gray-800 hover:bg-gray-200"
                >
                  My Cart
                </Link>
                <Link
                  to="/"
                  onClick={logoutUser}
                  className="block px-4 py-2 text-xs md:text-sm text-gray-800 hover:bg-gray-200"
                >
                  Log Out
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Notification Panel */}
        {isNotificationOpen && (
          <div
            ref={notificationRef}
            className="absolute top-0 left-4 md:left-auto md:right-37 w-80 sm:w-80 bg-white shadow-lg rounded-lg border border-gray-200 z-50 mt-16 md:mt-24"
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <span className="font-semibold text-sm">Order Notifications</span>
              <Link to="/user/status" className="text-blue-700 text-sm">
                See more...
              </Link>
            </div>
            <div className="max-h-60 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications
                  .filter(
                    (notification) =>
                      notification.order_status !== "Cancelled" &&
                      notification.order_status !== "Order Received" &&
                      notification.order_status !== "Completed"
                  )
                  .map((notification) => (
                    <div
                      key={notification.orders_id}
                      className="p-3 border-b border-gray-100 flex items-start"
                    >
                      <div className="text-blue-700 mr-2 mt-1">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                          />
                          <path
                            d="M12 8v4M12 16h.01"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <span className="font-semibold text-sm block">
                          Order Status
                        </span>
                        <p className="text-sm text-gray-600">
                          Your order #{notification.orders_id} is{" "}
                          {notification.order_status}
                        </p>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18 6L6 18M6 6l12 12"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  ))
              ) : (
                <p className="p-4 text-gray-500 text-center text-sm">
                  No new notifications
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default UserNavbar;
