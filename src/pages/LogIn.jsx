import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("https://yappari-coffee-bar.shop/api/login", {
        method: "POST",
        credentials: "include", // ✅ Ensures session cookie is sent
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData),
    });
    
    const text = await response.text(); // ✅ Read raw response
    
    try {
        const data = JSON.parse(text); // ✅ Parse JSON
        
    
          if (data.success && data.user) {
              sessionStorage.setItem("user_id", data.user.id); 
              sessionStorage.setItem("user_name", data.user.username);
              sessionStorage.setItem("f_name", data.user.f_name);
              sessionStorage.setItem("l_name", data.user.l_name);
      
              Swal.fire({
                title: 'Success!',
                text: `Welcome back, ${data.user.f_name} ${data.user.l_name}!`,
                icon: 'success',
                timer: 2000,
              }).then(() => {
                setTimeout(() => {
                  navigate("/user/home")
                }, 500);
              })
          } else {
              setError(data.error || "Login failed");
          }
        } catch (error) {
            console.error("JSON Parse Error:", error);
            setError("Server response was not valid JSON");
        }    

    } catch (error) {
      console.error("Error:", error);
      setError("Failed to connect to server");
    }
  };

  const handleGoogleSuccess = (response) => {
    console.log("Google login success", response);
    Swal.fire("Login successful!", 'Redirecting...','success', {timer: 3000})
    navigate("/user/home");
  };

  const handleGoogleFailure = () => {
    console.log("Google login failed");
    Swal.fire('Oops...','Google login failed. Please try again.','error', {timer: 3000})
  };
  
  return (
    <GoogleOAuthProvider clientId="702818809229-bk6vh4bk1v766flofh0vk6rna342gcq1.apps.googleusercontent.com">
    <div className="bg-[#1C359A] flex flex-col md:flex-row items-stretch justify-center min-h-screen w-full">
      {/* Left side with logos - hidden on mobile, visible on medium screens and up */}
      <div className="hidden md:flex md:flex-col md:justify-start md:w-1/3 lg:w-1/2 text-white">
        <div className="flex flex-col items-center justify-start py-8">
          <div className="w-full md:w-3/4 lg:w-2/3 px-4 mb-6">
            <img src="../img/YCB LOGO (CREAM) (1).png" alt="YCB Logo" className="w-full h-auto object-contain"/>
          </div>
          <div className="w-full md:w-2/3 lg:w-1/2 px-4">
            <img src="../img/cafeviennaNobg.png" alt="Coffee and Croissant" className="w-full h-auto object-contain"/>
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
              <span>Don't have an account? </span>
              <Link to="/signIn" className='text-[#1C359A] font-bold hover:underline'>SIGN-UP</Link>
            </div>
          </div>
          
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1C359A]">WELCOME BACK TO YAPPARI COFFEE BAR!</h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600">"Log in to order your favorite coffee!"</p>
          </div>
          
          <form onSubmit={handleLogin} className="flex flex-col items-center w-full">
            {error && <p className="text-red-500 text-center text-sm mb-3 w-full max-w-md">{error}</p>}
            
            <div className="w-full flex flex-col items-center">
              <div className="mb-4 w-full max-w-md px-3">
                <input 
                  type="text" 
                  name="username" 
                  placeholder="Username" 
                  value={formData.username} 
                  onChange={handleChange} 
                  className="w-full px-3 sm:px-4 py-2 border border-[#1C359A] rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                />
              </div>
              
              <div className="mb-4 w-full max-w-md px-3">
                <input 
                  type="password" 
                  name="password" 
                  placeholder="Password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  className="w-full px-3 sm:px-4 py-2 border border-[#1C359A] rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                />
              </div>
              
              <div className="w-full max-w-md px-3">
                <button className="w-full py-2 px-4 bg-[#1C359A] text-white font-bold rounded-lg hover:bg-blue-700 transition">Log In</button>
              </div>
            </div>
          </form>
          
          <div className="text-center mt-4">
            <a href="#" className="text-xs sm:text-sm text-[#1C359A] hover:underline">Having issues with your password?</a>
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
                    <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </GoogleOAuthProvider>
  );
};

export default Login;