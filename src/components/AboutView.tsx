import React from 'react';
import { Target, Users, ShieldCheck, Heart, ArrowRight, Linkedin, Mail, Sparkles, Trophy } from 'lucide-react';
import { PageMode } from '../types';

interface AboutViewProps {
  setCurrentPage: (page: PageMode) => void;
}

export default function AboutView({ setCurrentPage }: AboutViewProps) {
  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20 font-sans" id="about-us-view-wrapper">
      <div className="max-w-4xl mx-auto px-6 space-y-16">
        
        {/* Header Title */}
        <div className="text-center space-y-4" id="about-header-panel">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 font-mono">Our Corporate Mission</span>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Building Ultimate Trust In Local Commerce
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
            We exist to solve one simple, critical problem: helping local service businesses capture every single incoming lead, booking slots on autopilot, and boosting review ranking velocity.
          </p>
        </div>

        {/* Corporate core pillars / values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="about-pillars-grid">
          
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="bg-blue-50 text-blue-600 w-10 h-10 rounded-xl flex items-center justify-center font-bold">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">Single Product Execution</h3>
            <p className="text-slate-550 text-xs md:text-sm leading-relaxed">
              We are not a generic marketing agency offering bloated services. We are dedicated Voice SaaS professionals focusing entirely on ultra-low latency telephone software, Google review triggers, and CRM data preservation.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="bg-blue-50 text-blue-600 w-10 h-10 rounded-xl flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">Enterprise-Grade Security</h3>
            <p className="text-slate-550 text-xs md:text-sm leading-relaxed">
              We construct all voice endpoints with strict local privacy standards, ensuring medical clinic patients, diagnostic clients, and domestic callers have their parameters logged safely under high-tier system backups.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="bg-blue-50 text-blue-600 w-10 h-10 rounded-xl flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">USA & Canada Operations</h3>
            <p className="text-slate-550 text-xs md:text-sm leading-relaxed">
              Our voice nodes and Twilio telephony stacks are optimized across USA, Canada, and Australia local dialing codes, ensuring latency averages stay under 450 milliseconds for every single active caller shift.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-250 shadow-sm space-y-3">
            <div className="bg-blue-50 text-blue-600 w-10 h-10 rounded-xl flex items-center justify-center font-bold">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">Localized Support Experts</h3>
            <p className="text-slate-550 text-xs md:text-sm leading-relaxed">
              We do not leave you to navigate complex code setups alone. Our live integrations engineers configure and monitor your custom business FAQs parameters database for a smooth launch, 24/7.
            </p>
          </div>

        </div>

        {/* Meet the Founder Section */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-3xl p-8 md:p-10 border border-slate-800 shadow-xl" id="about-founder-spotlight">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center col-span-2">
            
            {/* Avatar block */}
            <div className="md:col-span-4 flex flex-col items-center text-center space-y-3" id="founder-visual-card">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-blue-500 blur-md opacity-40 animate-pulse"></div>
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-slate-800 bg-slate-850 flex items-center justify-center overflow-hidden text-3xl font-extrabold text-blue-400 select-none shadow-inner">
                  AP
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white tracking-tight">Ankit Pandey</h4>
                <p className="text-xs text-blue-400 font-mono font-medium">Founder & Chief Architect</p>
              </div>
            </div>

            {/* Biography details */}
            <div className="md:col-span-8 flex flex-col space-y-5" id="founder-bio">
              <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold tracking-wide self-start shadow-sm">
                <Trophy className="w-3.5 h-3.5 text-blue-400" />
                <span>Executive Leadership</span>
              </div>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed font-normal">
                Ankit Pandey founded VoiceDesk AI with a vision to eliminate the friction in local business customer operations. Under Ankit's architecture, we built high-trust conversation pipelines, dynamic calendar syncing engines, and low-latency telephony nodes that convert lost incoming dials into guaranteed corporate profit.
              </p>
              
              {/* Social Channels Row */}
              <div className="flex flex-wrap items-center gap-3 pt-2" id="founder-social-buttons">
                <a 
                  href="https://www.linkedin.com/in/ankit-pandey567689" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  referrerPolicy="no-referrer"
                  className="flex items-center space-x-2 bg-slate-900 border border-slate-800 hover:border-blue-500/40 hover:bg-slate-800 text-slate-300 hover:text-white px-4 py-2.5 rounded-xl text-xs font-semibold transition"
                  id="founder-linkedin-btn"
                >
                  <Linkedin className="w-4 h-4 text-blue-500" />
                  <span>LinkedIn Profile</span>
                </a>
                <a 
                  href="mailto:hello.voicedeskai@gmail.com" 
                  className="flex items-center space-x-2 bg-slate-900 border border-slate-800 hover:border-green-500/40 hover:bg-slate-800 text-slate-300 hover:text-white px-4 py-2.5 rounded-xl text-xs font-semibold transition"
                  id="founder-email-btn"
                >
                  <Mail className="w-4 h-4 text-green-500" />
                  <span>hello.voicedeskai@gmail.com</span>
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* Corporate compliance block */}
        <div className="bg-slate-950 text-white rounded-3xl p-10 text-center space-y-6" id="about-cta-panel">
          <p className="text-xs text-blue-400 font-bold uppercase tracking-widest font-mono">VoiceDesk Saas Core Manifesto</p>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Zero Dropped Calls. 100% Retained Clients.</h2>
          
          <p className="text-slate-400 text-sm leading-relaxed max-w-xl mx-auto">
            Traditional commerce thrives on human connections. We utilize elite generative AI models to strengthen those connections, not dilute them.
          </p>

          <button
            onClick={() => setCurrentPage('book-demo')}
            className="font-sans font-bold bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl text-xs tracking-wide transition shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 active:translate-y-0.5"
            id="btn-about-manifesto-cta"
          >
            <span>Partner With VoiceDesk AI</span>
          </button>
        </div>

      </div>
    </div>
  );
}
