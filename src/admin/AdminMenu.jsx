import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminMenu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/capstone-react/api/getMenuItems.php") // Update to your actual API path
      .then((response) => {
        setMenuItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
      });
  }, []);

  const handleLogout = () => {
    console.log("Logout function triggered");
    // Add logout functionality here if needed
  };

  return (
    <div className="flex flex-col h-screen bg-[#DCDEEA]">
      {/* Navbar */}
      <div className="w-full flex items-center justify-between py-4 px-12 shadow-md bg-white">
        <div className="flex items-center justify-center md:justify-start w-full md:w-auto">
          <img
            className="h-20 w-auto object-contain block"
            src="../img/YCB LOGO (BLUE).png"
            alt="Logo"
          />
        </div>
        <div className="text-xl text-[#1C359A] font-bold">Admin</div>
      </div>

      {/* Sidebar & Main Content */}
      <div className="flex flex-row h-full">
        {/* Sidebar */}
        <div className="w-64 flex-none bg-white shadow-md h-full flex flex-col p-4">
          <nav className="flex flex-col space-y-4">
            <Link to="/admin/dashboard" className="font-bold border-l-2 border-black hover:border-[#1C359A] sidebar-link flex items-center justify-center space-x-2 p-3 hover:bg-gray-200 text-gray-800">
              <span>Orders</span>
            </Link>
            <Link to="/admin/menu" className="font-bold border-l-2 border-black hover:border-[#1C359A] sidebar-link flex items-center justify-center space-x-2 p-3 hover:bg-gray-200 text-gray-800">
              <span>Menu</span>
            </Link>
            <Link to="/admin/feedback" className="font-bold border-l-2 border-black hover:border-[#1C359A] sidebar-link flex items-center justify-center space-x-2 p-3 hover:bg-gray-200 text-gray-800">
              <span>Feedback</span>
            </Link>
            <Link to="/admin/order-history" className="font-bold border-l-2 border-black hover:border-[#1C359A] sidebar-link flex items-center justify-center space-x-2 p-3 hover:bg-gray-200 text-gray-800">
              <span>Order History</span>
            </Link>
          </nav>

          {/* Logout Button */}
          <button onClick={handleLogout} className="mt-20 font-bold flex items-center justify-center bg-[#1C359A] text-white px-4 py-2 rounded-lg hover:bg-blue-800">
            SIGN OUT
          </button>
        </div>

        {/* Main Content (Menu Management) */}
        <div className="flex-1 p-8 bg-[#F5F5F5]">
 {/* Header Section */}
 <div className="w-full flex justify-between">
                        <div className="text-[#1C359A] text-lg font-bold">Order Management</div>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 border-2 border-[#1C359A] text-black font-bold rounded-md hover:bg-white">
                                Post status
                            </button>
                            <button className="px-4 py-2 border-2 border-[#1C359A] text-black font-bold rounded-md hover:bg-white">
                                Complete
                            </button>
                            <button className="px-4 py-2 border-2 border-[#1C359A] text-black font-bold rounded-md flex items-center space-x-2 hover:bg-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h3m-4.5 6h6m-7.5 6h9" />
                                </svg>
                                <span>Filter</span>
                            </button>
                        </div>
                    </div>


          {/* Menu Table */}
          <div className="overflow-x-auto mt-6">
            <table className="w-full bg-white shadow-md border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">ID</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Description</th>
                  <th className="border px-4 py-2">Size</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Image</th>
                </tr>
              </thead>
              <tbody>
                {menuItems.length > 0 ? (
                  menuItems.map((item) => (
                    <tr key={item.food_id} className="hover:bg-gray-100">
                      <td className="border px-4 py-2">{item.food_id}</td>
                      <td className="border px-4 py-2">{item.food_name}</td>
                      <td className="border px-4 py-2">{item.food_description}</td>
                      <td className="border px-4 py-2">{item.food_size}</td>
                      <td className="border px-4 py-2">₱{item.food_price}</td>
                      <td className="border px-4 py-2">
                        {item.food_img ? (
                          <img
                            src={`http://localhost/your-image-folder/${item.food_img}`} // Adjust path if necessary
                            alt={item.food_name}
                            className="w-16 h-16 object-cover"
                          />
                        ) : (
                          "No Image"
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="border px-4 py-2 text-center text-gray-500">
                      No menu items available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
