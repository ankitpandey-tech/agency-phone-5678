import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ArrowRight } from 'lucide-react';
import { PageMode } from '../types';

interface NavbarProps {
  currentPage: PageMode;
  setCurrentPage: (page: PageMode) => void;
}

export default function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; value: PageMode }[] = [
    { label: 'Home', value: 'home' },
    { label: 'Solutions', value: 'solutions' },
    { label: 'Demo', value: 'demo' },
    { label: 'Case Studies', value: 'case-studies' },
    { label: 'About', value: 'about' },
    { label: 'Contact', value: 'contact' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-slate-200/85 shadow-sm py-4'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => setCurrentPage('home')}
          className="flex items-center space-x-3.5 cursor-pointer group"
          id="navbar-logo-container"
        >
          <div className="bg-blue-600 text-white p-2 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:bg-blue-700 group-hover:scale-105 transition-all duration-300">
            <Phone className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-xl tracking-tight text-slate-900 leading-none">
              Voice<span className="text-blue-600">Desk</span>
              <span className="text-xs font-mono font-bold px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded ml-1">AI</span>
            </span>
            <span className="text-[9px] font-mono font-semibold text-slate-400 mt-1 flex items-center gap-1 leading-none">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block"></span>
              99.99% Telephony Uptime
            </span>
          </div>
        </div>

        {/* Center navigation */}
        <nav className="hidden lg:flex items-center space-x-8" id="nav-desktop-links">
          {navItems.map((item) => (
            <button
              key={item.value}
              id={`nav-link-${item.value}`}
              onClick={() => setCurrentPage(item.value)}
              className={`font-sans text-sm font-semibold tracking-wide transition-colors duration-200 relative py-1.5 ${
                currentPage === item.value
                  ? 'text-blue-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {item.label}
              {currentPage === item.value && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4" id="nav-action-buttons">
          <div className="hidden xl:flex items-center space-x-1.5 text-[10px] font-mono font-bold bg-slate-50 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200">
            <span className="text-green-600">✓</span>
            <span>HIPAA & SOC-2 Compliant</span>
          </div>
          <button
            id="watch-demo-header-btn"
            onClick={() => {
              setCurrentPage('demo');
            }}
            className="font-sans text-sm font-semibold text-slate-650 hover:text-slate-900 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all border border-slate-200/50"
          >
            Watch Demo
          </button>
          <button
            id="book-demo-header-btn"
            onClick={() => setCurrentPage('book-demo')}
            className="font-sans text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-center shadow-lg shadow-blue-600/10 hover:shadow-blue-600/20 active:translate-y-0.5 transition-all flex items-center space-x-1.5"
          >
            <span>Book Free Demo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center">
          <button
            id="btn-mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-600 hover:text-slate-900 p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav screen */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-slate-100 shadow-xl px-6 py-8 space-y-4 animate-fadeIn" id="nav-mobile-panel">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <button
                key={item.value}
                id={`mobile-nav-link-${item.value}`}
                onClick={() => {
                  setCurrentPage(item.value);
                  setIsOpen(false);
                }}
                className={`font-sans text-left text-base font-semibold py-2 px-3 rounded-lg ${
                  currentPage === item.value
                    ? 'text-blue-600 bg-blue-50/50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <hr className="border-slate-100" />
          <div className="flex flex-col space-y-3 pt-2">
            <button
              id="mobile-watch-demo-btn"
              onClick={() => {
                setIsOpen(false);
                setCurrentPage('demo');
              }}
              className="font-sans text-center text-sm font-semibold text-slate-700 py-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
            >
              Watch Live Demo
            </button>
            <button
              id="mobile-book-demo-btn"
              onClick={() => {
                setCurrentPage('book-demo');
                setIsOpen(false);
              }}
              className="font-sans text-center text-sm font-semibold bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/10"
            >
              Book Free Demo
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
