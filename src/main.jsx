import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'
import { CartProvider } from "./context/CartContext";


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

import UserRequireAuth from './components/UserRequireAuth'
import AdminRequireAuth from './components/AdminRequireAuth'


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
  element: <AdminRequireAuth><AdminDashboard /></AdminRequireAuth>, 
  errorElement: <NotFound/> 
},{ 
  path: '/admin/menu', 
  element: <AdminRequireAuth><AdminMenu /></AdminRequireAuth>, 
  errorElement: <NotFound/> 
}, {
  path: '/admin/feedback',
  element: <AdminRequireAuth><AdminFeedback/></AdminRequireAuth>,
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
