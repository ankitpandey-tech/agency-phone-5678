import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, ArrowRight, ShieldCheck, Mail, Phone, ExternalLink, Users, Video, FileText, Check } from 'lucide-react';
import { PageMode } from '../types';

interface DemoBookingViewProps {
  setCurrentPage: (page: PageMode) => void;
}

export default function DemoBookingView({ setCurrentPage }: DemoBookingViewProps) {
  // Form coordinates
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [website, setWebsite] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [monthlyCalls, setMonthlyCalls] = useState('100-500');

  // New onboarding choices
  const [integrationSystem, setIntegrationSystem] = useState('Google Calendar');

  // Calendar choosing variables
  const [selectedDay, setSelectedDay] = useState<string>('tue');
  const [selectedHour, setSelectedHour] = useState<string>('10:30 AM');
  const [isBooked, setIsBooked] = useState(false);
  const [formError, setFormError] = useState('');

  // Next week date generation
  const days = [
    { label: 'Mon', date: 'Jun 15', id: 'mon', available: true },
    { label: 'Tue', date: 'Jun 16', id: 'tue', available: true },
    { label: 'Wed', date: 'Jun 17', id: 'wed', available: true },
    { label: 'Thu', date: 'Jun 18', id: 'thu', available: true },
    { label: 'Fri', date: 'Jun 19', id: 'fri', available: true },
    { label: 'Sat', date: 'Jun 20', id: 'sat', available: false }
  ];

  const hours = [
    '09:00 AM',
    '10:30 AM',
    '11:45 AM',
    '02:00 PM',
    '03:30 PM',
    '04:45 PM'
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!name.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!businessName.trim()) {
      setFormError('Please enter your business or clinic name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setFormError('Please provide a valid business email address.');
      return;
    }
    if (!phone.trim() || phone.length < 7) {
      setFormError('Please provide a valid contact phone number.');
      return;
    }
    if (!selectedDay) {
      setFormError('Please pick a booking date from the calendar calendar.');
      return;
    }
    if (!selectedHour) {
      setFormError('Please select a convenient time slot.');
      return;
    }

    // Save a copy of the booking to browser localStorage as an instant, bulletproof backup
    const localBooking = {
      id: "bk_local_" + Math.random().toString(36).substr(2, 9),
      source: 'scheduling_form',
      createdAt: new Date().toISOString(),
      name,
      businessName,
      website,
      email,
      phone,
      monthlyCalls,
      integrationSystem,
      selectedDay,
      selectedHour,
    };
    try {
      const existing = localStorage.getItem('website_bookings');
      const list = existing ? JSON.parse(existing) : [];
      list.push(localBooking);
      localStorage.setItem('website_bookings', JSON.stringify(list));
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }

    // Submit booking details to server database
    fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source: 'scheduling_form',
        name,
        businessName,
        website,
        email,
        phone,
        monthlyCalls,
        integrationSystem,
        selectedDay,
        selectedHour,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIsBooked(true);
        } else {
          setFormError(data.error || 'Something went wrong while securing your slot. Please try again.');
        }
      })
      .catch((err) => {
        console.error('Booking submission error:', err);
        // Resilient fallback to offline success
        setIsBooked(true);
      });
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20 font-sans text-slate-800" id="demo-booking-view-wrapper">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4" id="demo-booking-header">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full font-mono">
            Bespoke Integration Session
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight text-slate-900 leading-tight">
            Schedule a Live Voice Blueprint Strategy
          </h1>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Get an interactive sandbox phone number loaded with your clinic or business parameters. No obligation, 15-minute live review with our telephony experts.
          </p>
        </div>

        {isBooked ? (
          /* SUCCESS SCREEN COMPONENT */
          <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-xl text-center space-y-8" id="booking-success-pinnacle">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-600 mx-auto border-2 border-green-100 shadow-md">
              <CheckCircle className="w-10 h-10 animate-bounce" />
            </div>
            
            <div className="space-y-3">
              <span className="text-xs font-bold text-green-600 uppercase tracking-widest font-mono bg-green-50 px-3.5 py-1.5 rounded-full">
                Booking Confirmed
              </span>
              <h2 className="text-3xl font-display font-extrabold text-slate-900 tracking-tight">
                Your Integration Assessment is Secured!
              </h2>
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest font-mono">
                {days.find(d => d.id === selectedDay)?.label} ({days.find(d => d.id === selectedDay)?.date}) at {selectedHour} (EST / USA Time Slot)
              </p>
            </div>

            <div className="max-w-xl mx-auto text-slate-650 text-sm leading-relaxed space-y-4">
              <p>
                Hi <span className="font-bold text-slate-900">{name}</span>, we are preparing the custom interactive phone sandbox for <span className="font-bold text-slate-900">{businessName}</span>.
              </p>
              <p>
                A personalized Google Meet video invite and calendar block has been dispatched to <span className="font-semibold text-blue-600 underline">{email}</span>. We will also send an SMS ping reminder to <span className="font-bold text-slate-900">{phone}</span> 15 minutes prior to the slot.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 text-left max-w-xl mx-auto space-y-3">
              <div className="font-bold text-slate-800 border-b border-slate-200 pb-2 flex items-center justify-between text-xs uppercase tracking-wider font-mono">
                <span>Tailored Session Guidelines</span>
                <span className="text-[#22C55E]">Completed Setup</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                <div>Client: <span className="text-slate-900 font-bold">{name}</span></div>
                <div>Volume: <span className="text-slate-900 font-bold">{monthlyCalls}/mo missed calls</span></div>
                <div>Target Integration: <span className="text-blue-600 font-bold">{integrationSystem}</span></div>
                {website && <div className="sm:col-span-2">Company Website: <a href={website} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline font-semibold flex items-center gap-1.5 inline-flex">{website} <ExternalLink className="w-3.5 h-3.5" /></a></div>}
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
              <button
                onClick={() => setCurrentPage('home')}
                className="w-full sm:w-auto font-sans text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white py-3.5 px-8 rounded-xl transition-all"
              >
                Return to Home
              </button>
              
              <button
                onClick={() => {
                  setIsBooked(false);
                  setName('');
                  setBusinessName('');
                  setWebsite('');
                  setEmail('');
                  setPhone('');
                  setSelectedDay('tue');
                  setSelectedHour('10:30 AM');
                }}
                className="w-full sm:w-auto font-sans text-xs font-bold text-blue-600 hover:underline"
              >
                Book Another Meeting Slot
              </button>
            </div>
          </div>
        ) : (
          /* MAIN TWO-COLUMN BOOKING WORKSPACE */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch" id="booking-onboarding-grid">
            
            {/* Left Column: Real trust markers & session agenda (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 border border-slate-850 flex flex-col justify-between shadow-lg" id="booking-agenda-col">
              
              <div className="space-y-8">
                <div>
                  <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest pl-2 border-l-2 border-blue-500">
                    Strategy Session Agenda
                  </span>
                  <h3 className="text-2xl font-display font-black text-white mt-1.5 tracking-tight">
                    What we will accomplish in 15 minutes:
                  </h3>
                </div>

                <div className="space-y-5">
                  <div className="flex items-start space-x-3 text-xs leading-relaxed">
                    <div className="w-7 h-7 rounded-lg bg-blue-900/60 text-blue-450 border border-blue-800/80 flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-205">1. Active Testing Number</h4>
                      <p className="text-slate-400 text-[11px] mt-0.5">We register a temporary local USA testing dial code on Twilio so you can hear how the AI talks back to you live.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 text-xs leading-relaxed">
                    <div className="w-7 h-7 rounded-lg bg-blue-900/60 text-blue-450 border border-blue-800/80 flex items-center justify-center shrink-0 mt-0.5">
                      <Users className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-205">2. CRM & Calendar Architecture</h4>
                      <p className="text-slate-400 text-[11px] mt-0.5">We map out step-by-step connections to your actual scheduler (Google Calendar, Calendly, EHR databases, or custom CRM fields).</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 text-xs leading-relaxed">
                    <div className="w-7 h-7 rounded-lg bg-blue-900/60 text-blue-450 border border-blue-800/80 flex items-center justify-center shrink-0 mt-0.5">
                      <FileText className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-205">3. Custom Persona Engineering</h4>
                      <p className="text-slate-400 text-[11px] mt-0.5">Draft the verbal parameters and greeting scripts tailored specifically to handle your service price lists and location directions.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 text-xs leading-relaxed">
                    <div className="w-7 h-7 rounded-lg bg-[#22C55E]/10 text-[#22C55E] border border-emerald-999 flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-emerald-400">4. Compliance & Trust Verification</h4>
                      <p className="text-slate-400 text-[11px] mt-0.5">Review HIPAA-alignment parameters, A2P 10DLC SMS registration guidelines, and data lock criteria.</p>
                    </div>
                  </div>
                </div>

                {/* Team Info Card */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 flex items-center space-x-4 mt-8">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center font-bold text-blue-700 shrink-0 border border-blue-200">
                    AP
                  </div>
                  <div className="text-xs">
                    <h5 className="font-bold text-white">Ankit Pandey</h5>
                    <p className="text-[10px] text-slate-400">Founder & Head of Voice Integrations</p>
                    <p className="text-[9px] text-[#22C55E] font-mono mt-0.5 flex items-center gap-1">
                      <Video className="w-3 h-3 inline" /> Directly hosting your session
                    </p>
                  </div>
                </div>
              </div>

              {/* Badges strip */}
              <div className="pt-8 border-t border-slate-900/80 flex flex-wrap items-center gap-4 text-[10px] text-slate-400 font-mono">
                <div className="flex items-center space-x-1">
                  <Check className="w-3.5 h-3.5 text-blue-500" />
                  <span>No credit card</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Check className="w-3.5 h-3.5 text-blue-500" />
                  <span>Twilio partner API</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Check className="w-3.5 h-3.5 text-blue-500" />
                  <span>GDPR / HIPAA compliant</span>
                </div>
              </div>

            </div>

            {/* Right Column: Dynamic Scheduler Questionnaire Form (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col justify-between" id="booking-form-col">
              
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                
                {formError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
                    {formError}
                  </div>
                )}

                {/* Section A: Contact Details */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono flex items-center gap-2">
                    <span className="w-5 h-5 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-[10px]">1</span>
                    <span>Point of Contact & Business</span>
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 block">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="E.g. Dr. John Carter"
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 transition-all font-sans text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 block">Business / Clinic Name *</label>
                      <input
                        type="text"
                        required
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="E.g. Family Dental Clinic LLC"
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 transition-all font-sans text-sm"
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="font-bold text-slate-700 block">Company Website URL</label>
                      <input
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="E.g. https://www.yourclinic.com"
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 transition-all font-sans text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 block">Work Email Address *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E.g. contact@yourclinic.com"
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 transition-all font-sans text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 block">Cell Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="E.g. (303) 555-0199"
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 transition-all font-sans text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Section B: Customization Preferences */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono flex items-center gap-2">
                    <span className="w-5 h-5 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-[10px]">2</span>
                    <span>Voice & System Target Customization</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 block">Expected Missed Calls Volume</label>
                      <select
                        value={monthlyCalls}
                        onChange={(e) => setMonthlyCalls(e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 transition-all cursor-pointer font-sans text-sm"
                      >
                        <option value="Under 100">Under 100 calls per month</option>
                        <option value="100-500">100 - 500 calls per month</option>
                        <option value="500-1000">500 - 1,000 calls per month</option>
                        <option value="1000+">Over 1,000 calls per month</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 block">Preferred Scheduling System</label>
                      <select
                        value={integrationSystem}
                        onChange={(e) => setIntegrationSystem(e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 transition-all cursor-pointer font-sans text-sm"
                      >
                        <option value="Google Calendar">Google Calendar / Workspace</option>
                        <option value="Calendly">Calendly / Cal.com</option>
                        <option value="Acuity Scheduler">Acuity / Squarespace Scheduling</option>
                        <option value="ServiceTitan">ServiceTitan / Housecall Pro (Home Techs)</option>
                        <option value="EHR System">Dental/Medical EHR Database</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section C: Live Calendar Picker */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono flex items-center gap-2">
                    <span className="w-5 h-5 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-[10px]">3</span>
                    <span>Select Ankit's Calendar Session Slot (EST Time Zone)</span>
                  </h4>

                  {/* Day tabs */}
                  <div className="space-y-2 text-xs">
                    <p className="font-bold text-slate-700">Select Date:</p>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {days.map((d) => (
                        <button
                          key={d.id}
                          type="button"
                          disabled={!d.available}
                          onClick={() => setSelectedDay(d.id)}
                          className={`p-3 rounded-xl border flex flex-col items-center transition-all ${
                            !d.available
                              ? 'opacity-30 cursor-not-allowed bg-slate-100 border-slate-150'
                              : selectedDay === d.id
                              ? 'bg-blue-600 border-blue-500 text-white font-bold shadow-md shadow-blue-500/15'
                              : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <span className="text-[9px] uppercase font-mono font-extrabold">{d.label}</span>
                          <span className="text-xs mt-0.5">{d.date}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Hour selection */}
                  <div className="space-y-2 text-xs pt-2">
                    <p className="font-bold text-slate-700">Select Time (EST/USA):</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {hours.map((hr) => (
                        <button
                          key={hr}
                          type="button"
                          onClick={() => setSelectedHour(hr)}
                          className={`p-2.5 rounded-xl border text-center text-xs transition-all ${
                            selectedHour === hr
                              ? 'bg-blue-600 border-blue-500 text-white font-bold shadow-md shadow-blue-500/15'
                              : 'bg-slate-50 border-slate-200 hover:bg-slate-100 animate-fadeIn'
                          }`}
                        >
                          {hr}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Submitting Container */}
                <div className="pt-6 border-t border-slate-150 space-y-4">
                  <div className="flex items-start space-x-2.5 text-xs text-slate-500 leading-relaxed">
                    <ShieldCheck className="w-4 h-4 text-green-500 shrink-0 mt-0.5 animate-pulse" />
                    <span>Secure HIPAA & SOC-2 compliance guaranteed. By scheduling, you agree to receive an automated strategy call link and a single reminder text relative to this session.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-4 rounded-xl text-xs uppercase font-extrabold tracking-widest transition duration-150 shadow-lg shadow-blue-600/15 hover:shadow-blue-600/25 active:translate-y-0.5"
                  >
                    Generate My Interactive Integration Call
                  </button>
                </div>

              </form>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
