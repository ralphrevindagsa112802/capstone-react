import '../css/Footer.css';

const Footer = () => {
  return (
    <div className="w-full">
      <footer className="grid grid-cols-1 md:grid-cols-[500px_1fr] bg-[#1C359A] w-full h-auto p-8 gap-6">
        
        {/* Logo Section */}
        <div className="flex justify-center md:justify-start">
          <img src="../img/YCB LOGO (CREAM) (1).png" alt="Logo" className="w-64 md:w-96" />
        </div>

        {/* Content Section */}
        <div className="grid grid-rows-2 gap-6">

          {/* Top Row: Button & Social Media */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
            
            {/* Order Now Button */}
            <div className="mb-2 md:mb-0">
              <button className="bg-white text-blue-900 py-2 px-6 h-14 w-48 text-sm rounded-full font-semibold hover:bg-gray-200 transition">
                ORDER NOW
              </button>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:opacity-80">
                <img src="../img/communication.png" alt="Facebook" className="w-8 h-8" />
              </a>
              <a href="#" className="hover:opacity-80">
                <img src="../img/instagram.png" alt="Instagram" className="w-8 h-8 rounded-full" />
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white"></div>

          {/* Bottom Row: Info, Contact, Address, Privacy */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            
            {/* Info */}
            <div>
              <h3 className="text-base underline text-white mb-2 font-bold">Info</h3>
              <a href="#" className="text-sm text-gray-300 hover:text-white block">Company</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white block">Products</a>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-base underline text-white mb-2 font-bold">Contact</h3>
              <p className="text-sm text-gray-300">0966 842 0683</p>
              <a href="mailto:studioyappari@gmail.com" className="text-sm text-gray-300 hover:text-white block">
                studioyappari@gmail.com
              </a>
            </div>

            {/* Address */}
            <div>
              <h3 className="text-base underline text-white mb-2 font-bold">Address</h3>
              <p className="text-sm text-gray-300">218 Target Range Blvd.</p>
              <p className="text-sm text-gray-300">Pembo, Makati City</p>
            </div>

            {/* Privacy Policy */}
            <div>
              <h3 className="text-base underline text-white mb-2 font-bold">Privacy Policy</h3>
              <p className="text-sm text-gray-300">&copy; 2024. All rights reserved</p>
              <a href="#" className="text-sm text-gray-300 hover:text-white block">Privacy Policy</a>
            </div>

          </div>

        </div>
      </footer>
    </div>
  );
};

export default Footer;
