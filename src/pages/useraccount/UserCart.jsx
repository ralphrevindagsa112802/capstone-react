import React from 'react'
import { Link } from 'react-router-dom';
import UserNavbar from '../../components/UserNavbar';
import Footer from '../../components/Footer';

const UserCart = () => {
  return (
    <div>
        <UserNavbar />
            <div class="flex flex-row bg-[#1C359A] py-10 px-4 md:px-36 mt-32 ">

                <div class="flex flex-row  absolute -mb-42 md:flex-row">
                
                <div class="w-40 h-40 shadow-2xl rounded-full bg-white flex items-center justify-center text-[#1C359A] text-2xl md:text-4xl">
                        <span id="userInitials">--</span>
                </div>
                
                <div class="mt-8 md:mt-8 md:ml-4 text-center md:text-left ">
                    <h2 class="text-lg md:text-xl text-white font-semibold" id="userName">Loading...</h2>
                    <p class="text-sm text-white" id="userAddress">Loading...</p>
                </div>

                </div>

                <button id="editProfileBtn" class="md:mt-8 mt-8 md:ml-auto px-4 py-2 bg-white text-black font-bold rounded-md">
                    Edit Profile
                </button>
                
                </div>

                <div class="container mx-auto pt-6 px-4 md:px-36 flex flex-col md:flex-row w-full">
                    
                    <aside class="w-full mt-12 md:w-64 h-auto md:h-screen py-4 flex flex-col space-y-6">
                    <nav class="space-y-4">
                
                        <a id="profile" href="UserAccount.jsx" class="flex items-center space-x-4">
                        <img src="path-to-user-profile-icon.svg" alt="User Profile" class="w-6 h-6"/>
                        <span class="font-semibold">User profile</span>
                        </a>

                    
                        <a id="cart" href="cart.html" class="flex items-center space-x-4 text-gray-800 hover:text-blue-600">
                        <img src="path-to-cart-icon.svg" alt="Cart" class="w-6 h-6"/>
                        <span class="font-semibold">Cart</span>
                        </a>

                    
                        <a id="orderstatus" href="orderstatus.html" class="flex items-center space-x-4 text-gray-800 hover:text-blue-600">
                        <img src="path-to-order-status-icon.svg" alt="Order Status" class="w-6 h-6"/>
                        <span class="font-semibold">Order status</span>
                        </a>

                    
                        <a id="orderhistory" href="orderhistory.html" class="flex items-center space-x-4 text-gray-800 hover:text-blue-600">
                        <img src="path-to-order-history-icon.svg" alt="Order History" class="w-6 h-6"/>
                        <span class="font-semibold">Order History</span>
                        </a>
                    </nav>

                    
                    <div class="mt-6">
                        <button class="flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700">
                        <img src="path-to-sign-out-icon.svg" alt="Sign Out" class="w-5 h-5 mr-2"/>
                        SIGN OUT
                        </button>
                    </div>
                    </aside>


                
                    <div class="w-full mx-auto bg-white p-6 ">
                    <form action="/update-cart" method="POST" id="cartForm">
                        <table class="w-full border-collapse">
                        <thead>
                            <tr class="border-b">
                            <th class="text-left py-2">Product Details</th>
                            <th class="text-center py-2">Quantity</th>
                            <th class="text-center py-2">Price</th>
                            <th class="text-center py-2">Total</th>
                            </tr>
                        </thead>
                        <tbody id="cartTableBody">
                    
                        </tbody>
                        </table>
                
                    
                        <div class="mt-6 flex justify-end">
                        <Link to="/user/checkout">
                            <button 
                                class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Proceed
                            </button>
                        </Link>
                        </div>
                    </form>
                    </div>
                </div>
        <Footer />
    </div>
  )
}

export default UserCart