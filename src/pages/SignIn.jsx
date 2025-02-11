import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    location: "",
    number: "",
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
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost/capstone-react/api/signup.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        alert("Signup successful! You can now log in.");
        navigate("/login");
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
      <form onSubmit={handleSignUp} className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <input type="text" name="firstname" placeholder="First Name" onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        <input type="text" name="lastname" placeholder="Last Name" onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        <input type="text" name="username" placeholder="Username" onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        <input type="text" name="location" placeholder="Location" onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        <input type="number" name="number" placeholder="Phone Number" onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        <button className="w-full mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Sign Up</button>
        <p className="text-center mt-2">
          Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn