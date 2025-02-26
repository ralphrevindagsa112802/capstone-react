import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/capstone-react/api/signup.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      console.log(data); // Log the response for debugging
      if (data.success) {
        alert("Signup successful! You can now log in.");
        navigate("/login");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to connect to server");
    }
  };

  return (
    <div>
      <div className="bg-[#1C359A] flex flex-col md:flex-row items-center justify-center min-h-screen">
        <div className="flex flex-col justify-start w-1/3 md:w-1/2 text-white h-full">
          <div className="flex flex-col items-center min-h-screen justify-start">
            <div className="w-3/4 md:w-2/3">
              <img
                src="../img/YCB LOGO (CREAM) (1).png"
                alt="YCB Logo"
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="w-2/3 md:w-1/2">
              <img
                src="../img/cafeviennaNobg.png"
                alt="Coffee and Croissant"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>

        <div className="w-2/3 md:w-2/3 bg-white rounded-lg p-8 shadow-lg h-full">
          <div className="flex justify-between items-center px-4 py-2 text-gray-600 text-sm mb-6">
            <Link to="/" className="flex items-center hover:text-gray-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Return Home
            </Link>

            <div>
              <span>Already have an account? </span>
              <Link
                to="/login"
                className="text-[#1C359A] font-bold hover:underline"
              >
                LOGIN
              </Link>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#1C359A]">
              WELCOME TO YAPPARI COFFEE BAR!
            </h2>
            <p className="mt-2 text-gray-600">
              "Sign up now and enjoy fresh coffee delivered to your door!"
            </p>
          </div>

          <form
            onSubmit={handleSignUp}
            className="mt-6 flex items-center justify-center flex-col"
          >
            <h2 className="text-2xl font-bold text-[#1C359A] mb-6">Sign Up</h2>
            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="mb-4">
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                onChange={handleChange}
                className="w-96 px-4 py-2 border border-[#1C359A] rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                onChange={handleChange}
                className="w-96 px-4 py-2 border border-[#1C359A] rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className="w-96 px-4 py-2 border border-[#1C359A] rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                className="w-96 px-4 py-2 border border-[#1C359A] rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <input
                type="text"
                name="address"
                placeholder="Address"
                onChange={handleChange}
                className="w-96 px-4 py-2 border border-[#1C359A] rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <input
                type="number"
                name="phone"
                placeholder="Phone Number"
                onChange={handleChange}
                className="w-96 px-4 py-2 border border-[#1C359A] rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-96 px-4 py-2 border border-[#1C359A] rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
                className="w-96 px-4 py-2 border border-[#1C359A] rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <button className="w-96 py-2 px-4 bg-[#1C359A] text-white font-bold rounded-lg hover:bg-blue-700 transition">
              Sign Up
            </button>
          </form>

      <div className="text-center mt-4">
        <a href="#" className="text-sm text-[#1C359A] hover:underline">
          Having issues with your password?
        </a>
      </div>

      <h1 className="text-sm text-gray-500 text-center mt-4">OR</h1>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <span className="w-1/5 border-b border-gray-300"></span>
          <span className="text-xl text-[#1C359A] font-black">Login with</span>
          <span className="w-1/5 border-b border-gray-300"></span>
        </div>
        <div className="text-center mt-4 flex items-center justify-center flex-col">
          <p className="text-gray-600 mb-2">
            "Your perfect brew is just a click away!"
          </p>
          <button
            type="button"
            className="flex items-center justify-center w-96 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            <img
              src="..\img\google-logo.png"
              alt="Google"
              className="mr-2 w-8 h-8"
            />
            Login with Google
          </button>
    </div>
  </div>
</div>
      </div>
    </div>
  );
};

export default SignIn;
