import React from 'react';
import { DollarSign, Mail, ArrowLeft, RefreshCw } from 'lucide-react';
import { PageMode } from '../types';

interface RefundPolicyViewProps {
  setCurrentPage: (page: PageMode) => void;
}

export default function RefundPolicyView({ setCurrentPage }: RefundPolicyViewProps) {
  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20 font-sans text-slate-800" id="refund-policy-page">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Back Button */}
        <button
          onClick={() => setCurrentPage('home')}
          className="inline-flex items-center space-x-2 text-slate-500 hover:text-blue-600 font-semibold text-sm mb-8 transition"
          id="btn-refund-back-home"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        {/* Article Container */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-12 shadow-sm space-y-10">
          
          {/* Document Header */}
          <div className="border-b border-slate-100 pb-8 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100 text-blue-600">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h1 className="text-3xl font-display font-black text-slate-950 tracking-tight">
                Refund Policy
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
                1. General Policy Overview
              </h2>
              <p>
                Because VoiceDesk AI offers intangibles, immediate cloud telephony resources, dedicated virtual phone lines, custom model training, and custom setup engineering, we maintain a <strong>No Refund Policy</strong> on all active recurring monthly and annual subscription plans.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                2. Setup Fees & Custom Onboarding
              </h2>
              <p>
                Any initial setup, custom onboarding integration, prompt design, calendar workflow building, or API configuration fees charged to create your AI receptionist are 100% non-refundable once engineering setup work has commenced.
              </p>
            </div>

            {/* Section 3 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                3. Monthly / Annual Billing Cycles
              </h2>
              <p>
                Subscription renewals are billed automatically on the same day of each billing cycle (monthly or annually). To avoid future billing, you must submit a cancellation request at least <strong>3 business days</strong> before your upcoming renewal invoice date. 
              </p>
              <p>
                Upon cancellation, your custom AI phone system and local forwarding lines will remain active until the end of your current paid billing period, and no further charges will apply.
              </p>
            </div>

            {/* Section 4 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                4. Consumer Protection Compliance
              </h2>
              <div className="bg-slate-50 border border-slate-250/50 rounded-2xl p-5 space-y-3 text-xs text-slate-650">
                <p>
                  <strong>🇺🇸 United States:</strong> Subscription cancellation procedures fully comply with Federal Trade Commission (FTC) "Negative Option" rules, ensuring clear and conspicuous cancellation methods.
                </p>
                <p>
                  <strong>🇨🇦 Canada:</strong> We operate in compliance with provincial Consumer Protection Acts concerning continuous service agreements.
                </p>
                <p>
                  <strong>🇦🇺 Australia:</strong> Under the Australian Consumer Law (ACL), consumers have statutory guarantees that cannot be excluded. If our services fail to meet an ACL consumer guarantee (e.g., if the service is not provided with due care and skill, or is not fit for purpose), you may be entitled to a remedy, which may include a replacement line or a partial/full refund.
                </p>
              </div>
            </div>

            {/* Section 5 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                5. Contact & Support
              </h2>
              <p>
                If you have any questions about billing, cancellation, or ACL statutory guarantees, please contact our billing support desk at:
              </p>
              <div className="flex items-center space-x-3 bg-blue-50/50 border border-blue-100 rounded-2xl p-4 w-fit" id="refund-policy-contact-card">
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
