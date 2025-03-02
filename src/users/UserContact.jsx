import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";
import { Mail, MapPin, Phone, Facebook, Instagram } from "lucide-react";
import Swal from 'sweetalert2';

const UserContact = () => {
  const navigate = useNavigate();

  useEffect(() => {
      fetch("https://yappari-coffee-bar-system.free.nf/yappari-coffee-bar-api/api/check_user_session.php", {
          credentials: "include", // ✅ Sends session cookie
      })
      .then((res) => res.json())
      .then((data) => {
          if (!data.success) {
              navigate("/login");
          }
      })

      .catch(() => navigate("/login"));
    }, [navigate]);
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
          icon: "success"
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
        Swal.fire("Error", "Message failed to send: " + res.message, "error");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      Swal.fire("Error", "Error sending message. Please try again.", "error");
    }
  };

  return (
    <div className="md-overflow-y-hidden bg-[#DCDEEA]">
      <UserNavbar />
      <main className="flex flex-col items-center justify-center min-h-screen mt-34 md:mt-22 max-w-5xl mx-auto p-5">
        <div className="flex justify-center items-center flex-col mb-6">
          <h2 className="text-2xl font-bold text-[#1C359A]">Contact Us</h2>
          <p className="text-gray-600">Any question or remarks? Just write us a message!</p>
        </div>

        <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full grid grid-cols-1 md:grid-cols-2">
          {/* Left Side - Contact Info */}
          <div className="bg-[#1C359A] text-white p-8 rounded-l-lg">
            <h2 className="text-2xl font-bold">Contact Information</h2>
            <p className="mt-2 text-gray-200">
              Questions, comments, or suggestions? Simply fill in the form and we'll be in touch shortly.
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin size={20} />
                <span>218 Target Range Blvd. Pembo, Makati City</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} />
                <span>0966 842 0683</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} />
                <span>studioyappari@gmail.com</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="mt-6 flex space-x-4">
              <a href="#" className="bg-white p-2 rounded-full text-[#1C359A]">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-white p-2 rounded-full text-[#E1306C]">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="p-8">
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name*"
                  required
                  className="border border-gray-300 p-3 rounded-md w-full focus:outline-[#1C359A]"
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name*"
                  required
                  className="border border-gray-300 p-3 rounded-md w-full focus:outline-[#1C359A]"
                />
              </div>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email*"
                required
                className="border border-gray-300 p-3 rounded-md w-full focus:outline-[#1C359A]"
              />

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="border border-gray-300 p-3 rounded-md w-full focus:outline-[#1C359A]"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message..."
                required
                className="border border-gray-300 p-3 rounded-md w-full h-28 focus:outline-[#1C359A]"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-[#1C359A] text-white font-semibold py-3 rounded-md hover:bg-[#162b75] transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserContact;
