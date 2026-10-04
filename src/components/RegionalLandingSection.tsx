'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Truck, 
  Building, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Navigation,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { REGIONS_DATA, RegionalHub } from '@/data/regions';

interface RegionalLandingSectionProps {
  onOpenMpesaModal: () => void;
}

export default function RegionalLandingSection({ onOpenMpesaModal }: RegionalLandingSectionProps) {
  const [selectedHub, setSelectedHub] = useState<RegionalHub>(REGIONS_DATA[0]);

  return (
    <section id="regions" className="relative py-24 bg-[#060e28] overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Navigation className="w-3.5 h-3.5 text-amber-400" />
            <span>Dedicated Regional Hubs & Local Logistics</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Nationwide Reach,{' '}
            <span className="text-gold-gradient italic font-normal">Hyper-Local Precision</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            From Karen and Gigiri in Nairobi to the white sands of Diani Beach and the escarpments of Naivasha, our strategically positioned regional staging yards guarantee on-time event deployment without interstate delays.
          </p>
        </div>

        {/* Region Selector Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {REGIONS_DATA.map((region) => (
            <button
              key={region.id}
              onClick={() => setSelectedHub(region)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                selectedHub.id === region.id
                  ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 shadow-lg shadow-amber-500/25 scale-[1.02]'
                  : 'glass-sapphire text-slate-300 hover:text-white hover:border-blue-400/40'
              }`}
            >
              <MapPin className={`w-3.5 h-3.5 ${selectedHub.id === region.id ? 'text-slate-950' : 'text-amber-400'}`} />
              <span>{region.name}</span>
            </button>
          ))}
        </div>

        {/* Selected Regional Hub Display Card */}
        <div className="glass-royal-card rounded-2xl overflow-hidden border border-blue-500/20 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Visual Left Showcase (5 cols) */}
            <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full overflow-hidden bg-slate-950">
              <img
                src={selectedHub.heroImage}
                alt={selectedHub.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060e28] via-[#060e28]/50 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#060e28]" />

              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[11px] font-bold text-amber-300 border border-amber-500/30">
                  {selectedHub.badge}
                </span>
              </div>

              {/* Local Logistics Pill on Visual */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl glass-candlelight border border-amber-500/30 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
                  <Truck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Regional Staging Fleet</span>
                </div>
                <div className="text-xs text-slate-200">
                  <strong>Staging Yard:</strong> {selectedHub.localFleet.depot}
                </div>
                <div className="text-[11px] text-slate-300">
                  <strong>Mobilization:</strong> {selectedHub.localFleet.transportTimeline}
                </div>
              </div>
            </div>

            {/* Content Right Details (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Coverage: {selectedHub.coverageCounties.join(' • ')}
                </div>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
                  {selectedHub.headline}
                </h3>
                <p className="text-xs sm:text-sm text-amber-200/90 font-medium">
                  {selectedHub.subheadline}
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2">
                  {selectedHub.description}
                </p>
              </div>

              {/* Local Engineering Highlights */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Local Climate & Terrain Engineering:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {selectedHub.regionalHighlights.map((hl, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                      <div className="font-semibold text-xs text-amber-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{hl.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-normal">
                        {hl.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Partner Venues in Region */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-amber-400" />
                    <span>Verified Partner Venues ({selectedHub.popularVenues.length})</span>
                  </h4>
                  <span className="text-[10px] text-slate-400">Pre-measured CAD floor plans on file</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedHub.popularVenues.map((venue, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-blue-950/40 border border-blue-500/20 flex flex-col justify-between text-xs"
                    >
                      <div className="font-semibold text-white">{venue.name}</div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                        <span>{venue.neighborhood}</span>
                        <span className="text-amber-300 font-mono font-medium">{venue.capacity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Regional CTA Bottom Row */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-400">
                  <span className="text-amber-300 font-semibold">{selectedHub.startingPriceNote}</span>
                </div>

                <a
                  href="#quote-estimator"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>Book {selectedHub.name.split(' ')[0]} Site Visit</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
