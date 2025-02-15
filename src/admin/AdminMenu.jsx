import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminMenu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/capstone-react/api/getMenuItems.php") // Change to your actual API URL
      .then((response) => {
        setMenuItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
      });
  }, []);


  
  return (


    
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Menu Management</h2>
      <table className="min-w-full bg-white border border-gray-300">
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
          {menuItems.map((item) => (
            <tr key={item.food_id}>
              <td className="border px-4 py-2">{item.food_id}</td>
              <td className="border px-4 py-2">{item.food_name}</td>
              <td className="border px-4 py-2">{item.food_description}</td>
              <td className="border px-4 py-2">{item.food_size}</td>
              <td className="border px-4 py-2">₱{item.food_price}</td>
              <td className="border px-4 py-2">
                {item.food_img ? (
                  <img
                    src={`http://localhost/your-image-folder/${item.food_img}`} // Adjust path based on storage method
                    alt={item.food_name}
                    className="w-16 h-16 object-cover"
                  />
                ) : (
                  "No Image"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMenu;
