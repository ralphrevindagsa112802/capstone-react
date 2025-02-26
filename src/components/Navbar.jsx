import { Link } from "react-router-dom";
import '../css/Navbar.css'

const Navbar = () => {
  return (
    <div>
        <nav className="bg-white shadow-md fixed top-0 z-50 w-full ">
            <div className="container mx-auto flex items-center justify-between py-6 px-22">
            
            <div className="flex items-center justify-center md:justify-start w-full md:w-auto">
                <img src="../img/YCB LOGO (BLUE).png" alt="Logo" className="h-24 w-auto object-contain block"/>
            </div>

            
            <div className="md:hidden absolute left-4">
                <button className="text-black focus:outline-none">
                <img src="img/cart.png" alt="Cart" className="h-8 w-8"/>
                </button>
            </div>

            
              <div className="hidden md:flex space-x-16">
                        <Link to="/" className="uppercase text-black font-bold tracking-wide text-sm ">Home</Link>
                        <Link to="/menu" className="uppercase text-black font-bold tracking-wide text-sm">Menu</Link>
                        <Link to="/company" className="uppercase text-black font-bold tracking-wide text-sm">Company</Link>
                        <Link to="/special" className="uppercase text-black font-bold tracking-wide text-sm">Special</Link>
                        <Link to="/contact" className="uppercase text-black font-bold tracking-wide text-sm">Contact</Link>
                </div>
                

            <div className="hidden md:block">
                <Link to="/signin" className="bg-[#1C359A] text-white px-6 py-2.5 rounded-md text-sm font-medium">
                    Sign In
                </Link>
            </div>

            <div className="md:hidden flex items-center">
                <button id="menu-button" className="text-[#1C359A] focus:outline-none">
               
                <svg id="hamburger-icon" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              
                <svg id="close-icon" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hidden" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </button>
            </div>
            </div>

         
            <div id="mobile-menu"
            className="w-7/12 absolute right-0 top-0 h-full bg-white shadow-md space-y-4 flex flex-col items-center justify-start pt-20 pb-4 md:hidden">
            <a href="#home"
                className="font-bold uppercase text-sm block px-4 py-2 text-black hover:bg-gray-100 hover:w-full transition-all duration-300 text-center">Home</a>
            <a href="#menu"
                className="font-bold uppercase text-sm block px-4 py-2 text-black hover:bg-gray-100 hover:w-full transition-all duration-300 text-center">Menu</a>
            <a href="#company"
                className="font-bold uppercase text-sm block px-4 py-2 text-black hover:bg-gray-100 hover:w-full transition-all duration-300 text-center">Company</a>
            <a href="#special"
                className="font-bold uppercase text-sm block px-4 py-2 text-black hover:bg-gray-100 hover:w-full transition-all duration-300 text-center">Special</a>
            <a href="#contact"
                className="font-bold uppercase text-sm block px-4 py-2 text-black hover:bg-gray-100 hover:w-full transition-all duration-300 text-center">Contact</a>

            <hr className="w-7/12 border-black"/>
            <a href="#signin"
                className="bg-[#1C359A] text-white px-6 py-2.5 rounded-md text-xs font-medium w-3/12 text-center mt-4 hover:bg-[#162f81] transition-all duration-300">Sign
                In</a>
            </div>
        </nav>

    </div>
  )
}

export default Navbar