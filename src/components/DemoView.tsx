import React, { useState } from 'react';
import { 
  Play, 
  Calendar, 
  Clock, 
  TrendingUp, 
  MessageSquare, 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  Sparkles, 
  HelpCircle, 
  Minus, 
  Plus, 
  Volume2, 
  Zap, 
  Database, 
  ChevronRight,
  Globe,
  DollarSign
} from 'lucide-react';
import { PageMode } from '../types';

interface DemoViewProps {
  setCurrentPage: (page: PageMode) => void;
}

export default function DemoView({ setCurrentPage }: DemoViewProps) {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const benefits = [
    {
      icon: <Clock className="w-6 h-6 text-blue-500" />,
      title: "24/7/365 Instant Response",
      description: "62% of calls to local businesses go unanswered. The AI receptionist answers in under 1 second, day or night, ensuring you never lose a hot lead to a competitor.",
      tag: "Zero Missed Leads",
      stats: "100% Call Answer Rate"
    },
    {
      icon: <Calendar className="w-6 h-6 text-emerald-500" />,
      title: "Automated Live Booking",
      description: "Directly reads your live calendar availability and schedules, reschedules, or cancels appointments in real-time, exactly like a human front-desk coordinator.",
      tag: "Hands-Free Booking",
      stats: "No Double-Bookings"
    },
    {
      icon: <DollarSign className="w-6 h-6 text-purple-500" />,
      title: "90% Reduction in Front-Desk Overhead",
      description: "Replacing or augmenting standard live phone staff with VoiceDesk AI reduces your cost-per-minute of reception from $1.50+ to just pennies. Save thousands per month.",
      tag: "Immediate Cost Savings",
      stats: "Save $3,000+/Month"
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-pink-500" />,
      title: "Instant Live Text Follow-up",
      description: "While on the line or immediately after a call, the AI sends SMS confirmations, custom booking links, address directions, or clinic intake forms automatically.",
      tag: "Frictionless SMS Delivery",
      stats: "Instant Conversational SMS"
    },
    {
      icon: <Globe className="w-6 h-6 text-teal-500" />,
      title: "Flawless Multilingual Telephony",
      description: "Instantly detects if a caller is speaking Spanish, Hindi, French, or English and shifts the conversation seamlessly. Support your diverse local customer base with ease.",
      tag: "Global Communications",
      stats: "30+ Languages Supported"
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-500" />,
      title: "100% Script Adherence & HIPAA Safety",
      description: "Say goodbye to training gaps, bad moods, or sick days. The AI receptionist follows HIPAA & SOC-2 compliance rules perfectly and speaks with absolute warmth on every single call.",
      tag: "Enterprise Compliance",
      stats: "Perfect Compliance Rate"
    }
  ];

  const faqs = [
    {
      question: "How does VoiceDesk AI actually answer my business phone calls?",
      answer: "We provide you with a dedicated local or toll-free phone number, or you can instantly set up conditional call-forwarding from your existing phone system (e.g. forward only when busy, unanswered, or after-hours) so calls route directly to your VoiceDesk AI receptionist."
    },
    {
      question: "Is the voice natural or does it sound like a generic robot?",
      answer: "We use ultra-low latency, state-of-the-art conversational text-to-speech models that sound incredibly natural. It includes realistic voice inflections, gentle conversational breath pauses, and highly human-like responses, so your customers feel heard and valued."
    },
    {
      question: "Can the AI integrate with my existing booking system or CRM?",
      answer: "Absolutely! We natively integrate with Google Calendar, Outlook, Calendly, Acuity, Jane App, Clio, and hundreds of other platforms via direct webhooks or Zapier. It reads your real-time availability to avoid conflicts."
    },
    {
      question: "What happens if a customer asks a highly complex or custom question?",
      answer: "If the AI receptionist encounters a query that is outside its custom trained knowledge base, it handles it gracefully: it can offer to take a detailed message, send a helpful text resource, or live-transfer the caller directly to your personal line or standard staff team."
    },
    {
      question: "How long does it take to train and set up my custom AI receptionist?",
      answer: "We can set up and deploy a fully customized AI receptionist for your business in under 24 hours! You simply provide your services, basic pricing list, business hours, and calendar links. Our onboarding experts handle the rest."
    },
    {
      question: "How does VoiceDesk AI handle spam calls, robocalls, or wrong numbers?",
      answer: "Our advanced telephony gateway instantly filters out robocalls and telemarketers before they ever hit your system. For actual wrong numbers, the AI politely explains the situation, keeping your call logs clean and zeroing out wasted minutes."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20 font-sans text-slate-800" id="dedicated-demo-page">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4" id="demo-page-header">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full font-mono inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
            Watch the System in Action
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight text-slate-900 leading-none">
            Experience VoiceDesk <span className="text-blue-600">AI</span>
          </h1>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            See exactly how our conversational voice agent answers calls, answers customer FAQs, and schedules appointments in real-time.
          </p>
        </div>

        {/* Video Player Section with Premium Frame */}
        <div className="max-w-4xl mx-auto" id="demo-video-player-container">
          <div className="bg-slate-900 rounded-3xl p-3 md:p-4 shadow-2xl border border-slate-800 relative group overflow-hidden">
            
            {/* Ambient background glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            
            {/* Device-like top bar */}
            <div className="flex items-center justify-between px-4 pb-3 pt-1 border-b border-slate-800/80 text-xs text-slate-500 font-mono">
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
              </div>
              <div className="bg-slate-950/80 px-4 py-1 rounded-md border border-slate-800/50 flex items-center gap-1.5 text-[10px] text-slate-400">
                <Volume2 className="w-3.5 h-3.5 text-blue-500" />
                <span>Live Telephony Demo Simulator</span>
              </div>
              <div className="text-[10px] bg-blue-950/40 text-blue-400 px-2 py-0.5 rounded border border-blue-900/30">
                1080P HD
              </div>
            </div>

            {/* Responsive Iframe Container */}
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black relative shadow-inner mt-3">
              <iframe
                id="youtube-demo-video-player"
                src="https://www.youtube.com/embed/knhnbk8KRrQ?si=bYpMyXpHLSwJLh6Y"
                title="VoiceDesk AI Receptionist Demo Video"
                className="w-full h-full border-0 absolute inset-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="no-referrer"
              ></iframe>
            </div>
          </div>

          {/* Prominent Call to Action below the video */}
          <div className="text-center mt-8 space-y-4" id="demo-page-cta-block">
            <button
              onClick={() => setCurrentPage('book-demo')}
              className="font-sans inline-flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-base px-8 py-4 rounded-2xl shadow-xl shadow-blue-600/10 hover:shadow-blue-600/30 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 text-center"
              id="btn-demo-page-book-free"
            >
              <span>Book Your Free Custom Setup Demo</span>
              <Calendar className="w-5 h-5 text-blue-200" />
            </button>
            <p className="text-xs text-slate-500 font-medium">
              ★ Set up an interactive phone line for your business in less than 24 hours. No card required.
            </p>
          </div>
        </div>

        {/* Local Business Benefits Section */}
        <section className="space-y-10 pt-8" id="demo-page-benefits-section">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full font-mono">
              Designed For Main Street & Clinics
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 tracking-tight">
              How VoiceDesk AI Helps Local Businesses Grow
            </h2>
            <p className="text-slate-600 text-sm md:text-base">
              The ultimate 24/7 client communication tool built to eliminate booking friction, streamline operations, and capture immediate revenue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="benefits-grid">
            {benefits.map((benefit, idx) => (
              <div 
                key={idx}
                className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-slate-300 flex flex-col justify-between group"
                id={`benefit-card-${idx}`}
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:scale-105 transition-transform duration-200">
                    {benefit.icon}
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold tracking-widest font-mono text-slate-400 uppercase">
                      {benefit.tag}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors duration-200">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-500">Key Metric:</span>
                  <span className="text-blue-600 font-mono">{benefit.stats}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Frequently Asked Questions (FAQ) Section */}
        <section className="bg-white border border-slate-200/85 rounded-3xl p-6 md:p-12 shadow-md max-w-4xl mx-auto space-y-10" id="demo-page-faq-section">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-8">
            <div className="space-y-2 max-w-lg">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full font-mono inline-flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" /> FAQ
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-black text-slate-900 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-600 text-xs md:text-sm">
                Everything you need to know about integrating VoiceDesk AI into your local clinic or retail shop.
              </p>
            </div>
            <button
              onClick={() => setCurrentPage('contact')}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50/50 hover:bg-blue-50 border border-blue-100 px-4 py-2.5 rounded-xl transition inline-flex items-center gap-1 self-start md:self-center"
              id="btn-faq-ask-custom"
            >
              <span>Have another question?</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4" id="faq-accordions">
            {faqs.map((faq, index) => {
              const isOpen = activeFAQ === index;
              return (
                <div 
                  key={index}
                  className={`border rounded-2xl transition-all duration-350 overflow-hidden ${
                    isOpen 
                      ? 'border-blue-200 bg-blue-50/10 shadow-sm' 
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                  id={`faq-accordion-item-${index}`}
                >
                  <button
                    onClick={() => setActiveFAQ(isOpen ? null : index)}
                    className="w-full flex items-center justify-between text-left p-5 font-semibold text-slate-900 text-sm md:text-base transition duration-200"
                    id={`btn-faq-toggle-${index}`}
                  >
                    <span className="pr-4">{faq.question}</span>
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                      isOpen ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                  
                  <div 
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-80 opacity-100 border-t border-slate-100' : 'max-h-0 opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="p-5 text-xs md:text-sm text-slate-600 leading-relaxed bg-slate-50/30">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Final Conversion Badge */}
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl border border-slate-800" id="demo-page-footer-cta">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
          <div className="absolute -left-20 -top-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="text-[10px] font-mono font-bold tracking-widest text-blue-400 uppercase bg-blue-950/60 border border-blue-900/40 px-3 py-1.5 rounded-full inline-block">
              ★ RISK-FREE PILOT PROGRAM
            </span>
            <h3 className="text-2xl md:text-4.5xl font-display font-black tracking-tight leading-tight">
              Ready to Give Your Phone Power?
            </h3>
            <p className="text-slate-400 text-xs md:text-sm md:text-base leading-relaxed max-w-lg mx-auto">
              Get a custom demo number pre-loaded with your business pricing, FAQ, and calendar in under 24 hours. Call it yourself and see why local business owners are moving to VoiceDesk.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setCurrentPage('book-demo')}
                className="w-full sm:w-auto font-sans inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm px-6 py-3.5 rounded-xl transition shadow-lg shadow-blue-600/20 active:translate-y-0.5"
                id="btn-footer-cta-book"
              >
                <span>Book Free Strategy Session</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </button>
              <button
                onClick={() => setCurrentPage('contact')}
                className="w-full sm:w-auto font-sans inline-flex items-center justify-center bg-slate-850 hover:bg-slate-800 text-slate-300 hover:text-white font-bold text-sm px-6 py-3.5 rounded-xl transition border border-slate-800 hover:border-slate-700"
                id="btn-footer-cta-contact"
              >
                Talk to Onboarding Team
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
