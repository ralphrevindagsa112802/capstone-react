import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
const clientId = "702818809229-bk6vh4bk1v766flofh0vk6rna342gcq1.apps.googleusercontent.com"; // Replace with your actual Client ID


const SignIn = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validation checks
    const requiredFields = ['firstname', 'lastname', 'username', 'email', 'phone', 'address', 'password', 'confirmPassword'];
    for (const field of requiredFields) {
      if (!formData[field] || formData[field].trim() === '') {
        setError(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
        return;
      }
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("https://yappari-coffee-bar.shop/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (error) {
        console.error("Invalid JSON response:", text);
        setError("Server error: Invalid response");
        return;
      }

      if (data.success) {
        Swal.fire("Success", 'Signup successful! You can now log in.', "success", {timer: 3000});
        navigate("/login");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to connect to server");
    }
  };

  const onSuccess = async (response) => {

    const credential = JSON.parse(atob(response.credential.split(".")[1]));
    const userData = JSON.stringify(credential);
  
    try {
      const res = await fetch("https://yappari-coffee-bar.shop/api/googleLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userData }),
      });
  
      const text = await res.text(); // Read raw response
  
      if (!text.trim()) {
        throw new Error("Empty response from server"); // Prevents JSON parsing on empty response
      }
  
      const data = JSON.parse(text);
  
      if (data.success) {
        sessionStorage.setItem("user_id", data.user.user_id);
        sessionStorage.setItem("user_name", data.user.user_name);
        sessionStorage.setItem("f_name", data.user.f_name);
        sessionStorage.setItem("l_name", data.user.l_name);
  
        Swal.fire("Success!", `Welcome back, ${data.user.f_name} ${data.user.l_name}!`, "success");
        navigate("/user/home");
      } else {
        Swal.fire("Oops...", data.message, "error");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error", "Failed to connect to server", "error");
    }
  };
  
    const onFailure = (res) => {
      console.log("Google login failed", res);
      Swal.fire('Oops...','Google login failed. Please try again.','error')
    };

  return (
      <div className="bg-[#1C359A] flex flex-col md:flex-row items-stretch justify-center min-h-screen w-full">
        {/* Left side with logos - hidden on mobile, visible on medium screens and up */}
        <div className="hidden md:flex md:flex-col md:justify-start md:w-1/3 lg:w-1/2 text-white">
          <div className="flex flex-col items-center justify-start py-8">
            <div className="w-full md:w-3/4 lg:w-2/3 px-4 mb-6">
              <img src="../img/YCB LOGO (CREAM) (1).png" alt="YCB Logo" className="w-full h-auto object-contain" />
            </div>
            <div className="w-full md:w-2/3 lg:w-1/2 px-4">
              <img src="../img/cafeviennaNobg.png" alt="Coffee and Croissant" className="w-full h-auto object-contain" />
            </div>
          </div>
        </div>

        {/* Right side with form */}
        <div className="w-full sm:w-11/12 md:w-2/3 lg:w-1/2 bg-white rounded-lg shadow-lg flex flex-col">
          {/* Mobile logo - only visible on small screens */}
          <div className="flex md:hidden w-full justify-center py-6 bg-[#1C359A]">
            <img src="../img/YCB LOGO (CREAM) (1).png" alt="YCB Logo" className="w-3/4 max-w-xs h-auto object-contain" />
          </div>
          
          <div className="p-4 sm:p-6 md:p-8 flex flex-col flex-grow">
            <div className="flex flex-col sm:flex-row justify-between items-center text-gray-600 text-sm mb-4 sm:mb-6">
              <Link to="/" className="flex items-center hover:text-gray-800 mb-2 sm:mb-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Return Home
              </Link>
              <div>
                <span>Already have an account? </span>
                <Link to="/login" className="text-[#1C359A] font-bold hover:underline">LOGIN</Link>
              </div>
            </div>

            <div className="text-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1C359A]">WELCOME TO YAPPARI COFFEE BAR!</h2>
              <p className="mt-2 text-sm sm:text-base text-gray-600">"Sign up now and enjoy fresh coffee delivered to your door!"</p>
            </div>

            <form onSubmit={handleSignUp} className="flex flex-col items-center w-full">
      <h2 className="text-xl sm:text-2xl font-bold text-[#1C359A] mb-4 sm:mb-6">Sign Up</h2>
      {error && <p className="text-red-500 text-center text-sm mb-3 w-full max-w-md">{error}</p>}

      <div className="w-full flex flex-col items-center">
        {/* First name field */}
        <div className="mb-3 sm:mb-4 w-full max-w-md px-3">
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2 border border-[#1C359A] rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        
        {/* Last name field */}
        <div className="mb-3 sm:mb-4 w-full max-w-md px-3">
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2 border border-[#1C359A] rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        
        {/* Email field with validation */}
        <div className="mb-3 sm:mb-4 w-full max-w-md px-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            title="Please enter a valid email address (must contain @)"
            required
            className="w-full px-3 sm:px-4 py-2 border border-[#1C359A] rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        
        {/* Username field */}
        <div className="mb-3 sm:mb-4 w-full max-w-md px-3">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2 border border-[#1C359A] rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        
        {/* Address field with simplified city validation */}
        <div className="mb-3 sm:mb-4 w-full max-w-md px-3">
          <input
            type="text"
            name="address"
            placeholder="Full Address (including City)"
            onChange={handleChange}
            pattern=".*[Cc][Ii][Tt][Yy].*"
            title="Please enter a full address including the word 'City'"
            required
            className="w-full px-3 sm:px-4 py-2 border border-[#1C359A] rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">Example: 55 BGC Residences Taguig City</p>
        </div>
        
        {/* Phone field with 09 prefix and 11 digits validation */}
        <div className="mb-3 sm:mb-4 w-full max-w-md px-3">
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number (09XXXXXXXXX)"
            onChange={handleChange}
            pattern="09[0-9]{9}"
            title="Phone number must start with 09 and be 11 digits long"
            required
            className="w-full px-3 sm:px-4 py-2 border border-[#1C359A] rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">Example: 09123456789</p>
        </div>

        {/* Password field with toggle */}
       {/* Password field with toggle and validation */}
<div className="mb-3 sm:mb-4 w-full max-w-md px-3">
  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      name="password"
      placeholder="Password"
      onChange={handleChange}
      pattern="^(?=.*[A-Z])(?=.*\d).{8,}$"
      title="Password must be at least 8 characters with at least 1 capital letter and 1 number"
      required
      className="w-full px-3 sm:px-4 py-2 border border-[#1C359A] rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
    <button
      type="button"
      onClick={togglePasswordVisibility}
      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 focus:outline-none"
    >
      {showPassword ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )}
    </button>
  </div>
  <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters with 1 capital letter and 1 number</p>
</div>

        {/* Confirm Password field with toggle */}
        <div className="mb-3 sm:mb-4 w-full max-w-md px-3">
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
              className="w-full px-3 sm:px-4 py-2 border border-[#1C359A] rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 focus:outline-none"
            >
              {showConfirmPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="w-full max-w-md px-3">
          <button className="w-full py-2 px-4 bg-[#1C359A] text-white font-bold rounded-lg hover:bg-blue-700 transition">Sign Up</button>
        </div>
      </div>
    </form>

            <div className="text-center mt-4">
              <Link to='/contact' className="text-xs sm:text-sm text-[#1C359A] hover:underline">
                Having issues with your password?
              </Link>
            </div>
            
            <h1 className="text-xs sm:text-sm text-gray-500 text-center mt-4">OR</h1>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <span className="w-1/5 border-b border-gray-300"></span>
              <span className="text-lg sm:text-xl text-[#1C359A] font-black">Login with</span>
              <span className="w-1/5 border-b border-gray-300"></span>
            </div>
            <div className="text-center mt-4 flex items-center justify-center flex-col">
              <p className="text-xs sm:text-sm text-gray-600 mb-2">"Your perfect brew is just a click away!"</p>
              <div className="w-full max-w-md px-3">
                <div className="w-full flex justify-center">
                  <GoogleOAuthProvider clientId={clientId}>
                       <div>
                         <h2>Login with Google</h2>
                         <GoogleLogin onSuccess={onSuccess} onError={onFailure} />
                       </div>
                     </GoogleOAuthProvider>
                </div>
              </div>
            </div>
          </div>
      </div>
      </div>
      </div>
  );
};

export default SignIn;