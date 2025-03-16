import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";

const UserCart = () => {
    const { cartItems, removeFromCart, setCartItems } = useContext(CartContext);
    const [points, setPoints] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [userData, setUserData] = useState({
        profile_pic: '',
    });


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


    /** 
    useEffect(() => {
        const total = cartItems.reduce((sum, item) => sum + item.food_price * item.quantity, 0);
        setTotalAmount(total);
    }, [cartItems]);

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            Swal.fire("Warning", `Your cart is empty!`, "warning");
            return;
        }

        // 🔹 Save order details before navigating to checkout
        localStorage.setItem("checkoutOrder", JSON.stringify(cartItems));
        localStorage.setItem("totalAmount", totalAmount);

        navigate("/user/checkout"); // 🔹 Redirect to Checkout page
    };
    */


    useEffect(() => {
        // Calculate total based on selected items
        const total = cartItems
            .filter((item) => selectedItems.includes(`${item.food_id}-${item.size}`))
            .reduce((sum, item) => sum + Number(item.food_price || 0) * item.quantity, 0);
        setTotalAmount(total);
    }, [selectedItems, cartItems]);

    const handleCheckboxChange = (food_id, size) => {
        const uniqueKey = `${food_id}-${size}`;
        setSelectedItems((prev) =>
            prev.includes(uniqueKey) ? prev.filter((id) => id !== uniqueKey) : [...prev, uniqueKey]
        );
    };

    const handleQuantityChange = (food_id, size, newQuantity) => {
        if (newQuantity < 1) return; // Prevent quantity from going below 1

        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.food_id === food_id && item.size === size
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const handleCheckout = () => {
        if (selectedItems.length === 0) {
            alert("Please select items to order.");
            return;
        }

        // Get only the selected cart items
        const selectedForCheckout = cartItems.filter((item) =>
            selectedItems.includes(`${item.food_id}-${item.size}`)
        );

        // Store selected items for checkout
        localStorage.setItem("checkoutOrder", JSON.stringify(selectedForCheckout));
        localStorage.setItem("totalAmount", totalAmount);

        // 🛠 Fix: Keep only the unselected items in the cart
        const remainingItems = cartItems.filter(
            (item) => !selectedItems.includes(`${item.food_id}-${item.size}`)
        );

        // ✅ Persist updated cart in localStorage
        localStorage.setItem("cartItems", JSON.stringify(remainingItems));

        // ✅ Update the cart in context to reflect changes
        setCartItems(remainingItems);

        // ✅ Clear selection after checkout
        setSelectedItems([]);

        // ✅ Navigate to checkout page
        navigate("/user/checkout");
    };


    //profile header
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
                    Swal.fire("Success", `Profile picture updated successfully!`, "success", {timer: 3000});
                } else {
                    Swal.fire("Error", `Error uploading profile picture: ${data.error}`, "error", {timer: 3000});
                }
            })
            .catch(error => console.error("Error uploading profile picture:", error));
    };


    return (
        <div className="bg-[#DCDEEA]">
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
                    onClick={() => navigate("/user/account")} // ✅ Redirect to edit profile
                >
                    {isEditing ? "Cancel" : "Edit Profile"}
                </button>
            </div>

            <div className="container mx-auto pt-6 md:px-52 flex flex-col md:flex-row w-full">
                {/**side bar profile section */}
                <aside className="fixed md:relative bottom-0 md:mr-4 left-0 w-full md:w-64 md:h-screen  z-10 md:z-0">
                    {/* Mobile Bottom Navigation Bar */}
                    <div className="md:hidden flex justify-around items-center h-16 border-t border-gray-200 bg-white">
                        <Link
                            to="/user/account"
                            className="flex flex-col items-center justify-center w-1/4 py-2 text-gray-800 hover:text-blue-600 active:text-blue-800"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs mt-1">Profile</span>
                        </Link>
                        <Link
                            to="/user/cart"
                            className="flex flex-col items-center justify-center w-1/4 py-2 text-gray-800 hover:text-blue-600 active:text-blue-800"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                            </svg>
                            <span className="text-xs mt-1">Cart</span>
                        </Link>
                        <Link
                            to="/user/status"
                            className="flex flex-col items-center justify-center w-1/4 py-2 text-gray-800 hover:text-blue-600 active:text-blue-800"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs mt-1">Status</span>
                        </Link>
                        <Link
                            to="/user/history"
                            className="flex flex-col items-center justify-center w-1/4 py-2 text-gray-800 hover:text-blue-600 active:text-blue-800"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                                <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs mt-1">History</span>
                        </Link>

                        <Link
                            to="/"
                            className="flex flex-col items-center justify-center w-1/4 py-2 text-gray-800 hover:text-blue-600 active:text-blue-800"
                        >
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
                                className="flex items-center space-x-4 text-gray-800 hover:text-blue-600 active:text-blue-800 transition-colors duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                                <span className="font-semibold">User Profile</span>
                            </Link>
                            <Link
                                to="/user/cart"
                                className="flex items-center space-x-4 text-gray-800 hover:text-blue-600 active:text-blue-800 transition-colors duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                                </svg>
                                <span className="font-semibold">Cart</span>
                            </Link>
                            <Link
                                to="/user/status"
                                className="flex items-center space-x-4 text-gray-800 hover:text-blue-600 active:text-blue-800 transition-colors duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                </svg>
                                <span className="font-semibold">Order Status</span>
                            </Link>
                            <Link
                                to="/user/history"
                                className="flex items-center space-x-4 text-gray-800 hover:text-blue-600 active:text-blue-800 transition-colors duration-200"
                            >
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

                {/**main content */}
                <div className="w-full mx-auto ml-0 bg-white flex-grow p-4 md:p-8 rounded-xl shadow-xl mb-4 md:mb-12">
                    {/* Mobile view for cart items */}
                    <div className="block md:hidden m-0">
                        <div className="flex justify-between items-center border-b pb-3 mb-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 mr-2 accent-[#1C359A]"
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedItems(cartItems.map(item => `${item.food_id}-${item.size}`));
                                        } else {
                                            setSelectedItems([]);
                                        }
                                    }}
                                    checked={selectedItems.length === cartItems.length && cartItems.length > 0}
                                />
                                <span className="text-[#1C359A] font-semibold text-sm sm:text-base">Select All</span>
                            </div>
                        </div>

                        {cartItems.length > 0 ? (
                            cartItems?.map((item) => (
                                <div key={`${item.food_id}-${item.size}`} className="border-b py-3 sm:py-4">
                                    {/* Item Header - Checkbox, Image and Remove button */}
                                    <div className="flex items-start justify-between mb-2 gap-2">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 mt-1 accent-[#1C359A]"
                                                checked={selectedItems.includes(`${item.food_id}-${item.size}`)}
                                                onChange={() => handleCheckboxChange(item.food_id, item.size)}
                                            />
                                            <img
                                                src={item.image_path}
                                                alt={item.food_name}
                                                className="w-14 h-14 sm:w-16 sm:h-16 rounded-md object-cover"
                                            />
                                        </div>
                                        <button
                                            className="text-xs sm:text-sm text-red-700 font-bold px-2 py-1 rounded hover:bg-red-50"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                removeFromCart(item.food_id, item.size);
                                                setCartItems((prevCart) => [...prevCart]);
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    {/* Item Details */}
                                    <div className="ml-6 sm:ml-8">
                                        <h3 className="text-[#1C359A] font-semibold text-sm sm:text-base">{item.food_name}</h3>
                                        <h3 className="text-[#1C359A] text-xs sm:text-sm font-medium">({item.size})</h3>

                                        {/* Quantity and Price */}
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-2 gap-2">
                                            {/* Quantity Selector */}
                                            <div className="flex items-center bg-gray-100 rounded-lg py-1 px-1 w-fit">
                                                <button
                                                    className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-200 rounded-l"
                                                    onClick={() => handleQuantityChange(item.food_id, item.size, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <span className="text-lg font-bold">-</span>
                                                </button>
                                                <span className="border-x px-3 text-base font-medium min-w-[32px] text-center">{item.quantity}</span>
                                                <button
                                                    className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-200 rounded-r"
                                                    onClick={() => handleQuantityChange(item.food_id, item.size, item.quantity + 1)}
                                                >
                                                    <span className="text-lg font-bold">+</span>
                                                </button>
                                            </div>

                                            {/* Price Information */}
                                            <div className="flex flex-row sm:flex-col justify-between items-end sm:items-end w-full sm:w-auto mt-2 sm:mt-0">
                                                <div className="text-[#1C359A] text-xs sm:text-sm">₱{item.food_price} each</div>
                                                <div className="text-[#1C359A] font-semibold text-sm sm:text-base">Total: ₱{(item.food_price * item.quantity).toFixed(2)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-8 text-center">
                                <div className="text-gray-400 text-5xl mb-3">🛒</div>
                                <p className="font-semibold text-gray-700">Your cart is empty</p>
                                <p className="text-sm text-gray-500 mt-1">Add items to start your order</p>
                                <button className="mt-4 bg-[#1C359A] text-white rounded-lg px-6 py-2 text-sm font-medium">
                                    Browse Menu
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Desktop view for cart items */}
                    <div className="hidden md:block overflow-x-auto" >
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-2 text-[#808080]">
                                        <input
                                            type="checkbox"
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedItems(cartItems.map(item => `${item.food_id}-${item.size}`));
                                                } else {
                                                    setSelectedItems([]);
                                                }
                                            }}
                                            checked={selectedItems.length === cartItems.length && cartItems.length > 0}
                                        />
                                    </th>
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
                                            <td className="p-2">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedItems.includes(`${item.food_id}-${item.size}`)}
                                                    onChange={() => handleCheckboxChange(item.food_id, item.size)}
                                                />
                                            </td>
                                            <td className="py-4 flex items-center">
                                                <img src={item.image_path} alt={item.food_name} className="w-16 h-16 rounded-md object-cover mr-4" />
                                                <div>
                                                    <h3 className="text-[#1C359A] font-semibold">{item.food_name}</h3>
                                                    <h3 className="text-[#1C359A] text-sm font-medium">({item.size})</h3>
                                                </div>
                                            </td>
                                            <td className="text-center py-2">
                                                <div className="flex items-center justify-center bg-gray-200 rounded-lg px-2 py-1 w-24 mx-auto">
                                                    <button
                                                        className="px-2 text-lg font-bold text-gray-700"
                                                        onClick={() => handleQuantityChange(item.food_id, item.size, item.quantity - 1)}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="border-x px-3 text-lg font-medium">{item.quantity}</span>
                                                    <button
                                                        className="px-2 text-lg font-bold text-gray-700"
                                                        onClick={() => handleQuantityChange(item.food_id, item.size, item.quantity + 1)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="text-center py-4">₱{item.food_price}</td>
                                            <td className="text-center py-4">₱{(item.food_price * item.quantity)}</td>
                                            <td className="text-right py-4">
                                                <button className="text-sm text-red-700 font-bold hover:text-red-300 rounded cursor-pointer"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        removeFromCart(item.food_id, item.size);
                                                        setCartItems((prevCart) => [...prevCart]);
                                                    }}>
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="py-4">
                                            <p className="font-semibold">Your cart is empty</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 flex flex-col md:flex-row justify-between items-center md:items-end">
                        <div className="w-full md:w-auto mb-4 md:mb-0">
                            {selectedItems.length > 0 && (
                                <button className="bg-red-100 text-red-700 px-4 py-2 rounded text-sm font-semibold hover:bg-red-200 mr-2">
                                    Remove Selected ({selectedItems.length})
                                </button>
                            )}
                        </div>
                        <div className="w-full md:w-auto flex flex-col items-end">
                            <div className="text-lg font-bold mb-2">Total: ₱{totalAmount}</div>
                            <button
                                onClick={handleCheckout}
                                className="bg-[#1C359A] w-full md:w-auto text-sm font-semibold cursor-pointer text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors"
                            >
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