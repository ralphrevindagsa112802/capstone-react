import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // 🔹 Dummy credentials (Replace with API call if needed)
    const adminUser = 'admin';
    const adminPass = 'password123';

    if (username === adminUser && password === adminPass) {
      localStorage.setItem('isAdminAuthenticated', 'true'); // Save login state
      navigate('/admin/dashboard'); // Redirect to Admin Home
    } else {
      setError('Invalid username or password!');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md md:w-1/3 w-full">
        <h2 className="text-2xl font-bold text-center text-blue-800">Yappari Admin Login</h2>
        <p className="text-gray-600 text-center mt-2">Please fill in your admin details below</p>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <form onSubmit={handleLogin} className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              className="w-full p-3 mt-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your admin username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-3 mt-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="w-full bg-blue-800 text-white py-3 rounded-lg hover:bg-blue-700 transition">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
