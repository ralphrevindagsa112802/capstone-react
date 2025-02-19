import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './index.css'

import App from './App'
import Menu from './pages/Menu'
import NotFound from './pages/NotFound'
import SignIn from './pages/SignIn'
import LogIn from './pages/LogIn'
import UserHome from './pages/useraccount/UserHome'
import UserMenu from './pages/useraccount/UserMenu'
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
    <RouterProvider router={router}/>
  </StrictMode>,
)
