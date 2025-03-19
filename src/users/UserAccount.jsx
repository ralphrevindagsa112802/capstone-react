import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar';
import Footer from '../components/Footer';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';

const UserAccount = () => {
  const [points, setPoints] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [userData, setUserData] = useState({

    id: '',
    username: '',
    f_name: '',
    l_name: '',
    email: '',
    phone: '',
    address: '',
    profile_pic: '',
  });

   // Helper function to check if a link is active
   const isActive = (path) => {
    return location.pathname === path;
  };

  //edit password

  // State for password change
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });

  const [isEditingPassword, setIsEditingPassword] = useState(false);
  // Handle password input change
  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  /*fetch user 
  useEffect(() => {
    fetch('https://yappari-coffee-bar.shop/api/fetch_user ', { // Adjust API URL if needed
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
    fetch('https://yappari-coffee-bar.shop/api/getUser', {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        console.log("Fetched user data:", data); // ✅ Debugging
        if (data.success) {
          setUserData({
            ...data.user,
            user_id: data.user.id, // ✅ Ensures user_id is stored
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
      Swal.fire({
        title: 'Error!',
        text: 'User ID is missing in React.',
        icon: 'error',
        confirmButtonText: 'OK',
        timer: 3000,
      })
      return;
    }
    

    //handle update user
    fetch("https://yappari-coffee-bar.shop/api/update_user", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then(response => response.json())
      .then(data => {
        console.log("Server response:", data); // ✅ Debugging
        if (data.success) {
          Swal.fire({
            title: 'Success!',
            text: 'Profile updated successfully!',
            icon: 'success',
            timer: 3000,
          })
          setIsEditing(false);
        } else {
          Swal.fire({
            title: 'Success!',
            text: `Error updating profile: ${data.error}`,
            icon: 'error',
            confirmButtonText: 'OK',
          })
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
      Swal.fire({
        title: 'Warning!',
        text: 'Please select a file to upload.',
        icon: 'warning',
        confirmButtonText: 'OK',
      })
      return;
    }

    const formData = new FormData();
    formData.append("profile_pic", selectedFile);

    fetch("https://yappari-coffee-bar.shop/api/upload_profile", {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then(response => response.json())
      .then(data => {

        if (data.success) {
          setUserData(prev => ({ ...prev, profile_pic: data.profile_pic }));
          Swal.fire("Success", `Profile picture updated successfully!`, "success", {timer: 3000});
        } else {
          Swal.fire("Error", `Error uploading profile picture: ${data.error}`, "error", {timer: 3000});
        }
      })
      .catch(error => console.error("Error uploading profile picture:", error));
  };

  // Handle password update
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    console.log("Updating password..."); // Debugging

    if (!passwordData.current_password || !passwordData.new_password || !passwordData.confirm_password) {
      Swal.fire("Warning", `Please fill in all fields.`, "warning", {timer: 3000});
      return;
    }

    if (passwordData.new_password !== passwordData.confirm_password) {
      Swal.fire("Warning", `New passwords do not match.`, "warning", {timer: 3000});
      return;
    }

    try {
      fetch('https://yappari-coffee-bar.shop/api/change_password', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passwordData),
      })
        .then(response => response.json())
        .then(data => {
          console.log("API Response:", data); // Debugging

          if (data.success) {
            setTimeout(() => {
              Swal.fire("Success", `Password updated successfully!`, "success", {timer: 3000}); // ✅ Ensure alert is shown
            }, 100);

            setPasswordData({ current_password: '', new_password: '', confirm_password: '' });
            setIsEditingPassword(false);
          } else {
            Swal.fire("Error", `Error: ${data.error}`, "error", {timer: 3000});
          }
        })
    } catch (error) {
      console.error('Error updating password:', error);
      Swal.fire("Error", `Something went wrong. Please try again.`, "error", {timer: 3000});
    }
  };

      // Fetch user points
  useEffect(() => {
    // Fetch user points
    fetch("https://yappari-coffee-bar.shop/api/getUser?action=get_points", {
      credentials: "include"
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setPoints(Number(data.points));
        }
      })
      .catch(error => console.error("Error fetching points:", error));
  }, []);


  function ScrollToTop() {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  }
  return (
    <div className='bg-[#DCDEEA]'>
      <UserNavbar />

      {/**header and sidebar */}
      <div className="flex flex-col md:flex-row bg-[#1C359A] py-10 px-4 md:px-36 mt-18 md:mt-32 ">
        <div className="flex flex-col md:flex-row md:items-start items-center md:absolute md:-mb-42">
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
                src={`https://yappari-coffee-bar.shop/api/${userData.profile_pic}`}
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


                {/* Upload Button                                 */}

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
            <p className="text-xs text-white" id="userPoints">Points: {typeof points === 'number' ? points.toFixed(1) : '0.0'}</p>
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

      <div className="container mx-auto pt-6 md:px-52 flex flex-col md:flex-row w-full">
        {/**side bar profile section */}
        <aside className="fixed md:relative bottom-0 left-0 w-full md:w-64 md:h-screen  z-10 md:z-0">
          {/* Mobile Bottom Navigation Bar */}
          <div className="md:hidden flex justify-around items-center h-16 border-t border-gray-200 bg-white">
            <Link
              to="/user/account"
              className={`flex flex-col items-center justify-center w-1/4 py-2 ${
                isActive('/user/account') ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600 active:text-blue-800'
              }`}
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span className="text-xs mt-1">Profile</span>
            </Link>
            <Link
              to="/user/cart"
              className={`flex flex-col items-center justify-center w-1/4 py-2 ${
                isActive('/user/cart') ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600 active:text-blue-800'
              }`}
              onClick={() => {
                window.scrollTo(0, 0);
              }}            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
              </svg>
              <span className="text-xs mt-1">Cart</span>
            </Link>
            <Link
              to="/user/status"
              className={`flex flex-col items-center justify-center w-1/4 py-2 ${
                isActive('/user/status') ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600 active:text-blue-800'
              }`}
              onClick={() => {
                window.scrollTo(0, 0);
              }}            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="text-xs mt-1">Status</span>
            </Link>
            <Link
              to="/user/history"
              className={`flex flex-col items-center justify-center w-1/4 py-2 ${
                isActive('/user/history') ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600 active:text-blue-800'
              }`}
              onClick={() => {
                window.scrollTo(0, 0);
              }}            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-xs mt-1">History</span>
            </Link>

            <Link
              to="/"
              className={`flex flex-col items-center justify-center w-1/4 py-2 ${
                isActive('/') ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600 active:text-blue-800'
              }`}
              onClick={() => {
                window.scrollTo(0, 0);
              }}            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
              <span className="text-xs mt-1">Sign Out</span>
            </Link>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden md:mt-12 md:w-64 md:flex md:flex-col h-full pt-4 py-4 space-y-6 ">
            <nav className="space-y-4">
              <Link
                to="/user/account"
                className={`flex items-center space-x-4 ${
                  isActive('/user/account') ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600 active:text-blue-800'
                } transition-colors duration-200`}              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">User Profile</span>
              </Link>
              <Link
                to="/user/cart"
                className={`flex items-center space-x-4 ${
                  isActive('/user/cart') ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600 active:text-blue-800'
                } transition-colors duration-200`}              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                </svg>
                <span className="font-semibold">Cart</span>
              </Link>
              <Link
                to="/user/status"
                className={`flex items-center space-x-4 ${
                  isActive('/user/status') ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600 active:text-blue-800'
                } transition-colors duration-200`}              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Order Status</span>
              </Link>
              <Link
                to="/user/history"
                className={`flex items-center space-x-4 ${
                  isActive('/user/history') ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600 active:text-blue-800'
                } transition-colors duration-200`}              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                  <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Order History</span>
              </Link>
            </nav>
            <div className="mt-6">
              <button className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                </svg>
                SIGN OUT
              </button>
            </div>
          </div>
        </aside>
        {/**end of header and sidebar */}



        {/** main content*/}

        <div className="flex-grow ml-0 md:ml-6 p-4">
          <form id="profileForm" className="flex flex-col h-full space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="f_name" className="block text-[#1C359A] font-bold">First Name</label>
                <input type="text" id="f_name" name="f_name" className={`w-full p-2 rounded-md bg-white mt-2 ${isEditing ? 'text-black' : 'text-[#ABB1BB]'}`}
                  placeholder="First Name" value={userData.f_name || ''} onChange={handleChange} disabled={!isEditing} />
              </div>

              <div>
                <label htmlFor="l_name" className="block text-[#1C359A] font-bold">Last Name</label>
                <input type="text" id="l_name" name="l_name" className={`w-full p-2 rounded-md bg-white mt-2 ${isEditing ? 'text-black' : 'text-[#ABB1BB]'}`}
                  placeholder="Last Name" value={userData.l_name || ''} onChange={handleChange} disabled={!isEditing} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="username" className="block text-[#1C359A] font-bold">Username</label>
                <input type="text" id="username" name="username" className={`w-full p-2 rounded-md bg-white mt-2 ${isEditing ? 'text-black' : 'text-[#ABB1BB]'}`}
                  placeholder="User Name" value={userData.username || ''} onChange={handleChange} disabled={!isEditing} />
              </div>

              <div>
                <label htmlFor="email" className="block text-[#1C359A] font-bold">Email Address</label>
                <input type="email" id="email" name="email" className={`w-full p-2 rounded-md bg-white mt-2 ${isEditing ? 'text-black' : 'text-[#ABB1BB]'}`}
                  placeholder="Email Address" value={userData.email || ''} onChange={handleChange} disabled={!isEditing} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="address" className="block text-[#1C359A] font-bold">Address</label>
                <input type="text" id="address" name="address" pattern=".*[Cc][Ii][Tt][Yy].*"  title="Please enter a full address including the word 'City'" required className={`w-full p-2 rounded-md bg-white mt-2 ${isEditing ? 'text-black' : 'text-[#ABB1BB]'}`}
                  placeholder="Full Address (including City)" value={userData.address || ''} onChange={handleChange} disabled={!isEditing} />
                 <p className="text-xs text-gray-500 mt-1">Example: 55 Guadalupe Taguig City</p>
              </div>

              <div>
                <label htmlFor="phone" className="block text-[#1C359A] font-bold">Phone Number</label>
                <input type="text" id="phone" name="phone" pattern="09[0-9]{9}" title="Phone number must start with 09 and be 11 digits long" required className={`w-full p-2 rounded-md bg-white mt-2 ${isEditing ? 'text-black' : 'text-[#ABB1BB]'}`}
                  placeholder="Phone Number (09XXXXXXXXX)" value={userData.phone || ''} onChange={handleChange} disabled={!isEditing} />
                <p className="text-xs text-gray-500 mt-1">Example: 09123456789</p>
              </div>
            </div>


            <div className="flex justify-end">
              {isEditing && (
                <button type="button" className="px-4 py-2 bg-green-500 text-white rounded-md" onClick={handleSave}>
                  Save Changes
                </button>
              )}
            </div>

            {isEditingPassword ? (
              <div className="flex flex-col space-y-3 mt-2">
                <h3 className="text-md font-semibold text-[#1C359A]">Change Password</h3>
                <input
                  type="password"
                  name="current_password"
                  placeholder="Current Password"
                  value={passwordData.current_password}
                  onChange={handlePasswordChange}
                  className="p-2 bg-white rounded-md"
                />
                <input
                  type="password"
                  name="new_password"
                  placeholder="New Password"
                  value={passwordData.new_password}
                  onChange={handlePasswordChange}
                  className="p-2 bg-white rounded-md"
                />
                <input
                  type="password"
                  name="confirm_password"
                  placeholder="Confirm New Password"
                  value={passwordData.confirm_password}
                  onChange={handlePasswordChange}
                  className="p-2 bg-white rounded-md"
                />
                <button
                  onClick={handlePasswordUpdate}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Save Password
                </button>
                <button
                  onClick={() => setIsEditingPassword(false)}
                  className="text-red-500 text-sm mt-2"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditingPassword(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-2"
              >
                Change Password
              </button>
            )}
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default UserAccount;




