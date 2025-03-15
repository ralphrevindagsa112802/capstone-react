import { useEffect } from 'react';
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

// Separator Component for reuse
const Separator = () => {
  return (
    <div className="relative flex items-center my-4 md:my-6">
      <div className="flex-1 border-t border-black"></div>
      <div className="w-2 h-2 bg-black rounded-full"></div>
      <div className="flex-1 border-t border-black"></div>
    </div>
  );
};

const UserSpecial = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#DCDEEA] min-h-screen">
      <UserNavbar />

      <main className="pt-20 md:pt-32 max-w-5xl mx-auto px-4 sm:px-6 pb-12 md:mt-16 mt-8">
        {/* Ramyeon Corner Section */}
        <section className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1C359A]">
            We also offer{" "}
            <span className="text-[#1C359A]">Ramyeon Corner!</span>
          </h2>

          <Separator />

          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <p className="text-gray-700 italic text-sm md:text-base">
              *Warm Up with Every Slurp: Indulge in Our Limited-Time Korean
              Ramyeon, Perfect for Chilly Days!*
            </p>

            <div className="flex justify-center my-4">
              <img
                src="/img/ramyeon.jpg"
                alt="Ramyeon Corner"
                className="w-full max-w-xs md:max-w-sm rounded-lg shadow-md object-cover"
              />
            </div>

            <p className="text-[#1C359A] font-semibold text-sm md:text-base">
              A slurp of your favorite Korean noodle pairs perfectly with the
              cold windy and rainy weather.
            </p>
          </div>
        </section>

        {/* Events Section */}
        <section className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1C359A]">Events</h2>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div className="flex justify-center">
              <img
                src="/img/318211064_695008868645411_4565065949629406948_n.jpg"
                alt="Event 1"
                className="w-full h-full md:h-full object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="flex justify-center">
              <img
                src="/img/327973672_563233255846521_3442598739534082680_n.jpg"
                alt="Event 2"
                className="w-full h-full md:h-full object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </section>

        {/* Clothing Section */}
        <section className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1C359A]">Clothing</h2>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="aspect-square">
              <img
                src="/img/clothing-1.jpg"
                alt="Clothing 1"
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="aspect-square">
              <img
                src="/img/clothing-2.jpg"
                alt="Clothing 2"
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="aspect-square">
              <img
                src="/img/clothing-3.jpg"
                alt="Clothing 3"
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="aspect-square">
              <img
                src="/img/clothing-4.jpg"
                alt="Clothing 4"
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="aspect-square">
              <img
                src="/img/clothing-5.jpg"
                alt="Clothing 5"
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default UserSpecial;