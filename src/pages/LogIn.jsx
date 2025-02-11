import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost/yappari_api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        alert("Login successful!");
        navigate("/user/home"); // Redirect to dashboard or homepage
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to connect to server");
    }
  };

  return (
    <div className="bg-[#1C359A] flex flex-col md:flex-row items-center justify-center min-h-screen">
      <div className="flex flex-col justify-start w-1/3 md:w-1/2 text-white h-full">
        <div className="flex flex-col items-center min-h-screen justify-start">
          <div className="w-3/4 md:w-2/3">
            <img src="../img/YCB LOGO (CREAM) (1).png" alt="YCB Logo" className="w-full h-auto object-contain"/>
          </div>
          <div className="w-2/3 md:w-1/2">
            <img src="../img/cafeviennaNobg.png" alt="Coffee and Croissant" className="w-full h-auto object-contain"/>
          </div>
        </div>
      </div>

      <div className="w-2/3 md:w-2/3 bg-white rounded-lg p-8 shadow-lg h-screen ">
        <div className="flex justify-between items-center px-4 py-2 text-gray-600 text-sm mb-6">
          <Link to="/" className="flex items-center hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Return Home
          </Link>
          <div>
            <span>Don't have an account? </span>
            <Link to="/signIn" className='text-[#1C359A] font-bold hover:underline'>SIGN-UP</Link>
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1C359A]">WELCOME BACK TO YAPPARI COFFEE BAR!</h2>
          <p className="mt-2 text-gray-600">"Log in to order your favorite coffee!"</p>
        </div>
        <form onSubmit={handleLogin} className="mt-6 flex items-center justify-center flex-col">
          <h2 className="text-2xl font-bold text-[#1C359A] mb-6">Log In</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="mb-4">
            <input type="text" name="username" placeholder="Username" onChange={handleChange} className="w-96 px-4 py-2 border border-[#1C359A] rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
          <div className="mb-4">
            <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-96 px-4 py-2 border border-[#1C359A] rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
          <button className="w-96 py-2 px-4 bg-[#1C359A] text-white font-bold rounded-lg hover:bg-blue-700 transition">Log In</button>
          
        </form>
      </div>
    </div>
  );
};

export default Login
