import React, { useState } from 'react';
import { Mail, Globe, CheckCircle, ArrowRight, FileText, Send, Linkedin } from 'lucide-react';
import { PageMode } from '../types';

interface ContactViewProps {
  setCurrentPage: (page: PageMode) => void;
}

export default function ContactView({ setCurrentPage }: ContactViewProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [formError, setFormError] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!name.trim() || !email.trim() || !message.trim()) {
      setFormError("Please populate all required fields inside the contact form.");
      return;
    }
    setIsSent(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20 font-sans" id="contact-us-view-wrapper">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-4" id="contact-header-panel">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 font-mono">24/7 Client Relations</span>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            How Can We Assist You Today?
          </h1>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Have questions about custom CRM automations, multi-branch telephony, or HIPAA compliance? Drop us a line below or reserve a demo slot instantly on our calendar.
          </p>
        </div>

        {/* Contact form vs details row layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left contact forms (7 cols) */}
          <div className="lg:col-span-7 bg-white p-8 border border-slate-200 rounded-3xl shadow-sm flex flex-col justify-between" id="contact-left-form-panel">
            {isSent ? (
              <div className="text-center py-12 space-y-4 my-auto h-full flex flex-col justify-center" id="contact-submit-success">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600 mx-auto border border-green-100 shadow-sm">
                  <CheckCircle className="w-6 h-6 animate-pulse" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Message Dispatched Seamlessly!</h3>
                <p className="text-xs text-slate-550 max-w-sm mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-slate-800">{name}</span>. One of our VoiceDesk SaaS Integration Specialists or our founder Ankit Pandey will get back to your query at <span className="font-semibold text-slate-800">{email}</span> in under 12 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setIsSent(false)}
                    className="font-sans text-xs text-slate-500 hover:text-slate-900 underline"
                  >
                    Send another query
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-6 text-xs text-slate-705" id="contact-form-inputs">
                <h3 className="text-sm font-extrabold text-slate-900 border-b border-slate-100 pb-2 flex items-center space-x-2">
                  <FileText className="w-4.5 h-4.5 text-blue-600" />
                  <span>Send An Electronic Message</span>
                </h3>

                {formError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Name field */}
                  <div className="space-y-2">
                    <label htmlFor="input-contact-name" className="font-bold text-slate-800">Your Full Name *</label>
                    <input
                      type="text"
                      id="input-contact-name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="E.g. John Doe"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-xs font-sans"
                    />
                  </div>

                  {/* Email address */}
                  <div className="space-y-2">
                    <label htmlFor="input-contact-email" className="font-bold text-slate-800">Your Work Email *</label>
                    <input
                      type="email"
                      id="input-contact-email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="E.g. name@yourclinic.com"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-xs font-sans"
                    />
                  </div>

                  {/* Message body */}
                  <div className="space-y-2 col-span-1 md:col-span-2">
                    <label htmlFor="input-contact-msg" className="font-bold text-slate-800">Your Detailed Query *</label>
                    <textarea
                      id="input-contact-msg"
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="E.g. Looking to integrate VoiceDesk AI with Jane medical booking software and require HIPAA-aligned safeguards. Can you assist with setup?"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-xs font-sans leading-relaxed resize-none"
                    ></textarea>
                  </div>

                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white py-3.5 px-6 rounded-xl font-bold tracking-wide transition shadow-md shadow-blue-600/10 hover:shadow-blue-600/20 active:translate-y-0.5 flex items-center justify-center space-x-1.5"
                    id="btn-contact-submit"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right contact coordinates (5 cols) */}
          <div className="lg:col-span-5 bg-slate-950 text-white p-8 border border-slate-900 rounded-3xl shadow-sm flex flex-col justify-between" id="contact-right-coord-panel">
            
            <div className="space-y-6">
              <h3 className="font-extrabold text-md tracking-tight border-b border-slate-900 pb-2 uppercase text-slate-400">
                Support Coordinates
              </h3>

              <div className="space-y-5" id="support-coord-links">
                
                {/* Director direct email */}
                <div className="flex items-start space-x-3.5">
                  <div className="bg-green-900/40 text-green-400 p-2.5 rounded-xl border border-green-500/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="block text-[10px] uppercase font-bold text-slate-500 font-mono">Founder Direct Core Line</span>
                    <a href="mailto:hello.voicedeskai@gmail.com" className="text-sm font-semibold text-white hover:text-green-400 hover:underline">
                      hello.voicedeskai@gmail.com
                    </a>
                  </div>
                </div>

                {/* Country coverage */}
                <div className="flex items-start space-x-3.5">
                  <div className="bg-blue-900/40 text-blue-400 p-2.5 rounded-xl border border-blue-500/20">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="block text-[10px] uppercase font-bold text-slate-500 font-mono">Service Coverage</span>
                    <p className="text-sm font-semibold text-white leading-relaxed">
                      United States, Canada, and Australia local dialing codes.
                    </p>
                  </div>
                </div>

              </div>

              <hr className="border-slate-900" />
              
              <div className="space-y-3">
                <span className="font-bold text-xs text-white block">Founder Social Coordinates:</span>
                <div className="flex items-center space-x-3">
                  <a 
                    href="https://www.linkedin.com/in/ankit-pandey567689" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    referrerPolicy="no-referrer"
                    className="flex items-center space-x-2 bg-slate-900 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-850 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white transition"
                  >
                    <Linkedin className="w-4 h-4 text-blue-500" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Direct demo session CTA helper */}
            <div className="pt-6 border-t border-slate-900 mt-6 space-y-4">
              <span className="block text-[10px] uppercase font-bold text-slate-500 font-mono">Ready to experience the tech?</span>
              <button
                onClick={() => setCurrentPage('book-demo')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 px-4 font-bold text-xs tracking-wide transition shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 active:translate-y-0.5 flex items-center justify-center space-x-2"
                id="btn-contact-to-booking"
              >
                <span>Book Live Calendar Slot</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
