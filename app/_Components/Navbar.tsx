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
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
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
              <Link href={"https://meta-pong-eta.vercel.app/"}>
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
      </div>

      {/* Mobile menu (hidden when isMenuOpen is false) */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-black/80 backdrop-blur-md p-4">
          <div className="flex flex-col items-center space-y-2">
            <a href="#home" className="block text-gray-300 hover:text-[#7FB9B9] transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
              Home
            </a>
            <a href="#how-it-works" className="block text-gray-300 hover:text-[#7FB9B9] transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
              How It Works
            </a>
            <a href="#rewards" className="block text-gray-300 hover:text-[#7FB9B9] transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
              Rewards
            </a>
            <a href="#faq" className="block text-gray-300 hover:text-[#7FB9B9] transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
              FAQ
            </a>
            <Link href={"https://meta-pong-eta.vercel.app/"}>
              <button onClick={() => setIsMenuOpen(false)} className="w-full text-center px-4 py-2 rounded-full bg-[#7FB9B9] text-white hover:bg-opacity-80 transition-colors">
                Play Now
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;