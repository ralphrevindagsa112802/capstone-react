import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";

const UserCart = () => {
    const { cartItems, removeFromCart, setCartItems } = useContext(CartContext);
    const [totalAmount, setTotalAmount] = useState(0);
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);

    const [userData, setUserData] = useState({
        profile_pic: '',
    });

    useEffect(() => {
        const total = cartItems.reduce((sum, item) => sum + item.food_price * item.quantity, 0);
        setTotalAmount(total);
    }, [cartItems]);

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        // 🔹 Save order details before navigating to checkout
        localStorage.setItem("checkoutOrder", JSON.stringify(cartItems));
        localStorage.setItem("totalAmount", totalAmount);

        navigate("/user/checkout"); // 🔹 Redirect to Checkout page
    };

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
                    alert("Profile picture updated successfully!");
                } else {
                    alert("Error uploading profile picture: " + data.error);
                }
            })
            .catch(error => console.error("Error uploading profile picture:", error));
    };


    return (
        <div className="bg-[#DCDEEA]">
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

                                {/* Upload Button */}
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
                        )} */}
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
    onClick={() => navigate("/user/account")} // ✅ Redirect to edit profile
>
    Edit Profile
</button>
            </div>

            <div className="container mx-auto pt-6 px-4 md:px-36 flex flex-col md:flex-row w-full">
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

                {/**main content */}
                <div className="w-full mx-auto bg-white flex-grow ml-0 md:ml-6 p-8 rounded-xl shadow-xl mb-0 md:mb-12">
                    <table className="w-full border-collapse">
                        <thead >
                            <tr className="border-b ">
                                <th className="text-left py-2 text-[#1C359A]">Product Details</th>
                                <th className="text-center py-2 text-[#1C359A]">Quantity</th>
                                <th className="text-center py-2 text-[#1C359A]">Price</th>
                                <th className="text-center py-2 text-[#1C359A]">Total</th>
                                <th className="text-right py-2 text-[#1C359A]">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.length > 0 ? (
                                cartItems?.map((item) => (
                                    <tr key={`${item.food_id}-${item.size}`} className="border-b">
                                        <td className="py-4 flex items-center">
                                            <img src={item.image_path} alt={item.food_name} className="w-16 h-16 rounded-md object-cover mr-4" />
                                            <div>
                                                <h3 className=" text-[#1C359A] font-semibold">{item.food_name}</h3>
                                                <h3 className=" text-[#1C359A] text-sm font-medium">({item.size})</h3>
                                            </div>
                                        </td>
                                        <td className="text-center py-4">{item.quantity}</td>
                                        <td className="text-center py-4">₱{item.food_price}</td>
                                        <td className="text-center py-4">₱{(item.food_price * item.quantity)}</td>
                                        <td className="text-right py-4">
                                            <button className=" text-sm text-red-700 font-bold hover:text-red-300 rounded cursor-pointer"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    removeFromCart(item.food_id, item.size);
                                                    setCartItems((prevCart) => [...prevCart]); // ✅ Force state update
                                                }}>
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="py-4 flex items-center">
                                        <p className="font-semibold">Your cart is empty</p>
                                    </td>
                                </tr>
                            )
                            }
                        </tbody>
                    </table>

                    <div className="mt-6 flex items-end flex-col">
                        <div className="">
                            <div className="text-medium font-bold">Total: ₱{totalAmount}</div>
                        </div>

                        <div>
                            <button onClick={handleCheckout} className="bg-[#1C359A] mt-2 text-sm font-semibold cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserCart;