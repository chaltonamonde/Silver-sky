'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Users, 
  Calendar, 
  ArrowRight, 
  Filter, 
  Eye, 
  Layers,
  CheckCircle2
} from 'lucide-react';
import { CASE_STUDIES, CaseStudy } from '@/data/portfolio';
import CaseStudyModal from './CaseStudyModal';

interface PortfolioHubProps {
  onSelectForQuote: (eventType: string, venue: string) => void;
}

const CATEGORIES = [
  'All',
  'Weddings',
  'Corporate',
  'Private',
  'Infrastructure',
  'Diplomatic',
] as const;

export default function PortfolioHub({ onSelectForQuote }: PortfolioHubProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  const filteredStudies = activeCategory === 'All'
    ? CASE_STUDIES
    : CASE_STUDIES.filter((study) => study.category === activeCategory);

  return (
    <section id="portfolio" className="relative py-24 bg-[#030712] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-300 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Proven Portfolio & Narrative Case Studies</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Curated Masterworks &{' '}
            <span className="text-gold-gradient italic font-normal">Real Transformations</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Every celebration has a narrative. Explore how we conquer complex engineering challenges, unpredictable weather, and raw terrain to create breathtaking luxury environments across East Africa.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 shadow-lg shadow-amber-500/25 scale-[1.02]'
                  : 'glass-sapphire text-slate-300 hover:text-white hover:border-blue-400/40'
              }`}
            >
              {cat === 'All' ? 'All Portfolio (6)' : cat}
            </button>
          ))}
        </div>

        {/* Filterable Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStudies.map((study) => (
            <div
              key={study.id}
              className="glass-royal-card rounded-2xl overflow-hidden border border-blue-500/20 group flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Card Image with Badges */}
              <div className="relative h-64 overflow-hidden bg-slate-950">
                <img
                  src={study.heroImage}
                  alt={study.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060e28] via-transparent to-black/30" />

                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[11px] font-bold text-amber-300 border border-amber-500/30">
                    {study.category}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-200">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span className="truncate max-w-[190px]">{study.venue}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <Users className="w-3.5 h-3.5 text-blue-400" />
                    <span>{study.guests} Guests</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-serif-luxury text-xl font-bold text-white group-hover:text-amber-200 transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                    {study.tagline}
                  </p>
                </div>

                {/* Key Spec Snippet */}
                <div className="pt-3 border-t border-slate-800/80 space-y-2">
                  <div className="text-[11px] text-amber-400/90 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{study.narrative.infrastructure[0]}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] text-slate-400">
                      Client: <strong className="text-slate-200">{study.client.name}</strong>
                    </span>

                    <button
                      onClick={() => setSelectedCaseStudy(study)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Read Story</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner Trigger */}
        <div className="p-6 sm:p-8 rounded-2xl glass-candlelight border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white">
              Have a Specific Venue or Concept in Mind?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              We provide complimentary 3D CAD venue visualizations and on-site technical inspections across Kenya.
            </p>
          </div>

          <a
            href="#quote-estimator"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all shrink-0"
          >
            Request Custom Consultation
          </a>
        </div>
      </div>

      {/* Case Study Full Story Modal */}
      <CaseStudyModal
        caseStudy={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onSelectForQuote={onSelectForQuote}
      />
    </section>
  );
}
