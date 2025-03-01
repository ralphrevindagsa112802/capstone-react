import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'
import './index.css'
import { CartProvider } from "./context/CartContext";
import { useState, useEffect } from "react";


import Home from './pages/Home';
import Menu from './pages/Menu'
import NotFound from './pages/NotFound'
import SignIn from './pages/SignIn'
import Company from './pages/Company'
import Special from './pages/Special'
import Contact from './pages/Contact'
import LogIn from './pages/LogIn'
import UserHome from './users/UserHome'
import UserMenu from './users/UserMenu'
import UserCompany from './users/UserCompany'
import UserSpecial from './users/UserSpecial'
import UserContact from './users/UserContact'
import UserAccount from './users/UserAccount'
import UserStatus from './users/UserStatus'
import UserCart from './users/UserCart'
import UserHistory from './users/UserHistory'
import CheckOut from './components/CheckOut'
import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'
import AdminMenu from './admin/AdminMenu'
import AdminFeedback from './admin/AdminFeedback'

const RequireAuth = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost/capstone-react/api/check_admin_session.php", {
      credentials: "include", // ✅ Sends session cookie
    })
      .then((res) => res.json())
      .then((data) => setIsAuthenticated(data.success))
      .catch(() => setIsAuthenticated(false));
  }, []);

  if (isAuthenticated === null) return <p>Loading...</p>; // ✅ Avoids flickering

  return isAuthenticated ? children : navigate("/admin/login");
};

const UserRequireAuth = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    fetch("http://localhost/capstone-react/api/check_user_session.php", {
      credentials: "include", // ✅ Sends session cookie
    })
      .then((res) => res.json())
      .then((data) => setIsAuthenticated(data.success))
      .catch(() => setIsAuthenticated(false));
  }, []);

  if (isAuthenticated === null) return <p>Loading...</p>; // ✅ Avoids flickering

  return isAuthenticated ? children : navigate("/login");
};


const router = createBrowserRouter([{
  path: '/',
  element: <Home />,
  errorElement: <NotFound/>,
}, {
  path: '/menu',
  element: <Menu />,
  errorElement: <NotFound/>,
}, {
  path: '/company',
  element: <Company />,
  errorElement: <NotFound/>,
}, {
  path: '/special',
  element: <Special />,
  errorElement: <NotFound/>,
}, {
  path: '/contact',
  element: <Contact />,
  errorElement: <NotFound/>,
},{
  path: '/signin',
  element: <SignIn />,
  errorElement: <NotFound/>,
}, {
  path: '/login',
  element: <LogIn />,
  errorElement: <NotFound/>,
}, {
  path: '/user/home',
  element: <UserRequireAuth><UserHome /></UserRequireAuth>,
  errorElement: <NotFound/>,
}, {
  path: '/user/menu',
  element: <UserRequireAuth><UserMenu /></UserRequireAuth>,
  errorElement: <NotFound/>,
},  {
  path: '/user/company',
  element: <UserRequireAuth><UserCompany /></UserRequireAuth>,
  errorElement: <NotFound/>,
}, {
  path: '/user/special',
  element: <UserRequireAuth><UserSpecial /></UserRequireAuth>,
  errorElement: <NotFound/>,
}, {
  path: '/user/contact',
  element: <UserRequireAuth><UserContact /></UserRequireAuth>,
  errorElement: <NotFound/>,
}, {
  path: '/user/account',
  element: <UserRequireAuth><UserAccount /></UserRequireAuth>,
  errorElement: <NotFound/>,
}, {
  path: '/user/status',
  element: <UserRequireAuth><UserStatus /></UserRequireAuth>,
  errorElement: <NotFound/>,
},  {
  path: '/user/history',
  element: <UserRequireAuth><UserHistory /></UserRequireAuth>,
  errorElement: <NotFound/>,
}, {
  path: '/user/cart',
  element: <UserRequireAuth><UserCart /></UserRequireAuth>,
  errorElement: <NotFound/>,
}, {
  path: '/user/checkout',
  element: <UserRequireAuth><CheckOut /></UserRequireAuth>,
  errorElement: <NotFound/>,
}, {
  path: '/admin/login',
  element: <AdminLogin />,
  errorElement: <NotFound/>,
}, { 
  path: '/admin/dashboard', 
  element: <RequireAuth><AdminDashboard /></RequireAuth>, 
  errorElement: <NotFound/> 
},{ 
  path: '/admin/menu', 
  element: <RequireAuth><AdminMenu /></RequireAuth>, 
  errorElement: <NotFound/> 
}, {
  path: '/admin/feedback',
  element: <RequireAuth><AdminFeedback/></RequireAuth>,
  errorElement: <NotFound/>
}, { 
  path: '/admin/logout', 
  element: <AdminLogin/>, 
  errorElement: <NotFound/> 
},]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>,
)
