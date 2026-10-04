'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Phone, 
  MessageCircle, 
  Menu, 
  X, 
  ShieldCheck, 
  MapPin, 
  CreditCard,
  Calendar,
  Layers,
  Star
} from 'lucide-react';

interface NavbarProps {
  onOpenMpesaModal: (pkgName?: string, amount?: number) => void;
  onOpenMetaFeedModal: () => void;
}

export default function Navbar({ onOpenMpesaModal, onOpenMetaFeedModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Luxury Announcement Bar */}
      <div className="bg-gradient-to-r from-[#060e28] via-[#0f276c] to-[#060e28] border-b border-amber-500/20 text-xs py-2 px-4 text-slate-200">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[11px] font-medium">
              <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
              2026/2027 Calendar Open
            </span>
            <span className="hidden sm:inline text-slate-300">
              German Clear Marquees, Bespoke Decor & Full Production across Kenya
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <button
              onClick={onOpenMetaFeedModal}
              className="hidden md:flex items-center gap-1.5 hover:text-amber-300 transition-colors text-[11px]"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Live Meta FB Feed Active</span>
            </button>
            <div className="flex items-center gap-3">
              <a
                href="tel:+254700123456"
                className="flex items-center gap-1 hover:text-amber-300 transition-colors font-semibold"
              >
                <Phone className="w-3 h-3 text-amber-400" />
                <span>+254 700 123 456</span>
              </a>
              <span className="text-slate-600">|</span>
              <span className="flex items-center gap-1 text-slate-400">
                <MapPin className="w-3 h-3 text-amber-400/80" />
                <span>Nairobi, Kenya</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-sapphire shadow-2xl py-3 border-b border-blue-500/20'
            : 'bg-[#030712]/80 backdrop-blur-md py-4 border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 via-blue-900 to-slate-950 p-[1px] shadow-lg shadow-blue-900/50 group-hover:shadow-amber-500/30 transition-all">
              <div className="w-full h-full rounded-xl bg-[#060e28] flex items-center justify-center border border-amber-500/30">
                <Sparkles className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-amber-200 transition-colors">
                  Silver Sky
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">
                  Events
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wider uppercase font-medium">
                Coordination • Decor • Infrastructure
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-200">
            <a href="#portfolio" className="hover:text-amber-300 transition-colors py-1">
              Portfolio & Stories
            </a>
            <a href="#packages" className="hover:text-amber-300 transition-colors py-1">
              Pricing & Tiers
            </a>
            <a href="#quote-estimator" className="hover:text-amber-300 transition-colors py-1 flex items-center gap-1">
              <span>Instant Quote</span>
              <span className="px-1.5 py-0.2 bg-blue-600/30 text-blue-300 rounded text-[10px] border border-blue-500/30">
                Fast
              </span>
            </a>
            <a href="#regions" className="hover:text-amber-300 transition-colors py-1">
              Regional Hubs
            </a>
            <a href="#reviews" className="hover:text-amber-300 transition-colors py-1 flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>4.9★ Reviews</span>
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Ops Admin Portal Link */}
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-amber-300 text-xs font-semibold transition-all"
              title="Silver Sky Executive Ops & Escrow Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Ops Admin</span>
            </Link>

            {/* Pay Deposit Button */}
            <button
              onClick={() => onOpenMpesaModal()}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 hover:text-emerald-100 text-xs font-semibold shadow-lg shadow-emerald-950/50 transition-all"
              title="Secure Instant Date Reservation via Safaricom Daraja"
            >
              <CreditCard className="w-4 h-4 text-emerald-400" />
              <span>M-Pesa Deposit</span>
            </button>

            {/* Fast Quote CTA */}
            <a
              href="#quote-estimator"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 text-xs font-bold shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Get Event Quote</span>
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              href="/admin"
              className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-amber-400 text-xs font-bold"
              aria-label="Ops Admin"
            >
              <ShieldCheck className="w-4 h-4" />
            </Link>
            <button
              onClick={() => onOpenMpesaModal()}
              className="p-2 rounded-lg bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 text-xs font-medium"
              aria-label="M-Pesa Pay"
            >
              <CreditCard className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-blue-500/20 text-slate-200 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#060e28] border-b border-blue-500/20 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
            <div className="space-y-1">
              <a
                href="#portfolio"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-blue-900/40 hover:text-amber-300"
              >
                Portfolio & Stories
              </a>
              <a
                href="#packages"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-blue-900/40 hover:text-amber-300"
              >
                Packages & Starting Prices
              </a>
              <a
                href="#quote-estimator"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-amber-300 hover:bg-blue-900/40"
              >
                Instant Quote Calculator
              </a>
              <a
                href="#regions"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-blue-900/40 hover:text-amber-300"
              >
                Regional Pages (Nairobi, Mombasa, etc.)
              </a>
              <a
                href="#reviews"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-blue-900/40 hover:text-amber-300"
              >
                Google Business Profile (4.9★)
              </a>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenMpesaModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-900/90 border border-emerald-500/40 text-emerald-100 font-semibold text-sm"
              >
                <CreditCard className="w-4 h-4 text-emerald-400" />
                <span>Pay M-Pesa Deposit</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenMetaFeedModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-950/80 border border-blue-500/30 text-blue-300 font-medium text-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>View Live Meta Graph Feed</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
