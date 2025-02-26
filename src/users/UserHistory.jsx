import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";
import Swal from 'sweetalert2';


const UserHistory = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost/capstone-react/api/getOrder.php?orderId=${orderId}`)
      .then((response) => {
        if (response.data.error) {
          setError(response.data.error);
        } else {
          setOrder(response.data);
        }
      })
      .catch(() => setError("Failed to fetch order"))
      .finally(() => setLoading(false));
  }, [orderId]);

  const handleFeedbackSubmit = () => {
    console.log("Feedback submitted:", feedback, "Comment:", comment);
    setIsFeedbackOpen(false);
  };

  return (
    <div className="bg-[#DCDEEA] min-h-screen">
      <UserNavbar />
      <div className="flex flex-row bg-[#1C359A] py-10 px-4 md:px-36 mt-32">
        <div className="flex flex-row absolute -mb-42 md:flex-row">
          <div className="w-40 h-40 shadow-2xl rounded-full bg-white flex items-center justify-center text-[#1C359A] text-2xl md:text-4xl">
            <span id="userInitials">--</span>
          </div>
          <div className="mt-8 md:mt-8 md:ml-4 text-center md:text-left">
            <h2 className="text-lg md:text-xl text-white font-semibold" id="userName">
              Loading...
            </h2>
            <p className="text-sm text-white" id="userAddress">Loading...</p>
          </div>
        </div>
        {/** */}
        <button
          id="editProfileBtn"
          className="md:mt-8 mt-8 md:ml-auto px-4 py-2 bg-white text-black font-bold rounded-md"
        >
          Edit Profile
        </button>
      </div>

      <div className="container mx-auto pt-6 px-4 md:px-36 flex flex-col md:flex-row w-full">
        <aside className="w-full mt-12 md:w-64 h-auto md:h-screen py-4 flex flex-col space-y-6">
          <nav className="space-y-4">
            <Link to="/user/account" className="flex items-center space-x-4 text-gray-800 hover:text-blue-600">
              <span className="font-semibold">User Profile</span>
            </Link>
            <Link to="/user/cart" className="flex items-center space-x-4 text-gray-800 hover:text-blue-600">
              <span className="font-semibold">Cart</span>
            </Link>
            <Link to="/user/status" className="flex items-center space-x-4 text-gray-800 hover:text-blue-600">
              <span className="font-semibold">Order Status</span>
            </Link>
            <Link to="/user/history" className="flex items-center space-x-4 text-gray-800 hover:text-blue-600">
              <span className="font-semibold">Order History</span>
            </Link>
          </nav>
          <div className="mt-6">
            <button className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700">
              <img src="path-to-sign-out-icon.svg" alt="Sign Out" className="w-5 h-5 mr-2" />
              SIGN OUT
            </button>
          </div>
        </aside>


        <div className="container mx-auto pt-6 px-4 md:px-36 flex flex-col md:flex-row w-full">
          <div className="w-full mx-auto h-2/3 md:h-1/3 bg-white p-8 rounded-xl shadow-xl">
            {loading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : order ? (
              <div>
                <h2 className="font-bold">Order number: {order.order_number}</h2>
                <p className="text-black">Date: {order.order_date}</p>
                <p className="text-black">Total cost: ₱ {order.total_cost}</p>
                <button
                  onClick={() => setIsFeedbackOpen(true)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Give Feedback
                </button>
              </div>
            ) : (
              <p className="text-center text-gray-500">No order found.</p>
            )}
          </div>
        </div>

        {isFeedbackOpen && (
          <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-100">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-lg font-bold text-center text-blue-900">How was your order experience?</h2>
              <p className="text-gray-600 text-center">We’re thrilled to be brewing up your order! Let us know how the ordering experience went for you – we’re all ears!</p>
              <div className="border-b my-4"></div>

              <div className="space-y-3 mb-4">
                {["It was great!", "It was ok", "I did not like it", "It was terrible"].map((option) => (
                  <label key={option} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-100">
                    <input
                      type="radio"
                      name="feedback"
                      value={option}
                      checked={feedback === option}
                      onChange={(e) => setFeedback(e.target.value)}
                      className="hidden"
                    />
                    <span className="font-semibold text-blue-900 flex-1">{option}</span>
                    <span className="w-5 h-5 border border-gray-400 rounded-full flex items-center justify-center">
                      {feedback === option && <span className="w-3 h-3 bg-blue-900 rounded-full"></span>}
                    </span>
                  </label>
                ))}
              </div>

              <h2 className="text-lg font-bold text-center text-blue-900">What is your comment?</h2>
              <textarea
                className="w-full p-2 border rounded-md"
                placeholder="How can we improve?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>

              <div className="border-b my-4"></div>

              <button
                onClick={handleFeedbackSubmit}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded w-full"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default UserHistory;