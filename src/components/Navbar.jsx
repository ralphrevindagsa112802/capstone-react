import { useState } from "react";
import { Link } from "react-router-dom";
import '../css/Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [error, setError] = useState(null);

  return (
    <nav className="bg-white shadow-md fixed top-0 z-50 w-full">
      <div className="container mx-auto flex items-center justify-between py-3 sm:py-4 md:py-6 px-4 sm:px-8 md:px-16 lg:px-22">
        {/* Mobile: Left Side with Cart */}
        <div className="md:hidden flex items-center justify-center">
          <button className="text-black focus:outline-none">
            <img src="../img/cart.png" alt="Cart" className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        {/* Logo - Centered on mobile, left-aligned on desktop */}
        <div className="flex items-center justify-center md:justify-start">
          <a href="/">
            <img
              src="../img/YCB LOGO (BLUE).png"
              alt="Logo"
              className="h-16 sm:h-20 md:h-24 max-w-full object-scale-down cursor-pointer"
            />
          </a>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex items-center justify-center"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg className="h-5 w-5 sm:h-6 sm:w-6 text-[#1C359A]" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5 sm:h-6 sm:w-6 text-[#1C359A]" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:space-x-8 lg:space-x-16">
          <Link to="/" className="uppercase text-black font-bold tracking-wide text-xs lg:text-sm hover:text-[#1C359A] transition-colors">Home</Link>
          <Link to="/menu" className="uppercase text-black font-bold tracking-wide text-xs lg:text-sm hover:text-[#1C359A] transition-colors">Menu</Link>
          <Link to="/company" className="uppercase text-black font-bold tracking-wide text-xs lg:text-sm hover:text-[#1C359A] transition-colors">Company</Link>
          <Link to="/special" className="uppercase text-black font-bold tracking-wide text-xs lg:text-sm hover:text-[#1C359A] transition-colors">Special</Link>
          <Link to="/contact" className="uppercase text-black font-bold tracking-wide text-xs lg:text-sm hover:text-[#1C359A] transition-colors">Contact</Link>
        </div>

        {/* Sign In Button (Desktop) */}
        <div className="hidden md:block">
          <Link to="/signin" className="bg-[#1C359A] text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-[#162f81] transition-all duration-300">
            Sign In
          </Link>
        </div>

        {/* Mobile Navigation - Full width dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden z-50">
            <div className="flex flex-col p-4 space-y-4">
              <Link to="/" className="border-l-3 border-black pl-3 uppercase font-light text-sm">Home</Link>
              <Link to="/menu" className="border-l-3 border-black pl-3 uppercase font-light text-sm">Menu</Link>
              <Link to="/company" className="border-l-3 border-black pl-3 uppercase font-light text-sm">Company</Link>
              <Link to="/special" className="border-l-3 border-black pl-3 uppercase font-light text-sm">Special</Link>
              <Link to="/contact" className="border-l-3 border-black pl-3 uppercase font-light text-sm">Contact</Link>
              <hr className="border border-black w-full" />
              <div className="flex justify-center items-center w-full py-2">
                <Link to="/signin" className="bg-[#1C359A] text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-[#162f81] transition-all duration-300">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;