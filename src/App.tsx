import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import SolutionsView from './components/SolutionsView';
import DemoBookingView from './components/DemoBookingView';
import CaseStudiesView from './components/CaseStudiesView';
import AboutView from './components/AboutView';
import ContactView from './components/ContactView';
import DemoView from './components/DemoView';
import PrivacyPolicyView from './components/PrivacyPolicyView';
import TermsConditionsView from './components/TermsConditionsView';
import CookiePolicyView from './components/CookiePolicyView';
import RefundPolicyView from './components/RefundPolicyView';
import DataView from './components/DataView';
import { PageMode } from './types';
import { Calendar, MessageSquare, PhoneCall } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageMode>('home');

  // Push scroll to top on every routing change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [currentPage]);

  // View Router
  const renderActiveView = () => {
    switch (currentPage) {
      case 'home':
        return <HomeView setCurrentPage={setCurrentPage} />;
      case 'solutions':
        return <SolutionsView setCurrentPage={setCurrentPage} />;
      case 'case-studies':
        return <CaseStudiesView setCurrentPage={setCurrentPage} />;
      case 'about':
        return <AboutView setCurrentPage={setCurrentPage} />;
      case 'contact':
        return <ContactView setCurrentPage={setCurrentPage} />;
      case 'book-demo':
        return <DemoBookingView setCurrentPage={setCurrentPage} />;
      case 'demo':
        return <DemoView setCurrentPage={setCurrentPage} />;
      case 'privacy-policy':
        return <PrivacyPolicyView setCurrentPage={setCurrentPage} />;
      case 'terms':
        return <TermsConditionsView setCurrentPage={setCurrentPage} />;
      case 'cookies':
        return <CookiePolicyView setCurrentPage={setCurrentPage} />;
      case 'refund-policy':
        return <RefundPolicyView setCurrentPage={setCurrentPage} />;
      case 'data':
        return <DataView setCurrentPage={setCurrentPage} />;
      default:
        return <HomeView setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col justify-between font-sans leading-relaxed text-slate-800 antialiased" id="voice-desk-app-pinnacle">
      
      {/* Sticky Header Navigation bar */}
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main viewport Router Area */}
      <main className="flex-1">
        {renderActiveView()}
      </main>

      {/* Conversational floating toggle helper bar for quick demo scheduling */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:flex flex-col space-y-2" id="floating-conversion-widget">
        <button
          onClick={() => setCurrentPage('book-demo')}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center space-x-2 transition duration-200 group active:translate-y-0.5"
          id="btn-floating-demo-cta"
          title="Schedule Free Voice Setup"
        >
          <Calendar className="w-5 h-5" />
          <span className="text-xs font-bold font-sans tracking-wide pr-1">Book Free Demo</span>
        </button>
      </div>

      {/* Mobile Friendly Quick Action Bar (Static at bottom of screen on smaller mobile ports) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-45 p-3 flex shadow-2xl items-center justify-between" id="mobile-sticky-action-bar">
        <div className="text-left leading-tight pl-2">
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">24/7 AI System</span>
          <span className="text-xs font-extrabold text-slate-900 font-sans tracking-tight">VoiceDesk AI Receptionist</span>
        </div>
        
        <button
          onClick={() => setCurrentPage('book-demo')}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl text-xs font-bold transition shadow-md shadow-blue-600/20 active:translate-y-0.5"
          id="btn-mobile-sticky-cta"
        >
          Book Free Demo
        </button>
      </div>

      {/* Universal footer bar */}
      <Footer setCurrentPage={setCurrentPage} />

    </div>
  );
}
