import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";

const UserStatus = () => {
  const navigate = useNavigate();
  const { orderId } = useParams(); // Get orderId from URL params
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state

  useEffect(() => {
    fetch("http://localhost/capstone-react/api/check_user_session.php", {
        credentials: "include", // ✅ Sends session cookie
    })
    .then((res) => res.json())
    .then((data) => {
        if (!data.success) {
            navigate("/login");
        }
    })
    .catch(() => navigate("/login"));
  }, [navigate]);

  useEffect(() => {
    axios.get(`http://localhost/capstone-react/api/getOrder.php?orderId=${orderId}`)
      .then(response => {
        if (response.data.error) {
          setError(response.data.error);
        } else {
          setOrder(response.data);
        }
      })
      .catch(err => setError("Failed to fetch order"))
      .finally(() => setLoading(false));
  }, [orderId]);

  // Function to cancel order
  const handleCancelOrder = () => {
    axios.post(`http://localhost/capstone-react/  api/cancelOrder.php`, { orderId })
      .then(response => {
        if (response.data.success) {
          setOrder(prevOrder => ({ ...prevOrder, order_status: "Cancelled" }));
          setMessage("Order successfully cancelled.");
        } else {
          setMessage(response.data.error || "Failed to cancel order.");
        }
      })
      .catch(() => setMessage("Failed to cancel order."));
  };

  // Function to mark order as received
  const handleOrderReceived = () => {
    axios.post(`http://localhost/capstone-react/api/orderReceived.php`, { orderId })
      .then(response => {
        if (response.data.success) {
          setOrder(prevOrder => ({ ...prevOrder, order_status: "Received" }));
          setMessage("Order successfully marked as received.");
        } else {
          setMessage(response.data.error || "Failed to update order status.");
        }
      })
      .catch(() => setMessage("Failed to update order status."));
  };

    // Open modal
    const openModal = () => setIsModalOpen(true);
    // Close modal
    const closeModal = () => setIsModalOpen(false);

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

        {/**this content should be hidden until the user completed a checkout order */}
        <div className="container mx-auto pt-6 px-4 md:px-36 flex flex-col md:flex-row w-full">
          <div className="w-full mx-auto h-2/3 md:h-1/3 bg-white p-8 rounded-xl shadow-xl">
            {loading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : order ? (
              <div className="flex flex-row items-center space-x-6">
                <img src={order.image_url} 
                                onClick={openModal} // Open modal when image is clicked
                                alt="Order" className="cursor-pointer w-32 h-32 rounded-md object-cover" />
                <div className="flex-1">
                  <h2 className="font-bold">Order number: {order.order_number}</h2>
                  <p className="text-black">Date: {order.order_date}</p>
                  <p className="text-black">Total cost: <span className="font-bold">₱ {order.total_cost}</span></p>
                  <p className="text-black">Service option: {order.service_option}</p>
                  <p className="text-blue-600 font-semibold">{order.order_status}</p>

                  <div className="mt-4 flex space-x-4">
                    <button
                      onClick={handleCancelOrder}
                      className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
                      disabled={order.order_status === "Cancelled"}
                    >
                      Cancel Order
                    </button>
                    <button onClick={handleOrderReceived}
                      className="px-4 py-2 bg-gray-300 text-black rounded disabled:bg-gray-400"
                      disabled={order.order_status === "Cancelled" || order.order_status === "Received"}>Order Received</button>
                  </div>

                  {message && <p className="text-center text-sm text-green-600 mt-2">{message}</p>}

                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500">No order found.</p>
            )}
          </div>
        </div>
      </div>
              {/* Modal */}
      {isModalOpen && order && (

        //User Info here Name, address, number
        <div className="fixed inset-0 bg-opacity-90 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-lg font-bold text-center">Order Details</h2>
            <div className="border-b my-2"></div>
            <div className="flex items-center space-x-4">
              <img src={order.image_url} alt="Order" className="w-20 h-20 rounded object-cover" />
              <div>
                <p className="text-gray-700 font-bold">{order.order_number}</p>
                <p className="text-gray-500">Date: {order.order_date}</p>
                <p className="text-gray-500">Total Cost: ₱ {order.total_cost}</p>
                <p className="text-gray-500">Service Option: {order.service_option}</p>
                <p className="text-gray-500">Status: {order.order_status}</p>
              </div>
              <div className="">
                
              </div>
            </div>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default UserStatus;
