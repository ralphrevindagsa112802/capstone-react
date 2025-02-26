import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([
        {
            id: 1,
            date: "2025-02-15",
            orderDetail: "Cappuccino, Sandwich",
            service: "Takeout",
            location: "Counter 3",
            total: 250,
            status: "Pending",
        },
        {
            id: 2,
            date: "2025-02-15",
            orderDetail: "Latte, Pastry",
            service: "Dine-in",
            location: "Table 5",
            total: 180,
            status: "Preparing",
        }
    ]);

    const [dropdownOpen, setDropdownOpen] = useState(null);

    useEffect(() => {
        fetch("http://localhost/capstone-react/api/check_admin_session.php", {
            credentials: "include", // ✅ Sends session cookie
        })
        .then((res) => res.json())
        .then((data) => {
            if (!data.success) {
                navigate("/admin/login");
            }
        })
        .catch(() => navigate("/admin/login"));
    }, [navigate]);
    

    const handleLogout = async () => {
        try {
            await fetch("http://localhost/capstone-react/api/admin_logout.php", {
                method: "POST",
                credentials: "include",
            });
    
            navigate("/admin/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    

    const toggleDropdown = (orderId) => {
        setDropdownOpen(dropdownOpen === orderId ? null : orderId);
    };

    return (
        <div className="flex flex-col h-screen bg-[#DCDEEA]">
            {/* Navbar */}
            <div className="w-full flex items-center justify-between py-4 px-12 shadow-md bg-white">
                <div className="flex items-center justify-center md:justify-start w-full md:w-auto">
                    <img
                        className="h-20 w-auto object-contain block"
                        src="/img/YCB LOGO (BLUE).png"
                        alt="Logo"
                    />
                </div>
                <div className="text-xl text-[#1C359A] font-bold">Admin</div>
            </div>

            {/* Sidebar & Main Content */}
            <div className="flex flex-row h-full">
                {/* Sidebar */}
                <div className="w-64 flex-none bg-white shadow-md h-full flex flex-col p-4">
                          <nav className="flex flex-col space-y-4">
                            <Link
                              to="/admin/dashboard"
                              className="font-bold border-l-2 border-black hover:border-[#1C359A] sidebar-link flex items-center justify-center space-x-2 p-3 hover:bg-gray-200 text-gray-800"
                            >
                              <span>Orders</span>
                            </Link>
                            <Link
                              to="/admin/menu"
                              className="font-bold border-l-2 border-black hover:border-[#1C359A] sidebar-link flex items-center justify-center space-x-2 p-3 hover:bg-gray-200 text-gray-800"
                            >
                              <span>Menu</span>
                            </Link>
                            <Link
                              to="/admin/feedback"
                              className="font-bold border-l-2 border-black hover:border-[#1C359A] sidebar-link flex items-center justify-center space-x-2 p-3 hover:bg-gray-200 text-gray-800"
                            >
                              <span>Feedback</span>
                            </Link>
                            <Link
                              to="/admin/order-history"
                              className="font-bold border-l-2 border-black hover:border-[#1C359A] sidebar-link flex items-center justify-center space-x-2 p-3 hover:bg-gray-200 text-gray-800"
                            >
                              <span>Order History</span>
                            </Link>
                          </nav>

                    {/* Logout Button */}
                    <button onClick={handleLogout} className="mt-20 font-bold flex items-center justify-center bg-[#1C359A] text-white px-4 py-2 rounded-lg hover:bg-blue-800">
                        SIGN OUT
                    </button>
                </div>

                {/* Main Content */}
                <main className="p-6 w-full flex-1 overflow-auto">
                    {/* Header Section */}
                    <div className="w-full flex justify-between">
                        <div className="text-[#1C359A] text-lg font-bold">Order Management</div>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 border-2 border-[#1C359A] text-black font-bold rounded-md hover:bg-white">
                                Post status
                            </button>
                            <button className="px-4 py-2 border-2 border-[#1C359A] text-black font-bold rounded-md hover:bg-white">
                                Complete
                            </button>
                            <button className="px-4 py-2 border-2 border-[#1C359A] text-black font-bold rounded-md flex items-center space-x-2 hover:bg-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h3m-4.5 6h6m-7.5 6h9" />
                                </svg>
                                <span>Filter</span>
                            </button>
                        </div>
                    </div>

                    {/* Order Table */}
                    <div className="p-2 w-full mt-6 rounded-2xl">
                        <table className="w-full bg-white opacity-90 rounded-2xl">
                            <thead>
                                <tr className="border-t border-4 border-[#DCDEEA]">
                                    <th className="p-3 text-left text-[#808080]"><input type="checkbox" /></th>
                                    <th className="p-3 text-left text-sm text-[#808080]">Order #</th>
                                    <th className="p-3 text-left text-sm text-[#808080]">Date</th>
                                    <th className="p-3 text-left text-sm text-[#808080]">Order Details</th>
                                    <th className="p-3 text-left text-sm text-[#808080]">Service</th>
                                    <th className="p-3 text-left text-sm text-[#808080]">Location</th>
                                    <th className="p-3 text-left text-sm text-[#808080]">Total</th>
                                    <th className="p-3 text-left text-sm text-[#808080]">Status</th>
                                    <th className="p-3 text-left text-sm text-[#808080]">Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id} className="w-full border-t border-4 border-[#DCDEEA]  hover:bg-gray-100">
                                        <td className="p-3"><input type="checkbox" /></td>
                                        <td className="p-3">{order.id}</td>
                                        <td className="p-3">{order.date}</td>
                                        <td className="p-3">{order.orderDetail}</td>
                                        <td className="p-3">{order.service}</td>
                                        <td className="p-3">{order.location}</td>
                                        <td className="p-3">₱{order.total}</td>
                                        <td className="p-3">{order.status}</td>
                                        <td className="p-3 relative">
                                            {/* Three Dots Button */}
                                            <button onClick={() => toggleDropdown(order.id)} className="p-2 rounded hover:bg-gray-200">
                                                &#8230;
                                            </button>

                                            {/* Dropdown Menu */}
                                            {dropdownOpen === order.id && (
                                                <div className="z-100 absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg">
                                                    <button className="w-full text-left px-4 py-2 text-[#1C359A] hover:bg-gray-200">Update Status</button>
                                                    <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200">Payment Accepted</button>
                                                    <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200">Preparing</button>
                                                    <button className="w-full text-left px-4 py-2 text-green-600 hover:bg-gray-200">Ready to Pickup</button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
