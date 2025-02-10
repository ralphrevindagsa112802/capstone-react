import React from 'react'

const AdminHome = () => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <div class="bg-white p-8 rounded-lg shadow-md md:w-1/3 w-100">
          <h2 class="text-2xl font-bold text-center text-blue-800">Yappari Admin Login</h2>
          <p class="text-gray-600 text-center mt-2">Please fill in your unique admin login details below</p>
          
        
    

          <form id="adminLoginForm" class="mt-6" action="login.php" method="post">
              <div class="mb-4">
                  <label class="block text-gray-700">Username</label>
                  <input type="text" name="username" id="username" class="w-full p-3 mt-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your admin email" required/>
              </div>

              <div class="mb-4">
                  <label class="block text-gray-700">Password</label>
                  <input type="password" name="password" id="password" class="w-full p-3 mt-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your admin password" required/>
              </div>

              <button type="submit"  name="submit" value="Login" class="w-full bg-blue-800 text-white py-3 rounded-lg hover:bg-blue-700 transition">
                  Sign In
              </button>
          </form>

          <p id="errorMessage" class="text-red-500 text-center mt-4 hidden">Invalid email or password.</p>
        </div>
    </div>
  )
}

export default AdminHome