import React from "react";
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Swal from 'sweetalert2';
import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

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
      <Navbar />
     
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

export default Contact;
