import React from "react";
import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar';
import Footer from '../components/Footer';
import { CartContext } from "../context/CartContext";
import Swal from 'sweetalert2';

const UserAccount = () => {
  const [points, setPoints] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const { logoutUser } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Add this CSS to your component or import it from a style file
  // This can go at the top of the component or in a separate CSS file
  const rewardStyles = `
.reward-popup-container {
  font-family: 'Poppins', sans-serif;
}

.reward-popup {
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.reward-title {
  font-weight: 700;
  color: #1C359A;
}

.reward-confirm-btn, .reward-cancel-btn {
  border-radius: 0.5rem;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  transition: all 0.2s;
}

.reward-confirm-btn:hover, .reward-cancel-btn:hover {
  transform: translateY(-2px);
}
`;

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
          Swal.fire("Success", `Profile picture updated successfully!`, "success", { timer: 3000 });
        } else {
          Swal.fire("Error", `Error uploading profile picture: ${data.error}`, "error", { timer: 3000 });
        }
      })
      .catch(error => console.error("Error uploading profile picture:", error));
  };

  // Handle password update
  const handlePasswordUpdate = (e) => {
    e.preventDefault();

    if (!passwordData.current_password || !passwordData.new_password || !passwordData.confirm_password) {
      Swal.fire("Warning", `Please fill in all fields.`, "warning", { timer: 3000 });
      return;
    }

    if (passwordData.new_password !== passwordData.confirm_password) {
      Swal.fire("Warning", `New passwords do not match.`, "warning", { timer: 3000 });
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

          if (data.success) {
            setTimeout(() => {
              Swal.fire("Success", `Password updated successfully!`, "success", { timer: 3000 }); // ✅ Ensure alert is shown
            }, 100);

            setPasswordData({ current_password: '', new_password: '', confirm_password: '' });
            setIsEditingPassword(false);
          } else {
            Swal.fire("Error", `Error: ${data.error}`, "error", { timer: 3000 });
          }
        })
    } catch (error) {
      console.error('Error updating password:', error);
      Swal.fire("Error", `Something went wrong. Please try again.`, "error", { timer: 3000 });
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

  // Ensure this is in your existing useEffect for fetching points
  useEffect(() => {
    // Fetch user points
    fetch("https://yappari-coffee-bar.shop/api/getUser?action=get_points", {
      credentials: "include"
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          setPoints(Number(data.points));
          console.log("Points loaded:", data.points); // Debug log
        } else {
          console.error("Error loading points:", data.error);
        }
      })
      .catch(error => {
        console.error("Error fetching points:", error);
      });
  }, []);

  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  // Modified handleClaimReward function to ensure consistent reward code
