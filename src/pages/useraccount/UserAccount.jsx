import React, { useState } from 'react';
import UserNavbar from '../../components/UserNavbar';
import Footer from '../../components/Footer';

const UserAccount = () => {
  // ✅ State to enable/disable form fields
  const [isEditing, setIsEditing] = useState(false);

  // ✅ Function to toggle edit mode
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div>
      <UserNavbar />

      <div className="flex flex-row bg-[#1C359A] py-10 px-4 md:px-36 ">
        <div className="flex flex-row absolute -mb-42 md:flex-row">
          <div className="w-40 h-40 shadow-2xl rounded-full bg-white flex items-center justify-center text-[#1C359A] text-2xl md:text-4xl">
            <span id="userInitials">--</span>
          </div>
          <div className="mt-8 md:mt-8 md:ml-4 text-center md:text-left">
            <h2 className="text-lg md:text-xl text-white font-semibold" id="userName">Loading...</h2>
            <p className="text-sm text-white" id="userAddress">Loading...</p>
          </div>
        </div>

        {/* ✅ Toggle edit mode on click */}
        <button 
          id="editProfileBtn" 
          className="md:mt-8 mt-8 md:ml-auto px-4 py-2 bg-white text-black font-bold rounded-md"
          onClick={handleEditClick}
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      <div className="container mx-auto pt-6 px-4 md:px-36 flex flex-col md:flex-row w-full">
        <aside className="w-full mt-12 md:w-64 h-auto md:h-screen py-4 flex flex-col space-y-6">
          <nav className="space-y-4">
            <a id="profile" href="profile.html" className="flex items-center space-x-4">
              <img src="path-to-user-profile-icon.svg" alt="User Profile" className="w-6 h-6"/>
              <span className="font-semibold">User profile</span>
            </a>
            <a id="cart" href="cart.html" className="flex items-center space-x-4 text-gray-800 hover:text-blue-600">
              <img src="path-to-cart-icon.svg" alt="Cart" className="w-6 h-6"/>
              <span className="font-semibold">Cart</span>
            </a>
            <a id="orderstatus" href="orderstatus.html" className="flex items-center space-x-4 text-gray-800 hover:text-blue-600">
              <img src="path-to-order-status-icon.svg" alt="Order Status" className="w-6 h-6"/>
              <span className="font-semibold">Order status</span>
            </a>
            <a id="orderhistory" href="orderhistory.html" className="flex items-center space-x-4 text-gray-800 hover:text-blue-600">
              <img src="path-to-order-history-icon.svg" alt="Order History" className="w-6 h-6"/>
              <span className="font-semibold">Order History</span>
            </a>
          </nav>
          <div className="mt-6">
            <button className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700">
              <img src="path-to-sign-out-icon.svg" alt="Sign Out" className="w-5 h-5 mr-2"/>
              SIGN OUT
            </button>
          </div>
        </aside>

      <div className="container mx-auto pt-6 px-4 md:px-36 flex flex-col md:flex-row w-full">
        <div className="flex-grow ml-0 md:ml-6 p-4">
          <div className="h-full">
            <form id="profileForm" className="flex flex-col h-full space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <input 
                    type="text" 
                    id="firstName" 
                    className={`w-full mt-1 p-2 rounded-md ${isEditing ? 'border' : 'border-none'}`} 
                    placeholder="First Name" 
                    disabled={!isEditing} 
                  />
                </div>
                <div>
                  <input 
                    type="text" 
                    id="lastName" 
                    className={`w-full mt-1 p-2 rounded-md ${isEditing ? 'border' : 'border-none'}`}  
                    placeholder="Last Name" 
                    disabled={!isEditing} 
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <input 
                    type="text" 
                    id="userNameInput" 
                    className={`w-full mt-1 p-2 rounded-md ${isEditing ? 'border' : 'border-none'}`} 
                    placeholder="User Name" 
                    disabled={!isEditing} 
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    id="email" 
                    className={`w-full mt-1 p-2 rounded-md ${isEditing ? 'border' : 'border-none'}`} 
                    placeholder="Email Address" 
                    disabled={!isEditing} 
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <input 
                    type="text" 
                    id="location" 
                    className={`w-full mt-1 p-2 rounded-md ${isEditing ? 'border' : 'border-none'}`} 
                    placeholder="Location" 
                    disabled={!isEditing} 
                  />
                </div>
                <div>
                  <input 
                    type="text" 
                    id="phone" 
                    className={`w-full mt-1 p-2 rounded-md ${isEditing ? 'border' : 'border-none'}`} 
                    placeholder="Phone Number" 
                    disabled={!isEditing} 
                  />
                </div>
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
      </div>
      </div>

      <Footer />
    </div>
  );
}

export default UserAccount;
