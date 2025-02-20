import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);


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


  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setImagePreview(null);
  };


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    }
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
            <Link
              to="/admin/dashboard"
              className="font-bold border-l-2 border-black hover:border-[#1C359A] sidebar-link flex items-center justify-center space-x-2 p-3 hover:bg-gray-200 text-gray-800"
            >
              <span>Orders</span>
            </Link>
            <Link
              to="/admin/menu"
              className="font-bold border-l-2 border-black hover:border-[#1C359A] sidebar-link flex items-center justify-center space-x-2 p-3 hover:bg-gray-200 text-gray-800"
            >
              <span>Menu</span>
            </Link>
            <Link
              to="/admin/feedback"
              className="font-bold border-l-2 border-black hover:border-[#1C359A] sidebar-link flex items-center justify-center space-x-2 p-3 hover:bg-gray-200 text-gray-800"
            >
              <span>Feedback</span>
            </Link>
            <Link
              to="/admin/order-history"
              className="font-bold border-l-2 border-black hover:border-[#1C359A] sidebar-link flex items-center justify-center space-x-2 p-3 hover:bg-gray-200 text-gray-800"
            >
              <span>Order History</span>
            </Link>
          </nav>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-20 font-bold flex items-center justify-center bg-[#1C359A] text-white px-4 py-2 rounded-lg hover:bg-blue-800"
          >
            SIGN OUT
          </button>
        </div>

        {/* Main Content (Menu Management) */}
        <div className="flex-1 p-8 bg-[#DCDEEA]">
          {/* Header Section */}
          <div className="w-full flex justify-between">
            <div className="text-[#1C359A] text-lg font-bold">
              Order Management
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border-2 border-[#1C359A] text-black font-bold rounded-md hover:bg-white">
                Post
              </button>
              <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 border-2 border-[#1C359A] text-black font-bold rounded-md hover:bg-white">Add Product</button>
              
              <button className="px-4 py-2 border-2 border-[#1C359A] text-black font-bold rounded-md flex items-center space-x-2 hover:bg-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6h3m-4.5 6h6m-7.5 6h9"
                  />
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
                  <th className="border px-4 py-2">Category</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Size</th>
                  <th className="border px-4 py-2">Availability</th>
                  <th className="border px-4 py-2">Description</th>
                  <th className="border px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {menuItems.length > 0 ? (
                  menuItems.map((item) => (
                    <tr key={item.food_id} className="hover:bg-gray-100">
                      <td className="border px-4 py-2">{item.food_id}</td>
                      <td className="border px-4 py-2">{item.food_name}</td>
                      <td className="border px-4 py-2">{item.category}</td>

                      <td className="border px-4 py-2">₱{item.food_price}</td>
                      <td className="border px-4 py-2">{item.food_size}</td>

                      <td className="border px-4 py-2">{item.availability}</td>
                      
                      <td className="border px-4 py-2">
                        {item.food_description}
                      </td>
                      <td className="border px-4 py-2">{item.action}</td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="border px-4 py-2 text-center text-gray-500"
                    >
                      No menu items available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            
          </div>
          
        </div>
        
      </div>


{/**popup ADD product  */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-3 right-3 text-gray-600 text-xl">&times;</button>
            <h2 className="text-xl font-bold text-blue-800 mb-4">New Product</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center cursor-pointer">
              <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
              {previewImage ? (
                <img src={previewImage} className="w-24 h-24 object-cover mb-2 rounded-md" alt="Preview" />
              ) : (
                <p>Drag photo here or <span className="text-blue-600 underline">Browse image</span></p>
              )}
            </div>
            <form className="mt-4 space-y-3">
              <label className="flex flex-row items-center w-full">
                <div className="text-gray-700 w-1/3">Product name :</div>
                <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter product name" required />
              </label>
              <label className="flex flex-row items-center w-full">
                <div className="text-gray-700 w-1/3">Description :</div>
                <textarea className="w-full p-2 border rounded-md" placeholder="Enter description"></textarea>
              </label>
              <label className="flex flex-row items-center w-full">
                <div className="text-gray-700 w-1/3">Size :</div>
                <select className="w-full p-2 border rounded-md">
                  <option value="">Select size...</option>
                  <option value="Regular">Regular</option>
                  <option value="Tall">Tall</option>
                  <option value="Large">Large</option>
                </select>
              </label>
              <label className="flex flex-row items-center w-full">
                <div className="text-gray-700 w-1/3">Category :</div>
                <select className="w-full p-2 border rounded-md">
                  <option value="">Select category</option>
                  <option value="Coffee">Classic Coffee</option>
                  <option value="Frappes">Frappes</option>
                  <option value="Smoothies">Smoothies</option>
                  <option value="Refreshers">Refreshers</option>
                  <option value="Milk Drinks">Milk Drinks</option>
                  <option value="Rice Meals">Rice Meals</option>
                  <option value="Snacks & Pasta">Snacks & Pasta</option>
                </select>
              </label>
              <label className="flex flex-row items-center w-full">
                <div className="text-gray-700 w-1/3">Price :</div>
                <input type="number" className="w-full p-2 border rounded-md" placeholder="Enter price" required />
              </label>
              <div className="flex justify-end gap-2 mt-4">
                <button type="submit" className="flex font-bold items-center border border-[#1C359A] text-black px-4 py-2 rounded-md hover:bg-blue-600">
                  <span className="mr-2">💾</span> Add Item
                </button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="border font-bold border-[#1C359A] px-4 py-2 rounded-md hover:bg-gray-200">
                  Discard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


       {/* Popup Modal 
       {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative">
                <button onClick={() => setIsModalOpen(false)} className="absolute top-3 right-3 text-gray-600 text-xl">&times;</button>
                <h2 className="text-xl font-bold text-blue-800 mb-4">New Product</h2>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center cursor-pointer">
                  <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                  {previewImage ? (
                    <img src={previewImage} className="w-24 h-24 object-cover mb-2 rounded-md" alt="Preview" />
                  ) : (
                    <p>Drag photo here or <span className="text-blue-600 underline">Browse image</span></p>
                  )}
                </div>
                <form className="mt-4 space-y-3">
                  <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter product name" required />
                  <textarea className="w-full p-2 border rounded-md" placeholder="Enter description"></textarea>
                  <select className="w-full p-2 border rounded-md">
                    <option value="">Select size...</option>
                    <option value="Regular">Regular</option>
                    <option value="Tall">Tall</option>
                    <option value="Large">Large</option>
                  </select>
                  <select className="w-full p-2 border rounded-md">
                    <option value="">Select category...</option>
                    <option value="Coffee">Classic Coffee</option>
                    <option value="Frappes">Frappes</option>
                    <option value="Smoothies">Smoothies</option>
                    <option value="Refreshers">Refreshers</option>
                    <option value="Milk Drinks">Milk Drinks</option>
                    <option value="Rice Meals">Rice Meals</option>
                    <option value="Snacks & Pasta">Snacks & Pasta</option>
                  </select>
                  <input type="number" className="w-full p-2 border rounded-md" placeholder="Enter price" required />
                  <div className="flex justify-end gap-2 mt-4">
                    <button type="submit" className="border border-[#1C359A] text-black px-4 py-2 rounded-md hover:bg-blue-600">Add Item</button>
                    <button type="button" onClick={() => setIsModalOpen(false)} className="border border-[#1C359A] px-4 py-2 rounded-md hover:bg-gray-200">Discard</button>
                  </div>
                </form>
              </div>
            </div>
          )}

*/}
    </div>

    
  );
};

export default AdminMenu;
