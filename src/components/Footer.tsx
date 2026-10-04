'use client';

import React from 'react';
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  CreditCard, 
  Award, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface FooterProps {
  onOpenMpesaModal: () => void;
  onOpenMetaFeedModal: () => void;
}

export default function Footer({ onOpenMpesaModal, onOpenMetaFeedModal }: FooterProps) {
  return (
    <footer className="bg-[#02050e] border-t border-blue-500/20 text-slate-300 text-xs">
      {/* Top Banner: Quick Contact & Security */}
      <div className="border-b border-slate-900 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="font-bold text-white text-xs">NEMA & Safety Certified</div>
              <div className="text-[11px] text-slate-400">Full county permits & structural sign-off</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="font-bold text-white text-xs">Safaricom Daraja M-Pesa</div>
              <div className="text-[11px] text-slate-400">Official Paybill 782910 Escrow</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="font-bold text-white text-xs">4.9★ Google Business</div>
              <div className="text-[11px] text-slate-400">148+ Verified 5-Star Reviews</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="font-bold text-white text-xs">1,200+ Luxury Events</div>
              <div className="text-[11px] text-slate-400">100% On-Time Setup Guarantee</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Brand Column (2 cols on lg) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-700 to-slate-950 p-[1px]">
              <div className="w-full h-full rounded-xl bg-[#060e28] flex items-center justify-center border border-amber-500/30">
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
            </div>
            <div className="font-serif-luxury text-xl font-bold text-white">
              Silver Sky Events
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            East Africa's premier end-to-end luxury event coordination, bespoke decor styling, and heavy infrastructure provider. Operating across Nairobi, Mombasa, Naivasha, Kisumu, and beyond.
          </p>

          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Karen Office Park & Enterprise Rd Staging Yard, Nairobi</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>+254 700 123 456 (24/7 Operations)</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>concierge@silverskyevents.co.ke</span>
            </div>
          </div>
        </div>

        {/* Quick Nav */}
        <div className="space-y-3">
          <h4 className="font-serif-luxury text-sm font-bold text-white uppercase tracking-wider">
            Event Services
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <a href="#packages" className="hover:text-amber-300 transition-colors">
                Luxury Wedding Decor
              </a>
            </li>
            <li>
              <a href="#packages" className="hover:text-amber-300 transition-colors">
                Corporate Galas & Summits
              </a>
            </li>
            <li>
              <a href="#packages" className="hover:text-amber-300 transition-colors">
                German Clear-Span Domes
              </a>
            </li>
            <li>
              <a href="#packages" className="hover:text-amber-300 transition-colors">
                Line-Array Audio & Stage Rigging
              </a>
            </li>
            <li>
              <a href="#packages" className="hover:text-amber-300 transition-colors">
                Curved P3.9 LED Video Screens
              </a>
            </li>
            <li>
              <a href="#packages" className="hover:text-amber-300 transition-colors">
                VIP Velvet Lounge Furniture
              </a>
            </li>
          </ul>
        </div>

        {/* Regional Hubs */}
        <div className="space-y-3">
          <h4 className="font-serif-luxury text-sm font-bold text-white uppercase tracking-wider">
            Regional Hubs
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <a href="#regions" className="hover:text-amber-300 transition-colors">
                Nairobi (Karen, Muthaiga, Gigiri)
              </a>
            </li>
            <li>
              <a href="#regions" className="hover:text-amber-300 transition-colors">
                Mombasa & Diani Coast
              </a>
            </li>
            <li>
              <a href="#regions" className="hover:text-amber-300 transition-colors">
                Lake Naivasha & Nakuru
              </a>
            </li>
            <li>
              <a href="#regions" className="hover:text-amber-300 transition-colors">
                Kisumu & Great Lakes
              </a>
            </li>
            <li>
              <a href="#regions" className="hover:text-amber-300 transition-colors">
                Mount Kenya & Nanyuki
              </a>
            </li>
          </ul>
        </div>

        {/* Portals & Integrations */}
        <div className="space-y-3">
          <h4 className="font-serif-luxury text-sm font-bold text-white uppercase tracking-wider">
            Direct Portals
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={onOpenMpesaModal}
                className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 text-left"
              >
                <span>M-Pesa Daraja Gateway</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </li>
            <li>
              <button
                onClick={onOpenMetaFeedModal}
                className="hover:text-amber-300 flex items-center gap-1 text-left"
              >
                <span>Live Meta Facebook Feed</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </li>
            <li>
              <a href="#quote-estimator" className="hover:text-amber-300">
                Instant Quote Estimator
              </a>
            </li>
            <li>
              <a href="#portfolio" className="hover:text-amber-300">
                Narrative Case Studies
              </a>
            </li>
            <li>
              <a href="#reviews" className="hover:text-amber-300">
                Google Business Reviews
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-6 border-t border-slate-900 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <div>
          © {new Date().getFullYear()} Silver Sky Events & Infrastructure Ltd. All Rights Reserved. Registered in Kenya.
        </div>
        <div className="flex gap-4">
          <span>Terms & Milestone Policy</span>
          <span>Privacy & Escrow</span>
          <span>NEMA Environmental Compliance</span>
        </div>
      </div>
    </footer>
  );
}
