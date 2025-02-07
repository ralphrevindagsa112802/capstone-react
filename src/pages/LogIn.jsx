import React from 'react'
import { Link } from "react-router-dom";

const LogIn = () => {
  return (
    <div>
            <div className="bg-[#1C359A] flex flex-col md:flex-row items-center justify-center min-h-screen">
                
                <div className="flex flex-col items-center justify-center w-1/3 md:w-1/2 text-white h-screen">
                
                <div className="flex flex-col items-center justify-center bg-blue-900 min-h-screen">
                    
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
                    <span>Not a member yet?</span> <span></span>
                    <Link to="/signin" className='text-[#1C359A] font-bold hover:underline'>JOIN NOW</Link>
                    </div>
                </div>
                
                
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#1C359A]">WELCOME TO YAPPARI COFFEE BAR!</h2>
                    <p className="mt-2 text-gray-600">"Log in now and enjoy fresh coffee delivered to your door!"</p>
                </div>

                    <form className="mt-6 flex items-center justify-center flex-col" onsubmit="handleLogin(event)">
                    <div className="mb-4">
                    <label for="username" className="sr-only">Username</label>
                    <input 
                        type="text" 
                        id="username" 
                        placeholder="Enter username" 
                        className="w-96 px-4 py-2 border border-[#1C359A] rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
                    </div>
                
                    <div className="mb-4 relative">
                    <label for="password" className="sr-only">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        placeholder="Enter password" 
                        className="w-96 px-4 py-2 border border-[#1C359A] rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
                    <button 
                        type="button" 
                        className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-600"
                        onclick="togglePasswordVisibility()">Show</button>
                    </div>
                
                    <div className="flex items-center justify-between">
                    <button 
                        type="submit"
                        className="w-96 py-2 px-4 bg-[#1C359A] text-white font-bold rounded-lg hover:bg-blue-700 transition"><Link to='/userhome'>LOGIN</Link>
                    </button>
                    </div>
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
                    <button type="button"
                        className="flex items-center justify-center w-96 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                        <img src="https://www.freepik.com/free-photos-vectors/google-logo" alt="Google" className="mr-2"/> Login with Google
                    </button>
                    </div>
                </div>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">Not a member yet?<a href="signin.html" className="text-[#1C359A] hover:underline">Join
                        Now</a></p>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default LogIn