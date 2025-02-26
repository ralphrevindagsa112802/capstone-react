import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './index.css'
import { CartProvider } from "./context/CartContext";

import { useState, useEffect } from "react";
import axios from "axios";


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
import CheckOut from './components/CheckOut'
import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'
import AdminMenu from './admin/AdminMenu'

const RequireAuth = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    axios.get("http://localhost/capstone-react/api/check_admin_session.php", {
      withCredentials: true // ✅ Ensures cookies are sent
    })
    .then(response => {
      setIsAuthenticated(response.data.success);
    })
    .catch(() => {
      setIsAuthenticated(false);
    });
  }, []);

  if (isAuthenticated === null) return null; // ✅ Prevents flickering

  return isAuthenticated ? children : <Navigate to="/admin/login" />;
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
  element: <UserHome />,
  errorElement: <NotFound/>,
}, {
  path: '/user/menu',
  element: <UserMenu />,
  errorElement: <NotFound/>,
},  {
  path: '/user/company',
  element: <UserCompany />,
  errorElement: <NotFound/>,
}, {
  path: '/user/special',
  element: <UserSpecial />,
  errorElement: <NotFound/>,
}, {
  path: '/user/contact',
  element: <UserContact />,
  errorElement: <NotFound/>,
}, {
  path: '/user/account',
  element: <UserAccount />,
  errorElement: <NotFound/>,
}, {
  path: '/user/status',
  element: <UserStatus />,
  errorElement: <NotFound/>,
}, {
  path: '/user/cart',
  element: <UserCart />,
  errorElement: <NotFound/>,
}, {
  path: '/user/logout',
  element: <Home />,
  errorElement: <NotFound/>,
}, {
  path: '/user/checkout',
  element: <CheckOut />,
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
},{ 
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
