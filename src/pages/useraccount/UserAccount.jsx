import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserNavbar from '../../components/UserNavbar';
import Footer from '../../components/Footer';

const UserAccount = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    user_id: '',
    username: '',
    f_name: '',
    l_name: '',
    email: '',
    phone: '',
    address: '',
    profile_pic: '',
  });

  /*fetch user 
  useEffect(() => {
    fetch('http://localhost/capstone-react/api/fetch_user.php', { // Adjust API URL if needed
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setUserData(data.user);
        } else {
          console.error(data.error);
        }
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []);
*/
  //fetch user
  useEffect(() => {
    fetch('http://localhost/capstone-react/api/fetch_user.php', {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        console.log("Fetched user data:", data); // ✅ Debugging
        if (data.success) {
          setUserData({
            ...data.user,
            user_id: data.user.user_id, // ✅ Ensures user_id is stored
          });
        } else {
          console.error("Error: User ID is missing in API response.");
        }
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // ✅ Save Changes
  const handleSave = () => {
    console.log("Sending user data:", userData); // ✅ Debugging

    if (!userData.user_id) {
      alert("User ID is missing in React.");
      return;
    }

    fetch("http://localhost/capstone-react/api/update_user.php", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then(response => response.json())
      .then(data => {
        console.log("Server response:", data); // ✅ Debugging
        if (data.success) {
          alert("Profile updated successfully!");
          setIsEditing(false);
        } else {
          alert("Error updating profile: " + data.error);
        }
      })
      .catch(error => console.error("Error updating user data:", error));
  };

  //upload profile picture
  // ✅ Handle file selection
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // ✅ Upload profile picture
  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("profile_pic", selectedFile);

    fetch("http://localhost/capstone-react/api/upload_profile.php", {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log("Server response:", data);
        if (data.success) {
          setUserData(prev => ({ ...prev, profile_pic: data.profile_pic }));
          alert("Profile picture updated successfully!");
        } else {
          alert("Error uploading profile picture: " + data.error);
        }
      })
      .catch(error => console.error("Error uploading profile picture:", error));
  };

  return (
    <div>
      <UserNavbar />

      <div className="flex flex-row bg-[#1C359A] py-10 px-4 md:px-36 mt-32 ">
        <div className="flex flex-row absolute -mb-42 md:flex-row">
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
                src={`http://localhost/capstone-react/api/${userData.profile_pic}`}
                alt="Profile"
                className={`w-full h-full rounded-full object-cover transition ${isEditing ? "blur-md" : ""
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
                  <label htmlFor="profilePicUpload" className="cursor-pointer flex items-center justify-center w-8 h-8">
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

                {/* Upload Button */}
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
            <h2 className="text-lg md:text-xl text-white font-semibold" id="userName">
              {userData.f_name} {userData.l_name}
            </h2>
            <p className="text-sm text-white" id="userAddress">{userData.address}</p>
          </div>
        </div>

        <button
          id="editProfileBtn"
          className="md:mt-8 mt-8 md:ml-auto px-4 py-2 bg-white text-black font-bold rounded-md"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      <div className="container mx-auto pt-6 px-4 md:px-36 flex flex-col md:flex-row w-full">
        {/**side bar profile section */}
        <aside className="w-full mt-12 md:w-64 h-auto md:h-screen py-4 flex flex-col space-y-6">
          <nav className="space-y-4">
            <Link to="/user/account" className="flex items-center space-x-4 text-gray-800 hover:text-blue-600">
              <span className="font-semibold">User Profile</span>
            </Link>
            <Link to="/user/cart" className="flex items-center space-x-4 text-gray-800 hover:text-blue-600">
              <span className="font-semibold">Cart</span>
            </Link>
            <Link to="/user/orderstatus" className="flex items-center space-x-4 text-gray-800 hover:text-blue-600">
              <span className="font-semibold">Order Status</span>
            </Link>
            <Link to="/user/orderhistory" className="flex items-center space-x-4 text-gray-800 hover:text-blue-600">
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

        {/** main content*/}

        <div className="flex-grow ml-0 md:ml-6 p-4">
          <form id="profileForm" className="flex flex-col h-full space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input type="text" name="f_name" className="w-full p-2 rounded-md border" placeholder="First Name"
                value={userData.f_name || ''} onChange={handleChange} disabled={!isEditing} />
              <input type="text" name="l_name" className="w-full p-2 rounded-md border" placeholder="Last Name"
                value={userData.l_name || ''} onChange={handleChange} disabled={!isEditing} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input type="text" name="username" className="w-full p-2 rounded-md border" placeholder="User Name"
                value={userData.username || ''} onChange={handleChange} disabled={!isEditing} />
              <input type="email" name="email" className="w-full p-2 rounded-md border" placeholder="Email Address"
                value={userData.email || ''} onChange={handleChange} disabled={!isEditing} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input type="text" name="address" className="w-full p-2 rounded-md border" placeholder="Address"
                value={userData.address || ''} onChange={handleChange} disabled={!isEditing} />
              <input type="text" name="phone" className="w-full p-2 rounded-md border" placeholder="Phone Number"
                value={userData.phone || ''} onChange={handleChange} disabled={!isEditing} />
            </div>

            <div className="flex justify-end">
              {isEditing && (
                <button type="button" className="px-4 py-2 bg-green-500 text-white rounded-md" onClick={handleSave}>
                  Save Changes
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserAccount;




