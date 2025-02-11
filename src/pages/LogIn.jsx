import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost/capstone-react/api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Login successful!");
        navigate("/user/home");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to connect to server");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <div className="relative w-full">
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button 
            type="button" 
            className="absolute right-2 top-2 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button className="w-full mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Login</button>
        <p className="text-center mt-2">
          Don't have an account? <Link to="/signin" className="text-blue-600">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default LogIn