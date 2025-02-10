import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
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
  path: '/userhome',
  element: <UserHome />,
  errorElement: <NotFound/>,
}, {
  path: '/usermenu',
  element: <UserMenu />,
  errorElement: <NotFound/>,
}, {
  path: '/useraccount',
  element: <UserAccount />,
  errorElement: <NotFound/>,
}, {
  path: '/usercart',
  element: <UserCart />,
  errorElement: <NotFound/>,
}, {
  path: '/userlogout',
  element: <App />,
  errorElement: <NotFound/>,
}, {
  path: '/checkout',
  element: <CheckOut />,
  errorElement: <NotFound/>,
}]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
