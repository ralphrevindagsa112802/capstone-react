import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEllipsisV } from "react-icons/fa";

const AdminFeedback = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [editingFoodId, setEditingFoodId] = useState(null);

  const [formData, setFormData] = useState({
    food_name: "",
    food_description: "",
    food_size: "",
    food_price: "",
    category: "",
    food_img: null,
  });

  //availability
  const toggleDropdown = (id, size) => {
    setDropdownOpen(prevId => (prevId === `${id}-${size}` ? null : `${id}-${size}`));
  };    
    

  const handleAvailabilityChange = async (id, size, status) => {
    console.log(`Updating availability for ID ${id}, Size ${size} to ${status}`); // Debugging
    await updateAvailability(id, size, status);
    setDropdownOpen(null);
  };  

  //get menu
  useEffect(() => {
    axios.get("http://localhost/capstone-react/api/getMenuItems.php")
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
  

  const handleLogout = () => {
    console.log("Logout function triggered");
    navigate("/admin/logout");
    //  logout functionality here if needed
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPreviewImage(null);
    setEditingFoodId(null);
    setFormData({
      food_name: "",
      food_description: "",
      food_size: "",
      price_small: "",
      price_medium: "",
      price_large: "",
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


  //handling submit form add product and edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("food_name", formData.food_name);
    data.append("food_description", formData.description);
    data.append("food_size", formData.size);
    data.append("price_small", formData.price_small);
    data.append("price_medium", formData.price_medium);
    data.append("price_large", formData.price_large);

    data.append("category", formData.category);
    if (formData.food_img) {
      data.append("food_img", formData.food_img);
    }

    try {
      let response;
      if (editingFoodId) {
        // **Edit Product API Call**
        data.append("food_id", editingFoodId);
        response = await axios.post(
          "http://localhost/capstone-react/api/updateProduct.php",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        // **Add Product API Call**
        response = await axios.post(
          "http://localhost/capstone-react/api/add_product.php",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      if (response.data.success) {
        alert(editingFoodId ? "Product updated successfully!" : "Product added successfully!");
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
      console.error(editingFoodId ? "Error updating product:" : "Error adding product:", error);
      alert(editingFoodId ? "Failed to update product." : "Failed to add product.");
    }
  };

  //availability
  const updateAvailability = async (id, size, status) => {
    try {
      const response = await axios.post(
        "http://localhost/capstone-react/api/updateAvailability.php",
        {
          food_id: id,
          size: size.toLowerCase(), // Ensure lowercase to match PHP handling
          availability: status,
        }
      );
  
      if (response.data.success) {
        // ✅ Update state correctly for each size
        setMenuItems((prevItems) =>
          prevItems.map((item) => {
            if (item.food_id === id) {
              return {
                ...item,
                [`availability_${size.toLowerCase()}`]: status, // Update only the correct size
              };
            }
            return item;
          })
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


  //edit item
  // Open Edit Modal and populate form
  const handleEditItem = (food_id) => {
    setIsModalOpen(false); // Close any existing modal before opening a new one
  
    setTimeout(() => {
      const itemToEdit = menuItems.find((item) => item.food_id === food_id);
      if (itemToEdit) {
        setFormData({
          food_name: itemToEdit.food_name,
          food_description: itemToEdit.food_description,
          food_size: itemToEdit.food_size || "",
          category: itemToEdit.category || "",
          price_small: itemToEdit.price_small || "",
          price_medium: itemToEdit.price_medium || "",
          price_large: itemToEdit.price_large || "",
        });
        setPreviewImage(itemToEdit.food_image);
        setEditingFoodId(food_id);
        setIsModalOpen(true);
      }
    }, 50); // Small delay ensures modal resets before reopening
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
          <Link to={"/admin/logout"} onClick={handleLogout}>
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
              Feedback
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
                    Email
                  </th>
                  <th className=" px-4 py-2 text-left text-sm text-[#808080]">
                    Feedback
                  </th>
                  <th className=" px-4 py-2 text-left text-sm text-[#808080]">
                    Comment
                  </th>
                </tr>
              </thead>
                <tbody> {/**feedback table here */}
                  
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFeedback;
