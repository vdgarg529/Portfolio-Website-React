// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { HiMenu, HiX, HiMoon, HiSun } from 'react-icons/hi';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
    { name: 'Studio', href: '#studio' },
    { name: 'Blog', href: '#blog' },
  ];

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 py-4 px-6 transition-all duration-300 ${
      scrolled 
        ? darkMode 
          ? 'bg-primary/90 backdrop-blur-sm shadow-lg' 
          : 'bg-white/90 backdrop-blur-sm shadow-lg'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a 
          href="#hero" 
          className="text-2xl font-bold bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600 text-transparent"
        >
          Portfolio
        </a>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <li key={link.name}>
              <button 
                onClick={() => scrollTo(link.href.substring(1))}
                className={`font-medium hover:text-purple-500 transition-colors ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                {link.name}
              </button>
            </li>
          ))}
          
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`ml-4 p-2 rounded-full ${
              darkMode ? 'bg-gray-800 text-yellow-300' : 'bg-gray-200 text-gray-700'
            }`}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <HiSun size={20} /> : <HiMoon size={20} />}
          </button>
        </ul>
        
        {/* Mobile Navigation Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${
              darkMode ? 'bg-gray-800 text-yellow-300' : 'bg-gray-200 text-gray-700'
            }`}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <HiSun size={20} /> : <HiMoon size={20} />}
          </button>
          
          <button 
            className="text-white z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden fixed inset-0 ${
            darkMode ? 'bg-primary/95 backdrop-blur-lg' : 'bg-white/95 backdrop-blur-lg'
          } flex items-center justify-center z-40`}>
            <ul className="flex flex-col items-center space-y-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => scrollTo(link.href.substring(1))}
                    className={`text-2xl font-medium ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    } hover:text-purple-500 transition-colors`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;