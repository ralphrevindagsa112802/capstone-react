import React from 'react'
import { Link } from "react-router-dom";


const SignIn = () => {
  return (
    <div>
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

            
            <div className="w-2/3 md:w-2/3 bg-white rounded-lg p-8 shadow-lg h-full ">

            <div className="flex justify-between items-center px-4 py-2 text-gray-600 text-sm mb-6">
            
                <Link to="/" className="flex items-center hover:text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Return Home
                </Link>
            
            
                <div>
                <span>Already have an account?</span> <span></span>
                <Link to="/login" className='text-[#1C359A] font-bold hover:underline'>LOG-IN</Link>
                </div>
            </div>
            
        
            <div className="text-center">
                <h2 className="text-2xl font-bold text-[#1C359A]">WELCOME TO YAPPARI COFFEE BAR!</h2>
                <p className="mt-2 text-gray-600">"Log in now and enjoy fresh coffee delivered to your door!"</p>
            </div>

            <form className="mt-6 flex items-center justify-center flex-col">
                <div className="mb-4">
                <label for="Firstname" className="sr-only">Firstname</label>
                <input type="text" id="firstname" placeholder="Enter Firstname"
                    className="w-96 px-4 py-2 border border-[#1C359A] rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
                </div>

                <div className="mb-4 relative"> 
                <label for="Lastname" className="sr-only">Lastname</label>
                <input type="text" id="lastname" placeholder="Enter Lastname"
                    className="w-96 px-4 py-2 border border-[#1C359A] rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
                </div>

                <div className="mb-4"> 
                <label for="username" className="sr-only">Username</label>
                <input type="text" id="username" placeholder="Enter Username"
                    className="w-96 px-4 py-2 border border-[#1C359A] rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
                </div>

                <div className="mb-4 relative">
                <label for="location" className="sr-only">Location</label>
                <input type="text" id="location" placeholder="Enter Location"
                    className="w-96 px-4 py-2 border border-[#1C359A] rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
                </div>

                
                <div className="mb-4"> 
                <label for="number" className="sr-only">Number</label>
                <input type="number" id="firstname" placeholder="Enter Number"
                    className="w-96 px-4 py-2 border border-[#1C359A] rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
                </div>

                <div className="mb-4 relative"> 
                <label for="password" className="sr-only">Password</label>
                <input type="password" id="password" placeholder="Enter password"
                    className="w-96 px-4 py-2 border border-[#1C359A] rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
                <button type="button" className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-600">Show</button>
                </div>

                
                <div className="mb-4 relative"> 
                <label for="password" className="sr-only">Password</label>
                <input type="password" id="password" placeholder="Enter password"
                    className="w-96 px-4 py-2 border border-[#1C359A] rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
                <button type="button" className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-600">Show</button>
                </div>

                <div className="flex items-center justify-between">
                <button type="submit"
                    className="w-96 py-2 px-4 bg-[#1C359A] text-white font-bold rounded-lg hover:bg-blue-700 transition">SIGN-UP</button>
                </div>
            </form>

            <div className="text-center mt-4">
                <a href="#" className="text-sm text-[#1C359A] hover:underline">Having issues with your password?</a>
            </div>

            <h1 className="text-sm text-gray-500 text-center mt-4">OR</h1>

            <div className="mt-4">
                <div className="flex items-center justify-between">
                <span className="w-1/5 border-b border-gray-300"></span>
                <span className="text-xl text-[#1C359A] font-black">Log-In with</span>
                <span className="w-1/5 border-b border-gray-300"></span>
                </div>
                <div className="text-center mt-4 flex items-center justify-center flex-col">
                <p className="text-gray-600 mb-2">"Your perfect brew is just a click away!"</p>
                <button type="button"
                    className="flex items-center justify-center w-96 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                    <img src="https://www.freepik.com/free-photos-vectors/google-logo" alt="Google" class="mr-2"/> Login with Google
                </button>
                </div>
            </div>

            </div>
        </div>
    </div>
  )
}

export default SignIn