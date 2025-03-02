import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar';
import Footer from '../components/Footer';
import Swal from 'sweetalert2';

const UserAccount = () => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
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

  useEffect(() => {
    fetch("http://localhost/yappari-coffee-bar-api/api/check_user_session.php", {
        credentials: "include", // ✅ Sends session cookie
    })
    .then((res) => res.json())
    .then((data) => {
        if (!data.success) {
            navigate("/login");
        }
    })
    .catch(() => navigate("/login"));
  }, [navigate]);

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
    fetch('http://localhost/yappari-coffee-bar-api/api/getUser.php', {
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
      })
      return;
    }

    fetch("http://localhost/yappari-coffee-bar-api/api/update_user.php", {
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
            timer: 2000,
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

    fetch("http://localhost/yappari-coffee-bar-api/api/upload_profile.php", {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then(response => response.json())
      .then(data => {

        if (data.success) {
          setUserData(prev => ({ ...prev, profile_pic: data.profile_pic }));
          alert("Profile picture updated successfully!");
        } else {
          alert("Error uploading profile picture: " + data.error);
        }
      })
      .catch(error => console.error("Error uploading profile picture:", error));
  };

  // Handle password update
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    console.log("Updating password..."); // Debugging
  
    if (!passwordData.current_password || !passwordData.new_password || !passwordData.confirm_password) {
      window.alert('Please fill in all fields.');
      return;
    }
  
    if (passwordData.new_password !== passwordData.confirm_password) {
      window.alert('New passwords do not match.');
      return;
    }

    try{
      fetch('http://localhost/yappari-coffee-bar-api/api/change_password.php', {
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
              window.alert('Password updated successfully!'); // ✅ Ensure alert is shown
            }, 100);
    
            setPasswordData({ current_password: '', new_password: '', confirm_password: '' });
            setIsEditingPassword(false);
          } else {
            window.alert('Error: ' + data.error);
          }
        })
    } catch (error) {
      console.error('Error updating password:', error);
      window.alert('Something went wrong. Please try again.');
    }
  };  

  return (
    <div className='bg-[#DCDEEA]'>
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
                src={`http://localhost/yappari-coffee-bar-api/api/${userData.profile_pic}`}
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
            <Link to="/user/status" className="flex items-center space-x-4 text-gray-800 hover:text-blue-600">
              <span className="font-semibold">Order Status</span>
            </Link>
            <Link to="/user/history" className="flex items-center space-x-4 text-gray-800 hover:text-blue-600">
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
                <input type="text" id="address" name="address" className={`w-full p-2 rounded-md bg-white mt-2 ${isEditing ? 'text-black' : 'text-[#ABB1BB]'}`}
                  placeholder="Address" value={userData.address || ''} onChange={handleChange} disabled={!isEditing} />
              </div>

              <div>
                <label htmlFor="phone" className="block text-[#1C359A] font-bold">Phone Number</label>
                <input type="text" id="phone" name="phone" className={`w-full p-2 rounded-md bg-white mt-2 ${isEditing ? 'text-black' : 'text-[#ABB1BB]'}`}
                  placeholder="Phone Number" value={userData.phone || ''} onChange={handleChange} disabled={!isEditing} />
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




