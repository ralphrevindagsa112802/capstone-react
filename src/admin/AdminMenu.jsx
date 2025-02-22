import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEllipsisV } from "react-icons/fa";

const AdminMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const [formData, setFormData] = useState({
    food_name: "",
    food_description: "",
    food_size: "",
    food_price: "",
    category: "",
    food_img: null,
  });

  //availability

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const handleAvailabilityChange = async (id, status) => {
    console.log(`Updating availability for ID ${id} to ${status}`); // Debugging log
    await updateAvailability(id, status);
    setDropdownOpen(null); // Close dropdown after selection
  };

  //get menu
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
    setPreviewImage(null);
    setFormData({
      food_name: "",
      food_description: "",
      food_size: "",
      food_price: "",
      category: "",
      food_img: null,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({ ...formData, food_img: file });
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("food_name", formData.food_name);
    data.append("food_description", formData.food_description);
    data.append("food_size", formData.food_size);
    data.append("food_price", formData.food_price);
    data.append("category", formData.category);
    if (formData.food_img) {
      data.append("food_img", formData.food_img);
    }

    try {
      const response = await axios.post(
        "http://localhost/capstone-react/api/add_product.php",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        alert("Product added successfully!");
        handleCloseModal();
        // Refresh menu items
        axios
          .get("http://localhost/capstone-react/api/getMenuItems.php")
          .then((res) => {
            setMenuItems(res.data);
          });
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  //availability
  const updateAvailability = async (id, status) => {
    try {
      const response = await axios.post(
        "http://localhost/capstone-react/api/updateAvailability.php",
        {
          food_id: id,
          availability: status,
        }
      );

      if (response.data.success) {
        // Update state directly to reflect changes instantly
        setMenuItems((prevItems) =>
          prevItems.map((item) =>
            item.food_id === id ? { ...item, availability: status } : item
          )
        );
      } else {
        console.error("Failed to update availability:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating availability:", error);
    }
  };

  //deleting from admin and database
  const [confirmDelete, setConfirmDelete] = useState(null); // Store item ID to delete
  const [foodList, setFoodList] = useState([]); // Assuming you store the menu items here

  const handleDeleteClick = (food_id) => {
    setConfirmDelete(food_id); // Set item to be deleted
  };

  const handleConfirmDelete = async () => {
    if (confirmDelete) {
      try {
        const response = await fetch(
          "http://localhost/capstone-react/api/delete_food.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ food_id: confirmDelete }),
          }
        );

        const result = await response.json();

        if (result.success) {
          // Remove the deleted item from UI
          setFoodList((prevList) =>
            prevList.filter((item) => item.food_id !== confirmDelete)
          );
        } else {
          alert("Failed to delete item");
        }
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
    setConfirmDelete(null); // Close modal
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
        <div className="flex-1 w-full p-6 overflow-auto bg-[#DCDEEA]">
          {/* Header Section */}
          <div className="w-full flex justify-between">
            <div className="text-[#1C359A] text-lg font-bold">
              Order Management
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border-2 border-[#1C359A] text-black font-bold rounded-md hover:bg-white">
                Post
              </button>
              <button
                onClick={handleOpenModal}
                className="px-4 py-2 border-2 border-[#1C359A] text-black font-bold rounded-md hover:bg-white"
              >
                Add Product
              </button>

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
          <div className="p-2 w-full mt-6 rounded-2xl">
            <table className="w-full bg-white opacity-90 rounded-2xl">
              <thead>
                <tr className="border-t border-4 border-[#DCDEEA]">
                  {/**  <th className="px-4 py-2 text-left text-sm text-[#808080]">ID</th> */}
                  <th className="p-3 text-left text-[#808080]">
                    <input type="checkbox" />
                  </th>
                  <th className=" px-4 py-2 text-left text-sm text-[#808080]">
                    Name
                  </th>
                  <th className=" px-4 py-2 text-left text-sm text-[#808080]">
                    Category
                  </th>
                  <th className=" px-4 py-2 text-left text-sm text-[#808080]">
                    Price
                  </th>
                  <th className=" px-4 py-2 text-left text-sm text-[#808080]">
                    Size
                  </th>
                  <th className=" px-4 py-2 text-left text-sm text-[#808080]">
                    Availability
                  </th>
                  <th className=" px-4 py-2 text-left text-sm text-[#808080]">
                    Description
                  </th>
                  <th className=" px-4 py-2 text-left text-sm text-[#808080]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {menuItems.length > 0 ? (
                  menuItems.map((item) => (
                    <tr
                      key={item.food_id}
                      className="border-t border-4 border-[#DCDEEA] hover:bg-gray-100"
                    >
                      {/**  <td className=" px-4 py-2">{item.food_id}</td>  */}
                      <td className="p-3">
                        <input type="checkbox" />
                      </td>
                      <td className="  px-4 py-2">{item.food_name}</td>
                      <td className=" px-4 py-2">{item.category}</td>

                      <td className=" px-4 py-2">₱{item.food_price}</td>
                      <td className=" px-4 py-2">{item.food_size}</td>

                      <td className=" px-4 py-2">{item.availability}</td>

                      <td className=" px-4 py-2">{item.food_description}</td>
                      <td className="px-4 py-2 relative">
                        <button
                          onClick={() => toggleDropdown(item.food_id)}
                          className="p-2"
                        >
                          <FaEllipsisV />
                        </button>
                        {dropdownOpen === item.food_id && (
                          <div className=" absolute right-0 bg-white rounded drop-shadow-lg w-36 z-100">
                            <button
                              onClick={() =>
                                handleAvailabilityChange(
                                  item.food_id,
                                  "Available"
                                )
                              }
                              className=" block w-full text-left px-4 py-2 text-green-600 hover:bg-gray-200"
                            >
                              Available
                            </button>
                            <button
                              onClick={() =>
                                handleAvailabilityChange(
                                  item.food_id,
                                  "Not Available"
                                )
                              }
                              className=" -black mt-2 block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200"
                            >
                              Not Available
                            </button>

                            <button
                              onClick={() => handleDeleteClick(item.food_id)}
                              className="block w-full text-left px-4 py-2 text-black hover:bg-gray-200"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
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
        <div className="fixed inset-0 bg-white-20 bg-opacity-100 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-600 text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold text-blue-800 mb-4">
              New Product
            </h2>

            {/* Image Upload */}
            <div
              onClick={() => document.getElementById("fileInput").click()}
              className="border-2 border-dashed border-gray-300 p-6 flex flex-col items-center cursor-pointer"
            >
              <input
                id="fileInput"
                type="file"
                className="hidden"
                onChange={handleImageChange}
                accept="image/*"
              />
              {previewImage ? (
                <img
                  src={previewImage}
                  className="w-24 h-24 object-cover mb-2 rounded-md "
                  alt="Preview"
                />
              ) : (
                <p className="text-bold text-gray-500 cursor-pointer">
                  Drag or Browse image <br /> or <br />{" "}
                  <span class="text-blue-600 underline cursor-pointer">
                    Browse image
                  </span>
                </p>
              )}
            </div>

            {/* Product Form */}
            <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
              <label className="flex flex-row items-center w-full">
                <div className="text-gray-700 w-1/3">Product name:</div>
                <input
                  type="text"
                  name="food_name"
                  value={formData.food_name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </label>
              <label className="flex flex-row items-center w-full">
                <div className="text-gray-700 w-1/3">Description:</div>
                <textarea
                  name="food_description"
                  value={formData.food_description}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                ></textarea>
              </label>
              <label className="flex flex-row items-center w-full">
                <div className="text-gray-700 w-1/3">Size:</div>
                <select
                  name="food_size"
                  value={formData.food_size}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select size...</option>
                  <option value="Regular">Regular</option>
                  <option value="Tall">Tall</option>
                  <option value="Large">Large</option>
                </select>
              </label>
              <label className="flex flex-row items-center w-full">
                <div className="text-gray-700 w-1/3">Category:</div>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select category</option>
                  <option value="Classic Coffee">Classic Coffee</option>
                  <option value="Frappes">Frappes</option>
                  <option value="Smoothies">Smoothies</option>
                  <option value="Refreshers">Refreshers</option>
                  <option value="Milk Drinks">Milk Drinks</option>
                  <option value="Rice Meals">Rice Meals</option>
                  <option value="Snacks & Pasta">Snacks & Pasta</option>
                </select>
              </label>
              <label className="flex flex-row items-center w-full">
                <div className="text-gray-700 w-1/3">Price (₱):</div>
                <input
                  type="number"
                  name="food_price"
                  value={formData.food_price}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </label>

              <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded-md w-full hover:bg-blue-700"
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-lg">
            <p>Are you sure you want to delete this item?</p>
            <div className="flex justify-end mt-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMenu;
