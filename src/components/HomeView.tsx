import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  ArrowRight, 
  Check, 
  AlertTriangle, 
  Clock, 
  Users, 
  Sparkles, 
  MessageSquare, 
  Calendar, 
  Smile, 
  Star, 
  ChevronDown, 
  Send, 
  Building, 
  Scissors, 
  Wrench, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Volume2,
  Trash2
} from 'lucide-react';
import { PageMode, Message, ExtractedLead } from '../types';

interface HomeViewProps {
  setCurrentPage: (page: PageMode) => void;
}

export default function HomeView({ setCurrentPage }: HomeViewProps) {
  // Industry tabs for the dynamic industry showcase section
  const [activeIndustryTab, setActiveIndustryTab] = useState<'clinics' | 'veterinary' | 'beauty' | 'auto' | 'carwash' | 'home-services'>('clinics');

  // ROI Calculator state values
  const [ticketValue, setTicketValue] = useState<number>(180);
  const [estimatedMissedCalls, setEstimatedMissedCalls] = useState<number>(45);
  const [bookingConvPercent, setBookingConvPercent] = useState<number>(35);
  const [calculatorNiche, setCalculatorNiche] = useState<string>('dental');

  const handleNichePreset = (niche: string) => {
    setCalculatorNiche(niche);
    switch(niche) {
      case 'medical':
        setTicketValue(250);
        setEstimatedMissedCalls(50);
        setBookingConvPercent(40);
        break;
      case 'dental':
        setTicketValue(180);
        setEstimatedMissedCalls(45);
        setBookingConvPercent(35);
        break;
      case 'veterinary':
        setTicketValue(160);
        setEstimatedMissedCalls(40);
        setBookingConvPercent(30);
        break;
      case 'beauty':
        setTicketValue(110);
        setEstimatedMissedCalls(60);
        setBookingConvPercent(25);
        break;
      case 'auto':
        setTicketValue(220);
        setEstimatedMissedCalls(40);
        setBookingConvPercent(30);
        break;
      case 'home-services':
        setTicketValue(450);
        setEstimatedMissedCalls(35);
        setBookingConvPercent(45);
        break;
      default:
        break;
    }
  };

  // AI Interactive Demo Widget State
  const [demoIndustry, setDemoIndustry] = useState<string>('Medical Clinic');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg-1',
      role: 'assistant',
      text: "Thanks for calling Apex Family Medicine. This is your virtual receptionist. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  
  // Real-time extraction tracking (simulated or real from API)
  const [extractedLead, setExtractedLead] = useState<ExtractedLead>({
    customerName: null,
    customerPhone: null,
    appointmentSlot: null,
    serviceRequested: null,
    isBookingConfirmed: false
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll demo chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  // Handle changing industry in the interactive demo
  const handleDemoIndustryChange = (ind: string) => {
    setDemoIndustry(ind);
    let welcomeText = '';
    let bizName = '';
    
    switch(ind) {
      case 'Medical Clinic':
        bizName = 'Apex Family Medicine';
        welcomeText = "Thanks for calling Apex Family Medicine. This is your virtual receptionist. How can I help you book your visit?";
        break;
      case 'Dental Clinic':
        bizName = 'Radiant Smile Dentistry';
        welcomeText = "Hello! Thanks for dialling Radiant Smile Dentistry. I can assist with booking cleanings or whitening appointments today. How can I help you?";
        break;
      case 'Veterinary Clinic':
        bizName = 'Paws & Claws Animal Hospital';
        welcomeText = "Hi there, you've reached Paws & Claws Animal Hospital! Looking to schedule a checkup or dental scale for your pet today?";
        break;
      case 'Beauty Salon':
        bizName = 'Luxe & Bloom Hair Concierge';
        welcomeText = "Luxe & Bloom Salon! This is your AI assistant. Would you like to schedule a haircut, blowout, or facial treatment today?";
        break;
      case 'Auto Repair':
        bizName = 'Precision Torque Motors';
        welcomeText = "Precision Torque Motors! I can help you secure an appointment for an oil change, block maintenance, or standard inspections. What can I do for you?";
        break;
      case 'Car Wash':
        bizName = 'TurboFlow Laser Wash';
        welcomeText = "TurboFlow Laser Wash. Ready to schedule a premium ceramic express wash or professional detail appointment today?";
        break;
      case 'Home Services':
        bizName = 'ProShield Plumbers & Sparkies';
        welcomeText = "ProShield Plumbing and Electrical dispatch. Need to book a service technician, clean a drain, or do custom wiring? Let me know!";
        break;
      default:
        bizName = 'Apex Family Medicine';
        welcomeText = "Hi, welcome to our shop. How can I help you with your services today?";
    }

    setMessages([
      {
        id: `welcome-${ind}`,
        role: 'assistant',
        text: welcomeText,
        timestamp: new Date()
      }
    ]);

    setExtractedLead({
      customerName: null,
      customerPhone: null,
      appointmentSlot: null,
      serviceRequested: null,
      isBookingConfirmed: false
    });
  };

  // Reset chat demo
  const resetDemoChat = () => {
    handleDemoIndustryChange(demoIndustry);
  };

  // Send message to Express backend API
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;
    setInputValue('');

    const newUserMsg: Message = {
      id: Math.random().toString(),
      role: 'user',
      text: userText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/receptionist/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [...messages, newUserMsg].map(m => ({ role: m.role, text: m.text })),
          industry: demoIndustry
        })
      });

      if (!response.ok) {
        throw new Error('API server limit exceeded');
      }

      const data = await response.json();
      
      const assistantMsg: Message = {
        id: Math.random().toString(),
        role: 'assistant',
        text: data.reply,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMsg]);

      // If booking is confirmed by server Gemini, back it up to browser localStorage
      if (data.isBookingConfirmed) {
        const localBooking = {
          id: "bk_local_" + Math.random().toString(36).substr(2, 9),
          source: 'ai_receptionist',
          createdAt: new Date().toISOString(),
          name: data.customerName || "Valued Caller",
          phone: data.customerPhone || "N/A",
          serviceRequested: data.serviceRequested || 'General Consultation',
          appointmentSlot: data.appointmentSlot || 'N/A',
          businessName: 'VoiceDesk AI Client',
          industry: demoIndustry
        };
        try {
          const existing = localStorage.getItem('website_bookings');
          const list = existing ? JSON.parse(existing) : [];
          list.push(localBooking);
          localStorage.setItem('website_bookings', JSON.stringify(list));
        } catch (e) {
          console.error('Error saving local booking backup:', e);
        }
      }

      // Update extracted lead fields
      setExtractedLead(prev => ({
        customerName: data.customerName || prev.customerName,
        customerPhone: data.customerPhone || prev.customerPhone,
        appointmentSlot: data.appointmentSlot || prev.appointmentSlot,
        serviceRequested: data.serviceRequested || prev.serviceRequested,
        isBookingConfirmed: data.isBookingConfirmed || prev.isBookingConfirmed
      }));

    } catch (err) {
      console.error(err);
      // Smart Client-Side Redundant Fallback Simulator
      setTimeout(() => {
        const textLower = userText.toLowerCase();
        const updatedLead = { ...extractedLead };

        // 1. Service
        if (!updatedLead.serviceRequested) {
          if (textLower.includes("cleaning") || textLower.includes("dental")) {
            updatedLead.serviceRequested = "General Cleaning";
          } else if (textLower.includes("oil") || textLower.includes("tire") || textLower.includes("repair")) {
            updatedLead.serviceRequested = "Maintenance Service";
          } else if (textLower.includes("haircut") || textLower.includes("styling")) {
            updatedLead.serviceRequested = "Hair Cut & Style";
          } else {
            updatedLead.serviceRequested = "General Appointment";
          }
        }

        // 2. Name
        const nameMatch = userText.match(/(?:my name is|i am|this is|call me|name is)\s+([A-Za-z]+(?:\s+[A-Za-z]+)?)/i);
        if (nameMatch && nameMatch[1]) {
          updatedLead.customerName = nameMatch[1].trim();
        } else if (!updatedLead.customerName) {
          const words = userText.trim().split(/\s+/);
          if (words.length <= 2 && !/^(hello|hi|yes|no|sure|ok|okay|book|schedule|appointment|need|want)/i.test(words[0])) {
            updatedLead.customerName = userText.trim();
          }
        }

        // 3. Phone
        const phoneMatch = userText.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\d{7,10}/);
        if (phoneMatch) {
          updatedLead.customerPhone = phoneMatch[0];
        }

        // 4. Slot
        const slotMatch = userText.match(/(?:tomorrow|monday|tuesday|wednesday|thursday|friday|saturday|sunday|next\s+[a-z]+|today|morning|afternoon|evening|\d{1,2}(?::\d{2})?\s*(?:am|pm|o'clock))/i);
        if (slotMatch) {
          updatedLead.appointmentSlot = slotMatch[0].charAt(0).toUpperCase() + slotMatch[0].slice(1);
        }

        let fallbackReply = "";
        if (updatedLead.customerName && updatedLead.customerPhone && updatedLead.appointmentSlot) {
          updatedLead.isBookingConfirmed = true;
          fallbackReply = `Perfect! I have officially locked ${updatedLead.customerName} in for ${updatedLead.appointmentSlot} for ${updatedLead.serviceRequested}. A confirmation SMS is on its way to ${updatedLead.customerPhone}!`;
          
          // Save backup booking to local storage
          const localBooking = {
            id: "bk_local_" + Math.random().toString(36).substr(2, 9),
            source: 'ai_receptionist',
            createdAt: new Date().toISOString(),
            name: updatedLead.customerName,
            phone: updatedLead.customerPhone,
            serviceRequested: updatedLead.serviceRequested || 'General Consultation',
            appointmentSlot: updatedLead.appointmentSlot,
            businessName: 'VoiceDesk AI Client',
            industry: demoIndustry
          };
          try {
            const existing = localStorage.getItem('website_bookings');
            const list = existing ? JSON.parse(existing) : [];
            list.push(localBooking);
            localStorage.setItem('website_bookings', JSON.stringify(list));
          } catch (e) {
            console.error('Error saving local fallback booking:', e);
          }

          // Also submit fallback booking details to server database asynchronously
          fetch('/api/bookings', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              source: 'ai_receptionist',
              name: updatedLead.customerName,
              phone: updatedLead.customerPhone,
              serviceRequested: updatedLead.serviceRequested || 'General Consultation',
              appointmentSlot: updatedLead.appointmentSlot,
              businessName: 'VoiceDesk AI Client',
              industry: demoIndustry
            })
          }).catch(err => console.error('Error syncing local fallback booking to backend:', err));
        } else if (!updatedLead.customerName) {
          fallbackReply = `I'd love to help save your spot for ${demoIndustry}! Could you please tell me your name so we can create the calendar record?`;
        } else if (!updatedLead.customerPhone) {
          fallbackReply = `Nice to meet you, ${updatedLead.customerName}! What is the best cell phone number to send your confirmation text to?`;
        } else if (!updatedLead.appointmentSlot) {
          fallbackReply = `Thanks! I have your cell registered. What date and preferred time slot works best for you?`;
        } else {
          fallbackReply = `Got it. Could you confirm what specific service you'd like to schedule today?`;
        }

        setMessages(prev => [...prev, {
          id: Math.random().toString(),
          role: 'assistant',
          text: fallbackReply,
          timestamp: new Date()
        }]);

        setExtractedLead(updatedLead);
      }, 700);
    } finally {
      setIsLoading(false);
    }
  };

  // Pre-configured questions inside the FAQ Accordion
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Can the AI answer calls 24/7?",
      a: "Absolutely. Whether it's 2:00 AM on a Sunday or a frantic Monday lunchtime rush with all lines busy, your AI Receptionist answers immediately. It never calls in sick, works holidays, or places callers on painful holds."
    },
    {
      q: "Can it book appointments directly into my existing calendar?",
      a: "Yes. VoiceDesk AI fully integrates with Google Calendar, Calendly, and leading CRM tools. It checks live availability in real-time and inserts the reservation instantly without double-booking."
    },
    {
      q: "How does the Google Review Automation work?",
      a: "Once a service booking is completed in your list, VoiceDesk AI automatically dispatches an elegant SMS containing a direct Google Review link. By requesting reviews in the 'golden' hour after service, we boost clinic and shop reviews by over 300% on average."
    },
    {
      q: "Can it transfer calls to human staff?",
      a: "Yes. If an emergency caller is detected or an existing patient requests urgent assistance, the AI gracefully transfers the call to your designated on-site staff, providing a seamless human handoff."
    },
    {
      q: "Can it send missed call text-backs?",
      a: "Absolutely. If searchers ring your line and you decline or can't reach, it instantly kicks off an SMS saying: 'Hi! We missed your call. Need help booking an appointment today?'. This prevents prospects from moving to competitors."
    },
    {
      q: "Is it customizable to our specific local business instructions?",
      a: "Yes. We feed your working hours, service pricing lists, FAQ directions, and location coordinates directly into the custom model logic. The agent acts exactly as an elite, on-brand office receptionist would."
    }
  ];

  // Industry Tab Content Mapper
  const getIndustryTabContent = () => {
    switch (activeIndustryTab) {
      case 'clinics':
        return {
          title: "Medical Clinics & General Practices",
          subtitle: "HIPAA-aligned triage, instant booking, and secure confirmation.",
          problem: "Our medical receptionist was losing 40+ patient inquiry calls during peak shift handovers, forcing patients into emergency rooms or competitors.",
          solution: "VoiceDesk AI triages high-frequency patient queries, helps secure wellness visits or general physical slots, and instantly relays urgent medical requests to on-call clinical teams.",
          stat: "85% reduction in missed appointments",
          logoText: "Apex Family Clinic"
        };
      case 'veterinary':
        return {
          title: "Veterinary Care & Pet Hospitals",
          subtitle: "Emergency routing, pet checkups, and vaccination schedules.",
          problem: "Pet owners calling state-of-the-panic outside hours couldn't get triage answers or direct booking access, leading to missed local care opportunities.",
          solution: "VoiceDesk AI resolves common pet clinic questions (vaccination, pre-surgery prep rules), books general vet checkups, and routes emergencies to emergency veterinary hospital staff.",
          stat: "+3x veterinary consult rates secure",
          logoText: "Paws & Claws Denver"
        };
      case 'beauty':
        return {
          title: "Beauty Salons & Medi-Spas",
          subtitle: "Stylist calendars, recurring appointments, and automatic salon retention.",
          problem: "Stylists with hands occupied in color treatments have to let client calls ring out, losing hundreds of dollars in multi-visit customer value.",
          solution: "VoiceDesk AI answers salon lines instantly, matching stylists to requested services (blowout, classic skin therapies), confirming slots, and pushing reminders automatically.",
          stat: "Zero missed stylist slot values",
          logoText: "Chic Luxe Beverly Hills"
        };
      case 'auto':
        return {
          title: "Auto Repair & Maintenance Hubs",
          subtitle: "Diagnostic scans scheduling, synthetic oil checkups, and fast quotes.",
          problem: "Mechanics underneath car lifts cannot answer dirty phone receivers. Meanwhile, customers demand quick service pricing quotes or switch garages.",
          solution: "The AI quotes default service charges (oil changes, tire rotations), confirms diagnostic intake availability, and registers vehicles perfectly.",
          stat: "300% Google review generation rates",
          logoText: "Precision Torque Motors"
        };
      case 'carwash':
        return {
          title: "Car Wash & Detailing Businesses",
          subtitle: "High-volume detailing reservations, rain checkouts, and package upsells.",
          problem: "Detailing is high margins, but people ring constantly querying open slots on sunny Saturdays. If the phone is busy, they drive to an alternative wash.",
          solution: "VoiceDesk AI schedules specialized exterior / interior detail slots, explains the ceramic-coating features, and drives up membership levels.",
          stat: "24/7 instant wash scheduling success",
          logoText: "TurboFlow Laser Wash"
        };
      case 'home-services':
        return {
          title: "Residential Plumbers, HVAC & Electricians",
          subtitle: "Instant lead dispatch, emergency fee processing, and calendar routing.",
          problem: "Home repair is extremely competitive. An unanswered emergency plumbing call means the homeowner hangs up and calls the next contractor on Google.",
          solution: "AI schedules instant emergency callouts, takes lead phone parameters, and secures local booking slot priority automatically.",
          stat: "80% missed-call lead capture recovery",
          logoText: "ProShield Atlanta Plumbing"
        };
    }
  };

  const industryData = getIndustryTabContent();

  return (
    <div className="bg-white min-h-screen pt-20 overflow-x-hidden font-sans text-slate-800" id="home-view-wrapper">
      
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-b from-slate-50 to-white py-16 md:py-24 border-b border-slate-100" id="hero-section">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col space-y-6" id="hero-left-col">
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 text-blue-700 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide self-start shadow-sm shadow-blue-500/5">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Hybrid Voice Engine & Managed Integration Service</span>
            </div>
            
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-slate-900 leading-tight tracking-tight">
              A 24/7 AI Receptionist <br />
              <span className="text-blue-600 relative inline-block">Built & Managed For You</span>
            </h1>
            
            <p className="font-sans font-normal text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl">
              VoiceDesk AI is the absolute easiest way for local practices and service companies to eliminate missed calls. We don't just sell you software—our elite telephony engineers build, host, and tune your custom voice assistant so it books appointments directly into your business calendar perfectly.
            </p>

            <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-2xl text-xs space-y-1.5 text-slate-600 max-w-xl">
              <div className="font-bold text-slate-800 flex items-center space-x-1.5 font-mono uppercase tracking-wider text-[10px]">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                <span>The VoiceDesk Hybrid Pledge:</span>
              </div>
              <p className="leading-relaxed text-[11.5px]">
                Our dedicated onboarding team handles Twilio regulatory phone approvals, books calendar webhooks, and deploys HIPAA-safe filtering rules. Setup takes under 72 hours—fully managed with 99.99% operational SLA.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <button
                id="hero-book-demo-btn"
                onClick={() => setCurrentPage('book-demo')}
                className="font-sans text-sm font-extrabold bg-blue-600 hover:bg-blue-700 text-white px-8 py-4.5 rounded-xl text-center shadow-xl shadow-blue-600/15 hover:shadow-blue-600/25 active:translate-y-0.5 transition-all flex items-center justify-center space-x-2"
              >
                <span>Reserve Strategy Call</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button
                id="hero-watch-demo-btn"
                onClick={() => {
                  const demoSection = document.getElementById('live-receptionist-demo-section');
                  if (demoSection) {
                    demoSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="font-sans text-sm font-semibold bg-white hover:bg-slate-55 text-slate-700 border border-slate-200 hover:border-slate-350 px-8 py-4.5 rounded-xl text-center transition-all flex items-center justify-center space-x-2 shadow-sm"
              >
                <Volume2 className="w-5 h-5 text-blue-600" />
                <span>Interact With AI Sandbox</span>
              </button>
            </div>

            {/* Trust Line */}
            <div className="flex items-center space-x-4 text-[10px] font-mono font-bold text-slate-400 pt-4" id="hero-trust-bar">
              <span className="flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                <span>HIPAA CLINICAL ALIGNED</span>
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                <span>TWILIO CARRIER REGISTERED</span>
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                <span>USA-HOSTED INSTANT DEPLOY</span>
              </span>
            </div>
          </div>

          {/* Right Product Mockup Column */}
          <div className="lg:col-span-5 flex justify-center" id="hero-right-col">
            <div className="relative w-full max-w-sm bg-slate-900 text-white rounded-[3rem] p-4 shadow-2xl border-4 border-slate-800 shadow-blue-900/10">
              
              {/* Speaker notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-10 flex justify-center items-center">
                <div className="w-12 h-1 bg-slate-700 rounded-full"></div>
              </div>
 
              {/* Screen Area */}
              <div className="bg-slate-950 rounded-[2.5rem] p-6 h-[480px] flex flex-col justify-between relative overflow-hidden">
                
                {/* Status Bar */}
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                  <span>VoiceDesk Integration Hub</span>
                  <span>USA Server Active</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-green-500">● Live SLA</span>
                  </div>
                </div>
 
                {/* Simulated Audio Incoming Call Screen */}
                <div className="flex flex-col items-center justify-center space-y-6 flex-1 py-4">
                  {/* Glowing Waveform avatar */}
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-full bg-blue-500 blur-md opacity-30 animate-pulse"></div>
                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center border-4 border-slate-900 shadow-lg text-white">
                      <Phone className="w-8 h-8 animate-bounce" />
                    </div>
                  </div>
 
                  <div className="text-center space-y-1">
                    <p className="text-xs text-blue-400 uppercase tracking-widest font-bold">24/7 Managed Receptionist</p>
                    <h3 className="text-xl font-display font-bold text-white tracking-tight">System Ready to Connect</h3>
                    <p className="text-xs text-slate-450 font-mono">Active Sandbox: (303) 555-0199</p>
                  </div>
 
                  {/* Flow Steps Showcase */}
                  <div className="w-full bg-slate-900/60 rounded-2xl p-4 border border-slate-805 text-left space-y-3 text-xs">
                    <div className="flex items-center justify-between text-blue-450 font-semibold border-b border-slate-800 pb-1.5">
                      <span>Live Call Progression Flow</span>
                      <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    
                    <div className="space-y-2 font-mono text-[11px]">
                      <div className="flex items-center space-x-2 text-slate-350">
                        <span className="text-green-550 font-bold">✓</span>
                        <span className="text-slate-400">Step 1: Pick Up instantly</span>
                      </div>
                      <div className="flex items-center space-x-2 text-slate-350">
                        <span className="text-green-550 font-bold">✓</span>
                        <span className="text-slate-400">Step 2: Greet & Answer FAQ</span>
                      </div>
                      <div className="flex items-center space-x-2 text-slate-350">
                        <span className="text-blue-500 font-bold">→</span>
                        <span className="text-white font-semibold">Step 3: Direct Calendar Booking</span>
                      </div>
                      <div className="flex items-center space-x-2 text-slate-600">
                        <span className="font-bold">○</span>
                        <span>Step 4: SMS Post-Service review</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulated Interaction Action */}
                <div className="mt-auto pt-2 border-t border-slate-950 flex justify-center">
                  <button 
                    onClick={() => {
                      const demoSection = document.getElementById('live-receptionist-demo-section');
                      if (demoSection) {
                        demoSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-center text-xs font-semibold tracking-wide transition-colors shadow-lg shadow-blue-600/30"
                  >
                    Launch Custom Audio Demo
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* TRUSTED BY / INDUSTRIES STRIP */}
      <section className="bg-white border-b border-slate-100 py-10" id="trusted-by-strip">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-bold font-sans">
            Trusted by Multi-Location Businesses in USA • Canada • Australia
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 items-center justify-items-center opacity-80" id="industry-logos-grid">
            <div className="flex items-center space-x-2 font-semibold text-slate-600 hover:text-blue-600 transition-colors">
              <Building className="w-5 h-5 text-slate-400" />
              <span className="text-sm">Dental Clinics</span>
            </div>
            <div className="flex items-center space-x-2 font-semibold text-slate-600 hover:text-blue-600 transition-colors">
              <Users className="w-5 h-5 text-slate-400" />
              <span className="text-sm">Vet Care</span>
            </div>
            <div className="flex items-center space-x-2 font-semibold text-slate-600 hover:text-blue-600 transition-colors">
              <Scissors className="w-5 h-5 text-slate-400" />
              <span className="text-sm">Beauty Salons</span>
            </div>
            <div className="flex items-center space-x-2 font-semibold text-slate-600 hover:text-blue-600 transition-colors">
              <Wrench className="w-5 h-5 text-slate-400" />
              <span className="text-sm">Auto Repair Shops</span>
            </div>
            <div className="flex items-center space-x-2 font-semibold text-slate-600 hover:text-blue-600 transition-colors">
              <Sparkles className="w-5 h-5 text-slate-400" />
              <span className="text-sm">Car Wash Express</span>
            </div>
            <div className="flex items-center space-x-2 font-semibold text-slate-600 hover:text-blue-600 transition-colors">
              <Building className="w-5 h-5 text-slate-400" />
              <span className="text-sm">Home Services</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="bg-slate-50 py-20 border-b border-slate-100" id="problems-section">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">
              Why Local Businesses Lose Customers Every Day
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Google ads generate clicks, and web searches generate visibility, but traditional businesses bleed value because calls are dropped or ignored.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="problems-cards-grid">
            
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col space-y-4 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-650 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-905">Missed Calls & Lost Revenue</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                62% of calls to small businesses go completely unanswered. If your receptionist is on another line, the prospect immediately dials your competitors.
              </p>
              <div className="text-xs font-semibold text-red-650 mt-auto pt-2 bg-red-50/50 p-2 rounded-lg text-center">
                ❌ Potential Loss: $150–$500 per missed connection
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col space-y-4 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-650 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-905">No After-Hours Staffing</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Most bookings are searched after 5:00 PM in the evening when your office is closed. A simple voicemail box converts under 8% of late-night organic seekers.
              </p>
              <div className="text-xs font-semibold text-red-650 mt-auto pt-2 bg-red-50/50 p-2 rounded-lg text-center">
                ❌ Over 40% of leads generate after working hours
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col space-y-4 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-yellow-50 text-yellow-750 flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-650" />
              </div>
              <h3 className="text-lg font-bold text-slate-905">Low Google Review Count</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Without structured follow-ups, only frustrated customers post reviews. Lacking high review velocity lowers your Google Maps local search ranking.
              </p>
              <div className="text-xs font-semibold text-yellow-750 mt-auto pt-2 bg-yellow-50/50 p-2 rounded-lg text-center">
                ❌ Fails Google Local SEO algorithm check
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* DYNAMIC VALUE REAL-TIME ROI CALCULATOR SECTION */}
      <section className="bg-slate-950 text-white py-20 border-b border-slate-900 relative overflow-hidden" id="roi-calculator-section">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-emerald-600/10 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-6 space-y-12 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#22C55E] bg-emerald-500/10 px-3 py-1 rounded-full font-mono">
              Live Value Assessment
            </span>
            <h2 className="text-3xl md:text-4.5xl font-display font-extrabold text-white tracking-tight leading-tight">
              See How Much Revenue You Are Bleeding Right Now
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              USA local businesses lose up to $14,000 every month simply due to missed initial consultation or booking calls. Select your industry to play with our real-time interactive ROI calculator.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Side: Interactive Input Form Controls */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 flex flex-col justify-between">
              
              <div className="space-y-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Select Your Business Profile Preset:</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'dental', label: 'Dentist / Orthodontist' },
                    { id: 'medical', label: 'GP / Medical Clinic' },
                    { id: 'veterinary', label: 'Vet Care Clinic' },
                    { id: 'beauty', label: 'Aesthetic / Spa' },
                    { id: 'auto', label: 'Auto Repair Shop' },
                    { id: 'home-services', label: 'Plumber / HVAC Dispatch' }
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleNichePreset(preset.id)}
                      className={`text-[11px] py-2.5 px-3 rounded-xl border font-bold text-center transition-all ${
                        calculatorNiche === preset.id
                          ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/10'
                          : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:bg-slate-850 hover:text-white'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6 pt-4 border-t border-slate-800/80">
                {/* Control 1: Ticket Value */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-slate-300">Average Customer Booking Value</label>
                    <span className="font-mono text-sm font-bold text-[#22C55E]">${ticketValue}</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="1500"
                    step="10"
                    value={ticketValue}
                    onChange={(e) => {
                      setTicketValue(Number(e.target.value));
                      setCalculatorNiche('custom');
                    }}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>$50</span>
                    <span>$1,500+</span>
                  </div>
                </div>

                {/* Control 2: Est Missed Calls */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-slate-300">Unanswered Incoming Calls / Month</label>
                    <span className="font-mono text-sm font-bold text-red-400">{estimatedMissedCalls} calls</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="300"
                    step="5"
                    value={estimatedMissedCalls}
                    onChange={(e) => {
                      setEstimatedMissedCalls(Number(e.target.value));
                      setCalculatorNiche('custom');
                    }}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>10 calls</span>
                    <span>300 calls</span>
                  </div>
                </div>

                {/* Control 3: Booking rate */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-slate-300">Estimated Booking Inquiry Conversion Rate</label>
                    <span className="font-mono text-sm font-bold text-blue-400">{bookingConvPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    step="5"
                    value={bookingConvPercent}
                    onChange={(e) => {
                      setBookingConvPercent(Number(e.target.value));
                      setCalculatorNiche('custom');
                    }}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>10%</span>
                    <span>90%</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Side: Output metrics and high design card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">Your Projected Monthly Loss</h3>
                  <p className="text-xs text-slate-400 mt-1">Based on industry average data for unanswered local inquiries.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest block font-mono border-l-2 border-red-500 pl-2">Est. Monthly Lost Cash Flow</span>
                    <span className="text-4xl md:text-5xl font-black text-red-500 tracking-tight leading-tight block pt-1 font-mono">
                      ${Math.round(estimatedMissedCalls * (bookingConvPercent / 100) * ticketValue).toLocaleString()}
                    </span>
                  </div>

                  <div className="bg-slate-900/60 border border-slate-850 p-4 rounded-2xl space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Missed Inquiries / Year:</span>
                      <span className="font-mono text-slate-250 font-semibold">{estimatedMissedCalls * 12}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                       <span className="text-slate-400">Est. Booking Opportunities:</span>
                       <span className="font-mono text-slate-250 font-semibold">{Math.round(estimatedMissedCalls * (bookingConvPercent / 100))}/Mo</span>
                    </div>
                    <div className="flex justify-between text-green-400 pt-1 font-semibold">
                      <span>Monthly Recaptured Revenue with VoiceDesk:</span>
                      <span className="font-mono font-bold">${Math.round(estimatedMissedCalls * 0.85 * (bookingConvPercent / 100) * ticketValue).toLocaleString()}*</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-6">
                <p className="text-[10px] text-slate-500 italic leading-relaxed">
                  * Assumes VoiceDesk AI pick-up rate of 100% and a conservation of 85% of standard user booking intent via smart verbal logic & text callbacks.
                </p>

                <button
                  onClick={() => setCurrentPage('book-demo')}
                  className="w-full font-sans font-bold text-xs uppercase bg-[#22C55E] hover:bg-green-600 text-slate-950 py-4 px-4 rounded-xl text-center active:translate-y-0.5 duration-150 transition shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20"
                >
                  Intercept This Loss (Book Free Session)
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section className="bg-white py-20 border-b border-slate-100" id="solutions-value-section">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-blue-600">The Ultimate Employee Upgrade</div>
            <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">
              One AI Employee That Never Sleeps
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              We deploy a dedicated AI Receptionist customized to match your pricing, business hours, and operational calendar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="solutions-features-grid">
            
            {/* Feature 1 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/40 space-y-3 flex flex-col justify-between">
              <div>
                <div className="bg-blue-100 text-blue-700 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                  <Phone className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-lg">Answer Calls Instantly</h4>
                <p className="text-slate-600 text-sm leading-relaxed mt-2">
                  No hold times. No busy rings. Multi-call scaling ensures up to 100 simultaneous calls are answered in under 0.5 seconds.
                </p>
              </div>
              <span className="text-xs font-bold text-green-600 flex items-center space-x-1 pt-2">
                <Check className="w-4.5 h-4.5" /> <span>24/7/365 Coverage</span>
              </span>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/40 space-y-3 flex flex-col justify-between">
              <div>
                <div className="bg-blue-100 text-blue-700 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                  <Calendar className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-lg">Real-Time Appoint Booking</h4>
                <p className="text-slate-600 text-sm leading-relaxed mt-2">
                  AI reads availability directly from your booking integrations (Calendly, Google Calendar) and reserves slots securely.
                </p>
              </div>
              <span className="text-xs font-bold text-green-600 flex items-center space-x-1 pt-2">
                <Check className="w-4.5 h-4.5" /> <span>Direct-to-CRM Sync</span>
              </span>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/40 space-y-3 flex flex-col justify-between">
              <div>
                <div className="bg-blue-100 text-blue-700 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-lg">Instant SMS Follow-Ups</h4>
                <p className="text-slate-600 text-sm leading-relaxed mt-2">
                  Callers get confirmation links over SMS instantly. If a call drops, the AI texts them link parameters immediately.
                </p>
              </div>
              <span className="text-xs font-bold text-green-600 flex items-center space-x-1 pt-2">
                <Check className="w-4.5 h-4.5" /> <span>98% Text Open Rates</span>
              </span>
            </div>

            {/* Feature 4 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/40 space-y-3 flex flex-col justify-between">
              <div>
                <div className="bg-blue-100 text-blue-700 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                  <Star className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="font-bold text-slate-900 text-lg">Collect Google Reviews</h4>
                <p className="text-slate-600 text-sm leading-relaxed mt-2">
                  Dispatches automated and customized post-service text feedback loops, filtering out negative and funneling top stars.
                </p>
              </div>
              <span className="text-xs font-bold text-green-600 flex items-center space-x-1 pt-2">
                <Check className="w-4.5 h-4.5" /> <span>Automated SEO Booster</span>
              </span>
            </div>

            {/* Feature 5 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/40 space-y-3 flex flex-col justify-between">
              <div>
                <div className="bg-blue-100 text-blue-700 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5 animate-pulse" />
                </div>
                <h4 className="font-bold text-slate-900 text-lg">Industry FAQ Resolution</h4>
                <p className="text-slate-600 text-sm leading-relaxed mt-2">
                  No generic templates. The receptionist perfectly memorizes your business location, service prices, and check-in procedures.
                </p>
              </div>
              <span className="text-xs font-bold text-green-600 flex items-center space-x-1 pt-2">
                <Check className="w-4.5 h-4.5" /> <span>Human-Grade Logic</span>
              </span>
            </div>

            {/* Feature 6 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/40 space-y-3 flex flex-col justify-between">
              <div>
                <div className="bg-blue-100 text-blue-700 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-lg">Qualify Warm Leads</h4>
                <p className="text-slate-600 text-sm leading-relaxed mt-2">
                  Asks qualification questions based on service request value prior to booking, prioritizing high-ticket contracts.
                </p>
              </div>
              <span className="text-xs font-bold text-green-600 flex items-center space-x-1 pt-2">
                <Check className="w-4.5 h-4.5" /> <span>Increase Lead Quality</span>
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* HOW IT WORKS HORIZONTAL FLOW */}
      <section className="bg-slate-950 text-white py-20 border-b border-slate-900" id="how-it-works-section">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#22C55E]">Streamlined Automation Flow</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-white">How VoiceDesk AI Operates</h2>
            <p className="text-slate-400 text-base leading-relaxed">
              Our automated architecture loops flawlessly from the first prospect dial to verified five-star Google feedback signals.
            </p>
          </div>

          {/* Steps Horizontal Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 relative" id="how-it-works-grid">
            
            {/* Step 1 */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-center flex flex-col space-y-3 items-center group relative hover:border-blue-500/50 transition-all">
              <span className="absolute -top-3 right-4 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Step 01</span>
              <div className="w-12 h-12 bg-blue-900/40 rounded-xl flex items-center justify-center text-blue-400 mb-2 font-black">
                📞
              </div>
              <h4 className="font-bold text-white text-sm">Customer Calls</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Client rings your business line during peak or out-of-office shifts.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-center flex flex-col space-y-3 items-center group relative hover:border-blue-500/50 transition-all">
              <span className="absolute -top-3 right-4 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Step 02</span>
              <div className="w-12 h-12 bg-blue-900/40 rounded-xl flex items-center justify-center text-blue-400 mb-2 font-black">
                🤖
              </div>
              <h4 className="font-bold text-white text-sm">AI Receptionist</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                AI answers within 0.5 seconds, giving a human-like voice response.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-center flex flex-col space-y-3 items-center group relative hover:border-blue-500/50 transition-all">
              <span className="absolute -top-3 right-4 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Step 03</span>
              <div className="w-12 h-12 bg-blue-900/40 rounded-xl flex items-center justify-center text-blue-400 mb-2 font-black">
                📅
              </div>
              <h4 className="font-bold text-white text-sm">Appoint Booked</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Syncs with calendar parameters and inserts the reservation details.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-center flex flex-col space-y-3 items-center group relative hover:border-blue-500/50 transition-all">
              <span className="absolute -top-3 right-4 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Step 04</span>
              <div className="w-12 h-12 bg-blue-900/40 rounded-xl flex items-center justify-center text-blue-400 mb-2 font-black">
                💬
              </div>
              <h4 className="font-bold text-white text-sm">Instant SMS</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Auto-sends the patient or client a clear SMS confirmation map link.
              </p>
            </div>

            {/* Step 5 */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-center flex flex-col space-y-3 items-center group relative hover:border-blue-500/50 transition-all">
              <span className="absolute -top-3 right-4 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Step 05</span>
              <div className="w-12 h-12 bg-blue-900/40 rounded-xl flex items-center justify-center text-blue-400 mb-2 font-black">
                ⭐️
              </div>
              <h4 className="font-bold text-white text-sm">Review Sent</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Triggers follow-up review flow via direct SMS message after completion.
              </p>
            </div>

            {/* Step 6 */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-center flex flex-col space-y-3 items-center group relative hover:border-[#22C55E]/50 transition-all">
              <span className="absolute -top-3 right-4 bg-[#22C55E] text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full">Step 06</span>
              <div className="w-12 h-12 bg-green-900/40 rounded-xl flex items-center justify-center text-green-400 mb-2 font-black">
                📈
              </div>
              <h4 className="font-bold text-[#22C55E] text-sm">SEO Rankings Boost</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Google star velocity spikes, pushing your maps ranking to the absolute top.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* DYNAMIC INTERACTIVE DEMO (CONVERSION MAGNET) - STYLED EXACTLY LIKE AIR/SYNTHFLOW */}
      <section className="bg-slate-900 text-white py-20 border-b border-white/5 relative" id="live-receptionist-demo-section">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text / Info Side */}
          <div className="lg:col-span-5 flex flex-col space-y-6" id="demo-widget-left-col">
            <span className="text-xs uppercase tracking-widest text-blue-400 font-bold">Live Interaction Center</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Test Drive Your 24/7 AI Assistant Now
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              Select your local business industry using the selector. Send custom testing scripts to check how the Express AI Receptionist instantly answers queries, catalogs patient details, and auto-structures calendars.
            </p>

            {/* Industry Selector Selector Widget */}
            <div className="space-y-2" id="demo-industry-selector-wrapper">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">Select Target Business Identity:</p>
              <div className="grid grid-cols-2 gap-2" id="demo-industry-button-grid">
                {[
                  'Medical Clinic',
                  'Dental Clinic',
                  'Veterinary Clinic',
                  'Beauty Salon',
                  'Auto Repair',
                  'Car Wash',
                  'Home Services'
                ].map((indName) => (
                  <button
                    key={indName}
                    onClick={() => handleDemoIndustryChange(indName)}
                    className={`py-2 px-3 text-xs rounded-xl text-left border ${
                      demoIndustry === indName
                        ? 'bg-blue-600 border-blue-500 text-white font-semibold shadow-md shadow-blue-500/20'
                        : 'bg-slate-800/80 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:text-white transition-all'
                    }`}
                  >
                    <span>{indName}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Live Call Transcript Stats */}
            <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 space-y-3 text-xs text-slate-400" id="live-call-transcripts-panel">
              <div className="flex items-center justify-between text-blue-400 border-b border-slate-800 pb-2 font-mono">
                <span>SIMULATION METRIC LOG</span>
                <span className="text-green-500">ACTIVE</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-slate-300">
                <div>
                  <span className="text-[10px] block text-slate-500 uppercase">Average Latency</span>
                  <span className="font-bold text-white text-sm">450ms (Ultra Low)</span>
                </div>
                <div>
                  <span className="text-[10px] block text-slate-500 uppercase">Synthesized Speech</span>
                  <span className="font-bold text-white text-sm">11-Spoken/Sec</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Text Chat / Phone Screen Area - The interactive console */}
          <div className="lg:col-span-7" id="demo-widget-right-col">
            <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl shadow-blue-950/50 flex flex-col md:flex-row h-[520px]">
              
              {/* Chat Simulation Panel */}
              <div className="flex-1 flex flex-col h-full bg-slate-900/30">
                {/* Simulated Header */}
                <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-700 flex items-center justify-center font-bold text-white">
                      🤖
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white leading-tight">
                        VoiceDesk AI Receptionist
                      </h4>
                      <p className="text-[10px] text-slate-400">
                        Dispatching for: <span className="text-blue-400 font-semibold">{demoIndustry}</span>
                      </p>
                    </div>
                  </div>

                  <button 
                    onClick={resetDemoChat}
                    className="p-1 px-2.5 text-[10px] font-semibold bg-slate-800 text-slate-300 hover:text-white rounded-lg hover:bg-slate-700 transition"
                    title="Reset Chat Sequence"
                    id="btn-reset-demo"
                  >
                    Reset Demo
                  </button>
                </div>

                {/* Simulated Messages viewport */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4" id="demo-chat-messages-viewport">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl p-3.5 text-xs inline-block leading-relaxed relative ${
                          m.role === 'user'
                            ? 'bg-blue-600 text-white font-medium rounded-tr-none'
                            : 'bg-slate-900 text-slate-250 border border-slate-800/80 rounded-tl-none'
                        }`}
                      >
                        <p>{m.text}</p>
                        <span className="text-[9px] text-slate-400 block text-right mt-1 font-mono">
                          {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 text-xs flex items-center space-x-2">
                        <span className="text-slate-400">AI is thinking/responding...</span>
                        <div className="flex space-x-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce delay-100"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce delay-200"></span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>

                {/* Chat Custom input form */}
                <form onSubmit={handleSendMessage} className="p-3 bg-slate-950 border-t border-slate-800 flex items-center space-x-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type caller response (e.g. 'Yes schedule medical checkup...')"
                    className="flex-1 text-xs bg-slate-900 text-white rounded-xl py-3 px-4 outline-none border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono"
                    id="input-demo-caller-chat"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20"
                    aria-label="Send message"
                    id="btn-send-demo-chat"
                  >
                    <Send className="w-4.5 h-4.5" />
                  </button>
                </form>
              </div>

              {/* Extraction Metrics Left Panel dashboard */}
              <div className="w-full md:w-56 bg-slate-950 p-4 border-t md:border-t-0 md:border-l border-slate-800 flex flex-col justify-between" id="extraction-fields-dashboard">
                <div className="space-y-4">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono border-b border-slate-800 pb-2">
                    Extracted Lead Fields
                  </div>

                  <div className="space-y-3">
                    
                    {/* Customer Name */}
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase font-bold text-slate-500 block">Name</span>
                      <div className="flex items-center space-x-2 bg-slate-900/50 px-2 py-1.5 rounded-lg border border-slate-800 text-xs">
                        {extractedLead.customerName ? (
                          <span className="text-green-400 font-bold">✓ {extractedLead.customerName}</span>
                        ) : (
                          <span className="text-slate-500">Extracting...</span>
                        )}
                      </div>
                    </div>

                    {/* Customer Phone */}
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase font-bold text-slate-500 block">Phone</span>
                      <div className="flex items-center space-x-2 bg-slate-900/50 px-2 py-1.5 rounded-lg border border-slate-800 text-xs">
                        {extractedLead.customerPhone ? (
                          <span className="text-green-400 font-bold">✓ {extractedLead.customerPhone}</span>
                        ) : (
                          <span className="text-slate-500">Extracting...</span>
                        )}
                      </div>
                    </div>

                    {/* Appoint Slot */}
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase font-bold text-slate-500 block">Preferred Slot</span>
                      <div className="flex items-center space-x-2 bg-slate-900/50 px-2 py-1.5 rounded-lg border border-slate-800 text-xs">
                        {extractedLead.appointmentSlot ? (
                          <span className="text-green-400 font-bold">✓ {extractedLead.appointmentSlot}</span>
                        ) : (
                          <span className="text-slate-500">Extracting...</span>
                        )}
                      </div>
                    </div>

                    {/* Service Requested */}
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase font-bold text-slate-500 block">Service Tag</span>
                      <div className="flex items-center space-x-2 bg-slate-900/50 px-2 py-1.5 rounded-lg border border-slate-800 text-xs">
                        {extractedLead.serviceRequested ? (
                          <span className="text-green-400 font-semibold">{extractedLead.serviceRequested}</span>
                        ) : (
                          <span className="text-slate-500">Pending detection</span>
                        )}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Pulsing Booking Confirmed Badge */}
                <div className="pt-4 border-t border-slate-900 flex justify-center">
                  {extractedLead.isBookingConfirmed ? (
                    <div className="w-full bg-green-950/80 border border-green-500/45 text-green-400 font-bold text-[11px] text-center p-2 rounded-xl flex items-center justify-center space-x-1.5 animate-bounce">
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block animate-pulse"></span>
                      <span>Booking Locked in Calendar!</span>
                    </div>
                  ) : (
                    <div className="text-[10px] font-medium text-slate-500 text-center">
                      AI is collecting booking info...
                    </div>
                  )}
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* FEATURE SECTION / CARDS GRID */}
      <section className="bg-slate-50 py-20 border-b border-slate-200/50" id="receptionist-features-grid-section">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Enterprise Feature Set</span>
            <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">Everything You Need To Automate Bookings</h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Designed as a single product SaaS rather than a bloated agency. We focus purely on low-latency voice, review loops, and high accuracy conversions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="premium-features-row">
            
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-1 duration-200 transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Phone className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-lg">AI Phone Receptionist</h4>
                <p className="text-slate-600 text-sm leading-relaxed mt-2.5">
                  Handles incoming buyer calls instantly with professional speech logic, resolving local query parameters, mapping operational times, and taking patient bookings.
                </p>
              </div>
              <span className="text-xs font-extrabold text-blue-600 hover:underline inline-flex items-center space-x-1.5 pt-4 cursor-pointer" onClick={() => setCurrentPage('solutions')}>
                <span>Explore Voice Tech</span>
                <ChevronRight className="w-4 h-4" />
              </span>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-1 duration-200 transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Calendar className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-lg">Appointment Booking Engine</h4>
                <p className="text-slate-600 text-sm leading-relaxed mt-2.5">
                  Secures client records inside standard web calendars in real time, validating overlap alerts, formatting names, and emailing reservation summaries automatically.
                </p>
              </div>
              <span className="text-xs font-extrabold text-blue-600 hover:underline inline-flex items-center space-x-1.5 pt-4 cursor-pointer" onClick={() => setCurrentPage('solutions')}>
                <span>View Integrations</span>
                <ChevronRight className="w-4 h-4" />
              </span>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-1 duration-200 transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-lg">Missed Call Text Back</h4>
                <p className="text-slate-600 text-sm leading-relaxed mt-2.5">
                  If an outgoing team call is busy or dropped, our Twilio configuration dispatches an instant custom text to preserve client intent before they dial elsewhere.
                </p>
              </div>
              <span className="text-xs font-extrabold text-blue-600 hover:underline inline-flex items-center space-x-1.5 pt-4 cursor-pointer" onClick={() => setCurrentPage('solutions')}>
                <span>Check SMS Setup</span>
                <ChevronRight className="w-4 h-4" />
              </span>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-1 duration-200 transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Star className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-lg">Google Review Automation</h4>
                <p className="text-slate-600 text-sm leading-relaxed mt-2.5">
                  Boost SEO parameters automatically. We message high-starred text links right after patient visits, improving your Local Maps ranking on autopilot.
                </p>
              </div>
              <span className="text-xs font-extrabold text-blue-600 hover:underline inline-flex items-center space-x-1.5 pt-4 cursor-pointer" onClick={() => setCurrentPage('solutions')}>
                <span>Learn Google Flow</span>
                <ChevronRight className="w-4 h-4" />
              </span>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-1 duration-200 transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <MessageSquare className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-bold text-slate-900 text-lg">WhatsApp Business Hub</h4>
                <p className="text-slate-600 text-sm leading-relaxed mt-2.5">
                  Expand lead channels with active digital chat. VoiceDesk AI manages WhatsApp client inquiries with the exact same system parameters.
                </p>
              </div>
              <span className="text-xs font-extrabold text-blue-600 hover:underline inline-flex items-center space-x-1.5 pt-4 cursor-pointer" onClick={() => setCurrentPage('solutions')}>
                <span>WhatsApp Messaging API</span>
                <ChevronRight className="w-4 h-4" />
              </span>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-1 duration-200 transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <ShieldCheck className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-bold text-slate-900 text-lg">Multi-Location CRM Integration</h4>
                <p className="text-slate-600 text-sm leading-relaxed mt-2.5">
                  Integrates directly with Zapier, n8n, OpenPhone, and default clinics CRM, keeping lead parameter statuses matching across multiple branches.
                </p>
              </div>
              <span className="text-xs font-extrabold text-blue-600 hover:underline inline-flex items-center space-x-1.5 pt-4 cursor-pointer" onClick={() => setCurrentPage('solutions')}>
                <span>View App Integrations</span>
                <ChevronRight className="w-4 h-4" />
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* RESULTS / STATS SECTION (COUNTER EFFECTS) */}
      <section className="bg-white py-16 border-b border-slate-100" id="stats-numbers-strip">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center" id="stats-grid">
            
            <div className="space-y-1">
              <span id="stat-val-availability" className="block text-4xl md:text-5xl font-extrabold text-[#2563EB] tracking-tight">24/7/365</span>
              <span className="block text-xs uppercase tracking-widest text-slate-400 font-bold">Continuous Booking Availability</span>
            </div>

            <div className="space-y-1">
              <span id="stat-val-response-time" className="block text-4xl md:text-5xl font-extrabold text-[#2563EB] tracking-tight">3x Faster</span>
              <span className="block text-xs uppercase tracking-widest text-slate-400 font-bold">Reply & Call Picking Speeds</span>
            </div>

            <div className="space-y-1">
              <span id="stat-val-booking-rate" className="block text-4xl md:text-5xl font-extrabold text-[#2563EB] tracking-tight">+45%</span>
              <span className="block text-xs uppercase tracking-widest text-slate-400 font-bold">More Booked Appointments</span>
            </div>

            <div className="space-y-1">
              <span id="stat-val-reviews-boost" className="block text-4xl md:text-5xl font-extrabold text-[#22C55E] tracking-tight">+300%</span>
              <span className="block text-xs uppercase tracking-widest text-slate-400 font-bold">Higher Google Reviews Velocity</span>
            </div>

          </div>
        </div>
      </section>

      {/* DYNAMIC INDUSTRY TABS SECTION */}
      <section className="bg-slate-50 py-20 border-b border-slate-200/40" id="dynamic-industry-tabs-showcase">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 font-sans">Specific Industry Playbooks</span>
            <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">Tailored Copywriting For Your Niche</h2>
            <p className="text-slate-600 text-base leading-relaxed">
              We do not use generic AI templates. Every deployment is tailored with professional phrasing unique to your trade.
            </p>
          </div>

          {/* Tab buttons spacer */}
          <div className="flex flex-wrap justify-center gap-2 border-b border-slate-250 pb-4" id="tabs-holder">
            {[
              { id: 'clinics', label: 'Clinics' },
              { id: 'veterinary', label: 'Veterinary' },
              { id: 'beauty', label: 'Beauty Salon' },
              { id: 'auto', label: 'Auto Repair' },
              { id: 'carwash', label: 'Car Wash' },
              { id: 'home-services', label: 'Home Services' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveIndustryTab(tab.id as any)}
                className={`py-2 px-5 text-sm rounded-full font-semibold transition-all ${
                  activeIndustryTab === tab.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Dynamic Tab Pane */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center" id="tab-pane-interactive">
            
            {/* Left Texts */}
            <div className="space-y-6" id="tab-pane-content-info">
              <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg uppercase tracking-wider">
                {industryData?.title}
              </div>
              <h3 className="text-2xl font-extrabold text-slate-950 tracking-tight leading-tight">
                {industryData?.subtitle}
              </h3>
              
              <div className="space-y-4 text-sm leading-relaxed text-slate-600">
                <div className="p-4 bg-red-50/50 rounded-xl border border-red-100 flex items-start space-x-3">
                  <span className="text-red-500 font-bold shrink-0">❌ Problem:</span>
                  <p>{industryData?.problem}</p>
                </div>

                <div className="p-4 bg-green-50/50 rounded-xl border border-green-100 flex items-start space-x-3">
                  <span className="text-green-600 font-bold shrink-0">✔ Solution:</span>
                  <p>{industryData?.solution}</p>
                </div>
              </div>

              <div className="pt-2 flex items-center space-x-4">
                <span className="text-xs font-mono font-bold bg-slate-100 px-3 py-1.5 rounded text-slate-600">
                  📈 Verified Stat: {industryData?.stat}
                </span>
                <button 
                  onClick={() => handleDemoIndustryChange(
                    activeIndustryTab === 'clinics' ? 'Medical Clinic' :
                    activeIndustryTab === 'veterinary' ? 'Veterinary Clinic' :
                    activeIndustryTab === 'beauty' ? 'Beauty Salon' :
                    activeIndustryTab === 'auto' ? 'Auto Repair' :
                    activeIndustryTab === 'carwash' ? 'Car Wash' : 'Home Services'
                  )}
                  className="text-xs font-bold text-blue-600 hover:underline flex items-center space-x-1"
                >
                  <span>Select in Demo Area</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Side Visual Mimic Card */}
            <div className="bg-slate-950 rounded-2xl p-6 text-white space-y-4 shadow-xl border border-slate-900" id="tab-visual-mimic-panel">
              <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  <span className="font-mono text-xs text-slate-400">Live AI Call Flow System</span>
                </div>
                <span className="text-[10px] text-blue-400 font-mono">ID: {industryData?.logoText}</span>
              </div>

              <div className="space-y-3 font-mono text-xs text-slate-350">
                <p className="text-slate-400">
                  <span className="text-blue-400 font-bold">AI Receiver:</span> "Hello! Thanks for ringing our clinic desk. Our system is fully HIPAA aligned. Looking to book your appointment slot?"
                </p>
                <p className="text-white">
                  <span className="text-pink-400 font-bold">Patient:</span> "Yes, I need to check in for a diagnostic cleaning slot this Wednesday if possible."
                </p>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-[11px] space-y-1">
                  <div className="text-green-400 font-bold">✔ System Action Trigger:</div>
                  <div className="text-slate-400">Comparing slot "Wednesday 10:00 AM" with existing staff shifts directory...</div>
                  <div className="text-white">Verified Slot Available. Locked and reserved in office database!</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white py-20 border-b border-slate-100" id="testimonials-section">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Client Endorsements</span>
            <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">What Local Business Owners Say</h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Real localized results from owners who replaced lost voicemail systems with active 24/7 AI Receptionists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm" id="testimonials-row">
            
            {/* Testimonial 1 */}
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-250/50 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center space-x-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <p className="text-slate-650 italic leading-relaxed">
                  "Our veterinary hospital receives massive calls late at night. The AI takes everything in stride. It schedules wellness vet slots flawlessly on Saturday nights, and texts check-in preparation forms automatically. Absolute gamechanger!"
                </p>
              </div>
              <div className="flex items-center space-x-3 pt-6 border-t border-slate-200/50 mt-6">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700">
                  DM
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">Dr. Diane Mercer</h4>
                  <p className="text-[10px] text-slate-500">Chief Vet Clinic Owner, Paws Northwest Hospital</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-250/50 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center space-x-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <p className="text-slate-650 italic leading-relaxed">
                  "We underwrote Google search ads for years but missed half the leads from mechanics being out on the shop floor. Setting up VoiceDesk changed everything. We've recovered 28 oil changes value in our first 15 days of activation."
                </p>
              </div>
              <div className="flex items-center space-x-3 pt-6 border-t border-slate-200/50 mt-6">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700">
                  TS
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">Tom Sterling</h4>
                  <p className="text-[10px] text-slate-500">Managing Owner, Precision Torque Motors WA</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-250/50 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center space-x-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <p className="text-slate-650 italic leading-relaxed">
                  "The Google Review Automation is like magic. Client leaves our medi-salon spa, AI sends feedback SMS 45 minutes after service complete, and we’ve spiked from 82 reviews to 350+ in under three months. Our SEO rankings took off!"
                </p>
              </div>
              <div className="flex items-center space-x-3 pt-6 border-t border-slate-200/50 mt-6">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700">
                  SL
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">Sarah Landry</h4>
                  <p className="text-[10px] text-slate-500">Lead Stylist & Salon Director, Luxe & Bloom salon</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section className="bg-slate-50 py-20 border-b border-slate-200/40" id="faqs-section">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          
          <div className="text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">Product FAQs</span>
            <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">Got Questions? We Have Answers</h2>
            <p className="text-slate-650 text-sm max-w-2xl mx-auto leading-relaxed">
              Explore the core architectural rules of VoiceDesk AI to understand how we optimize your local business scheduling.
            </p>
          </div>

          <div className="space-y-4" id="faq-accordions-group">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-colors"
                id={`faq-accordion-item-${index}`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-5 flex items-center justify-between font-bold text-slate-900 hover:text-blue-600 transition duration-150 text-sm md:text-base outline-none"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transform transition-transform duration-200 ${
                      activeFaq === index ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>
                
                {activeFaq === index && (
                  <div className="px-5 pb-5 pt-1 text-slate-600 leading-relaxed text-sm border-t border-slate-50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="bg-slate-950 text-white py-24 relative overflow-hidden" id="final-cta-section">
        {/* Glow vector back */}
        <div className="absolute -left-1/4 -bottom-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl"></div>
        <div className="absolute -right-1/4 -top-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl"></div>

        <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Stop Losing Customers to Missed Calls
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Configure your professional AI Receptionist in days. Start capturing missed dial opportunities, automating clean scheduling integrations, and dominating Google Review rankings.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => setCurrentPage('book-demo')}
              className="w-full sm:w-auto font-sans font-bold bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl transition shadow-lg shadow-blue-500/20 active:translate-y-0.5"
              id="cta-bottom-btn"
            >
              Book Free Live Demo
            </button>
            <button
              onClick={() => setCurrentPage('solutions')}
              className="w-full sm:w-auto font-sans font-bold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 px-8 py-4 rounded-xl transition"
              id="cta-pricing-btn"
            >
              Explore Solutions
            </button>
          </div>
          <p className="text-[11px] text-slate-500 uppercase tracking-widest font-mono">
            No long contracts • Simple monthly cost • USA & Canada Support
          </p>
        </div>
      </section>

    </div>
  );
}
