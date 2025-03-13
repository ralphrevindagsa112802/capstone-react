import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";
import Swal from 'sweetalert2';

const UserStatus = () => {
  const navigate = useNavigate();
  const { orderId } = useParams(); // Get orderId from URL params
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
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

  useEffect(() => {
    fetch('https://yappari-coffee-bar.shop/api/getUser', {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        console.log("Fetched user data:", data); // ✅ Debugging
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
    console.log("Retrieved user_id:", userId);

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
        console.log("API Response:", response.data);
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
          Swal.fire("Success", "Order successfully cancelled.", "success");
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
          Swal.fire("Success", "Order successfully marked as received.", "success");
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
        console.log("Fetched user data:", data); // ✅ Debugging
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
          Swal.fire("Success", `Profile picture updated successfully!`, "success");
        } else {
          Swal.fire("Error", `Error uploading profile picture: ${data.error}`, "error");
        }
      })
      .catch(error => console.error("Error uploading profile picture:", error));
  };

  return (

    <div className="bg-[#DCDEEA] min-h-screen">
      <UserNavbar />
      <div className="flex flex-row bg-[#1C359A] py-10 px-4 md:px-36 mt-32 ">
        <div className="flex flex-row absolute -mb-42 md:flex-row">
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

                {/* Upload Button 
                                <button
                                    onClick={handleUpload}
                                    className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm shadow-md hover:bg-blue-700 mt-1"
                                >
                                    Upload
                                </button>
                                */}
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
          </div>
        </div>


        <button
          id="editProfileBtn"
          className="md:mt-8 mt-8 md:ml-auto px-4 py-2 bg-white text-black font-bold rounded-md"
          onClick={() => navigate("/user/account")} // ✅ Redirect to edit profile
        >
          Edit Profile
        </button>
      </div>


      <div className="container mx-auto pt-6 px-4 md:px-36 flex flex-col md:flex-row w-full">
        {/**side bar profile section */}
        <aside className="w-full mt-12 md:w-64 h-auto md:h-screen py-4 flex flex-col space-y-6">
          <nav className="space-y-4">
            <Link
              to="/user/account"
              className="flex items-center space-x-4 text-gray-800 hover:text-blue-600 active:text-blue-800 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">User Profile</span>
            </Link>
            <Link
              to="/user/cart"
              className="flex items-center space-x-4 text-gray-800 hover:text-blue-600 active:text-blue-800 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
              </svg>
              <span className="font-semibold">Cart</span>
            </Link>
            <Link
              to="/user/status"
              className="flex items-center space-x-4 text-gray-800 hover:text-blue-600 active:text-blue-800 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Order Status</span>
            </Link>
            <Link
              to="/user/history"
              className="flex items-center space-x-4 text-gray-800 hover:text-blue-600 active:text-blue-800 transition-colors duration-200"
            >
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
        </aside>



        {/**Main content */}

        {/**this content should be hidden until the user completed a checkout order */}
        <div className="container mx-auto pt-6 px-4 md:px-36 flex flex-col w-full">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : orders.length > 0 ? (
            orders
              .filter(order => order.order_status !== "Order Received" && order.order_status !== "Cancelled" && order.order_status !== "Completed")
              .map((order) => (
                <div
                  key={order.orders_id}
                  className="w-full mx-auto bg-white p-8 rounded-xl shadow-xl mb-4 cursor-pointer"
                  onClick={() => handleOrderClick(order)}
                >
                  <h2 className="font-bold">Order Number: {order.orders_id}</h2>
                  <p className="text-black">Date: {order.created_at}</p>
                  <p className="text-black">Total cost: ₱ {order.total_amount}</p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCancelOrder(order.orders_id);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
                    disabled={order.order_status !== "Pending"}
                  >
                    Cancel Order
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOrderReceived(order.orders_id);
                    }}
                    className="px-4 py-2 bg-gray-300 text-black rounded disabled:bg-gray-400"
                    disabled={order.order_status !== "Out For Delivery" && order.order_status !== "Ready To Pickup"}
                  >
                    Order Received
                  </button>

                </div>
              ))
          ) : (
            <p className="text-center text-gray-500">No orders found.</p>
          )}
        </div>

        {isModalOpen && selectedOrder && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              >
                ✖
              </button>
              <h2 className="text-lg font-bold text-center text-blue-900">Order Details</h2>
              <p className="text-black">Order Number: {selectedOrder.orders_id}</p>
              <p className="text-black">Date: {selectedOrder.created_at}</p>
              <p className="text-black">Total Cost: ₱ {selectedOrder.total_amount}</p>
              <p className="text-black">Status: {selectedOrder.order_status}</p>
              <h3 className="font-bold mt-4">Items:</h3>
              <ul>
                {selectedOrder.order_items?.map((item) => (
                  <li key={item.order_items_id} className="border-b py-2">
                    <p className="text-black">{item.food_name} ({item.size}) - {item.quantity}x ₱{item.price}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <Footer />

    </div>
  );
};

export default UserStatus;
