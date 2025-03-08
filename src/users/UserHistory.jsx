import { useState, useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";
import Swal from 'sweetalert2';


const UserHistory = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [comment, setComment] = useState("");

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

  const handleFeedbackSubmit = (orderId) => {
    if (!feedback || !comment) {
      Swal.fire("Error", "Please provide a rating and comment.", "error");
      return;
    }
  
    const feedbackScores = {
      "It was great!": 5,
      "It was ok": 4,
      "Neutral": 3,
      "I did not like it": 2,
      "It was terrible": 1
    };
  
    axios.post("https://yappari-coffee-bar.shop/api/submitFeedback", {
      orders_id: orderId, // Use orderId passed to the function
      feedback: comment,
      score: feedbackScores[feedback]
    })
    .then(response => {
      Swal.fire("Success", response.data.message, "success");
      setIsFeedbackOpen(false);
    })
    .catch(error => {
      Swal.fire("Error", "Failed to submit feedback. Please try again.", "error");
    });
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

         {/**Main content */}


      <div className="container mx-auto pt-6 px-4 md:px-36 flex flex-col w-full">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.orders_id} className="w-full mx-auto bg-white p-8 rounded-xl shadow-xl mb-4">
              <h2 className="font-bold">Order number: {order.orders_id}</h2>
              <p className="text-black">Date: {order.created_at}</p>
              <p className="text-black">Total cost: ₱ {order.total_amount}</p>
              {/* Show feedback button only if order_feedback is empty */}
                {!order.order_feedback && (
                  <button
                    onClick={() => {
                      setIsFeedbackOpen(true);
                      setSelectedOrderId(order.orders_id);
                    }}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    Give Feedback
                  </button>
                )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No orders found.</p>
        )}
      </div>
      {isFeedbackOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-100">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <button
              onClick={() => setIsFeedbackOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
              ✖
              </button>
            <h2 className="text-lg font-bold text-center text-blue-900">How was your order experience?</h2>
            <p className="text-gray-600 text-center">We’re thrilled to be brewing up your order! Let us know how the ordering experience went for you – we’re all ears!</p>
            <div className="border-b my-4"></div>

            <div className="space-y-3 mb-4">
              {["It was great!", "It was ok", "Neutral", "I did not like it", "It was terrible"].map((option) => (
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
              onClick={() => handleFeedbackSubmit(selectedOrderId)}
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