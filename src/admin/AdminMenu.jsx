import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEllipsisV } from "react-icons/fa";

const sizeLabels = {
  "Rice Meal": { small: "Regular", medium: "Large", large: "Extra Large" },
  "Classic Coffee": { small: "Small", medium: "Medium", large: "Large" },
  "Frappes": { small: "Small", medium: "Medium", large: "Large" },
  "Smoothies": { small: "Small", medium: "Medium", large: "Large" },
  "Refreshers": { small: "Small", medium: "Medium", large: "Large" },
  "Milk Drinks": { small: "Small", medium: "Medium", large: "Large" },
  "Dessert": { small: "Regular" }, // Only one size
  "Snacks and Pasta": { small: "Regular", medium: "Large", large: "Extra Large" }
};


const AdminMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [editingFoodId, setEditingFoodId] = useState(null);

  const [formData, setFormData] = useState({
    food_name: "",
    description: "",
    food_size: "",
    food_price: "",
    category: "",
    food_img: null,
  });


  const toggleDropdown = (id, size) => {
    setDropdownOpen(prevId => (prevId === `${id}-${size}` ? null : `${id}-${size}`));
  };    
    

  // Availability
  const handleAvailabilityChange = async (id, size, status) => {
    console.log("Sending Availability Update:", { id, size, status }); // ✅ Debug request

    try {
        const response = await axios.post(
            "https://yappari-coffee-bar-system.free.nf/yappari-coffee-bar-api/api/updateAvailability.php",
            {
                food_id: id,
                size: size.toLowerCase(), // ✅ Ensure lowercase match
                availability: status
            },
            {
                withCredentials: true,
                headers: { "Content-Type": "application/json" }
            }
        );

        console.log("Update Response:", response.data); // ✅ Debug API response

        if (response.data.success) {
            alert("Availability updated successfully!");
            setMenuItems((prevItems) =>
                prevItems.map((item) =>
                    item.food_id === id
                        ? { ...item, [`availability_${size.toLowerCase()}`]: status }
                        : item
                )
            
            );
        } else {
            alert("Failed to update availability: " + response.data.message);
        }
    } catch (error) {
        console.error("Error updating availability:", error);
        alert("Error: Could not update availability.");
    }
  };


  //get menu
  useEffect(() => {
    axios.get("https://yappari-coffee-bar-system.free.nf/yappari-coffee-bar-api/api/getMenuItems.php")
      .then((response) => {
        if (response.data.success) { // ✅ Ensure `success` is checked
          setMenuItems(response.data.data); // ✅ Access `data`
        } else {
          console.error("Error fetching menu items:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-menu") && !event.target.closest(".action-button")) {
        setDropdownOpen(null);
      }
    };
  
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogout = async () => {
    try {
        await fetch("https://yappari-coffee-bar-system.free.nf/yappari-coffee-bar-api/api/admin_logout.php", {
            method: "POST",
            credentials: "include",
        });

        navigate("/admin/login");
    } catch (error) {
        console.error("Logout failed:", error);
    }
};

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPreviewImage(null);

    if (!editingFoodId) {  // ✅ Only reset form if NOT editing
        setFormData({
            food_name: "",
            description: "",
            category: "",
            price_small: "",
            price_medium: "",
            price_large: "",
            food_img: null,
        });
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Update form data with the new image file
      setFormData({ ...formData, food_img: file });
  
      // Create a temporary URL for the uploaded file for preview
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting Form...");
    console.log("Editing Food ID:", editingFoodId);
    console.log("Form Data:", formData);

    if (!formData.food_name || !formData.category) {
        alert("Error: Required fields missing!");
        return;
    }

    // Create FormData object
    const data = new FormData();
    data.append("food_name", formData.food_name);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("price_small", formData.price_small || "");
    data.append("price_medium", formData.price_medium || "");
    data.append("price_large", formData.price_large || "");

    // Append the image file if it exists
    if (formData.food_img) {
        data.append("food_img", formData.food_img);
    } else if (formData.image_path) {
        data.append("existing_image", formData.image_path);
    }

    try {
        let response;
        if (editingFoodId) {
            data.append("food_id", editingFoodId);
            response = await axios.post(
                "https://yappari-coffee-bar-system.free.nf/yappari-coffee-bar-api/api/updateProduct.php",
                data,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true, // ✅ Ensure session cookies are sent
                }
            );
        } else {
            response = await axios.post(
                "https://yappari-coffee-bar-system.free.nf/yappari-coffee-bar-api/api/add_product.php",
                data,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true, // ✅ Ensure session cookies are sent
                }
            );
        }

        console.log("Server Response:", response.data); // ✅ Debug response

        if (response.data.success) {
            alert(response.data.message || "Product updated successfully!");
            handleCloseModal();
            window.location.reload();
        } else {
            alert(response.data.message || "Failed to update product.");
        }
    } catch (error) {
        console.error(editingFoodId ? "Error updating product:" : "Error adding product:", error);
        alert(editingFoodId ? "Failed to update product." : "Failed to add product.");
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
          "https://yappari-coffee-bar-system.free.nf/yappari-coffee-bar-api/api/delete_food.php",
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



  // Open Edit Modal and populate form
  const handleEditItem = (food_id) => {
    console.log("Clicked Edit - Food ID:", food_id); // ✅ Debug

    const itemToEdit = menuItems.find((item) => item.food_id === food_id);
    if (!itemToEdit) {
        console.error("Error: Item not found!", { food_id, menuItems });
        return;
    }

    setFormData({
        food_name: itemToEdit.food_name,
        description: itemToEdit.description,
        category: itemToEdit.category,
        price_small: itemToEdit.price_small || "",
        price_medium: itemToEdit.price_medium || "",
        price_large: itemToEdit.price_large || "",
    });

    setPreviewImage(itemToEdit.image_path);
    setEditingFoodId(food_id); // ✅ Ensure Food ID is set
    console.log("Set Editing Food ID:", food_id); // ✅ Debugging
    setIsModalOpen(true);
  };


  



  return (
    <div className="flex flex-col h-screen bg-[#DCDEEA]">
      {/* Navbar */}
      <div className="w-full flex items-center justify-between py-4 px-12 shadow-md bg-white">
        <div className="flex items-center justify-center md:justify-start w-full md:w-auto">
          <img
            className="h-20 w-auto object-contain block"
            src="/img/YCB LOGO (BLUE).png"
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
          <Link to={"/admin/login"} onClick={handleLogout}>
            <button
              className="mt-20 font-bold flex items-center justify-center bg-[#1C359A] text-white px-18 py-2 rounded-lg hover:bg-blue-800"
            >
              SIGN OUT
            </button>
          </Link>
        </div>

        {/* Main Content (Menu Management) */}
        <div className="flex-1 w-full p-6 overflow-auto bg-[#DCDEEA]">
          {/* Header Section */}
          <div className="w-full flex justify-between">
            <div className="text-[#1C359A] text-lg font-bold">
              Order Management
            </div>
            <div className="flex gap-2">
            {/** <button className="px-4 py-2 border-2 border-[#1C359A] text-black font-bold rounded-md hover:bg-white">
                Post
              </button>
            */}  
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
                  {menuItems && menuItems.length > 0 ? (
                    menuItems.flatMap((item) => {                      
                      // Get category-specific labels or fallback to default
                      const labels = sizeLabels[item.category] || { small: "Small", medium: "Medium", large: "Large" };
                      
                      const sizes = [
                        { size: labels.small, dbKey: "small", price: item.price_small },
                        { size: labels.medium, dbKey: "medium", price: item.price_medium },
                        { size: labels.large, dbKey: "large", price: item.price_large }
                      ].filter(s => s.price !== null); // ✅ Remove sizes with no price
                      
                      return sizes.map((sizeItem, index) => (
                        <tr
                          key={`${item.food_id}-${sizeItem.size}`} // Unique key using food_id and size
                          className="border-t border-4 border-[#DCDEEA] hover:bg-gray-100"
                        >
                          <td className="p-3">
                            <input type="checkbox" />
                          </td>
                          <td className="px-4 py-2">{item.food_name}</td>
                          <td className="px-4 py-2">{item.category}</td>
                          <td className="px-4 py-2">₱{sizeItem.price}</td>
                          <td className="px-4 py-2">{sizeItem.size}</td>
                          <td className="px-4 py-2 font-black text-[#1C359A]">
                            <span
                              className={`font-bold ${
                                item[`availability_${sizeItem.dbKey}`] === "Available"
                                  ? "text-blue-600"
                                  : "text-red-600"
                              }`}
                            >
                              {item[`availability_${sizeItem.dbKey}`] || "Not Available"}
                            </span>
                          </td>


                          <td className="px-4 py-2">{item.description}</td>
                          <td className="px-4 py-2 relative">
                            <button 
                              onClick={(e) => { e.stopPropagation(); toggleDropdown(item.food_id, sizeItem.size); }} 
                              className="p-2 action-button">
                              <FaEllipsisV />
                            </button>

                            {dropdownOpen === `${item.food_id}-${sizeItem.size}` && (
                              <div className="absolute right-0 bg-white rounded drop-shadow-lg w-36 z-50 dropdown-menu">
                                <button 
                                  onClick={() => handleEditItem(item.food_id)} 
                                  className="block w-full text-left px-4 py-2 text-black hover:bg-gray-200">
                                  Edit
                                </button>
                                <button onClick={() => handleAvailabilityChange(item.food_id, sizeItem.size, "Available")} className="block w-full text-left px-4 py-2 text-green-600 hover:bg-gray-200">
                                  Available
                                </button>
                                <button onClick={() => handleAvailabilityChange(item.food_id, sizeItem.size, "Not Available")} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200">
                                  Not Available
                                </button>
                                <button onClick={() => handleDeleteClick(item.food_id)} className="block w-full text-left px-4 py-2 text-black hover:bg-gray-200">
                                  Delete
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ));
                    })
                  ) : (
                    <tr>
                      <td colSpan="8" className="border px-4 py-2 text-center text-gray-500">
                        No menu items available
                      </td>
                    </tr>
                  )}
                </tbody>
            </table>
          </div>
        </div>
      </div>

      {/**popup ADD product and EDIT  */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-white-20 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative">
            {/* Close Button */}
            <button onClick={handleCloseModal} className="absolute top-3 right-3 text-gray-600 text-xl">
              &times;
            </button>

            {/* Dynamic Modal Title */}
            <h2 className="text-xl font-bold text-blue-800 mb-4">
              {editingFoodId ? "Editing Product" : "New Product"}
            </h2>

            {/* Image Upload Section */}
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
                  className="w-24 h-24 object-cover mb-2 rounded-md"
                  alt="Preview"
                />
              ) : (
                <p className="text-bold text-gray-500 cursor-pointer">
                  Drag or Browse image <br /> or <br />{" "}
                  <span className="text-blue-600 underline cursor-pointer">
                    Browse image
                  </span>
                </p>
              )}
            </div>

            {/* Form Fields */}
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
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                ></textarea>
              </label>

              <label className="flex flex-row items-center w-full">
                <div className="text-gray-700 w-1/3">Category:</div>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select a Category</option> {/* Default Placeholder */}
                  <option value="Rice Meal">Rice Meal</option>
                  <option value="Classic Coffee">Classic Coffee</option>
                  <option value="Frappes">Frappes</option>
                  <option value="Smoothies">Smoothies</option>
                  <option value="Refreshers">Refreshers</option>
                  <option value="Milk Drinks">Milk Drinks</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Snacks and Pasta">Snacks and Pasta</option>
                </select>
              </label>


              {/* Price Fields */}
              <label className="flex flex-row items-center w-full">
                <div className="text-gray-700 w-1/3">Small Price (₱):</div>
                <input
                  type="number"
                  name="price_small"
                  value={formData.price_small}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </label>
              <label className="flex flex-row items-center w-full">
                <div className="text-gray-700 w-1/3">Medium Price (₱):</div>
                <input
                  type="number"
                  name="price_medium"
                  value={formData.price_medium}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </label>
              <label className="flex flex-row items-center w-full">
                <div className="text-gray-700 w-1/3">Large Price (₱):</div>
                <input
                  type="number"
                  name="price_large"
                  value={formData.price_large}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded-md w-full hover:bg-blue-700"
              >
                {editingFoodId ? "Update Product" : "Add Product"}
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
