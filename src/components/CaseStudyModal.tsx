'use client';

import React from 'react';
import { 
  X, 
  MapPin, 
  Users, 
  Calendar, 
  CheckCircle2, 
  Quote, 
  ArrowRight, 
  Layers, 
  Sparkles,
  ShieldCheck,
  Building
} from 'lucide-react';
import { CaseStudy } from '@/data/portfolio';

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
  onSelectForQuote: (eventType: string, venue: string) => void;
}

export default function CaseStudyModal({
  caseStudy,
  onClose,
  onSelectForQuote,
}: CaseStudyModalProps) {
  if (!caseStudy) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl glass-sapphire border border-amber-500/30 shadow-2xl overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Title and Close Button */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-blue-500/20 bg-[#060e28]/95 z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {caseStudy.category}
              </span>
              <span className="text-xs text-slate-400">
                {caseStudy.date}
              </span>
            </div>
            <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white">
              {caseStudy.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-8 flex-1">
          
          {/* Main Visual & Key Specs Banner */}
          <div className="relative rounded-xl overflow-hidden h-64 sm:h-80 md:h-96 shadow-2xl">
            <img
              src={caseStudy.heroImage}
              alt={caseStudy.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060e28] via-[#060e28]/40 to-transparent" />
            
            {/* Overlay Specs Card */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl glass-candlelight border border-amber-500/30">
              <div className="flex items-center gap-6 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-slate-200">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>{caseStudy.venue} ({caseStudy.location})</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <Users className="w-4 h-4 text-amber-400" />
                  <span>{caseStudy.guests} Guests</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Host:</span>
                <span className="text-xs font-semibold text-amber-200">{caseStudy.client.name}</span>
              </div>
            </div>
          </div>

          {/* Three Narrative Pillars: Challenge, Concept, Outcome */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* The Challenge */}
            <div className="p-5 rounded-xl glass-royal-card border border-blue-500/20 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-300">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>The Challenge</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {caseStudy.narrative.challenge}
              </p>
            </div>

            {/* The Creative Concept */}
            <div className="p-5 rounded-xl glass-royal-card border border-amber-500/20 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Creative Styling & Design</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {caseStudy.narrative.concept}
              </p>
            </div>

            {/* The Outcome */}
            <div className="p-5 rounded-xl glass-royal-card border border-emerald-500/20 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Execution & Outcome</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {caseStudy.narrative.outcome}
              </p>
            </div>
          </div>

          {/* Infrastructure Deployed & Equipment Deployed */}
          <div className="p-6 rounded-xl glass-sapphire border border-blue-500/20 space-y-4">
            <h4 className="font-serif-luxury text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Technical Infrastructure & Heavy Equipment Deployed</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {caseStudy.narrative.infrastructure.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="p-6 rounded-xl glass-candlelight border border-amber-500/30 relative">
            <Quote className="w-8 h-8 text-amber-400/20 absolute top-4 right-4" />
            <p className="font-serif-luxury text-base sm:text-lg italic text-amber-100 leading-relaxed mb-4">
              "{caseStudy.narrative.testimonial}"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center font-bold text-amber-300 text-xs">
                {caseStudy.client.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-white text-xs sm:text-sm">
                  {caseStudy.client.name}
                </div>
                <div className="text-xs text-amber-400">
                  {caseStudy.client.role}
                </div>
              </div>
            </div>
          </div>

          {/* Photographic Gallery */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-lg font-bold text-white">
              Event Photo Gallery
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {caseStudy.gallery.map((imgUrl, i) => (
                <div key={i} className="h-32 rounded-lg overflow-hidden border border-blue-500/20">
                  <img
                    src={imgUrl}
                    alt={`${caseStudy.title} photo ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Metrics Bar */}
          <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-slate-950/80 border border-blue-500/20 text-center">
            {caseStudy.metrics.map((m, idx) => (
              <div key={idx}>
                <div className="font-serif-luxury text-lg sm:text-xl font-bold text-amber-300">
                  {m.value}
                </div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-6 border-t border-blue-500/20 bg-[#060e28]/95 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400 text-center sm:text-left">
            Inspired by this event? We can recreate and customize this production for your date.
          </p>

          <button
            onClick={() => {
              onClose();
              onSelectForQuote(caseStudy.category, caseStudy.venue);
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Request Quote for This Setup</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
