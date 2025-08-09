import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import AcademicSourceLogo from '../assets/Academic-Source.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false); // close menu on route change
  }, [location]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const NavLinks = ({ isMobile = false }) => (
    <div className={`flex ${isMobile ? 'flex-col gap-4 pt-4' : 'gap-6 items-center'}`}>
      <Link to="/" className="hover:text-blue-500 transition">Home</Link>
      <Link to="/aboutus" className="hover:text-blue-500 transition">About Us</Link>
      <Link to="/universities" className="hover:text-blue-500 transition">Universities</Link>
      <Link to="/teams" className="hover:text-blue-500 transition">Our Teams</Link>
      <Link to="/books" className="hover:text-blue-500 transition">Books</Link>
      <Link to="/eplatform" className="hover:text-blue-500 transition">E-Resources</Link>
      <Link to="/trusted" className="hover:text-blue-500 transition">Trusted People</Link>
      <Link to="/login" className="hover:text-blue-500 transition">Login</Link>

      {/* Theme toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle Theme"
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </div>
  );

  return (
    <header className="bg-blue-100 dark:bg-gray-900 text-gray-800 dark:text-white shadow-md sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo & Title */}
          <Link to="/" className="flex items-center gap-2 sm:gap-4">
            <img
              src={AcademicSourceLogo}
              alt="Academic Source Logo"
              className="h-10 sm:h-12 w-auto object-contain"
            />
            <div className="leading-tight text-left hidden sm:block">
              <span className="text-base sm:text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-wide">
                Academic Source
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-300">
                "All Your University Content, One Place"
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex">
            <NavLinks />
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-6 py-4 border-t border-gray-300 dark:border-gray-800">
          <NavLinks isMobile />
        </div>
      )}
    </header>
  );
};

export default Navbar;
