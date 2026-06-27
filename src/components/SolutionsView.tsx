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

type IndustryKey = 'medical' | 'dental' | 'veterinary' | 'beauty' | 'auto' | 'carwash' | 'home-services';

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
  const [activeTab, setActiveTab] = useState<IndustryKey>('medical');

  const industries: Record<IndustryKey, IndustrySolution> = {
    medical: {
      title: "Medical & Health Clinics",
      icon: Heart,
      tagline: "Secure, compliant scheduling triage designed to ease front desk pressure.",
      problems: [
        "Patient calls put on holds while staff handle physical check-ins",
        "Confusing voicemails or unanswered queries after opening hours",
        "Staff wasting up to 12 hours a week manually calling to confirm check-ins"
      ],
      solutions: [
        "Instantly answer patient schedule requests and match doctors to available slots",
        "Automated confirmation and medical prep checklist SMS sent instantly",
        "Auto-dispatch follow-up links to capture positive clinic rating velocity"
      ],
      demoFlow: {
        caller: "\"Hey, I am coughing and need to schedule a standard practitioner checkup tomorrow morning with Dr. Roberts.\"",
        aiResponse: "\"I hear you, Dr. Roberts has an open slot at 9:15 AM tomorrow. May I take your full name and mobile number to hold that slot?\"",
        systemAction: "Validates electronic health system timeline. Confirms booking & reserves slot.",
        outcomeSMS: "\"Hi John, your wellness visit with Dr. Roberts is locked for tomorrow at 9:15 AM. Tap here to pre-fill your medical questionnaire: vdesk.ai/s/hp2r\""
      },
      benefits: [
        { title: "Reduce Overhead", desc: "Allows medical secretaries to focus on high-value Patient check-ins and emergency triage instead of booking phone cycles." },
        { title: "HIPAA-Friendly Security", desc: "Collects patient coordinates and symptoms list safely without public leaks." },
        { title: "Minimize No-Shows", desc: "Automated SMS confirmations with pre-clinic rules lower clinic default rates by up to 80%." }
      ]
    },
    dental: {
      title: "Dental & Orthodontic practices",
      icon: Smile,
      tagline: "Fill high-value appointment cards automatically (cleanings, implants, cosmetic whitening).",
      problems: [
        "Empty dentist chairs cost up to $450/hour in static practice expenses",
        "Patients requiring emergency treatment switch to next dentist if call is missed",
        "High staff turnover leaves phone lines completely unmonitored during lunch"
      ],
      solutions: [
        "Answers teeth cleanings or toothache inquiries, prioritizing cosmetic demands",
        "Automatically schedules checkups and prompts pre-cleaning reminders over text",
        "Kicks off Google Review links post-appointment to increase local SEO authority"
      ],
      demoFlow: {
        caller: "\"I have a chipped tooth and need to book an emergency tooth checkup as soon as possible, preferably on Tuesday.\"",
        aiResponse: "\"Ouch, I can certainly get you scheduled. We have a slot on Tuesday at 2:00 PM with Dr. Harris. What is your best contact number?\"",
        systemAction: "Synchronizes dentist scheduler and logs primary dental trauma code.",
        outcomeSMS: "\"Hi Sarah, your emergency checkup on Tuesday at 2:00 PM with Dr. Harris is locked in. Directions: voicedesk.ai/gmap/dentist\""
      },
      benefits: [
        { title: "Increase Chair Fill Rate", desc: "Keep dentist chairs booked, ensuring empty slots are automatically filled with incoming local searchers." },
        { title: "Capture Dental Emergencies", desc: "Secures high-intent emergency dental patients immediately by offering instant answers and slots." },
        { title: "Automate Recurring Visits", desc: "Promples recurring 6-month hygiene appointments via simple SMS follow-up alerts." }
      ]
    },
    veterinary: {
      title: "Veterinary practices & Pet Care Clinics",
      icon: Activity,
      tagline: "Reassuring, informative, and prompt scheduling for domestic pets.",
      problems: [
        "Anxious pet owners unable to get quick answers about emergency prep steps",
        "Vet staff unable to handle high volume wellness calls during surgical operations",
        "Missed outpatient booking requests during late hours"
      ],
      solutions: [
        "Answers scheduling requests for pet wellness visits, dental cleanings, and vaccines",
        "Provides immediate instructions for pre-surgery diets and urgent clinic hours",
        "Dispatches post-visit review text links, lifting local reputation authority"
      ],
      demoFlow: {
        caller: "\"Hello, my cat needs her annual wellness vaccination shot. Do you have any slots available this Friday afternoon?\"",
        aiResponse: "\"We would love to help your cat! Friday at 3:30 PM is open with Dr. Lopez. May I get your name and your pet’s name to reserve it?\"",
        systemAction: "Enters checkup reservation into pet directory and assigns Dr. Lopez.",
        outcomeSMS: "\"Apex Vet: Hi Emma, your cat's vaccination appointment is locked for Friday at 3:30 PM with Dr. Lopez. Pre-visit checklist: vdesk.ai/s/vet1\""
      },
      benefits: [
        { title: "Relieve Clinical Stress", desc: "Vet technicians can focus strictly on inpatient animal healthcare rather than sorting phones." },
        { title: "Durable Client Retention", desc: "Keeps pet owners updated with text reminders, ensuring they stay loyal to your neighborhood practice." },
        { title: "Auto-Triage Emergency", desc: "Flags emergency calls instantly, providing instructions to rush pets directly to staff." }
      ]
    },
    beauty: {
      title: "Beauty Salons, Stylists & Spas",
      icon: Sparkles,
      tagline: "Fill your stylist cards without picking up the receiver mid-treatment.",
      problems: [
        "Stylists cannot pick up ringing phones with dye treatments on their hands",
        "Clients booked via DM wait hours for replies, eventually scheduling elsewhere",
        "Last-minute salon cancels leave gaps that go unfilled without manual backup lists"
      ],
      solutions: [
        "Offers direct stylist lookups, service menus pricing, and automatic reservation",
        "Text confirmations link directly to style catalogs, building early client excitement",
        "Spikes salon reviews on Google automatically, pulling local SEO listings to the top"
      ],
      demoFlow: {
        caller: "\"Hi, looking to schedule a balayage haircut with Jessica this Saturday. Is she free?\"",
        aiResponse: "\"Jessica has a slot open this Saturday at 11:30 AM for a balayage haircut. May I take your phone number and name to log this?\"",
        systemAction: "Validates Jessica's stylist timeline. Blocks out 11:30 AM for color book.",
        outcomeSMS: "\"Hi Clara, your balayage treatment with Jessica is set this Saturday at 11:30 AM. See you at Suite 73 Luxe & Bloom! vdesk.ai/map\""
      },
      benefits: [
        { title: "Eliminate DM Wait Times", desc: "Instantly capture weekend appointment volume that would normally sit unanswered in Instagram DMs." },
        { title: "Promote High-Value Services", desc: "AI lists prices and highlights blowouts or styling upsells naturally during booking conversation." },
        { title: "Stylist Direct Calendars", desc: "Allows individual stylists to log in and look up their automated schedules in standard formats." }
      ]
    },
    auto: {
      title: "Auto Repair & Garage Stations",
      icon: Wrench,
      tagline: "Instant quotes lookup, diagnostic intakes, and rapid oil change bookings.",
      problems: [
        "Dirty mechanic hands cannot hold phone receivers while servicing brake lines",
        "Prospects requesting quotes switch shops if they cannot get immediate price lists",
        "Losing high-ticket transmission or engine replacement leads over busy signals"
      ],
      solutions: [
        "Provides basic synthetic oil pricing quotes and registers diagnostic slots 24/7",
        "Collects precise vehicle make, model, and year parameters during dial sessions",
        "Follows up over text after keys are returned to generate stellar Google reviews"
      ],
      demoFlow: {
        caller: "\"Hey, how much is an oil change for a 2018 Honda Civic, and do you have checking slots today?\"",
        aiResponse: "\"Our synthetic oil change package for a Civic is $89, and we have an intake slot open at 4:00 PM. Can I secure your name and phone?\"",
        systemAction: "Logs 2018 Honda Civic oil change code and holds spot for customer entry.",
        outcomeSMS: "\"Precision Torque: Hi Dave, your Honda Civic is scheduled for intake today at 4:00 PM. Tap for directions: voicedesk.ai/gmap/auto\""
      },
      benefits: [
        { title: "Dirty Hands Security", desc: "Mechanics keep their wrenches working without interrupting physical cash flow to verify simple oil prices." },
        { title: "Capture Vehicle Metadata", desc: "AI automatically collects crucial car metrics (make, model, year) before customer arrives, saving staff intake file times." },
        { title: "Google Maps authority", desc: "Pushing consistent mechanic reviews on Maps places your shop at the top of local SEO search lists." }
      ]
    },
    carwash: {
      title: "Premium Car Washes & Detailing Centers",
      icon: Droplets,
      tagline: "Schedule high-margin detailing services and cross-sell wash passes.",
      problems: [
        "Sunny Saturdays trigger massive call volume for detailing openings, overloading staff",
        "Clients decline automatic wash queues because they cannot book specific luxury detail times",
        "Dips in weekly wash bookings on rainy days with zero active text promotions"
      ],
      solutions: [
        "Coordinates detailing bays slot cards and outlines package features (hand wax, clay-bar)",
        "Automates weather alert checks, suggesting ceramic checkups on sunny weekdays",
        "Spikes Google review triggers post-wash to dominate the local SEO maps sweep"
      ],
      demoFlow: {
        caller: "\"How much is your premium interior detail service, and can you fit my Ford F-150 in tomorrow?\"",
        aiResponse: "\"Our premium interior details start at $149, and yes, we can fit your F-150 tomorrow at 1:00 PM. Can I secure your mobile number to lock this?\"",
        systemAction: "Reserves detail bay schedule and records vehicle type." ,
        outcomeSMS: "\"TurboWash: Hi Marcus, your premium truck detail is confirmed for tomorrow at 1:00 PM. Drive-in checkup directions: voicedesk.ai/map\""
      },
      benefits: [
        { title: "Upsell Express Packages", desc: "AI outlines additional services (interior detailing, hand wax, clay-bar treatments) naturally." },
        { title: "High Volume Automation", desc: "Takes up to 50 calls simultaneously, keeping detail slots booked without calling overhead." },
        { title: "Drive Membership Subscriptions", desc: "Promples weekly ceramic wash pass subscriptions over text follow-ups automatically." }
      ]
    },
    'home-services': {
      title: "Plumbing, Electrical, HVAC & Home Services",
      icon: Home,
      tagline: "24/7 lead dispatch and fast emergency response setup.",
      problems: [
        "Unanswered calls represent immediate lost revenue; homeowners call the next provider on Google",
        "Dispatchers spend hours trying to locate coordinates and details from hysterical callers",
        "Technicians on location wasting shift hours coordinating calendars on the phone"
      ],
      solutions: [
        "Answers emergency requests instantly and qualifies service values",
        "Extracts precise address variables, leak symptoms, and contact logs automatically",
        "Integrates with service grids, dispatching technicians instantly"
      ],
      demoFlow: {
        caller: "\"My basement drain is backed up and water is pooling. I need emergency plumbing help right now!\"",
        aiResponse: "\"That sounds critical, let me help you. Can you confirm your full name, phone number, and service address so I can dispatch a plumber?\"",
        systemAction: "Creates emergency ticket, parses address, coordinates plumber.",
        outcomeSMS: "\"ProShield: Emergency Plumbing ticket #402 has been raised for 481 Oak Street. Tech David is on his way. ETA: 25 mins. Map: vdesk.ai/s/track\""
      },
      benefits: [
        { title: "Instantly Capture Leads", desc: "No leaking prospects to competitors. AI secures emergency leads in under 0.5 seconds, even at midnight." },
        { title: "Pre-Screen Symptoms", desc: "Identifies problems (leaks, AC failures, short circuits) before tech arrives, optimizing supply loads." },
        { title: "Automated Dispatch CRM", desc: "Passes service address coordinates directly to ServiceTitan, Housecall Pro, or simple text sheets." }
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
            Choose your business niche below to discover how VoiceDesk AI resolves industry-specific bottlenecks, automates calendar scheduling, and scales your Local SEO rankings.
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
                  <p className="text-xs text-blue-600 font-bold uppercase tracking-widest font-mono">VoiceDesk AI Playbook</p>
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
                  <span>How VoiceDesk AI Solves Them:</span>
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
