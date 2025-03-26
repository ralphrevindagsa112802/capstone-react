import { useState, useEffect, useRef, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { FaUser, FaSignOutAlt, FaBars, FaTimes, FaHome, FaUtensils, FaBuilding, FaStar, FaEnvelope, FaShoppingCart, FaBell } from "react-icons/fa";

const UserNavbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { logoutUser } = useContext(CartContext);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const [user, setUser] = useState(null);
  const [profileImageError, setProfileImageError] = useState(false);
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [previousNotifications, setPreviousNotifications] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newNotification, setNewNotification] = useState(null);
  const notificationRef = useRef(null);
  const [error, setError] = useState(null);
  const currentPath = location.pathname;
  const popupTimerRef = useRef(null);

  // Function to handle profile image loading errors
  const handleImageError = () => {
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

  // Function to check for new notifications or status changes
  const checkForNewNotifications = (currentNotifications, previousNotifications) => {
    if (!previousNotifications.length) return null;
    
    // Check for status changes in existing orders
    for (const current of currentNotifications) {
      const previous = previousNotifications.find(n => n.orders_id === current.orders_id);
      
      if (previous && previous.order_status !== current.order_status) {
        // Found an order with a status change
        return {
          orders_id: current.orders_id,
          oldStatus: previous.order_status,
          newStatus: current.order_status
        };
      }
    }
    
    // Check for completely new orders
    for (const current of currentNotifications) {
      if (!previousNotifications.some(n => n.orders_id === current.orders_id)) {
        return {
          orders_id: current.orders_id,
          newStatus: current.order_status,
          isNew: true
        };
      }
    }
    
    return null;
  };

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
          // Store current notifications for comparison next time
          setPreviousNotifications(notifications);
          
          // Update with new notifications
          setNotifications(response.data);
          
          // Check for changes and display popup if needed
          const changedNotification = checkForNewNotifications(response.data, notifications);
          
          if (changedNotification) {
            setNewNotification(changedNotification);
            setShowPopup(true);
            
            // Clear previous timer if exists
            if (popupTimerRef.current) {
              clearTimeout(popupTimerRef.current);
            }
            
            // Auto-dismiss popup after 5 seconds
            popupTimerRef.current = setTimeout(() => {
              setShowPopup(false);
            }, 5000);
          }
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
      if (popupTimerRef.current) clearTimeout(popupTimerRef.current);
    };
  }, [notifications]);

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
        !notificationRef.current.contains(event.target) &&
        !event.target.closest('[data-notification-toggle="true"]')
      ) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Function to dismiss popup manually
  const dismissPopup = () => {
    setShowPopup(false);
    if (popupTimerRef.current) {
      clearTimeout(popupTimerRef.current);
    }
  };

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

  // Define mobile menu item links with icons for better UX
  const menuItems = [
    { path: "/user/home", name: "Home", icon: <FaHome className="w-4 h-4" /> },
    { path: "/user/menu", name: "Menu", icon: <FaUtensils className="w-4 h-4" /> },
    { path: "/user/company", name: "Company", icon: <FaBuilding className="w-4 h-4" /> },
    { path: "/user/special", name: "Special", icon: <FaStar className="w-4 h-4" /> },
    { path: "/user/contact", name: "Contact", icon: <FaEnvelope className="w-4 h-4" /> },
  ];
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
  
  return (
    <nav className="bg-white shadow-md fixed top-0 z-50 w-full">
{/* Popup Notification */}
{showPopup && newNotification && (
  <div 
    className="fixed z-50 w-full max-w-md bg-white rounded-lg shadow-lg border border-blue-200 overflow-hidden"
    style={{ 
      left: "50%", 
      transform: "translateX(-50%)",
      top: "40px",
      animation: "slideInDown 0.3s ease-out forwards" 
    }}
  >
    <div className="bg-blue-600 px-4 py-2 flex justify-between items-center">
      <div className="flex items-center">
        <FaBell className="text-white mr-2" />
        <h3 className="text-white font-medium text-sm">Order Update</h3>
      </div>
      <button onClick={dismissPopup} className="text-white hover:text-gray-200">
        <FaTimes size={16} />
      </button>
    </div>
    <div className="p-4">
      <p className="text-sm text-gray-700">
        {newNotification.isNew 
          ? `New order #${newNotification.orders_id} has been created.` 
          : `Order #${newNotification.orders_id} status changed from "${newNotification.oldStatus}" to "${newNotification.newStatus}".`}
      </p>
      <div className="mt-3 flex justify-end">
        <Link to="/user/status" onClick={dismissPopup} className="text-xs text-blue-600 hover:text-blue-800 font-medium">
          View Details
        </Link>
      </div>
    </div>
  </div>
)}

      <div className="container mx-auto flex items-center justify-between py-3 sm:py-4 md:py-6 px-4 sm:px-8 md:px-16 lg:px-22">
        {/* Mobile: Left Side with Notification */}
        <div className="md:hidden flex items-center space-x-3">
          {/* Mobile Notification Button */}
          <div className="relative">
            <button
              onClick={toggleNotification}
              data-notification-toggle="true"
              className="w-7 h-7 md:w-8 md:h-8 bg-[#1C359A] rounded-full flex items-center justify-center shadow-md hover:bg-blue-700 transition cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 md:w-4 md:h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                data-notification-toggle="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 7.165 7 8.388 7 10v4c0 .217-.072.42-.196.58L5 17h5m5 0a3.001 3.001 0 01-6 0m6 0H9"
                  data-notification-toggle="true"
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
          <a href="/user/home">
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
              className={`uppercase font-bold tracking-wide text-xs lg:text-sm transition-colors ${currentPath === item.path ? "text-[#1C359A]" : "text-black hover:text-[#1C359A]"}`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Navigation - Full screen overlay with animation */}
        <div
          className={`fixed inset-0 bg-white z-40 md:hidden transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          ref={mobileMenuRef}
        >
          {/* Mobile menu content - same as original */}
          <div className="flex flex-col h-full pt-24 px-8">
            {/* Mobile Menu Items */}
            <div className="flex flex-col space-y-6">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center space-x-4 text-lg font-medium text-gray-800 hover:text-[#1C359A] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentPath === item.path ? "bg-[#1C359A]/10" : "bg-gray-100"}`}>
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

            {/* User Actions */}
            <div className="flex flex-col space-y-6">
              {/* Profile Section */}
              {user && (
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                    {hasValidProfilePic() ? (
                      <img
                        src={getProfilePicUrl()}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                      />
                    ) : (
                      <div className="w-full h-full bg-[#1C359A] flex items-center justify-center">
                        <FaUser className="text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      {user ? `${user.f_name} ${user.l_name}` : "Guest"}
                    </p>
                  </div>
                </div>
              )}

              {/* Account Link */}
              <Link
                to="/user/account"
                className="flex items-center space-x-4 text-lg font-medium text-gray-800 hover:text-[#1C359A] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[#1C359A]">
                  <FaUser className="w-4 h-4" />
                </div>
                <span>Account</span>
              </Link>

              {/* Cart Link */}
              <Link
                to={{ pathname: "/user/cart", state: { cartItems } }}
                className="flex items-center space-x-4 text-lg font-medium text-gray-800 hover:text-[#1C359A] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[#1C359A]">
                  <FaShoppingCart className="w-4 h-4" />
                </div>
                <span>My Cart</span>
              </Link>

              {/* Logout Link */}
              <Link
                to="/"
                onClick={() => { logoutUser(); setMobileMenuOpen(false); }}
                className="flex items-center space-x-4 text-lg font-medium text-gray-800 hover:text-[#1C359A] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[#1C359A]">
                  <FaSignOutAlt className="w-4 h-4" />
                </div>
                <span>Log Out</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Profile Button & Notification Button (Hidden on Mobile) */}
        <div className="gap-3 md:gap-5 items-center hidden md:flex">
          {/* Desktop Notification Button */}
          <div className="relative">
            <button
              onClick={toggleNotification}
              data-notification-toggle="true"
              className="w-7 h-7 md:w-8 md:h-8 bg-[#1C359A] rounded-full flex items-center justify-center shadow-md hover:bg-blue-700 transition cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 md:w-4 md:h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                data-notification-toggle="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 7.165 7 8.388 7 10v4c0 .217-.072.42-.196.58L5 17h5m5 0a3.001 3.001 0 01-6 0m6 0H9"
                  data-notification-toggle="true"
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
                {/* Profile info - same as original */}
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

        {/* Notification Panel - same as original */}
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