const handleClaimReward = () => {
    // Make sure points is treated as a number and compared correctly
    const numPoints = Number(points);
    console.log("Current points before claim:", numPoints);

  // First verify the user has enough points
  if (points < 1) {
    Swal.fire({
      title: 'Not Enough Points',
      text: 'You need 1 points to claim a free coffee.',
      icon: 'warning',
      confirmButtonColor: '#1C359A',
    });
    return;
  }

  // Generate reward code ONCE here, and it will be used throughout the process
  const rewardCode = Date.now().toString().slice(-6);

  // Show enhanced loyalty card popup
  Swal.fire({
    title: '',
    html: `
      <div class="bg-gradient-to-b from-amber-100 to-amber-200 p-6 rounded-lg border-2 border-amber-600 shadow-lg max-w-md mx-auto">
        <div class="text-center mb-5">
          <h3 class="text-2xl font-bold text-amber-800">YAPPARI COFFEE BAR</h3>
          <p class="text-amber-700 font-medium">LOYALTY REWARD</p>
        </div>
        
        <div class="bg-white rounded-lg p-6 shadow-xl border border-amber-300">
          <div class="flex items-center justify-center mb-4">
            <div class="bg-amber-100 rounded-full p-3">
              <span class="text-4xl">☕</span>
            </div>
          </div>
          
          <div class="text-center mb-6">
            <h4 class="text-2xl font-bold text-amber-800 mb-1">FREE COFFEE</h4>
            <p class="text-amber-700">Congratulations on your achievement!</p>
          </div>
          
          <div class="flex justify-between items-center mb-4 bg-amber-50 p-3 rounded-lg">
            <div class="text-left">
              <p class="text-sm text-gray-600 font-medium">REWARD CODE</p>
              <p class="font-bold text-lg text-amber-800">${rewardCode}</p>
            </div>
            <div class="bg-amber-200 h-12 w-12 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <div class="text-center text-sm text-gray-600 border-t border-gray-200 pt-4">
            <p class="mb-1">Show this to the cashier to redeem your free coffee</p>
            <p class="mb-1">Valid for one medium-sized coffee of your choice</p>
            <p class="font-medium">${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>
      </div>
    `,
    showCloseButton: true,
    showCancelButton: true,
    confirmButtonText: '<i class="fas fa-coffee mr-2"></i> Redeem Now',
    cancelButtonText: 'Save for Later',
    confirmButtonColor: '#1C359A',
    cancelButtonColor: '#6B7280',
    customClass: {
      container: 'reward-popup-container',
      popup: 'reward-popup',
      title: 'reward-title',
      confirmButton: 'reward-confirm-btn',
      cancelButton: 'reward-cancel-btn'
    },
  }).then((result) => {
    if (result.isConfirmed) {
      // Show loading indicator with coffee animation
      Swal.fire({
        title: 'Processing...',
        html: `
          <div class="animate-pulse flex flex-col items-center">
            <div class="text-5xl mb-3">☕</div>
            <p>Preparing your reward</p>
          </div>
        `,
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      // Call API to reset points and pass the rewardCode
      resetUserPoints(rewardCode);
    }
  });
};

// Modified resetUserPoints function to accept the reward code as a parameter
const resetUserPoints = (rewardCode) => {
    // Add more detailed logging
    console.log("Attempting to reset points with current balance:", points);

  fetch('https://yappari-coffee-bar.shop/api/reset_points', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ action: 'reset_points' })
  })
    .then(response => {
      console.log("Response status:", response.status);
      return response.json();
    })
    .then(data => {
      console.log("Reset points response:", data);
      if (data.success) {
        setPoints(0);

        // Use the same rewardCode that was passed in
        // We no longer generate a new code here

        // Generate and download the voucher with the same reward code
        generateRewardVoucher(rewardCode);

        // Enhanced success message
        Swal.fire({
          icon: 'success',
          title: 'Reward Claimed!',
          html: `
        <div class="text-center">
          <div class="text-4xl mb-3">🎉</div>
          <p class="mb-2">Your reward has been successfully claimed.</p>
          <p class="text-sm text-gray-600">Your voucher is downloading now. Present it at the counter to enjoy your free coffee!</p>
        </div>
      `,
          confirmButtonText: 'Awesome!',
          confirmButtonColor: '#1C359A',
          timer: 5000,
          timerProgressBar: true
        });
      } else {
        throw new Error(data.message || 'Could not reset points');
      }
    })
    .catch(error => {
      console.error('Error resetting points:', error);
      Swal.fire({
        title: 'Something Went Wrong',
        html: `
      <div class="text-center">
        <div class="text-4xl mb-3">😕</div>
        <p class="mb-2">We couldn't process your reward.</p>
        <p class="text-sm text-gray-600">Error: ${error.message}</p>
      </div>
    `,
        icon: 'error',
        confirmButtonColor: '#1C359A',
      });
    });
};


  // You can add this to your useEffect to inject the styles
  useEffect(() => {
    // Inject the custom styles
    const styleElement = document.createElement('style');
    styleElement.innerHTML = rewardStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);


  // Add this function to generate and download the reward voucher
  const generateRewardVoucher = (rewardCode) => {
    // Get current date in a nicely formatted string
    const currentDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Create HTML content for the voucher
    const voucherHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Yappari Coffee Bar - Free Coffee Voucher</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background: linear-gradient(to bottom, #f9e8c6, #f7d795);
          margin: 0;
          padding: 20px;
        }
        .voucher-container {
          max-width: 500px;
          margin: 0 auto;
          background-color: white;
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        .voucher-header {
          background-color: #1C359A;
          color: white;
          padding: 15px;
          text-align: center;
        }
        .voucher-body {
          padding: 20px;
        }
        .voucher-title {
          font-size: 24px;
          color: #1C359A;
          text-align: center;
          margin-bottom: 15px;
        }
        .reward-icon {
          text-align: center;
          font-size: 48px;
          margin: 15px 0;
        }
        .code-box {
          background-color: #f5f5f5;
          border: 1px dashed #ccc;
          border-radius: 5px;
          padding: 10px;
          text-align: center;
          margin: 15px 0;
        }
        .code {
          font-size: 24px;
          font-weight: bold;
          color: #1C359A;
          letter-spacing: 2px;
        }
        .instructions {
          margin: 15px 0;
          font-size: 14px;
          color: #555;
        }
        .date {
          text-align: center;
          font-style: italic;
          color: #777;
          margin-top: 20px;
        }
        .footer {
          border-top: 1px solid #eee;
          padding-top: 15px;
          text-align: center;
          font-size: 12px;
          color: #999;
        }
      </style>
    </head>
    <body>
      <div class="voucher-container">
        <div class="voucher-header">
          <h1>YAPPARI COFFEE BAR</h1>
        </div>
        <div class="voucher-body">
          <div class="voucher-title">FREE COFFEE VOUCHER</div>
          <div class="reward-icon">☕</div>
          <p>Congratulations! You've earned a free coffee through our loyalty program.</p>
          
          <div class="code-box">
            <div>REDEMPTION CODE:</div>
            <div class="code">${rewardCode}</div>
          </div>
          
          <div class="instructions">
            <p><strong>How to redeem:</strong></p>
            <ol>
              <li>Present this voucher to the cashier</li>
              <li>Choose any medium-sized coffee from our menu</li>
              <li>Enjoy your free drink!</li>
            </ol>
          </div>
          
          <div class="date">
            <p>Issued on: ${currentDate}</p>
            <p>Valid for one-time use</p>
          </div>
          
          <div class="footer">
            <p>Thank you for your loyalty to Yappari Coffee Bar!</p>
            <p>This voucher cannot be exchanged for cash.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

    // Create a Blob from the HTML content
    const blob = new Blob([voucherHTML], { type: 'text/html' });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = `YappariCoffee_Voucher_${rewardCode}.html`;
    document.body.appendChild(a);
    a.click();

    // Clean up
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };
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


                {/* Upload Button*/}

                <button
                  onClick={handleUpload}
                  className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm shadow-md hover:bg-blue-700 mt-1"
                >
                  Upload
                </button>

              </div>
            )}

            {/* Edit Button to Enable Editing Mode 
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="absolute bottom-0 bg-gray-300 text-gray-700 px-2 py-1 rounded-md text-xs"
              >
                Edit
              </button>
            )}
              */}
          </div>



          <div className="mt-8 md:mt-8 md:ml-4 text-center md:text-left">
            <h2 className="text-lg md:text-xl text-white font-semibold" id="userName">
              {userData.f_name} {userData.l_name}
            </h2>
            <p className="text-sm text-white" id="userAddress">{userData.address}</p>

            {/* Points display and reward button */}
            <div className="flex flex-col md:flex-row items-center mt-1">
              <p className="text-xs text-white mr-2" id="userPoints">
                Points: {typeof points === 'number' ? points.toFixed(1) : '0.0'}
              </p>
              {points >= 1 && (
                <button
                  onClick={handleClaimReward}
                  className="bg-amber-400 text-xs text-amber-900 px-2 py-1 rounded-md font-bold hover:bg-amber-300 transition mt-1 md:mt-0"
                >
                  Claim Free Coffee
                </button>
              )}

               {/* Progress indicator */}
            {points < 1 && (
              <p className="text-xs text-amber-200 mt-1">
                {(1 - points).toFixed(1)} more points for a free coffee!
              </p>
            )}
            </div>

           
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
              className={`flex flex-col items-center justify-center w-1/4 py-2 ${isActive('/user/account') ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600 active:text-blue-800'
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
              className={`flex flex-col items-center justify-center w-1/4 py-2 ${isActive('/user/cart') ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600 active:text-blue-800'
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
              className={`flex flex-col items-center justify-center w-1/4 py-2 ${isActive('/user/status') ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600 active:text-blue-800'
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
              className={`flex flex-col items-center justify-center w-1/4 py-2 ${isActive('/user/history') ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600 active:text-blue-800'
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
              className={`flex flex-col items-center justify-center w-1/4 py-2 ${isActive('/') ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600 active:text-blue-800'
                }`}
              onClick={() => {
                window.scrollTo(0, 0);
              }}            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
              <span className="text-xs mt-1">Log Out</span>
            </Link>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden md:mt-12 md:w-64 md:flex md:flex-col h-full pt-4 py-4 space-y-6 ">
            <nav className="space-y-4">
              <Link
                to="/user/account"
                className={`flex items-center space-x-4 ${isActive('/user/account') ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600 active:text-blue-800'
                  } transition-colors duration-200`}              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">User Profile</span>
              </Link>
              <Link
                to="/user/cart"
                className={`flex items-center space-x-4 ${isActive('/user/cart') ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600 active:text-blue-800'
                  } transition-colors duration-200`}              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                </svg>
                <span className="font-semibold">Cart</span>
              </Link>
              <Link
                to="/user/status"
                className={`flex items-center space-x-4 ${isActive('/user/status') ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600 active:text-blue-800'
                  } transition-colors duration-200`}              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Order Status</span>
              </Link>
              <Link
                to="/user/history"
                className={`flex items-center space-x-4 ${isActive('/user/history') ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600 active:text-blue-800'
                  } transition-colors duration-200`}              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                  <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Order History</span>
              </Link>
            </nav>
            <div className="mt-6">
              <Link to="/" onClick={() => logoutUser()}>
                <button className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                  </svg>
                  LOG OUT
                </button>
              </Link>
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
                <input type="text" id="address" name="address" pattern=".*[Cc][Ii][Tt][Yy].*" title="Please enter a full address including the word 'City'" required className={`w-full p-2 rounded-md bg-white mt-2 ${isEditing ? 'text-black' : 'text-[#ABB1BB]'}`}
                  placeholder="Full Address (including City)" value={userData.address || ''} onChange={handleChange} disabled={!isEditing} />
                <p className="text-xs text-gray-500 mt-1">Example: 55 BGC Residences Taguig City</p>
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




