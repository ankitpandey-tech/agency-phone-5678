import React from 'react';
import { Eye, Mail, ArrowLeft, Cookie } from 'lucide-react';
import { PageMode } from '../types';

interface CookiePolicyViewProps {
  setCurrentPage: (page: PageMode) => void;
}

export default function CookiePolicyView({ setCurrentPage }: CookiePolicyViewProps) {
  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20 font-sans text-slate-800" id="cookie-policy-page">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Back Button */}
        <button
          onClick={() => setCurrentPage('home')}
          className="inline-flex items-center space-x-2 text-slate-500 hover:text-blue-600 font-semibold text-sm mb-8 transition"
          id="btn-cookies-back-home"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        {/* Article Container */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-12 shadow-sm space-y-10">
          
          {/* Document Header */}
          <div className="border-b border-slate-100 pb-8 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100 text-blue-600">
              <Cookie className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h1 className="text-3xl font-display font-black text-slate-950 tracking-tight">
                Cookie Policy
              </h1>
              <p className="text-slate-500 text-xs font-mono">
                LAST UPDATED: JUNE 26, 2026 | COVERS USA, CANADA, & AUSTRALIA COMPLIANCE
              </p>
            </div>
          </div>

          {/* Legal Text Content */}
          <div className="space-y-8 text-sm md:text-base text-slate-650 leading-relaxed">
            
            {/* Section 1 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                1. What Are Cookies?
              </h2>
              <p>
                Cookies are small text files stored on your computer or mobile device by websites you visit. They are widely used to make websites work or run more efficiently, as well as to provide reporting and behavioral metrics.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                2. How We Use Cookies
              </h2>
              <p>
                VoiceDesk AI uses cookies for the following critical and optional operations:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 text-sm">
                <li>
                  <strong>Essential Cookies:</strong> Required to authenticate users, prevent web attacks, maintain active browser session states, and load secure chat dashboards.
                </li>
                <li>
                  <strong>Performance & Analytics:</strong> Help us understand how visitors interact with our agency page by collecting and reporting anonymous analytics data.
                </li>
                <li>
                  <strong>Preference Cookies:</strong> Remember your choices such as language selection or UI toggle status.
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                3. Third-Party Cookies
              </h2>
              <p>
                In some cases, we use cookies provided by trusted third parties. For example, we integrate Google Analytics to track user interaction, which helps us refine user design. Third-party cookies are governed by their respective owners' privacy and cookie guidelines.
              </p>
            </div>

            {/* Section 4 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                4. Managing Your Cookie Preferences
              </h2>
              <p>
                Most web browsers allow you to control cookies through their settings preferences. You can refuse, block, or delete cookies at any time. However, disabling essential cookies may impact certain platform functions or cause login systems to fail.
              </p>
            </div>

            {/* Section 5 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                5. Contact Us
              </h2>
              <p>
                If you have any questions or require clarification regarding our Cookie Policy, please contact our privacy compliance officer at:
              </p>
              <div className="flex items-center space-x-3 bg-blue-50/50 border border-blue-100 rounded-2xl p-4 w-fit" id="cookie-policy-contact-card">
                <Mail className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-slate-900 text-sm">hello.voicedeskai@gmail.com</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
