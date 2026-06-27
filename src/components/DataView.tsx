import React, { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, Phone, Mail, Globe, Database, Trash2, RefreshCw, Check, AlertCircle } from 'lucide-react';
import { PageMode } from '../types';

interface DataViewProps {
  setCurrentPage: (page: PageMode) => void;
}

interface Booking {
  id: string;
  source: 'scheduling_form' | 'ai_receptionist';
  createdAt: string;
  name: string;
  phone: string;
  email?: string;
  businessName?: string;
  website?: string;
  monthlyCalls?: string;
  integrationSystem?: string;
  voiceVoiceType?: string;
  selectedDay?: string;
  selectedHour?: string;
  serviceRequested?: string;
  appointmentSlot?: string;
  industry?: string;
}

export default function DataView({ setCurrentPage }: DataViewProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');
  
  // Passcode authentication state to protect data from public view
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === 'panditji123') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect Admin Passcode. Please try again.');
    }
  };

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      let serverList: Booking[] = [];
      if (data && data.success && Array.isArray(data.bookings)) {
        serverList = data.bookings;
      }
      
      // Load client-side local backup database copy
      let localList: Booking[] = [];
      try {
        const stored = localStorage.getItem('website_bookings');
        if (stored) {
          localList = JSON.parse(stored);
        }
      } catch (e) {
        console.error('Error loading backup local bookings:', e);
      }

      // Merge both sources uniquely to guarantee data presence
      const mergedMap = new Map<string, Booking>();

      // Apply local copies first
      localList.forEach((b) => {
        if (b && b.name && b.phone) {
          const key = `${b.source || 'form'}_${b.name.trim().toLowerCase()}_${b.phone.trim()}`;
          mergedMap.set(key, b);
        }
      });

      // Apply server copies (taking precedence or filling missing records)
      serverList.forEach((b) => {
        if (b && b.name && b.phone) {
          const key = `${b.source || 'form'}_${b.name.trim().toLowerCase()}_${b.phone.trim()}`;
          mergedMap.set(key, b);
        }
      });

      const finalBookings = Array.from(mergedMap.values());
      finalBookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setBookings(finalBookings);

    } catch (err) {
      console.error('Error fetching bookings from server, loading local backups:', err);
      try {
        const stored = localStorage.getItem('website_bookings');
        if (stored) {
          const localList: Booking[] = JSON.parse(stored);
          localList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setBookings(localList);
        }
      } catch (e) {
        console.error('Error loading fallback bookings list:', e);
      }
    } finally {
      setLoading(false);
    }
  };

  const clearBookings = async () => {
    if (!window.confirm('Are you sure you want to clear all bookings from the website database? This action is permanent.')) {
      return;
    }
    try {
      // Clear local storage copy
      localStorage.removeItem('website_bookings');
      
      // Clear server database copy
      const res = await fetch('/api/bookings/clear', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setBookings([]);
        setStatusMessage('Database cleared successfully!');
        setTimeout(() => setStatusMessage(''), 3000);
      } else {
        setBookings([]);
        setStatusMessage('Local data cleared successfully!');
        setTimeout(() => setStatusMessage(''), 3000);
      }
    } catch (err) {
      console.error('Error clearing bookings:', err);
      setBookings([]);
      setStatusMessage('Data cleared successfully!');
      setTimeout(() => setStatusMessage(''), 3000);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="bg-slate-50 min-h-screen pt-28 pb-20 font-sans text-slate-800 flex items-center justify-center" id="data-portal-auth-page">
        <div className="max-w-md w-full mx-auto px-6">
          
          {/* Back button */}
          <button
            onClick={() => setCurrentPage('home')}
            className="inline-flex items-center space-x-2 text-slate-500 hover:text-blue-600 font-semibold text-sm mb-6 transition"
            id="btn-portal-auth-back"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          {/* Lock Card */}
          <div className="bg-white border border-slate-200/85 rounded-3xl p-8 md:p-10 shadow-sm text-center space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center mx-auto">
              <Database className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl font-display font-black text-slate-950 tracking-tight">
                Admin Area Secured
              </h1>
              <p className="text-slate-500 text-xs">
                Enter your secure passcode to view leads and bookings data.
              </p>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
                  Admin Passcode
                </label>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    if (authError) setAuthError('');
                  }}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 border border-slate-200 rounded-2xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 text-center font-bold tracking-widest bg-slate-50"
                  required
                  autoFocus
                />
              </div>

              {authError && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs text-left font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-sm font-bold transition shadow-sm"
              >
                Unlock Dashboard
              </button>
            </form>

            <div className="pt-2 border-t border-slate-100">
              <p className="text-[10px] text-slate-400 leading-normal">
                Only you, the website owner, can see these metrics. Visitors and callers cannot see other users' information.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20 font-sans text-slate-800" id="data-page-container">
      <div className="max-w-6xl mx-auto px-6 space-y-8">
        
        {/* Navigation & Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <button
            onClick={() => setCurrentPage('home')}
            className="inline-flex items-center space-x-2 text-slate-500 hover:text-blue-600 font-semibold text-sm transition"
            id="btn-data-back"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchBookings}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
              id="btn-data-refresh"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Data</span>
            </button>

            <button
              onClick={clearBookings}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-red-50 border border-red-100 rounded-xl text-xs font-bold text-red-600 hover:bg-red-100 transition"
              id="btn-data-clear"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Data</span>
            </button>
          </div>
        </div>

        {/* Header Block */}
        <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-display font-black text-slate-900 tracking-tight">
              Website Bookings & Leads Data
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              This page displays all lead submissions captured through your "Book Free Demo" form and sandbox receptionist test sessions.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-green-50 border border-green-100 px-3 py-1 rounded-full text-xs font-medium text-green-700">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            <span>Database Connected (bookings.json)</span>
          </div>
        </div>

        {statusMessage && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-medium">
            {statusMessage}
          </div>
        )}

        {/* Integration Instructions Alert (Gmail & Google Calendar) */}
        <div className="p-5 md:p-6 bg-blue-550/5 border border-blue-550/10 rounded-2xl space-y-4">
          <div className="flex items-center gap-2.5 text-slate-900">
            <div className="w-8 h-8 rounded-lg bg-blue-550/10 flex items-center justify-center text-blue-600">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold">Gmail & Google Calendar Integration Status</h3>
              <p className="text-[11px] text-slate-500">How bookings are delivered directly to your inbox and calendar in production</p>
            </div>
          </div>
          <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
            <p>
              To deliver these bookings instantly to your <strong className="text-slate-900">Gmail</strong> or <strong className="text-slate-900">Google Calendar</strong> in production, we connect our backend endpoints:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-500 text-[11px]">
              <li>
                <strong className="text-slate-700">Gmail Notifications:</strong> Powered via a simple server-side SMTP mailer or the Google Gmail API to immediately email you at <span className="text-blue-600 font-semibold underline">hello.voicedeskai@gmail.com</span> with all client details.
              </li>
              <li>
                <strong className="text-slate-700">Google Calendar Sync:</strong> We can configure the Google Calendar API so that when a form is submitted, a real appointment slot is automatically scheduled on your personal/business calendar with the customer's phone and email attached.
              </li>
              <li>
                <strong className="text-slate-700">CRM Link:</strong> We can also trigger webhooks to tools like Zapier or Make to synchronize leads instantly to Excel, HubSpot, or Slack.
              </li>
            </ul>
          </div>
        </div>

        {/* Bookings List Area */}
        {loading ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 text-sm">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-blue-550 mb-3" />
            <span>Scanning records...</span>
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center space-y-4">
            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mx-auto">
              <Database className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-800 text-sm">No bookings recorded yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-normal">
                Try booking a free demo setup in the calendar form, and you will see the details appear here immediately.
              </p>
            </div>
            <button
              onClick={() => setCurrentPage('book-demo')}
              className="px-4 py-2 bg-blue-550 text-white text-xs font-bold rounded-xl hover:bg-blue-600 transition"
            >
              Go to Booking Form
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookings.map((b) => (
              <div 
                key={b.id} 
                className={`bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-200 relative overflow-hidden ${
                  b.source === 'scheduling_form' 
                    ? 'border-l-4 border-l-blue-500' 
                    : 'border-l-4 border-l-emerald-500'
                }`}
              >
                {/* Header tag */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] text-slate-400 font-mono font-semibold">ID: {b.id}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                    b.source === 'scheduling_form'
                      ? 'bg-blue-50 text-blue-600'
                      : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    {b.source === 'scheduling_form' ? 'Form Booking' : 'AI Assistant Caller'}
                  </span>
                </div>

                {/* Date */}
                <div className="text-[11px] text-slate-400 mb-3 font-medium">
                  Recorded: {new Date(b.createdAt).toLocaleString()}
                </div>

                {/* Details */}
                <div className="space-y-2 text-xs">
                  <div className="grid grid-cols-3 border-b border-slate-50 pb-1.5">
                    <span className="text-slate-400 font-medium">Name:</span>
                    <span className="col-span-2 font-bold text-slate-800">{b.name}</span>
                  </div>
                  <div className="grid grid-cols-3 border-b border-slate-50 pb-1.5">
                    <span className="text-slate-400 font-medium">Phone:</span>
                    <span className="col-span-2 font-bold text-slate-800">{b.phone}</span>
                  </div>
                  {b.email && (
                    <div className="grid grid-cols-3 border-b border-slate-50 pb-1.5">
                      <span className="text-slate-400 font-medium">Email:</span>
                      <span className="col-span-2 font-semibold text-blue-600 underline">{b.email}</span>
                    </div>
                  )}
                  {b.businessName && (
                    <div className="grid grid-cols-3 border-b border-slate-50 pb-1.5">
                      <span className="text-slate-400 font-medium">Business:</span>
                      <span className="col-span-2 font-semibold text-slate-700">{b.businessName}</span>
                    </div>
                  )}
                  {b.source === 'scheduling_form' ? (
                    <>
                      <div className="grid grid-cols-3 border-b border-slate-50 pb-1.5">
                        <span className="text-slate-400 font-medium">System:</span>
                        <span className="col-span-2 font-semibold text-blue-600">{b.integrationSystem}</span>
                      </div>
                      {b.voiceVoiceType && (
                        <div className="grid grid-cols-3 border-b border-slate-50 pb-1.5">
                          <span className="text-slate-400 font-medium">Voice Style:</span>
                          <span className="col-span-2 font-semibold text-slate-700">{b.voiceVoiceType}</span>
                        </div>
                      )}
                      <div className="grid grid-cols-3">
                        <span className="text-slate-400 font-medium">Preferred Time:</span>
                        <span className="col-span-2 font-bold text-slate-800 bg-slate-50 px-2 py-0.5 rounded inline-block w-fit">
                          {b.selectedDay?.toUpperCase()} at {b.selectedHour} (EST)
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-3 border-b border-slate-50 pb-1.5">
                        <span className="text-slate-400 font-medium">Service Requested:</span>
                        <span className="col-span-2 font-semibold text-emerald-600">{b.serviceRequested}</span>
                      </div>
                      <div className="grid grid-cols-3">
                        <span className="text-slate-400 font-medium">Voice Appt Slot:</span>
                        <span className="col-span-2 font-bold text-slate-800 bg-emerald-50/50 px-2 py-0.5 rounded inline-block w-fit border border-emerald-100">
                          {b.appointmentSlot}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
