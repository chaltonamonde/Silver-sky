'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  CreditCard, 
  ShieldCheck, 
  Layers, 
  Calendar, 
  MessageCircle,
  Clock,
  Award
} from 'lucide-react';
import { PACKAGES_DATA, INFRASTRUCTURE_CATALOG, PackageItem } from '@/data/packages';

interface PackagesSectionProps {
  onOpenMpesaModal: (pkgName?: string, amount?: number) => void;
}

export default function PackagesSection({ onOpenMpesaModal }: PackagesSectionProps) {
  const [activeTab, setActiveTab] = useState<'Weddings' | 'Corporate' | 'Infrastructure'>('Weddings');

  const filteredPackages = PACKAGES_DATA.filter((p) => p.category === activeTab);

  const handleWhatsAppPackage = (pkg: PackageItem) => {
    const text = `*Inquiry: ${pkg.name} (${pkg.formattedPrice})*\n` +
      `Hello Silver Sky Events, I am interested in booking the *${pkg.name}* package. Please verify 2026/2027 date availability and provide the complete contract terms.`;
    window.open(`https://wa.me/254700123456?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="packages" className="relative py-24 bg-[#030712] overflow-hidden">
      {/* Background radial highlights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-700/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-300 text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Transparent Investment & Clear Tiers</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Curated Packages &{' '}
            <span className="text-gold-gradient italic font-normal">Starting Prices</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            We believe in total transparency. No hidden transport surprises, no unexpected generator surcharges. Review our starting baselines and lock your date with confidence.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl glass-sapphire border border-blue-500/30">
            {(['Weddings', 'Corporate', 'Infrastructure'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {tab === 'Weddings' ? 'Luxury Weddings' : tab === 'Corporate' ? 'Corporate Galas' : 'Equipment Hire & Marquees'}
              </button>
            ))}
          </div>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {filteredPackages.map((pkg) => {
            const isFeatured = pkg.badge === 'Most Popular';

            return (
              <div
                key={pkg.id}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative transition-all duration-300 ${
                  isFeatured
                    ? 'glass-candlelight border-2 border-amber-400/80 shadow-2xl shadow-amber-500/15 scale-[1.03] lg:-translate-y-2'
                    : 'glass-royal-card border border-blue-500/20 hover:border-amber-500/30'
                }`}
              >
                {/* Popular Ribbon */}
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 text-[11px] font-black uppercase tracking-wider shadow-lg shadow-amber-500/40">
                    ★ Most Requested Package
                  </div>
                )}

                {/* Package Head */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      {pkg.targetAudience}
                    </span>
                    <span className="text-[11px] font-semibold text-blue-300 bg-blue-900/30 px-2.5 py-1 rounded-md border border-blue-500/20">
                      {pkg.guestCapacity}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Price Tag */}
                  <div className="py-4 border-y border-slate-800 space-y-1">
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                      Starting Investment
                    </div>
                    <div className="font-serif-luxury text-3xl sm:text-4xl font-bold text-gold-gradient">
                      {pkg.formattedPrice}
                    </div>
                    <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                      <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                      <span>40% Date Hold Deposit: KES {pkg.depositAmountKES.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Inclusions List */}
                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-200">
                      Package Inclusions:
                    </div>
                    <ul className="space-y-2">
                      {pkg.inclusions.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technical Hardware details */}
                  <div className="pt-3 border-t border-slate-800/80 space-y-2">
                    <div className="text-[11px] font-bold text-blue-300 uppercase tracking-wider">
                      Technical Rigging Included:
                    </div>
                    {pkg.equipmentDetails.map((eq, i) => (
                      <div key={i} className="text-[11px] text-slate-400 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        <span>{eq}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTAs */}
                <div className="space-y-2.5 pt-6 mt-6 border-t border-slate-800">
                  <button
                    onClick={() => onOpenMpesaModal(pkg.name, pkg.depositAmountKES)}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isFeatured
                        ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 shadow-xl shadow-amber-500/25 hover:scale-[1.02]'
                        : 'bg-emerald-900/90 hover:bg-emerald-800 text-white border border-emerald-500/40'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Lock Date with M-Pesa Deposit</span>
                  </button>

                  <button
                    onClick={() => handleWhatsAppPackage(pkg)}
                    className="w-full py-2.5 px-4 rounded-xl glass-sapphire hover:bg-blue-900/40 text-blue-200 hover:text-white border border-blue-500/20 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Inquire via WhatsApp</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Equipment & Heavy Infrastructure Catalog Strip (When Infrastructure tab or below) */}
        {activeTab === 'Infrastructure' && (
          <div className="space-y-6 pt-6">
            <div className="text-center space-y-1">
              <h3 className="font-serif-luxury text-2xl font-bold text-white">
                Equipment Hire & Technical Rigging Inventory
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Available for independent hire by corporate production houses, wedding planners, and government agencies.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {INFRASTRUCTURE_CATALOG.map((item, idx) => (
                <div
                  key={idx}
                  className="glass-royal-card rounded-xl overflow-hidden border border-blue-500/20 flex flex-col justify-between group"
                >
                  <div className="h-44 overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-baseline">
                      <span className="text-xs font-bold text-white">{item.name}</span>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <p className="text-xs text-slate-400">{item.specs}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                      <span className="text-xs font-mono font-bold text-amber-300">
                        {item.startingAt}
                      </span>
                      <a
                        href="#quote-estimator"
                        className="text-xs font-bold text-blue-300 hover:text-amber-300 flex items-center gap-1"
                      >
                        <span>Add to Quote</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Transparent Terms of Booking Box */}
        <div className="p-6 rounded-2xl glass-sapphire border border-blue-500/20 space-y-3">
          <div className="flex items-center gap-2 font-serif-luxury text-lg font-bold text-white">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Standard Milestone Payment & Booking Policy</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <strong className="text-amber-400 block mb-1">1. Date Reservation (40%)</strong>
              Secures your chosen date on our master production calendar. All materials, structures, and generator fleets are locked.
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <strong className="text-amber-400 block mb-1">2. Production Lock (40%)</strong>
              Payable 14 days prior to event. Covers floral imports, custom CAD carpentry, and staging fabrication.
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <strong className="text-amber-400 block mb-1">3. Handover & Execution (20%)</strong>
              Due on setup day after full client site inspection, sound check, and lighting rehearsal approval.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
