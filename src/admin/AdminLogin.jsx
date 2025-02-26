import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [admin_username, setAdminUsername] = useState('');
  const [admin_password, setAdminPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost/capstone-react/api/admin_login.php", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ admin_username, admin_password }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        alert("Login successful!");
        
        // ✅ Wait before navigating to let the session persist
        setTimeout(() => navigate("/admin/dashboard"), 500);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Failed to connect to the server");
      console.error("Error:", error);
    }
  };
   

  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md md:w-1/3 w-full">
        <h2 className="text-2xl font-bold text-center text-blue-800">Yappari Admin Login</h2>
        <p className="text-gray-600 text-center mt-2">Enter your admin details</p>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <form onSubmit={handleLogin} className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-700">Username
            <input
              type="text"
              id='admin_username'
              className="w-full p-3 mt-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your admin username"
              value={admin_username}
              onChange={(e) => setAdminUsername(e.target.value)}
              required
            />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password
            <input
              type="password"
              id='admin_password'
              className="w-full p-3 mt-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your admin password"
              value={admin_password}
              onChange={(e) => setAdminPassword(e.target.value)}
              required
            />
            </label>
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
