import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

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
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        Swal.fire("Success", 'Signup successful! You can now log in.', "success");
        navigate("/login");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to connect to server");
    }
  };

  const handleGoogleSuccess = (response) => {
    console.log("Google login success", response);
    alert("Login successful! Redirecting...");
    navigate("/Home");
  };

  const handleGoogleFailure = () => {
    console.log("Google login failed");
    alert("Google login failed. Please try again.");
  };

  return (
    <GoogleOAuthProvider clientId="702818809229-bk6vh4bk1v766flofh0vk6rna342gcq1.apps.googleusercontent.com">
      <div className="bg-[#1C359A] flex flex-col md:flex-row items-center justify-center min-h-screen">
        <div className="flex flex-col justify-start w-1/3 md:w-1/2 text-white h-full">
          <div className="flex flex-col items-center min-h-screen justify-start">
            <div className="w-3/4 md:w-2/3">
              <img src="../img/YCB LOGO (CREAM) (1).png" alt="YCB Logo" className="w-full h-auto object-contain" />
            </div>
            <div className="w-2/3 md:w-1/2">
              <img src="../img/cafeviennaNobg.png" alt="Coffee and Croissant" className="w-full h-auto object-contain" />
            </div>
          </div>
        </div>

        <div className="w-2/3 md:w-2/3 bg-white rounded-lg p-8 shadow-lg h-full">
          <div className="flex justify-between items-center px-4 py-2 text-gray-600 text-sm mb-6">
            <Link to="/" className="flex items-center hover:text-gray-800">
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

          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#1C359A]">WELCOME TO YAPPARI COFFEE BAR!</h2>
            <p className="mt-2 text-gray-600">"Sign up now and enjoy fresh coffee delivered to your door!"</p>
          </div>

          <form onSubmit={handleSignUp} className="mt-6 flex items-center justify-center flex-col">
            <h2 className="text-2xl font-bold text-[#1C359A] mb-6">Sign Up</h2>
            {error && <p className="text-red-500 text-center">{error}</p>}

            {["firstname", "lastname", "email", "username", "address", "phone", "password", "confirmPassword"].map((field) => (
              <div className="mb-4" key={field}>
                <input
                  type={field.includes("password") ? "password" : "text"}
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  onChange={handleChange}
                  className="w-96 px-4 py-2 border border-[#1C359A] rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            ))}

            <button className="w-96 py-2 px-4 bg-[#1C359A] text-white font-bold rounded-lg hover:bg-blue-700 transition">Sign Up</button>
          </form>

          <div className="text-center mt-4">
            <a href="#" className="text-sm text-[#1C359A] hover:underline">Having issues with your password?</a>
          </div>

          <h1 className="text-sm text-gray-500 text-center mt-4">OR</h1>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <span className="w-1/5 border-b border-gray-300"></span>
              <span className="text-xl text-[#1C359A] font-black">Login with</span>
              <span className="w-1/5 border-b border-gray-300"></span>
            </div>
            <div className="text-center mt-4 flex items-center justify-center flex-col">
              <p className="text-gray-600 mb-2">"Your perfect brew is just a click away!"</p>
              <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure} />
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default SignIn;
