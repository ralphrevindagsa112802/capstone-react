import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './index.css'
import { CartProvider } from "./context/CartContext";

import App from './App'
import Menu from './pages/Menu'
import NotFound from './pages/NotFound'
import SignIn from './pages/SignIn'
import Company from './pages/Company'
import Special from './pages/Special'
import Contact from './pages/Contact'
import LogIn from './pages/LogIn'
import UserHome from './pages/useraccount/UserHome'
import UserMenu from './pages/useraccount/UserMenu'
import UserCompany from './pages/useraccount/UserCompany'
import UserSpecial from './pages/useraccount/UserSpecial'
import UserContact from './pages/useraccount/UserContact'
import UserAccount from './pages/useraccount/UserAccount'
import UserCart from './pages/useraccount/UserCart'
import CheckOut from './components/CheckOut'
import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'
import AdminMenu from './admin/AdminMenu'


const RequireAuth = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
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
  path: '/user/cart',
  element: <UserCart />,
  errorElement: <NotFound/>,
}, {
  path: '/user/logout',
  element: <App />,
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
},]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>,
)
