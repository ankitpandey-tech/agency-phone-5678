import React from 'react';
import { Sparkles, ArrowRight, TrendingUp, PhoneIncoming, MessageSquare, CheckCircle } from 'lucide-react';
import { PageMode } from '../types';

interface CaseStudiesViewProps {
  setCurrentPage: (page: PageMode) => void;
}

export default function CaseStudiesView({ setCurrentPage }: CaseStudiesViewProps) {
  const caseStudies = [
    {
      title: "How Tom's Precision Auto Repair Swapped Voicemail for AI, Increasing Reviews by 300%",
      industry: "Auto Repair & Garage Stations",
      location: "Seattle, WA",
      metrics: [
        { label: "Google Review Spike", val: "+300%" },
        { label: "Missed Call Capture", val: "94%" },
        { label: "Monthly Rev Recovered", val: "$4,800" }
      ],
      challenge: "Tom's mechanics were constantly active underneath vehicles. Phone lines were missed. Searchers clicked away to alternative local garages. No post-service links were dispatched regularly.",
      action: "We deployed VoiceDesk's Growth system, configuring synthetic oil change quote rules, immediate diagnostic intakes booking, and automated SMS rating follow-ups scheduled 45 minutes after key handbacks.",
      quote: "\"Setting up VoiceDesk took less than 3 days. Now, dirty hands and busy lifts never cost us business. Review volume went from 3 a month to 25+ average, making us the top local garage on Google Maps!\"",
      author: "Tom Sterling, Owner"
    },
    {
      title: "Apex Family Medicine and Wellness Clinic Reduced Missed Appointments by 80%",
      industry: "Medical clinics & Diagnostics Center",
      location: "Denver, CO",
      metrics: [
        { label: "Missed Call Rates", val: "-80%" },
        { label: "Hold Time Slashes", val: "0.5s" },
        { label: "Patient Retention", val: "+35%" }
      ],
      challenge: "Secretary team was overwhelmed during morning shifts, placing patients on long hold cues. Out-of-hours calls redirected to rigid static answering machines with minimal reservation success.",
      action: "Configured VoiceDesk's HIPAA-friendly triage logic, answers common patient check-in protocols, registers open doctor calendars slots directly, and dispatches questionnaire links over text.",
      quote: "\"Our clinical secretaries now focus strictly on in-office patient check-ins and emergency safety triages. The virtual receptionist secures high-frequency wellness visits 24/7 without fail.\"",
      author: "Dr. Diane Mercer, General Director"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20 font-sans" id="case-studies-view-wrapper">
      <div className="max-w-5xl mx-auto px-6 space-y-12">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-4" id="case-studies-header">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 font-mono">Proven Value Metrics</span>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Customer Transformations
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            Real trade results and quantitative case studies demonstrating how local clinics, Veterinary hospitals, and repair shops scale bookings and Google authority at minimal costs.
          </p>
        </div>

        {/* List of Case Studies */}
        <div className="space-y-10" id="case-studies-list-group">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-8 hover:shadow-md transition-all"
              id={`case-study-card-${index}`}
            >
              {/* Header metrics */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between border-b border-slate-100 pb-6 gap-6">
                <div>
                  <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg uppercase tracking-wider mb-2">
                    {study.industry}
                  </span>
                  <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    {study.title}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">Location: {study.location}</p>
                </div>

                {/* Highlight Stats Row */}
                <div className="flex space-x-6 shrink-0" id={`stats-row-${index}`}>
                  {study.metrics.map((m) => (
                    <div key={m.label} className="text-center">
                      <span className="block text-2xl md:text-3xl font-black text-blue-600 tracking-tight">{m.val}</span>
                      <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block mt-0.5">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Challenge vs Action Steps Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm" id={`steps-grid-${index}`}>
                
                {/* Challenge */}
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 flex items-center space-x-2">
                    <span className="text-red-500 font-bold font-mono">✕</span>
                    <span>The Local Bottlenecks:</span>
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-xs md:text-sm">
                    {study.challenge}
                  </p>
                </div>

                {/* Action */}
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>The VoiceDesk Action Plan:</span>
                  </h4>
                  <p className="text-slate-650 leading-relaxed text-xs md:text-sm">
                    {study.action}
                  </p>
                </div>

              </div>

              {/* Testimonial Quote panel */}
              <div className="p-6 bg-slate-50 border border-slate-200/60 rounded-2xl space-y-3" id={`testimonial-${index}`}>
                <p className="text-slate-700 italic text-xs leading-relaxed">
                  {study.quote}
                </p>
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-900">
                  <span className="text-blue-500">★</span>
                  <span>{study.author}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* bottom inline lead CTA */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 text-center space-y-6" id="studies-inline-cta">
          <h3 className="text-xl md:text-2xl font-bold tracking-tight">Are you ready to write your own trade success story?</h3>
          <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Register for our diagnostic demo call. We configure a custom testing number and outline a free automated follow-up blueprint for your clinic or shop.
          </p>
          <button
            onClick={() => setCurrentPage('book-demo')}
            className="font-sans font-bold bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl text-xs tracking-wide transition shadow-md shadow-blue-600/10 active:translate-y-0.5"
            id="btn-case-studies-cta"
          >
            Start Free Demo Session
          </button>
        </div>

      </div>
    </div>
  );
}
