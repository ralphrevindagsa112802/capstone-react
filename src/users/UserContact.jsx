import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";
import { Mail, MapPin, Phone, Facebook, Instagram } from "lucide-react";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PopupCart from '../components/Popupcart'; // Import the new component
import React, { useState } from 'react';

const UserContact = () => {
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isPopupcartOpen, setIsPopupcartOpen] = useState(false);
      const [cartItems, setCartItems] = useState([]); // New state to track cart items
    
      // Function to update cart items
      const updateCartItems = (items) => {
        setCartItems(items);
      };
      
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
  
    formData.append("access_key", "3835231d-eeb9-4d8a-a90f-0607f1def799");
  
    const object = {};
    formData.forEach((value, key) => (object[key] = value));
    const json = JSON.stringify(object);
  
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });
  
      const res = await response.json();
      
      if (res.success) {
        Swal.fire({
          title: "Thank You!",
          text: "Message sent!",
          icon: "success",
          timer: 3000,
        });

        // Reset form fields
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        console.error("Error:", res.message);
        Swal.fire("Error", "Message failed to send: " + res.message, "error", {timer: 3000});
      }
    } catch (error) {
      console.error("Fetch error:", error);
      Swal.fire("Error", "Error sending message. Please try again.", "error", {timer: 3000});
    }
  };

  return (
    <div className="bg-[#DCDEEA] min-h-screen">
      <UserNavbar />
   {/* Floating Cart Button */}
   <div className="fixed bottom-4 z-40 left-4 lg:left-auto lg:right-4">
        <button
          className="w-12 h-12 rounded-full bg-[#1C359A] text-white flex items-center justify-center shadow-lg hover:bg-blue-800 transition-all relative"
          aria-label="Shopping Cart"
          onClick={() => setIsPopupcartOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          
          {/* Cart Item Count Badge */}
          {cartItems.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </button>
      </div>

      {/* Popup Cart Component */}
      <PopupCart 
        isOpen={isPopupcartOpen} 
        onClose={() => setIsPopupcartOpen(false)}
        onUpdateCartItems={updateCartItems} // Pass the update function
      />
      <main className="pt-20 md:pt-32 px-4 sm:px-6 pb-12 max-w-5xl mx-auto  md:mt-16 mt-8">
        <div className="flex justify-center items-center flex-col mb-6">
          <h2 className="text-2xl font-bold text-[#1C359A]">Contact Us</h2>
          <p className="text-gray-600 text-center text-sm md:text-base mt-2">
            Any question or remarks? Just write us a message!
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full">
          <div className="flex flex-col md:flex-row">
            {/* Left Side - Contact Info */}
            <div className="bg-[#1C359A] text-white p-6 md:p-8 w-full md:w-2/5">
              <h2 className="text-xl md:text-2xl font-bold">Contact Information</h2>
              <p className="mt-2 text-gray-200 text-sm md:text-base">
                Questions, comments, or suggestions? Simply fill in the form and we'll be in touch shortly.
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin size={18} className="mt-1 flex-shrink-0" />
                  <span className="text-sm md:text-base">218 Target Range Blvd. Pembo, Makati City</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone size={18} className="flex-shrink-0" />
                  <span className="text-sm md:text-base">0966 842 0683</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail size={18} className="flex-shrink-0" />
                  <span className="text-sm md:text-base">studioyappari@gmail.com</span>
                </div>
              </div>

              {/* Social Icons */}
              <div className="mt-8 flex space-x-4">
                <a href="#" className="bg-white p-2 rounded-full text-[#1C359A] hover:bg-gray-100 transition">
                  <Facebook size={18} />
                </a>
                <a href="#" className="bg-white p-2 rounded-full text-[#E1306C] hover:bg-gray-100 transition">
                  <Instagram size={18} />
                </a>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="p-6 md:p-8 w-full md:w-3/5">
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First name*"
                      required
                      className="border border-gray-300 p-2 md:p-3 rounded-md w-full text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#1C359A]"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name*"
                      required
                      className="border border-gray-300 p-2 md:p-3 rounded-md w-full text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#1C359A]"
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email*"
                    required
                    className="border border-gray-300 p-2 md:p-3 rounded-md w-full text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#1C359A]"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="border border-gray-300 p-2 md:p-3 rounded-md w-full text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#1C359A]"
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    required
                    className="border border-gray-300 p-2 md:p-3 rounded-md w-full h-24 md:h-32 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#1C359A]"
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full bg-[#1C359A] text-white font-semibold py-2 md:py-3 rounded-md hover:bg-[#162b75] transition text-sm md:text-base"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserContact;