import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
        
        if (!isAuthenticated) {
        navigate('/admin/login');  // 🔹 Redirect to login if not authenticated
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('isAdminAuthenticated');  // Remove authentication
        navigate('/admin/login');  // Redirect to login page
    };

  return (
    <div className='bg-[#DCDEEA]'>
        <div class="w-full mx-auto flex items-center justify-between py-4 px-12 shadow-md bg-white">
            <div class="flex items-center justify-center md:justify-start w-full md:w-auto">
                <img class="h-20 w-auto object-contain block" src="../img/YCB LOGO (BLUE).png" alt=""/>
            </div>
            <div class="text-xl text-[#1C359A] font-bold">
                Admin
            </div>
        <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded-lg">
            Logout
        </button>
        </div>
       
        
    </div>
  )
}

export default AdminDashboard