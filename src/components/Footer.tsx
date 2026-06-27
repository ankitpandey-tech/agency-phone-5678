import React from 'react';
import { Phone, Mail, Globe, Sparkles, Linkedin } from 'lucide-react';
import { PageMode } from '../types';

interface FooterProps {
  setCurrentPage: (page: PageMode) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer id="global-footer" className="bg-slate-950 text-slate-350 border-t border-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 pb-12 border-b border-slate-900">
          
          {/* Logo & Info column */}
          <div className="md:col-span-1 flex flex-col space-y-4" id="footer-branding">
            <div className="flex items-center space-x-2" id="footer-logo">
              <div className="bg-blue-600 text-white p-2 rounded-xl flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                Voice<span className="text-blue-500">Desk</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed font-normal">
              Eliminate missed calls, optimize calendar bookings, and build legendary Google review counts automatically with our 24/7 AI Receptionist solution.
            </p>
            <div className="flex items-center space-x-3 pt-2" id="footer-social-icons">
              <a 
                href="https://www.linkedin.com/in/ankit-pandey567689" 
                target="_blank" 
                rel="noopener noreferrer" 
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-850 flex items-center justify-center text-slate-400 hover:text-white transition"
                title="LinkedIn Founder Profile"
              >
                <Linkedin className="w-4 h-4 text-blue-500" />
              </a>
              <a 
                href="mailto:hello.voicedeskai@gmail.com"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-green-500/50 hover:bg-slate-850 flex items-center justify-center text-slate-400 hover:text-white transition"
                title="Direct Founder Email"
              >
                <Mail className="w-4 h-4 text-green-500" />
              </a>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="flex flex-col space-y-3.5" id="footer-solutions-links">
            <h4 className="font-semibold text-sm text-white uppercase tracking-wider">Industries</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => setCurrentPage('solutions')} className="hover:text-white hover:underline text-left">
                  Medical & Dental Clinics
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('solutions')} className="hover:text-white hover:underline text-left">
                  Veterinary Care
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('solutions')} className="hover:text-white hover:underline text-left">
                  Salons & Detailing
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('solutions')} className="hover:text-white hover:underline text-left">
                  Auto Repair & Wash
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('solutions')} className="hover:text-white hover:underline text-left">
                  Residential Home Services
                </button>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="flex flex-col space-y-3.5" id="footer-company-links">
            <h4 className="font-semibold text-sm text-white uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => setCurrentPage('about')} className="hover:text-white hover:underline text-left">
                  Our Mission & Team
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('contact')} className="hover:text-white hover:underline text-left">
                  Contact Support
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('demo')} className="hover:text-white hover:underline text-left">
                  Interactive Video Demo
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('book-demo')} className="text-green-400 hover:text-green-300 font-medium text-left">
                  Book Free Setup
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Contacts Column */}
          <div className="flex flex-col space-y-3.5" id="footer-contact-info">
            <h4 className="font-semibold text-sm text-white uppercase tracking-wider">Get in Touch</h4>
            <div className="space-y-3.5 text-sm text-slate-400">
              <a href="mailto:hello.voicedeskai@gmail.com" className="flex items-center space-x-2.5 hover:text-white transition-colors" id="footer-founder-email-link">
                <Mail className="w-4 h-4 text-green-500" />
                <span className="font-medium text-slate-200">hello.voicedeskai@gmail.com</span>
              </a>
              <div className="flex items-center space-x-2.5 text-xs">
                <Globe className="w-4 h-4 text-blue-500" />
                <span>USA, Canada & Australia Coverage</span>
              </div>
              <div className="pt-2 text-[11px] text-slate-500 leading-relaxed font-mono">
                Founder: Ankit Pandey • Built with the highest data compliance parameters.
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 space-y-4 md:space-y-0" id="footer-legal-bar">
          <div>
            &copy; {year} VoiceDeskAI. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:justify-end" id="footer-legal-nav-buttons">
            <button onClick={() => setCurrentPage('data')} className="hover:text-blue-400 text-blue-500 font-semibold transition-colors">Data</button>
            <button onClick={() => setCurrentPage('privacy-policy')} className="hover:text-slate-300 transition-colors">Privacy Policy</button>
            <button onClick={() => setCurrentPage('terms')} className="hover:text-slate-300 transition-colors">Terms & Conditions</button>
            <button onClick={() => setCurrentPage('cookies')} className="hover:text-slate-300 transition-colors">Cookie Policy</button>
            <button onClick={() => setCurrentPage('refund-policy')} className="hover:text-slate-300 transition-colors">Refund Policy</button>
            <button onClick={() => setCurrentPage('contact')} className="hover:text-slate-300 transition-colors">Contact</button>
            <button onClick={() => setCurrentPage('demo')} className="hover:text-slate-300 transition-colors">Demo</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
