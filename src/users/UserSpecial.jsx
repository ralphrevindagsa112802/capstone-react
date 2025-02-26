import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";

const UserSpecial = () => {
  return (
    <div className="md-overflow-y-hidden bg-[#DCDEEA]">
      <UserNavbar />

      <main className="mt-32 max-w-5xl mx-auto p-5">
        {/* Ramyeon Corner Section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-[#1C359A]">
            We also offer{" "}
            <span className="text-[#1C359A]">Ramyeon Corner!</span>
          </h2>

          {/* Separator */}
          <div className="relative flex items-center my-6">
            <div className="flex-1 border-t border-black"></div>
            <div className="w-2 h-2 bg-black rounded-full"></div>
            <div className="flex-1 border-t border-black"></div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 italic">
              *Warm Up with Every Slurp: Indulge in Our Limited-Time Korean
              Ramyeon, Perfect for Chilly Days!*
            </p>

            <img
              src="/img/ramyeon.jpg"
              alt="Ramyeon Corner"
              className="w-full md:w-72 mx-auto my-4 rounded-lg shadow-md"
            />

            <p className="text-[#1C359A] font-semibold">
              A slurp of your favorite Korean noodle pairs perfectly with the
              cold windy and rainy weather.
            </p>
          </div>
        </section>

        {/* Events Section */}
        <section className="text-center mt-12">
          <h2 className="text-3xl font-bold text-[#1C359A]">Events</h2>

          {/* Separator */}
          <div className="relative flex items-center my-6">
            <div className="flex-1 border-t border-black"></div>
            <div className="w-2 h-2 bg-black rounded-full"></div>
            <div className="flex-1 border-t border-black"></div>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-6">
            <img
              src="/img/318211064_695008868645411_4565065949629406948_n.jpg"
              alt="Event 1"
              className="w-full md:w-72 object-cover rounded-lg shadow-md"
            />
            <img
              src="/img/327973672_563233255846521_3442598739534082680_n.jpg"
              alt="Event 2"
              className="w-full md:w-72 object-cover rounded-lg shadow-md"
            />
          </div>
        </section>


        {/* Clothing Section */}
        <section className="text-center mt-12">
          <h2 className="text-3xl font-bold text-[#1C359A]">Clothing</h2>

          {/* Separator */}
          <div className="relative flex items-center my-6">
            <div className="flex-1 border-t border-black"></div>
            <div className="w-2 h-2 bg-black rounded-full"></div>
            <div className="flex-1 border-t border-black"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <img
              src="/img/clothing-1.jpg"
              alt="Clothing 1"
              className="w-full rounded-lg shadow-md"
            />
            <img
              src="/img/clothing-2.jpg"
              alt="Clothing 2"
              className="w-full rounded-lg shadow-md"
            />
            <img
              src="/img/clothing-3.jpg"
              alt="Clothing 3"
              className="w-full rounded-lg shadow-md"
            />
            <img
              src="/img/clothing-4.jpg"
              alt="Clothing 4"
              className="w-full rounded-lg shadow-md"
            />
            <img
              src="/img/clothing-5.jpg"
              alt="Clothing 5"
              className="w-full rounded-lg shadow-md"
            />
          </div>
        </section>

        
      </main>

      <Footer />
    </div>
  );
};

export default UserSpecial;
