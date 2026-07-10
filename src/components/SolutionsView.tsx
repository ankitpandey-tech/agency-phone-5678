import React, { useState } from 'react';
import { 
  Heart, 
  Smile, 
  Sparkles, 
  Wrench, 
  Droplets, 
  Home, 
  Activity, 
  Trash2,
  Calendar, 
  MessageSquare, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight,
  ShieldAlert,
  Coins,
  Cpu
} from 'lucide-react';
import { PageMode } from '../types';

interface SolutionsViewProps {
  setCurrentPage: (page: PageMode) => void;
}

type IndustryKey = 'hvac' | 'plumbing' | 'electrician';

interface IndustrySolution {
  title: string;
  icon: any;
  tagline: string;
  problems: string[];
  solutions: string[];
  demoFlow: {
    caller: string;
    aiResponse: string;
    systemAction: string;
    outcomeSMS: string;
  };
  benefits: { title: string; desc: string }[];
}

export default function SolutionsView({ setCurrentPage }: SolutionsViewProps) {
  const [activeTab, setActiveTab] = useState<IndustryKey>('hvac');

  const industries: Record<IndustryKey, IndustrySolution> = {
    hvac: {
      title: "HVAC & AC Repair",
      icon: Activity,
      tagline: "Instantly capture emergency AC and heating requests, 24/7.",
      problems: [
        "Losing high-value emergency AC repair jobs after hours",
        "Technicians interrupted by phone calls while on the job",
        "Difficulty scheduling routine maintenance during busy seasons"
      ],
      solutions: [
        "Intelligent emergency routing for extreme temperatures",
        "Automated booking for seasonal AC tune-ups",
        "Seamless dispatch integration without interrupting field work"
      ],
      demoFlow: {
        caller: "\"My AC just broke and it's 95 degrees in my house, do you have someone available today?\"",
        aiResponse: "\"I understand that's an emergency. I can dispatch an emergency HVAC tech to you between 2 PM and 4 PM today. May I have your full address?\"",
        systemAction: "Logs emergency priority and updates dispatch schedule.",
        outcomeSMS: "\"Hi, your emergency HVAC tech is scheduled between 2-4 PM today. Track arrival here: neviqai.ai/track/hvac\""
      },
      benefits: [
        { title: "Capture Emergencies", desc: "Never miss a high-ticket emergency repair because no one answered the phone." },
        { title: "Automate Maintenance", desc: "Easily schedule recurring seasonal maintenance appointments." },
        { title: "Field Efficiency", desc: "Let your techs focus on the job, not on taking calls." }
      ]
    },
    plumbing: {
      title: "Plumbing Services",
      icon: Droplets,
      tagline: "Stop leaks from turning into missed opportunities.",
      problems: [
        "Unanswered calls during critical leak emergencies",
        "Wasted time on non-serviceable areas",
        "Struggle to manage routine vs. emergency scheduling"
      ],
      solutions: [
        "Instant emergency intake for active leaks and flooding",
        "Automatic zip code filtering for serviceable areas",
        "Smart calendar scheduling for non-emergency plumbing issues"
      ],
      demoFlow: {
        caller: "\"I have a pipe bursting in my basement, I need a plumber now!\"",
        aiResponse: "\"Please turn off your main water valve immediately if you can. I am dispatching our emergency plumber to your location. What is your address?\"",
        systemAction: "Creates high-priority dispatch ticket and notifies on-call plumber.",
        outcomeSMS: "\"Your emergency plumber is en route. Expected arrival in 30 minutes. Status: neviqai.ai/track/plumb\""
      },
      benefits: [
        { title: "Emergency Triage", desc: "Quickly assess and route urgent plumbing disasters to the right tech." },
        { title: "Smart Routing", desc: "Qualify leads based on location and service type before booking." },
        { title: "24/7 Reliability", desc: "Be the plumber that always answers, day or night." }
      ]
    },
    electrician: {
      title: "Electrical Contractors",
      icon: Sparkles,
      tagline: "Powering up your dispatch with automated receptionist services.",
      problems: [
        "Missing lucrative commercial or residential rewiring quotes",
        "Safety concerns with unanswered power outage calls",
        "Balancing quotes vs. actual repair dispatching"
      ],
      solutions: [
        "Intelligently books quotes for major electrical work",
        "Provides basic safety instructions for urgent electrical faults",
        "Automates follow-ups for pending estimate approvals"
      ],
      demoFlow: {
        caller: "\"Half the power in my house just went out and the breaker won't reset.\"",
        aiResponse: "\"I can help with that. Please avoid touching the panel. We can have a certified electrician out this afternoon. Can I get your address?\"",
        systemAction: "Books residential electrical diagnostic appointment.",
        outcomeSMS: "\"Your electrician is scheduled for this afternoon. Safety tips while you wait: neviqai.ai/safe/elec\""
      },
      benefits: [
        { title: "Secure More Quotes", desc: "Ensure every potential lead gets scheduled for an estimate." },
        { title: "Safety First", desc: "Provide immediate, safe responses to electrical emergencies." },
        { title: "Professional Image", desc: "Sound like a massive enterprise operation with a polished AI voice." }
      ]
    }
  };

  const activeInd = industries[activeTab];
  const ActiveIcon = activeInd.icon;

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20 font-sans" id="solutions-view-wrapper">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4" id="solutions-header-panel">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 font-mono">Tailored Industry Playbooks</span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            AI Receptionists Engineered For Your Trade
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed">
            Choose your business niche below to discover how NeviqAI resolves industry-specific bottlenecks, automates calendar scheduling, and scales your Local SEO rankings.
          </p>
        </div>

        {/* Dynamic Industries Sidebar/Top Tab system */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Selector Navigation Sidebar (Left 4 cols) */}
          <div className="lg:col-span-4 space-y-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm" id="solutions-industry-sidebar">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest px-3 mb-4 font-mono">Select Your Industry:</h3>
            
            {(Object.keys(industries) as IndustryKey[]).map((key) => {
              const ind = industries[key];
              const Icon = ind.icon;
              return (
                <button
                  key={key}
                  id={`btn-solution-tab-${key}`}
                  onClick={() => setActiveTab(key)}
                  className={`w-full flex items-center space-x-3.5 p-3.5 rounded-xl text-left transition-all ${
                    activeTab === key
                      ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/10'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-transparent hover:border-slate-100'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${activeTab === key ? 'text-white' : 'text-slate-400'}`} />
                  <span className="text-sm font-sans tracking-wide">{ind.title}</span>
                </button>
              );
            })}
          </div>

          {/* Solution Focus Panel (Right 8 cols) */}
          <div className="lg:col-span-8 space-y-8 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between min-h-[580px]" id="solutions-focus-panel">
            
            {/* Topic & Tagline */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <ActiveIcon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">{activeInd.title}</h2>
                  <p className="text-xs text-blue-600 font-bold uppercase tracking-widest font-mono">NeviqAI Playbook</p>
                </div>
              </div>
              <p className="text-slate-600 text-base leading-relaxed pl-1">
                {activeInd.tagline}
              </p>
            </div>

            {/* Problems vs Solutions Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-1" id="solutions-problems-vs-solutions">
              {/* Problem list */}
              <div className="space-y-4">
                <h4 className="flex items-center space-x-2 font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
                  <ShieldAlert className="w-4 h-4 text-red-500" />
                  <span>Common Trade Bottlenecks:</span>
                </h4>
                <ul className="space-y-3">
                  {activeInd.problems.map((p, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs text-slate-600 leading-relaxed">
                      <span className="text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solution list */}
              <div className="space-y-4">
                <h4 className="flex items-center space-x-2 font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
                  <Cpu className="w-4 h-4 text-green-500" />
                  <span>How NeviqAI Solves Them:</span>
                </h4>
                <ul className="space-y-3">
                  {activeInd.solutions.map((s, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs text-slate-650 leading-relaxed">
                      <span className="text-green-500 font-bold shrink-0 mt-0.5">✔</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Simulated Live Call Flow Diagram (Visual Step flow) */}
            <div className="bg-slate-950 text-white rounded-2xl p-6 space-y-4 border border-slate-900 relative" id="solutions-call-flow-diagram">
              <span className="absolute top-4 right-4 bg-blue-600/30 text-blue-400 border border-blue-500/20 text-[9px] font-bold font-mono px-2 py-0.5 rounded-full uppercase">
                System Workflow Schema
              </span>
              
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 font-mono">
                Automated Phone Call Routing Flowchart
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2 text-xs" id="diagram-steps-grid">
                
                {/* Step A */}
                <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-2 relative">
                  <div className="text-[10px] text-blue-400 font-mono font-bold">01 • OUTBOUND CALLER</div>
                  <p className="text-[11px] text-slate-300 italic font-mono leading-relaxed">
                    {activeInd.demoFlow.caller}
                  </p>
                </div>

                {/* Step B */}
                <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-2 relative">
                  <div className="text-[10px] text-blue-400 font-mono font-bold">02 • INSTANT REPLY</div>
                  <p className="text-[11px] text-slate-300 font-mono leading-relaxed">
                    {activeInd.demoFlow.aiResponse}
                  </p>
                </div>

                {/* Step C */}
                <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-2 relative">
                  <div className="text-[10px] text-[#22C55E] font-mono font-bold">03 • RESERVATION PARSED</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {activeInd.demoFlow.systemAction}
                  </p>
                </div>

                {/* Step D */}
                <div className="bg-slate-900 p-3.5 rounded-xl border border-[#22C55E]/40 space-y-2 relative">
                  <div className="text-[10px] text-[#22C55E] font-mono font-bold">04 • CONFIRMATION SENT</div>
                  <p className="text-[11px] text-slate-300 font-mono italic leading-relaxed">
                    {activeInd.demoFlow.outcomeSMS}
                  </p>
                </div>

              </div>
            </div>

            {/* Benefits & Metrics list */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100" id="solutions-benefits-section">
              {activeInd.benefits.map((b, idx) => (
                <div key={idx} className="space-y-1.5 p-3 hover:bg-slate-5 w-full rounded-xl transition">
                  <div className="text-xs font-extrabold text-slate-900 flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>{b.title}</span>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>

            {/* Action Buttons inside Solutions screen */}
            <div className="pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
                <Coins className="w-4 h-4 text-blue-60) text-blue-500" />
                <span>Zero installation setup fee. Configured in days by active voice pros.</span>
              </div>
              <button
                onClick={() => setCurrentPage('book-demo')}
                className="w-full md:w-auto font-sans font-bold bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center justify-center space-x-2 text-sm shadow-md shadow-blue-600/10 active:translate-y-0.5 transition"
                id="solutions-cta-booking-btn"
              >
                <span>Book Free Demo Call</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
