import React from 'react';
import { ShieldCheck, Mail, Globe, ArrowLeft, FileText, Lock } from 'lucide-react';
import { PageMode } from '../types';

interface PrivacyPolicyViewProps {
  setCurrentPage: (page: PageMode) => void;
}

export default function PrivacyPolicyView({ setCurrentPage }: PrivacyPolicyViewProps) {
  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20 font-sans text-slate-800" id="privacy-policy-page">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Back Button */}
        <button
          onClick={() => setCurrentPage('home')}
          className="inline-flex items-center space-x-2 text-slate-500 hover:text-blue-600 font-semibold text-sm mb-8 transition"
          id="btn-privacy-back-home"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        {/* Article Container */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-12 shadow-sm space-y-10">
          
          {/* Document Header */}
          <div className="border-b border-slate-100 pb-8 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100 text-blue-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h1 className="text-3xl font-display font-black text-slate-950 tracking-tight">
                Privacy Policy
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
                1. Overview & Scope
              </h2>
              <p>
                VoiceDesk AI ("we", "us", "our") values the privacy of our clients and their callers. This Privacy Policy explains how we collect, use, disclose, and safeguard personal information when our clients integrate our conversational AI phone reception systems into their businesses in the **United States, Canada, and Australia**.
              </p>
              <p>
                As an AI receptionist service, we act primarily as a <strong>Data Processor</strong> (or "Service Provider") on behalf of our local business clients (the "Data Controllers"). We process caller data strictly according to our clients' instructions and applicable local telephony laws.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                2. Information We Collect
              </h2>
              <p>
                We collect information directly from you, from our clients, and automatically through our conversational phone platforms:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 text-sm">
                <li>
                  <strong>Call Recordings & Transcripts:</strong> Digital audio files of incoming and outgoing calls, as well as AI-generated text transcripts of the conversations.
                </li>
                <li>
                  <strong>Contact Information:</strong> Phone numbers, names, email addresses, and postal addresses provided by callers during the conversational flow.
                </li>
                <li>
                  <strong>Scheduling & Intake Details:</strong> Requested appointment dates, services selected, payment status markers, and intake questionnaire answers.
                </li>
                <li>
                  <strong>Telephony Metadata:</strong> Time of call, call duration, originating carrier, call forwarding indicators, and caller ID details.
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                3. How We Use Information
              </h2>
              <p>
                We use the collected information to perform the following business operations:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 text-sm">
                <li>Operate the AI conversational voice system, scheduling calendar connections, and text auto-reply workflows.</li>
                <li>Transcribe voice responses into structured data logs for our clients.</li>
                <li>Generate daily and monthly lead metrics, booking counts, and receptionist analytics.</li>
                <li>Train, optimize, and refine conversational natural language processing model accuracy.</li>
                <li>Detect and block fraudulent activity, spam, and malicious telemarketing dialers.</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                4. Compliance with International Laws
              </h2>
              <div className="bg-slate-50 border border-slate-250/50 rounded-2xl p-5 space-y-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">🇺🇸 United States (CCPA, HIPAA, TCPA)</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    We strictly comply with the Telephone Consumer Protection Act (TCPA) and California Consumer Privacy Act (CCPA/CPRA). For medical and dental clinics, our systems can be configured to comply with HIPAA safeguards, maintaining strict business associate agreements (BAAs).
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">🇨🇦 Canada (PIPEDA & CASL)</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    We process all Canadian personal information in strict accordance with the Personal Information Protection and Electronic Documents Act (PIPEDA). Automated follow-up text messages (SMS) comply with Canada's Anti-Spam Legislation (CASL).
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">🇦🇺 Australia (Privacy Act 1988)</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    We adhere strictly to the 13 Australian Privacy Principles (APPs) governing the capture, quality, storage, and cross-border transfer of Australian individuals' personal information.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                5. Call Recording Consent
              </h2>
              <p>
                By using our services, our clients agree that they are responsible for obtaining appropriate consent from callers prior to recording and processing conversation audio, in accordance with applicable state, federal, or country-level wiretapping laws (e.g. "two-party" or "all-party" consent jurisdictions).
              </p>
            </div>

            {/* Section 6 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                6. Security & Data Retention
              </h2>
              <p>
                We use industry-standard 256-bit AES encryption for all data in transit and at rest. Access control is strictly guarded. We retain transcripts and personal data only as long as necessary to fulfill the requested business service or as required by statutory record retention rules.
              </p>
            </div>

            {/* Section 7 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                7. Contact Information
              </h2>
              <p>
                If you have any questions regarding this Privacy Policy or wish to request data deletion/rectification under CCPA, PIPEDA, or APP guidelines, please contact us at:
              </p>
              <div className="flex items-center space-x-3 bg-blue-50/50 border border-blue-100 rounded-2xl p-4 w-fit" id="privacy-policy-contact-card">
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
