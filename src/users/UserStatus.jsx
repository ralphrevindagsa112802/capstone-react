import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';


const UserStatus = () => {
  const navigate = useNavigate();
  const { orderId } = useParams(); // Get orderId from URL params
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const location = useLocation();

  const [points, setPoints] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [userData, setUserData] = useState({
    id: '',
    username: '',
    f_name: '',
    l_name: '',
    email: '',
    phone: '',
    address: '',
    profile_pic: '',
  });

  
    // Helper function to check if a link is active
    const isActive = (path) => {
      return location.pathname === path;
    };
  
  // Fetch user points
  useEffect(() => {
    // Fetch user points
    fetch(`https://yappari-coffee-bar.shop/api/getUser?action=get_points`, {
      credentials: "include"
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setPoints(Number(data.points));
        }
      })
      .catch(error => console.error("Error fetching points:", error));
  }, []);

  useEffect(() => {
    fetch('https://yappari-coffee-bar.shop/api/getUser', {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setUserData({
            ...data.user,
            user_id: data.user.id, // ✅ Ensures user_id is stored
          });
        } else {
          console.error("Error: User ID is missing in API response.");
        }
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  useEffect(() => {
    const userId = sessionStorage.getItem("user_id");

    if (!userId) {
      setError("User ID not found. Please log in.");
      setLoading(false);
      return;
    }

    axios
      .get(`https://yappari-coffee-bar.shop/api/getUserOrders?user_id=${userId}`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.error) {
          setError(response.data.error);
        } else {
          setOrders(response.data);
        }
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setError("Failed to fetch orders.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Function to cancel order
  const handleCancelOrder = (orderId) => {
    axios.post(`https://yappari-coffee-bar.shop/api/cancelOrder`, { order_id: orderId })
      .then(response => {
        if (response.data.success) {
          setOrders(prevOrders => prevOrders.map(order =>
            order.orders_id === orderId ? { ...order, order_status: "Cancelled" } : order
          ));
          Swal.fire("Success", "Order successfully cancelled.", "success", {timer: 3000});
          setMessage("Order successfully cancelled.");
        } else {
          setMessage(response.data.error || "Failed to cancel order.");
        }
      })
      .catch(() => setMessage("Failed to cancel order."));
  };

  // Function to mark order as received
  const handleOrderReceived = (orderId) => {
    axios.post(`https://yappari-coffee-bar.shop/api/orderReceived`, { order_id: orderId })
      .then(response => {
        if (response.data.success) {
          setOrders(prevOrders => prevOrders.map(order =>
            order.orders_id === orderId ? { ...order, order_status: "Order Received" } : order
          ));
          Swal.fire("Success", "Order successfully marked as received.", "success", {timer: 3000});
          setMessage("Order successfully marked as received.");
        } else {
          setMessage(response.data.error || "Failed to update order status.");
        }
      })
      .catch(() => setMessage("Failed to update order status."));
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  //profile header
  useEffect(() => {
    fetch('https://yappari-coffee-bar.shop/api/getUser', {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setUserData({
            ...data.user,
            user_id: data.user.id, // ✅ Ensures user_id is stored
          });
        } else {
          console.error("Error: User ID is missing in API response.");
        }
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  // ✅ Handle file selection
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // ✅ Upload profile picture
  const handleUpload = () => {
    if (!selectedFile) {
      Swal.fire({
        title: 'Warning!',
        text: 'Please select a file to upload.',
        icon: 'warning',
        confirmButtonText: 'OK',
      })
      return;
    }

    const formData = new FormData();
    formData.append("profile_pic", selectedFile);

    fetch("https://yappari-coffee-bar.shop/api/upload_profile", {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then(response => response.json())
      .then(data => {

        if (data.success) {
          setUserData(prev => ({ ...prev, profile_pic: data.profile_pic }));
          Swal.fire("Success", `Profile picture updated successfully!`, "success", {timer: 3000});
        } else {
          Swal.fire("Error", `Error uploading profile picture: ${data.error}`, "error", {timer: 3000});
        }
      })
      .catch(error => console.error("Error uploading profile picture:", error));
  };

  return (

    <div className="bg-[#DCDEEA] min-h-screen">
      <UserNavbar />

      {/**header and sidebar */}
      <div className="flex flex-col md:flex-row bg-[#1C359A] py-10 px-4 md:px-36 mt-18 md:mt-32 ">
        <div className="flex flex-col md:flex-row md:items-start items-center md:absolute md:-mb-42">
          {/** 
            <div className="w-40 h-40 shadow-2xl rounded-full bg-white flex items-center justify-center text-[#1C359A] text-2xl md:text-4xl">
              <span id="userInitials">{userData.f_name.charAt(0) + userData.l_name.charAt(0)}</span>
            </div>
            */}
          <div className="relative w-40 h-40 rounded-full bg-white shadow-lg flex items-center justify-center text-[#1C359A] text-2xl md:text-4xl">
            {selectedFile ? (
              // ✅ Show selected image preview
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Profile Preview"
                className="w-full h-full rounded-full object-cover"
              />
            ) : userData.profile_pic ? (
              // ✅ Show profile picture (Blur if editing)
              <img
                src={`https://yappari-coffee-bar.shop/api/${userData.profile_pic}`}
                alt="Profile"
                className={`w-full h-full rounded-full object-cover transition ${isEditing ? "blur-md" : ""
                  }`}
              />
            ) : (
              // ✅ Show initials if no image is available
              <span id="userInitials">
                {(userData.f_name?.charAt(0) || "").toUpperCase()}
                {(userData.l_name?.charAt(0) || "").toUpperCase()}
              </span>
            )}

            {/* ✅ Camera Upload Button at Upper Right */}
            {isEditing && (
              <div className="absolute flex flex-col items-center">
                {/* Camera Upload Icon */}
                <div className="bg-gray-200 p-2 rounded-full border border-white shadow-md">
                  <label htmlFor="profilePicUpload" className="cursor-pointer flex items-center justify-center w-8 h-8">
                    📷
                  </label>
                  <input
                    type="file"
                    id="profilePicUpload"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>


                {/* Upload Button                                 */}

                <button
                  onClick={handleUpload}
                  className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm shadow-md hover:bg-blue-700 mt-1"
                >
                  Upload
                </button>

              </div>
            )}

            {/* Edit Button to Enable Editing Mode 
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="absolute bottom-0 bg-gray-300 text-gray-700 px-2 py-1 rounded-md text-xs"
              >
                Edit
              </button>
            )} */}
          </div>
          <div className="mt-8 md:mt-8 md:ml-4 text-center md:text-left">
            <h2 className="text-lg md:text-xl text-white font-semibold" id="userName">
              {userData.f_name} {userData.l_name}
            </h2>
            <p className="text-sm text-white" id="userAddress">{userData.address}</p>
            <p className="text-xs text-white" id="userPoints">Points: {typeof points === 'number' ? points.toFixed(1) : '0.0'}</p>
          </div>
        </div>

        <button
          id="editProfileBtn"
          className="md:mt-8 mt-8 md:ml-auto px-4 py-2 bg-white text-black font-bold rounded-md"
          onClick={() => navigate("/user/account")} // ✅ Redirect to edit profile
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      <div className="container mx-auto pt-6 md:px-52 flex flex-col md:flex-row w-full">
        {/**side bar profile section */}
        <aside className="fixed md:relative bottom-0 left-0 w-full md:w-64 md:h-screen  z-10 md:z-0">
          {/* Mobile Bottom Navigation Bar */}
          <div className="md:hidden flex justify-around items-center h-16 border-t border-gray-200 bg-white">
            <Link
              to="/user/account"
              className={`flex flex-col items-center justify-center w-1/4 py-2 ${
                isActive('/user/account') ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600 active:text-blue-800'
              }`}
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span className="text-xs mt-1">Profile</span>
            </Link>
            <Link
              to="/user/cart"
              className={`flex flex-col items-center justify-center w-1/4 py-2 ${
                isActive('/user/cart') ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600 active:text-blue-800'
              }`}
              onClick={() => {
                window.scrollTo(0, 0);
              }}            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
              </svg>
              <span className="text-xs mt-1">Cart</span>
            </Link>
            <Link
              to="/user/status"
              className={`flex flex-col items-center justify-center w-1/4 py-2 ${
                isActive('/user/status') ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600 active:text-blue-800'
              }`}
              onClick={() => {
                window.scrollTo(0, 0);
              }}            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="text-xs mt-1">Status</span>
            </Link>
            <Link
              to="/user/history"
              className={`flex flex-col items-center justify-center w-1/4 py-2 ${
                isActive('/user/history') ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600 active:text-blue-800'
              }`}
              onClick={() => {
                window.scrollTo(0, 0);
              }}            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-xs mt-1">History</span>
            </Link>

            <Link
              to="/"
              className={`flex flex-col items-center justify-center w-1/4 py-2 ${
                isActive('/') ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600 active:text-blue-800'
              }`}
              onClick={() => {
                window.scrollTo(0, 0);
              }}            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
              <span className="text-xs mt-1">Sign Out</span>
            </Link>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden md:mt-12 md:w-64 md:flex md:flex-col h-full pt-4 py-4 space-y-6 ">
            <nav className="space-y-4">
              <Link
                to="/user/account"
                className={`flex items-center space-x-4 ${
                  isActive('/user/account') ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600 active:text-blue-800'
                } transition-colors duration-200`}              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">User Profile</span>
              </Link>
              <Link
                to="/user/cart"
                className={`flex items-center space-x-4 ${
                  isActive('/user/cart') ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600 active:text-blue-800'
                } transition-colors duration-200`}              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                </svg>
                <span className="font-semibold">Cart</span>
              </Link>
              <Link
                to="/user/status"
                className={`flex items-center space-x-4 ${
                  isActive('/user/status') ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600 active:text-blue-800'
                } transition-colors duration-200`}              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Order Status</span>
              </Link>
              <Link
                to="/user/history"
                className={`flex items-center space-x-4 ${
                  isActive('/user/history') ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600 active:text-blue-800'
                } transition-colors duration-200`}              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                  <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Order History</span>
              </Link>
            </nav>
            <div className="mt-6">
              <button className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                </svg>
                SIGN OUT
              </button>
            </div>
          </div>
        </aside>
        {/**end of header and sidebar */}


        {/**Main content */}

        {/**this content should be hidden until the user completed a checkout order */}
        <div className="container mx-auto px-4 md:px-36 flex flex-col w-full mb-6 cursor-pointer">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          ) : orders.length > 0 ? (
            <div>
              <h1 className="text-2xl font-bold text-[#1C359A] mb-6">Active Orders</h1>
              <div className="space-y-4">
                {orders
                  .filter(order => order.order_status !== "Order Received" && order.order_status !== "Cancelled" && order.order_status !== "Completed")
                  .map((order) => (
                    <div
                      key={order.orders_id}
                      className="w-full mx-auto bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100"
                      onClick={() => handleOrderClick(order)}
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                        <div className="mb-4 md:mb-0">
                          <div className="flex items-center">
                            <h2 className="font-bold text-lg">Order #{order.orders_id}</h2>
                            <span className={`ml-3 px-3 py-1 text-xs font-medium rounded-full ${order.order_status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                              order.order_status === "Out For Delivery" || order.order_status === "Ready To Pickup" ? "bg-green-100 text-green-800" :
                                "bg-blue-100 text-blue-800"
                              }`}>
                              {order.order_status}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mt-2">Service option: {order.shipping_method} </p>
                          <p className="text-gray-600 text-sm mt-2">Ordered on {new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                          <p className="text-gray-800 font-semibold mt-2">Total: ₱{parseFloat(order.total_amount).toFixed(2)}</p>
                        </div>
                        <div className="flex space-x-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCancelOrder(order.orders_id);
                            }}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${order.order_status === "Pending"
                              ? "bg-red-50 text-red-700 hover:bg-red-100 border border-red-300"
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"
                              }`}
                            disabled={order.order_status !== "Pending"}
                          >
                            Cancel Order
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOrderReceived(order.orders_id);
                            }}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${order.order_status === "Out For Delivery" || order.order_status === "Ready To Pickup"
                              ? "bg-green-50 text-green-700 hover:bg-green-100 border border-green-300"
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"
                              }`}
                            disabled={order.order_status !== "Out For Delivery" && order.order_status !== "Ready To Pickup"}
                          >
                            Order Received
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No active orders</h3>
              <p className="mt-1 text-sm text-gray-500">You haven't placed any orders yet or all your orders are completed.</p>
            </div>
          )}
        </div>

        {isModalOpen && selectedOrder && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs z-50">
            <div className="absolute" onClick={() => setIsModalOpen(false)}></div>
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full relative z-10 overflow-hidden">
              {/* Header */}
              <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-blue-900">Order Details</h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="px-6 py-4 bg-white">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-sm text-gray-600">Order #</span>
                    <p className="text-lg font-semibold">{selectedOrder.orders_id}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${selectedOrder.order_status === "Cancelled" ? "bg-red-100 text-red-800" :
                      selectedOrder.order_status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                        selectedOrder.order_status === "Order Received" || selectedOrder.order_status === "Completed" ? "bg-green-100 text-green-800" :
                          "bg-blue-100 text-blue-800"
                    }`}>
                    {selectedOrder.order_status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-sm text-gray-600">Order Date</span>
                    <p className="font-medium">{new Date(selectedOrder.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Total Amount</span>
                    <p className="font-medium">₱{parseFloat(selectedOrder.total_amount).toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Payment Option</span>
                    <p className="font-medium">{selectedOrder.payment_method}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Service option</span>
                    <p className="font-medium">{selectedOrder.shipping_method}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="px-6 pt-2 pb-4">
                <h3 className="font-semibold text-gray-800 mb-3">Items</h3>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <ul className="divide-y divide-gray-200">
                    {selectedOrder.order_items?.map((item) => (
                      <li key={item.order_items_id} className="px-4 py-3">
                        <div className="flex justify-between">
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">{item.food_name}</p>
                            <p className="text-sm text-gray-600">Size: {item.size}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{item.quantity} × ₱{parseFloat(item.price).toFixed(2)}</p>
                            <p className="text-sm text-gray-600">₱{(item.quantity * parseFloat(item.price)).toFixed(2)}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Total */}
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">Total</span>
                    <span className="font-bold text-lg">₱{parseFloat(selectedOrder.total_amount).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />

    </div>
  );
};

export default UserStatus;
