'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Award, 
  Clock, 
  CheckCircle2,
  Zap,
  Building2,
  Users
} from 'lucide-react';

export default function TrustMetrics() {
  const METRICS = [
    {
      value: '1,200+',
      label: 'Luxury Events Executed',
      desc: 'Flawlessly coordinated across Kenya',
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
    },
    {
      value: '100%',
      label: 'Power Redundancy Guarantee',
      desc: 'Dual synchronized silent diesel generators',
      icon: <Zap className="w-5 h-5 text-emerald-400" />,
    },
    {
      value: '40m',
      label: 'Clear-Span German Domes',
      desc: 'Pillarless European-certified marquees',
      icon: <Building2 className="w-5 h-5 text-blue-400" />,
    },
    {
      value: '4.9 ★',
      label: 'Google Business Rating',
      desc: 'From 148 verified brides & executives',
      icon: <Award className="w-5 h-5 text-amber-300" />,
    },
  ];

  const CLIENT_LOGOS = [
    'Safaricom Telecommunications',
    'Kenya Airways VVIP Lounge',
    'Standard Chartered Bank',
    'PwC East Africa',
    'East African Breweries Ltd',
    'UN-Habitat Diplomatic Corps',
  ];

  return (
    <div className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 4 Pillars Card Strip */}
      <div className="glass-candlelight rounded-2xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-3 rounded-xl bg-slate-950/40 border border-slate-800/80 hover:border-amber-500/30 transition-colors"
            >
              <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-500/30 shrink-0">
                {metric.icon}
              </div>
              <div>
                <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {metric.value}
                </div>
                <div className="text-xs font-semibold text-amber-300 mt-0.5">
                  {metric.label}
                </div>
                <div className="text-[11px] text-slate-400 mt-1 leading-snug">
                  {metric.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Corporate Trust Strip: Marquee Client Logos */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
            Trusted by Kenya’s Most Prestigious Hosts & Brands:
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 text-xs text-slate-400 font-semibold tracking-wide">
            {CLIENT_LOGOS.map((client, i) => (
              <span
                key={i}
                className="hover:text-amber-200 transition-colors cursor-default flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400/60" />
                <span>{client}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
