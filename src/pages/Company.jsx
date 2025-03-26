import React from "react";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { User, ChefHat, FileText } from "lucide-react"; // Import icons
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

const Company = () => {
  return (
    <div className="bg-[#DCDEEA] min-h-screen">
      <Navbar />

      <main className="pt-20 md:pt-32 max-w-5xl mx-auto px-4 sm:px-6 pb-12 md:mt-16 mt-8">
        <section className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1C359A]">About Us</h2>
          <Separator />

          <p className="mt-3 text-sm md:text-base text-gray-700">
            Our goal is to create a space that serves not just good but also high-quality crafted drinks and develop a cozy place to always return to for a variety of people. In YCB, we value our customer's satisfaction.
          </p>
        </section>

        <div className="flex justify-center flex-col space-y-8 md:space-y-12 mt-8">
          {/* 1st column */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <img 
              src={cafeviennaNobg} 
              alt="Coffee" 
              className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full" 
            />
            <div className="w-full md:w-auto bg-white p-4 md:p-5 rounded-lg shadow-md mt-4 md:mt-0">
              <h3 className="text-lg md:text-xl font-bold text-[#1C359A]">Mission</h3>
              <p className="text-sm md:text-base text-gray-700 mt-2 text-left">
                We are a hole-in-the-wall café that serves classic coffee drinks and light refreshments, partnered with fusion dishes all around the globe. Located and first established at Pembo, Makati.
              </p>
            </div>
          </div>

          {/* 2nd column */}
          <div className="flex flex-col-reverse md:flex-row items-center gap-4 md:gap-8">
            <div className="w-full md:w-auto bg-white p-4 md:p-5 rounded-lg shadow-md mt-4 md:mt-0">
              <h3 className="text-lg md:text-xl font-bold text-[#1C359A]">Yappari Means?</h3>
              <p className="text-sm md:text-base text-gray-700 mt-2 text-left">
                Throughout the name, which comes from a Japanese word "Yappari" or "Yapari" that means "I knew it" this communicates that "we knew" each and every process of taking people all the way to enjoy their safe space together with a great quality handcrafted cup of coffee.
              </p>
            </div>
            <img 
              src={logoImage} 
              alt="Yappari Logo" 
              className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full" 
            />
          </div>

          {/* 3rd column */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <img 
              src={signImage} 
              alt="Yappari Sign" 
              className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full" 
            />
            <div className="w-full md:w-auto bg-white p-4 md:p-5 rounded-lg shadow-md mt-4 md:mt-0">
              <h3 className="text-lg md:text-xl font-bold text-[#1C359A]">Our Vision</h3>
              <p className="text-sm md:text-base text-gray-700 mt-2 text-left">
                To establish a go-to coffee shop where people can enjoy high-quality coffee, delicious fusion dishes, and a cozy atmosphere that fosters connection and relaxation.
              </p>
            </div>
          </div>
        </div>

        {/* Founders Section */}
        <section className="py-8 md:py-12 mt-8">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1C359A]">Founders</h2>
            <Separator />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
              {founders.map((founder, index) => (
                <div key={index} className="bg-white p-4 md:p-6 rounded-xl shadow-md text-center w-full">
                  <div className="flex justify-center">{founder.icon}</div>
                  <h3 className="text-base md:text-lg font-bold text-[#1C359A] mt-3">{founder.name}</h3>
                  <p className="text-sm md:text-base text-gray-700">{founder.role}</p>
                  <div className="w-full h-2 bg-blue-700 mt-3 rounded-t-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Safe Space Certified Section */}
        <section className="py-8 md:py-12">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1C359A]">Safe Space Certified</h2>
            <Separator />
            <p className="mt-4 text-sm md:text-base text-gray-700">
              This establishment has completed SOGIESC Inclusivity Training with Queer Safe Spaces, Inc.
            </p>
            <p className="mt-2 text-sm md:text-base text-gray-700">
              With the Safe Space Project, YCB aims to provide a place where everyone is welcome, and accepted regardless of their gender identity or expression.
            </p>
            <p className="mt-2 text-sm md:text-base text-gray-700">
              This is a SOGIESC Inclusivity Training provided by{" "}
              <a href="https://www.instagram.com/queersafespacesph" target="_blank" rel="noopener noreferrer" className="text-blue-700 font-semibold">
                @queersafespacesph
              </a>.
            </p>

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

export default Company;