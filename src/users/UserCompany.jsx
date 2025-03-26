import React from "react";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";
import { User, ChefHat, FileText } from "lucide-react"; // Import icons
import PopupCart from '../components/Popupcart'; // Import the new component
import React, { useState } from 'react';

const cafeviennaNobg = "/img/cafeviennaNobg - Copy.png";
const logoImage = "/img/YAPPARI NEW COLOR LOGO.jpg";
const signImage = "/img/YAPPARI ACRYLIC DISPLAY.jpg";

const founders = [
  {
    name: "Elijah Mazza",
    role: "CEO / Master Barista",
    icon: <User size={40} className="text-[#1C359A]" />,
  },
  {
    name: "Luwin Montoro",
    role: "COO / Head Chef",
    icon: <ChefHat size={40} className="text-[#1C359A]" />,
  },
  {
    name: "Miyaka Montoro",
    role: "Chief Financial Officer",
    icon: <FileText size={40} className="text-[#1C359A]" />,
  },
];

// Separator Component
const Separator = () => {
  return (
    <div className="relative flex items-center my-4 md:my-8">
      <div className="flex-1 border-t border-black"></div>
      <div className="w-2 h-2 bg-black rounded-full"></div>
      <div className="flex-1 border-t border-black"></div>
    </div>
  );
};

const UserCompany = () => {

  const [isPopupcartOpen, setIsPopupcartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]); // New state to track cart items
  
    // Function to update cart items
    const updateCartItems = (items) => {
      setCartItems(items);
    };

  return (
    <div className="bg-[#DCDEEA] min-h-screen">
      <UserNavbar />
     {/* Floating Cart Button */}
       <div className="fixed bottom-4 z-30 left-4 lg:left-auto lg:right-4">
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
      <main className="pt-20 md:pt-32 max-w-5xl mx-auto px-4 sm:px-6 pb-12 md:mt-16 mt-8">
        <section className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1C359A]">About Us</h2>
          <Separator />

          <p className="mt-3 text-gray-700 text-sm md:text-base">
            Our goal is to create a space that serves not just good but also high-quality crafted drinks and develop a cozy place to always return to for a variety of people. In YCB, we value our customer's satisfaction.
          </p>
        </section>

        <div className="flex flex-col gap-8 md:gap-12">
          {/* 1st column */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <div className="w-full md:w-2/5 flex justify-center">
              <img
                src={cafeviennaNobg}
                alt="Coffee"
                className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 object-cover rounded-full"
              />
            </div>
            <div className="w-full md:w-3/5 bg-white p-4 md:p-6 rounded-lg shadow-md mt-4 md:mt-0">
              <h3 className="text-lg md:text-xl font-bold text-[#1C359A]">Mission</h3>
              <p className="text-gray-700 mt-2 text-sm md:text-base">
                We are a hole-in-the-wall café that serves classic coffee drinks and light refreshments, partnered with fusion dishes all around the globe. Located and first established at Pembo, Makati.
              </p>
            </div>
          </div>

          {/* 2nd column */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-4 md:gap-6">
            <div className="w-full md:w-2/5 flex justify-center">
              <img
                src={logoImage}
                alt="Yappari Logo"
                className="w-48 h-48 sm:w-64 sm:h-64 object-cover rounded-full"
              />
            </div>
            <div className="w-full md:w-3/5 bg-white p-4 md:p-6 rounded-lg shadow-md mt-4 md:mt-0">
              <h3 className="text-lg md:text-xl font-bold text-[#1C359A]">Yappari Means?</h3>
              <p className="text-gray-700 mt-2 text-sm md:text-base">
                Throughout the name, which comes from a Japanese word "Yappari" or "Yapari" that means "I knew it" this communicates that "we knew" each and every process of taking people all the way to enjoy their safe space together with a great quality handcrafted cup of coffee.
              </p>
            </div>
          </div>

          {/* 3rd column */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <div className="w-full md:w-2/5 flex justify-center">
              <img
                src={signImage}
                alt="Yappari Sign"
                className="w-48 h-48 sm:w-64 sm:h-64 object-cover rounded-full"
              />
            </div>
            <div className="w-full md:w-3/5 bg-white p-4 md:p-6 rounded-lg shadow-md mt-4 md:mt-0">
              <h3 className="text-lg md:text-xl font-bold text-[#1C359A]">Our Vision</h3>
              <p className="text-gray-700 mt-2 text-sm md:text-base">
                To establish a go-to coffee shop where people can enjoy high-quality coffee, delicious fusion dishes, and a cozy atmosphere that fosters connection and relaxation.
              </p>
            </div>
          </div>
        </div>

        {/* Founders Section */}
        <section className="py-8 md:py-12 mt-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1C359A]">Founders</h2>
            <Separator />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
              {founders.map((founder, index) => (
                <div key={index} className="bg-white p-4 md:p-6 rounded-xl shadow-md text-center w-full">
                  <div className="flex justify-center">{founder.icon}</div>
                  <h3 className="text-base md:text-lg font-bold text-[#1C359A] mt-3">{founder.name}</h3>
                  <p className="text-gray-700 text-sm md:text-base">{founder.role}</p>
                  <div className="w-full h-2 bg-blue-700 mt-4 rounded-t-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Safe Space Certified Section */}
        <section className="py-8 md:py-12 mt-4">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1C359A]">Safe Space Certified</h2>
            <Separator />
            <div className="space-y-2 md:space-y-4 text-sm md:text-base">
              <p className="text-gray-700">
                This establishment has completed SOGIESC Inclusivity Training with Queer Safe Spaces, Inc.
              </p>
              <p className="text-gray-700">
                With the Safe Space Project, YCB aims to provide a place where everyone is welcome, and accepted regardless of their gender identity or expression.
              </p>
              <p className="text-gray-700">
                This is a SOGIESC Inclusivity Training provided by{" "}
                <a href="https://www.instagram.com/queersafespacesph" target="_blank" rel="noopener noreferrer" className="text-blue-700 font-semibold">
                  @queersafespacesph
                </a>.
              </p>
            </div>

            {/* Images Section */}
            <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              <img
                src="/img/420044519_17913262670892630_5831701703380051512_n.jpg"
                alt="Safe Space Certification"
                className="w-full h-64 md:h-80 object-cover rounded-lg shadow-md mx-auto"
              />
              <img
                src="/img/420020481_17913262706892630_3762987354597729997_n.jpg"
                alt="All Gender Restroom"
                className="w-full h-64 md:h-80 object-cover rounded-lg shadow-md mx-auto"
              />
              <img
                src="/img/420027513_17913262715892630_7647573958538463593_n.jpg"
                alt="Gender Neutral Restroom"
                className="w-full h-64 md:h-80 object-cover rounded-lg shadow-md mx-auto"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default UserCompany;