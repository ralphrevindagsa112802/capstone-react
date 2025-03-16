import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";
import Swal from "sweetalert2";

const UserHistory = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [comment, setComment] = useState("");
  const [points, setPoints] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [userData, setUserData] = useState({
    id: "",
    username: "",
    f_name: "",
    l_name: "",
    email: "",
    phone: "",
    address: "",
    profile_pic: "",
  });

  // Fetch user points
  useEffect(() => {
    // Fetch user points
    fetch("https://yappari-coffee-bar.shop/api/getUser?action=get_points", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setPoints(Number(data.points));
        }
      })
      .catch((error) => console.error("Error fetching points:", error));
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
      .get(
        `https://yappari-coffee-bar.shop/api/getUserOrders?user_id=${userId}`,
        {
          withCredentials: true,
        }
      )
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

  useEffect(() => {
    fetch("https://yappari-coffee-bar.shop/api/getUser", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
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
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const handleFeedbackSubmit = (orderId) => {
    if (!feedback || !comment) {
      Swal.fire("Warning", "Please provide a rating and comment.", "warning", {timer: 3000});
      return;
    }

    const feedbackScores = {
      "It was great!": 5,
      "It was ok": 4,
      Neutral: 3,
      "I did not like it": 2,
      "It was terrible": 1,
    };

    axios
      .post("https://yappari-coffee-bar.shop/api/submitFeedback", {
        orders_id: orderId, // Use orderId passed to the function
        feedback: comment,
        score: feedbackScores[feedback],
      })
      .then((response) => {
        Swal.fire("Success", response.data.message, "success", {timer: 3000});
        setIsFeedbackOpen(false);
      })
      .catch((error) => {
        Swal.fire(
          "Error",
          "Failed to submit feedback. Please try again.",
          "error",
         {timer: 3000}
        );
      });
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  //handle profile header
  useEffect(() => {
    fetch("https://yappari-coffee-bar.shop/api/getUser", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
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
      .catch((error) => console.error("Error fetching user data:", error));
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
        title: "Warning!",
        text: "Please select a file to upload.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    const formData = new FormData();
    formData.append("profile_pic", selectedFile);

    fetch("https://yappari-coffee-bar.shop/api/upload_profile", {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setUserData((prev) => ({ ...prev, profile_pic: data.profile_pic }));
          Swal.fire(
            "Success",
            `Profile picture updated successfully!`,
            "success",
            {timer: 3000}
          );
        } else {
          Swal.fire(
            "Error",
            `Error uploading profile picture: ${data.error}`,
            "error", 
            {timer: 3000}
          );
        }
      })
      .catch((error) =>
        console.error("Error uploading profile picture:", error)
      );
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
                className={`w-full h-full rounded-full object-cover transition ${
                  isEditing ? "blur-md" : ""
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
                  <label
                    htmlFor="profilePicUpload"
                    className="cursor-pointer flex items-center justify-center w-8 h-8"
                  >
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

            {/* Edit Button to Enable Editing Mode */}
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="absolute bottom-0 bg-gray-300 text-gray-700 px-2 py-1 rounded-md text-xs"
              >
                Edit
              </button>
            )}
          </div>
          <div className="mt-8 md:mt-8 md:ml-4 text-center md:text-left">
            <h2
              className="text-lg md:text-xl text-white font-semibold"
              id="userName"
            >
              {userData.f_name} {userData.l_name}
            </h2>
            <p className="text-sm text-white" id="userAddress">
              {userData.address}
            </p>
            <p className="text-xs text-white" id="userPoints">
              Points: {typeof points === "number" ? points.toFixed(1) : "0.0"}
            </p>
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
              className="flex flex-col items-center justify-center w-1/4 py-2 text-gray-800 hover:text-blue-600 active:text-blue-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs mt-1">Profile</span>
            </Link>
            <Link
              to="/user/cart"
              className="flex flex-col items-center justify-center w-1/4 py-2 text-gray-800 hover:text-blue-600 active:text-blue-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
              </svg>
              <span className="text-xs mt-1">Cart</span>
            </Link>
            <Link
              to="/user/status"
              className="flex flex-col items-center justify-center w-1/4 py-2 text-gray-800 hover:text-blue-600 active:text-blue-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs mt-1">Status</span>
            </Link>
            <Link
              to="/user/history"
              className="flex flex-col items-center justify-center w-1/4 py-2 text-gray-800 hover:text-blue-600 active:text-blue-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                <path
                  fillRule="evenodd"
                  d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs mt-1">History</span>
            </Link>

            <Link
              to="/"
              className="flex flex-col items-center justify-center w-1/4 py-2 text-gray-800 hover:text-blue-600 active:text-blue-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs mt-1">Sign Out</span>
            </Link>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden md:mt-12 md:w-64 md:flex md:flex-col h-full pt-4 py-4 space-y-6 ">
            <nav className="space-y-4">
              <Link
                to="/user/account"
                className="flex items-center space-x-4 text-gray-800 hover:text-blue-600 active:text-blue-800 transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-semibold">User Profile</span>
              </Link>
              <Link
                to="/user/cart"
                className="flex items-center space-x-4 text-gray-800 hover:text-blue-600 active:text-blue-800 transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                </svg>
                <span className="font-semibold">Cart</span>
              </Link>
              <Link
                to="/user/status"
                className="flex items-center space-x-4 text-gray-800 hover:text-blue-600 active:text-blue-800 transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-semibold">Order Status</span>
              </Link>
              <Link
                to="/user/history"
                className="flex items-center space-x-4 text-gray-800 hover:text-blue-600 active:text-blue-800 transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                  <path
                    fillRule="evenodd"
                    d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-semibold">Order History</span>
              </Link>
            </nav>
            <div className="mt-6">
              <button className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clipRule="evenodd"
                  />
                </svg>
                SIGN OUT
              </button>
            </div>
          </div>
        </aside>
        {/**end of header and sidebar */}

        {/**Main content */}

        <div className="container mx-auto px-4 md:px-36 flex flex-col w-full mb-6 cursor-pointer">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          ) : orders.length > 0 ? (
            <div>
              <h1 className="text-2xl font-bold mb-6 text-[#1C359A]">
                Order History
              </h1>
              <div className="space-y-4">
                {orders
                  .filter(
                    (order) =>
                      order.order_status === "Order Received" ||
                      order.order_status === "Cancelled" ||
                      order.order_status === "Completed"
                  )
                  .map((order) => (
                    <div
                      key={order.orders_id}
                      className="w-full mx-auto bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100"
                      onClick={() => handleOrderClick(order)}
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                        <div className="mb-4 md:mb-0">
                          <div className="flex items-center">
                            <h2 className="font-bold text-lg">
                              Order #{order.orders_id}
                            </h2>
                            <span
                              className={`ml-3 px-3 py-1 text-xs font-medium rounded-full ${
                                order.order_status === "Cancelled"
                                  ? "bg-red-100 text-red-800"
                                  : order.order_status === "Order Received" ||
                                    order.order_status === "Completed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {order.order_status}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mt-2">
                            Ordered on{" "}
                            {new Date(order.created_at).toLocaleDateString(
                              "en-US",
                              { year: "numeric", month: "long", day: "numeric" }
                            )}
                          </p>
                          <p className="text-gray-800 font-semibold mt-2">
                            Total: ₱{parseFloat(order.total_amount).toFixed(2)}
                          </p>
                        </div>

                        {!order.order_feedback &&
                          order.order_status !== "Cancelled" && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsFeedbackOpen(true);
                                setSelectedOrderId(order.orders_id);
                              }}
                              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md transition-colors duration-200 flex items-center"
                            >
                              <svg
                                className="w-4 h-4 mr-2"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                />
                              </svg>
                              Give Feedback
                            </button>
                          )}
                        {order.order_feedback && (
                          <span className="text-sm text-green-600 font-medium flex items-center">
                            <svg
                              className="w-4 h-4 mr-1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Feedback Submitted
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No order history
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                You haven't completed any orders yet.
              </p>
            </div>
          )}
        </div>

        {/* Order Details Modal */}
        {isModalOpen && selectedOrder && (
          <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-xs">
            <div
              className="absolute "
              onClick={() => setIsModalOpen(false)}
            ></div>
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full relative z-10 overflow-hidden">
              {/* Header */}
              <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-blue-900">
                    Order Details
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="px-6 py-4 bg-white">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-sm text-gray-600">Order #</span>
                    <p className="text-lg font-semibold">
                      {selectedOrder.orders_id}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      selectedOrder.order_status === "Cancelled"
                        ? "bg-red-100 text-red-800"
                        : selectedOrder.order_status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : selectedOrder.order_status === "Order Received" ||
                          selectedOrder.order_status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {selectedOrder.order_status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-sm text-gray-600">Order Date</span>
                    <p className="font-medium">
                      {new Date(selectedOrder.created_at).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "long", day: "numeric" }
                      )}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Total Amount</span>
                    <p className="font-medium">
                      ₱{parseFloat(selectedOrder.total_amount).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Payment Option</span>
                    <p className="font-medium">{selectedOrder.payment_method}</p>
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
                            <p className="font-medium text-gray-800">
                              {item.food_name}
                            </p>
                            <p className="text-sm text-gray-600">
                              Size: {item.size}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              {item.quantity} × ₱
                              {parseFloat(item.price).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-600">
                              ₱
                              {(item.quantity * parseFloat(item.price)).toFixed(
                                2
                              )}
                            </p>
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
                    <span className="font-bold text-lg">
                      ₱{parseFloat(selectedOrder.total_amount).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Original Feedback Modal - Kept as is */}
        {isFeedbackOpen && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs z-100">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
              <button
                onClick={() => setIsFeedbackOpen(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              >
                ✖
              </button>
              <h2 className="text-lg font-bold text-center text-blue-900">
                How was your order experience?
              </h2>
              <p className="text-gray-600 text-center">
                We're thrilled to be brewing up your order! Let us know how the
                ordering experience went for you – we're all ears!
              </p>
              <div className="border-b my-4"></div>
              <div className="space-y-3 mb-4">
                {[
                  "It was great!",
                  "It was ok",
                  "Neutral",
                  "I did not like it",
                  "It was terrible",
                ].map((option) => (
                  <label
                    key={option}
                    className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-100"
                  >
                    <input
                      type="radio"
                      name="feedback"
                      value={option}
                      checked={feedback === option}
                      onChange={(e) => setFeedback(e.target.value)}
                      className="hidden"
                    />
                    <span className="font-semibold text-blue-900 flex-1">
                      {option}
                    </span>
                    <span className="w-5 h-5 border border-gray-400 rounded-full flex items-center justify-center">
                      {feedback === option && (
                        <span className="w-3 h-3 bg-blue-900 rounded-full"></span>
                      )}
                    </span>
                  </label>
                ))}
              </div>
              <h2 className="text-lg font-bold text-center text-blue-900">
                What is your comment?
              </h2>
              <textarea
                className="w-full p-2 border rounded-md"
                placeholder="How can we improve?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <div className="border-b my-4"></div>
              <button
                onClick={() => handleFeedbackSubmit(selectedOrderId)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded w-full"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
      {<Footer />}{" "}
    </div>
  );
};

export default UserHistory;
