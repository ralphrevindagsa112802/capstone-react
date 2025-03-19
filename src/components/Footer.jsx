import '../css/Footer.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

const Footer = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if viewport is mobile size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Handle scroll lock when modal is open
  useEffect(() => {
    if (isPrivacyOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isPrivacyOpen]);
  
  const openPrivacyPolicy = (e) => {
    e.preventDefault();
    setIsPrivacyOpen(true);
  };

  const closePrivacyPolicy = () => {
    setIsPrivacyOpen(false);
  };

  return (
    <div className="w-full">
      <footer className="grid grid-cols-1 md:grid-cols-[500px_1fr] bg-[#1C359A] w-full h-auto items-center p-6 gap-6">
        
        {/* Logo Section */}
        <div className="flex justify-center md:justify-start">
          <img src="../img/YCB LOGO (CREAM) (1).png" alt="Logo" className="w-64 md:w-96" />
        </div>

        {/* Content Section */}
        <div>
          {/* Top Row: Button & Social Media */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
            {/* Order Now Button */}
            <div className="mb-2 md:mb-0">
              <Link to="/user/menu">
              <button className="bg-white text-blue-900 py-2 px-6 h-14 w-48 text-sm rounded-full font-semibold hover:bg-gray-200 transition">
                ORDER NOW
              </button>
              </Link>
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
          <hr className="border-t border-white my-4" />

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
              <a href="#" onClick={openPrivacyPolicy} className="text-sm text-gray-300 hover:text-white block">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Enhanced Responsive Privacy Policy Popup */}
      {isPrivacyOpen && (
        <div className="fixed inset-0  backdrop-blur-xs bg-opacity-70 z-50 flex items-center justify-center p-2 sm:p-4 overflow-hidden">
          <div 
            className="bg-gray-100 rounded-lg w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl max-h-[90vh] sm:max-h-[85vh] 
            flex flex-col shadow-2xl animate-fadeIn"
            style={{animation: 'fadeIn 0.3s ease-out'}}
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#1C359A] p-3 sm:p-4 border-b flex justify-between items-center rounded-t-lg">
              <h2 className="text-lg sm:text-xl font-bold text-white">PRIVACY POLICY</h2>
              <button 
                onClick={closePrivacyPolicy}
                className="text-white hover:text-gray-200 transition focus:outline-none"
                aria-label="Close privacy policy"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Content with custom scrollbar */}
            <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar flex-grow">
              {/* Introduction */}
              <div className="text-center mb-5 sm:mb-6">
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  Welcome to Yappari Coffee Bar! Your privacy is important to us, and we are committed to safeguarding your personal information. 
                  This Privacy Policy explains how we collect, use, and protect the information you provide when using our website and services.
                </p>
              </div>

              {/* Main intro paragraph */}
              <div className="mb-5 sm:mb-6">
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  At Yappari Coffee Bar, we approach privacy and data protection with the same care and dedication we bring to crafting every cup of coffee: we put our customers first.
                </p>
                <p className="text-xs sm:text-sm text-gray-700 mt-2 leading-relaxed">
                  We are committed to safeguarding your personal information and adhering to applicable privacy and data protection laws. 
                  Our practices are guided by key principles such as data minimization, transparency, and limited use, ensuring we only collect 
                  and utilize the information needed to provide you with exceptional service.
                </p>
                <p className="text-xs sm:text-sm text-gray-700 mt-2 leading-relaxed">
                  We understand that respecting your privacy is essential to earning and maintaining your trust. To us, taking care of you means 
                  taking care of your data. So, pour yourself a cup of coffee and read on to learn how we protect your information.
                </p>
              </div>

              {/* Sections */}
              <div className="space-y-5 sm:space-y-6">
                {/* Section 1 */}
                <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
                  <h3 className="text-base sm:text-lg font-semibold text-[#1C359A] mb-2">1. Information We Collect</h3>
                  <p className="text-xs sm:text-sm text-gray-700 mb-2 leading-relaxed">We may collect the following types of information:</p>
                  <ul className="list-disc pl-4 sm:pl-6 text-xs sm:text-sm text-gray-700 space-y-1">
                    <li><span className="font-medium">Personal Details:</span> Your name, email, contact number, delivery address, and payment details.</li>
                    <li><span className="font-medium">Account Information:</span> Login credentials such as username, password, and order history.</li>
                    <li><span className="font-medium">Device Data:</span> Information like your IP address, browser type, and device identifiers.</li>
                    <li><span className="font-medium">Feedback and Preferences:</span> Any information you provide through reviews, surveys, or inquiries.</li>
                  </ul>
                </div>

                {/* Section 2 */}
                <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
                  <h3 className="text-base sm:text-lg font-semibold text-[#1C359A] mb-2">2. How We Use Your Information</h3>
                  <p className="text-xs sm:text-sm text-gray-700 mb-2 leading-relaxed">Your information is used for:</p>
                  <ul className="list-disc pl-4 sm:pl-6 text-xs sm:text-sm text-gray-700 space-y-1">
                    <li>Processing and completing your orders.</li>
                    <li>Enhancing your website and services.</li>
                    <li>Communicating offers, updates, or promotions (with your permission).</li>
                    <li>Providing a secure and personalized experience.</li>
                  </ul>
                </div>

                {/* Section 3 */}
                <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
                  <h3 className="text-base sm:text-lg font-semibold text-[#1C359A] mb-2">3. Your Rights</h3>
                  <p className="text-xs sm:text-sm text-gray-700 mb-2 leading-relaxed">As a user, you have the right to:</p>
                  <ul className="list-disc pl-4 sm:pl-6 text-xs sm:text-sm text-gray-700 space-y-1">
                    <li>Access, update, or delete your information.</li>
                    <li>Opt-out of receiving promotional communications.</li>
                    <li>Raise concerns with a data protection authority if applicable.</li>
                  </ul>
                </div>

                {/* Section 4 */}
                <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
                  <h3 className="text-base sm:text-lg font-semibold text-[#1C359A] mb-2">4. How do we retain your data?</h3>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    We will only retain your Personal Information for so long as it is necessary for the purpose of this Privacy Policy and to the extent required or 
                    otherwise permitted by applicable laws and regulations. When we no longer require your Personal Information, we will take steps to erase, remove, 
                    destroy, anonymize or prevent access to or use of your Personal Information.
                  </p>
                </div>

                {/* Section 5 */}
                <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
                  <h3 className="text-base sm:text-lg font-semibold text-[#1C359A] mb-2">5. Policy Updates</h3>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    We may revise this Privacy Policy from time to time. We encourage you to check back regularly to stay informed.
                  </p>
                </div>

                {/* Section 6 */}
                <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
                  <h3 className="text-base sm:text-lg font-semibold text-[#1C359A] mb-2">6. How do you contact us?</h3>
                  <p className="text-xs sm:text-sm text-gray-700 mb-2 leading-relaxed">
                    If you have questions or need assistance regarding this Privacy Policy, please reach out:
                  </p>
                  <div className="text-xs sm:text-sm text-gray-700 pl-2 sm:pl-4 border-l-2 border-[#1C359A]">
                    <p className="font-medium">Yappari Coffee Bar</p>
                    <p>Target Range Blvd, Pembo, Makati, Philippines</p>
                    <p className="text-[#1C359A] hover:underline">
                      <a href="mailto:studioyappari@gmail.com">studioyappari@gmail.com</a>
                    </p>
                    <p>09668420683</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer button */}
            <div className="p-3 sm:p-4 border-t bg-gray-50 rounded-b-lg flex justify-center">
              <button 
                onClick={closePrivacyPolicy}
                className="bg-[#1C359A] hover:bg-[#152a75] text-white py-2 px-6 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1C359A]"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for the modal */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1C359A;
          border-radius: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #152a75;
        }
        
        @media (max-width: 640px) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
        }
      `}</style>
    </div>
  );
};

export default Footer;