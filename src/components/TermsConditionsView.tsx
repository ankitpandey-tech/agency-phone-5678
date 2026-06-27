import React from 'react';
import { FileText, Mail, Globe, ArrowLeft } from 'lucide-react';
import { PageMode } from '../types';

interface TermsConditionsViewProps {
  setCurrentPage: (page: PageMode) => void;
}

export default function TermsConditionsView({ setCurrentPage }: TermsConditionsViewProps) {
  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20 font-sans text-slate-800" id="terms-conditions-page">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Back Button */}
        <button
          onClick={() => setCurrentPage('home')}
          className="inline-flex items-center space-x-2 text-slate-500 hover:text-blue-600 font-semibold text-sm mb-8 transition"
          id="btn-terms-back-home"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        {/* Article Container */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-12 shadow-sm space-y-10">
          
          {/* Document Header */}
          <div className="border-b border-slate-100 pb-8 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100 text-blue-600">
              <FileText className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h1 className="text-3xl font-display font-black text-slate-950 tracking-tight">
                Terms & Conditions
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
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing, implementing, or otherwise using the VoiceDesk AI software, services, or website ("Service"), you agree to be bound by these Terms & Conditions ("Terms"). If you do not agree to these Terms, you must immediately cease all use of our services.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                2. Scope of Service & Subscription
              </h2>
              <p>
                VoiceDesk AI provides cloud-hosted conversational voice receptionist systems using artificial intelligence to answer telephone lines, parse user questions, forward leads, and schedule appointments on connected calendars.
              </p>
              <p>
                Subscriptions are billed on a recurring monthly or annual basis depending on your selected tier. We reserves the right to modify subscription fees or telephony minutes allotment with a 30-day prior written notice to our active subscribers.
              </p>
            </div>

            {/* Section 3 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                3. Customer Responsibilities & Telephony Conduct
              </h2>
              <p>
                Clients using our conversational AI receptionist agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 text-sm">
                <li>
                  Maintain full compliance with telecommunications rules, including but not limited to, the **FCC (Federal Communications Commission)** in the United States, the **CRTC (Canadian Radio-television and Telecommunications Commission)** in Canada, and the **ACMA (Australian Communications and Media Authority)** in Australia.
                </li>
                <li>
                  Never configure the AI receptionist to execute unsolicited outbound cold-calling campaigns, spam telemarketing, or deceptive call spoofing.
                </li>
                <li>
                  Secure and maintain all relevant caller consent warnings regarding digital audio call recording according to their local state and national wiretapping statutes.
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                4. Intellectual Property
              </h2>
              <p>
                All conversational voice prompt frameworks, custom LLM routing architectures, natural language understanding designs, software structures, graphic interfaces, website elements, and documentation are the exclusive property of VoiceDesk AI and our technology partners.
              </p>
            </div>

            {/* Section 5 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                5. Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by applicable law in the USA, Canada, and Australia, VoiceDesk AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues (including missed bookings, missed medical emergencies, calendar scheduling conflicts, or erroneous AI-caller interactions).
              </p>
              <p>
                Our services are provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind.
              </p>
            </div>

            {/* Section 6 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                6. Termination & Account Cancellation
              </h2>
              <p>
                You may cancel your monthly VoiceDesk AI subscription at any time inside your user billing dashboard or by emailing our customer support team. Cancellation will take effect at the end of the current billing cycle.
              </p>
            </div>

            {/* Section 7 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                7. Contact & Notices
              </h2>
              <p>
                For any formal notices or inquiries regarding these Terms and Conditions, please contact us at:
              </p>
              <div className="flex items-center space-x-3 bg-blue-50/50 border border-blue-100 rounded-2xl p-4 w-fit" id="terms-conditions-contact-card">
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
