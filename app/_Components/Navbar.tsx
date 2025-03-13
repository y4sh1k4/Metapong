"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black/30 backdrop-blur-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 py-4">
          {/* Logo */}
          <div className="flex-shrink-0 bg-transparent">
            <Image src={'/logo2.png'} width={100} height={100} alt='logo' />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-10">
              <a href="#home" className="text-gray-300 hover:text-[#19bdbd] transition-colors">
                Home
              </a>
              <a href="#mechanics" className="text-gray-300 hover:text-[#19bdbd] transition-colors">
                Mechanics
              </a>
              <a href="#how-it-works" className="text-gray-300 hover:text-[#19bdbd] transition-colors">
                How It Works
              </a>
              <a href="#faq" className="text-gray-300 hover:text-[#19bdbd] transition-colors">
                FAQ
              </a>
              <Link href={"https://meta-pong-iota.vercel.app"}>
                <button className="px-4 py-2 bg-gradient-to-r from-[#00FFFF] to-[#0088FF] rounded-md text-white hover:bg-opacity-80 transition-colors">
                  Play Now
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu - integrated with the navbar */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-68 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col items-center space-y-4">
            <a href="#home" className="block text-gray-300 hover:text-[#19bdbd] transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
              Home
            </a>
            <a href="#mechanics" className="block text-gray-300 hover:text-[#19bdbd] transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
              Mechanics
            </a>
            <a href="#how-it-works" className="block text-gray-300 hover:text-[#19bdbd] transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
              How It Works
            </a>
            <a href="#faq" className="block text-gray-300 hover:text-[#19bdbd] transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
              FAQ
            </a>
            <Link href={"https://meta-pong-iota.vercel.app"} className="w-full flex justify-center">
              <button onClick={() => setIsMenuOpen(false)} className="px-8 py-2 bg-gradient-to-r from-[#00FFFF] to-[#0088FF] rounded-md text-white hover:bg-opacity-80 transition-colors">
                Play Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;