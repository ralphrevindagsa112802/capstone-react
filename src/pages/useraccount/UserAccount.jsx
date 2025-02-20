import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserNavbar from '../../components/UserNavbar';
import Footer from '../../components/Footer';

const UserAccount = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    f_name: '',
    l_name: '',
    email: '',
    phone: '',
    address: '',
  });

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

  return (
    <div>
      <UserNavbar />
      
      <div className="flex flex-row bg-[#1C359A] py-10 px-4 md:px-36 mt-32 ">
        <div className="flex flex-row absolute -mb-42 md:flex-row">
          <div className="w-40 h-40 shadow-2xl rounded-full bg-white flex items-center justify-center text-[#1C359A] text-2xl md:text-4xl">
            <span id="userInitials">{userData.f_name.charAt(0) + userData.l_name.charAt(0)}</span>
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
              <input 
                type="text" 
                id="firstName" 
                className={`w-full mt-1 p-2 rounded-md ${isEditing ? 'border' : 'border-none'}`} 
                placeholder="First Name"
                value={userData.f_name} 
                disabled={!isEditing} 
              />
              <input 
                type="text" 
                id="lastName" 
                className={`w-full mt-1 p-2 rounded-md ${isEditing ? 'border' : 'border-none'}`}  
                placeholder="Last Name" 
                value={userData.l_name}
                disabled={!isEditing} 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input 
                type="text" 
                id="userNameInput" 
                className={`w-full mt-1 p-2 rounded-md ${isEditing ? 'border' : 'border-none'}`} 
                placeholder="User Name"
                value={userData.username} 
                disabled={!isEditing} 
              />
              <input 
                type="email" 
                id="email" 
                className={`w-full mt-1 p-2 rounded-md ${isEditing ? 'border' : 'border-none'}`} 
                placeholder="Email Address"
                value={userData.email} 
                disabled={!isEditing} 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input 
                type="text" 
                id="location" 
                className={`w-full mt-1 p-2 rounded-md ${isEditing ? 'border' : 'border-none'}`} 
                placeholder="Address"
                value={userData.address} 
                disabled={!isEditing} 
              />
              <input 
                type="text" 
                id="phone" 
                className={`w-full mt-1 p-2 rounded-md ${isEditing ? 'border' : 'border-none'}`} 
                placeholder="Phone Number"
                value={userData.phone} 
                disabled={!isEditing} 
              />
            </div>

            <div className="flex justify-end">
              {isEditing && (
                <button 
                  type="button" 
                  id="saveProfileBtn" 
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                  onClick={() => setIsEditing(false)}
                >
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
