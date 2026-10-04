'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Play, 
  ChevronRight, 
  Star, 
  Layers, 
  CheckCircle2, 
  Flame, 
  RefreshCw,
  ExternalLink,
  CreditCard
} from 'lucide-react';

interface HeroProps {
  onOpenMpesaModal: () => void;
  onOpenMetaFeedModal: () => void;
}

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1920&q=90',
    title: 'The Celestial Glass Pavilion',
    category: 'Clear-Span German Marquee • 600 Guests',
    venue: 'Windsor Golf Hotel & Country Club, Nairobi',
    badge: 'Luxury Wedding Production',
  },
  {
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1920&q=90',
    title: 'East Africa Digital Innovation Gala',
    category: 'Curved P3.9 LED & Line Array Audio',
    venue: 'Radisson Blu Hotel, Upper Hill Nairobi',
    badge: 'Enterprise Corporate Summit',
  },
  {
    image: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1920&q=90',
    title: 'Swahili Coast Coral Moon Wedding',
    category: 'Barefoot Luxury & Water-Sealed Rigging',
    venue: 'The Sands at Nomad, Diani Beach Coast',
    badge: 'Destination Wedding',
  },
  {
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1920&q=90',
    title: 'The Great Rift Valley Sunset Soirée',
    category: 'Wind-Engineered Dome & Live Fire Pits',
    venue: 'Enashipai Resort & Spa, Lake Naivasha',
    badge: 'Private Golden Jubilee',
  },
];

export default function Hero({ onOpenMpesaModal, onOpenMetaFeedModal }: HeroProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-cycle through fluid moving event backgrounds
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const activeSlide = HERO_SLIDES[currentSlideIndex];

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#030712]">
      {/* Background Image Carousel with Fluid Transitions */}
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlideIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
          style={{ transitionProperty: 'opacity, transform', transitionDuration: '1200ms' }}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center transform scale-105 animate-pulse-slow"
          />
        </div>
      ))}

      {/* Veiled Luxury Dark Sapphire & Royal Blue Satin Gradients for High Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/95 via-[#060e28]/85 to-[#030712]/75" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-[#030712]/80" />
      
      {/* Subtle Warm Candlelight Ambient Glow in Bottom Center */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      {/* Luminous Cobalt Sheen in Top Left */}
      <div className="absolute top-1/4 left-1/10 w-[500px] h-[400px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left Column: Core Value Proposition & CRO Engine */}
        <div className="lg:max-w-3xl space-y-6">
          {/* Live Meta Graph Badge & Guarantee Pill */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
            <button
              onClick={onOpenMetaFeedModal}
              className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 hover:bg-blue-900 border border-blue-400/30 text-blue-200 text-xs font-medium shadow-lg backdrop-blur-md transition-all cursor-pointer"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Live Meta Graph Feed • Official FB Events</span>
              <ChevronRight className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold backdrop-blur-md">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Nairobi • Mombasa • Naivasha • Kisumu</span>
            </span>
          </div>

          {/* Main Luxury Heading */}
          <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
            Architectural Rigging Meets{' '}
            <span className="text-gold-gradient italic font-normal">
              Uncompromising Luxury
            </span>
          </h1>

          {/* Descriptive Subheading */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl font-light leading-relaxed">
            End-to-end event coordination, German clear-span marquees, concert line-array audio, and bespoke floral styling. We transform raw Kenyan estates and fairways into breathtaking, weather-proof sensory masterpieces.
          </p>

          {/* CRO Action Trigger Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            {/* Primary Instant Quote CTA */}
            <a
              href="#quote-estimator"
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-bold text-sm sm:text-base shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
            >
              <span>Calculate Instant Quote</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Secondary Portfolio CTA */}
            <a
              href="#portfolio"
              className="w-full sm:w-auto px-6 py-4 rounded-xl glass-sapphire hover:bg-blue-900/50 text-white font-semibold text-sm sm:text-base border border-blue-400/20 hover:border-amber-400/40 transition-all flex items-center justify-center gap-2"
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Explore 1,200+ Events</span>
            </a>

            {/* Tertiary M-Pesa Deposit Button */}
            <button
              onClick={onOpenMpesaModal}
              className="w-full sm:w-auto px-5 py-4 rounded-xl bg-emerald-950/80 hover:bg-emerald-900/90 text-emerald-300 hover:text-emerald-100 font-semibold text-xs sm:text-sm border border-emerald-500/30 transition-all flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4 text-emerald-400" />
              <span>Lock Date via M-Pesa</span>
            </button>
          </div>

          {/* Social Proof Micro-Trust Strip */}
          <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>100% Power Redundancy (Dual Generators)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>European-Certified Clear Marquees</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex text-amber-400">
                {'★★★★★'.split('').map((s, i) => (
                  <span key={i}>{s}</span>
                ))}
              </div>
              <span className="font-semibold text-white">4.9 / 5.0</span>
              <span className="text-slate-400">(148 Verified Google Reviews)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Event Card Spotlight & Slider Controls */}
        <div className="w-full lg:max-w-md">
          <div className="glass-royal-card rounded-2xl p-6 relative overflow-hidden group">
            {/* Ambient Corner Flare */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between pb-4 border-b border-blue-500/20">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 text-[11px] font-bold tracking-wider uppercase border border-amber-500/30">
                  {activeSlide.badge}
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                0{currentSlideIndex + 1} / 0{HERO_SLIDES.length}
              </span>
            </div>

            <div className="py-4 space-y-2">
              <h3 className="font-serif-luxury text-2xl font-bold text-white leading-snug">
                {activeSlide.title}
              </h3>
              <p className="text-sm text-amber-300 font-medium">
                {activeSlide.category}
              </p>
              <p className="text-xs text-slate-300 flex items-center gap-1.5 pt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>{activeSlide.venue}</span>
              </p>
            </div>

            {/* Quick Slide Navigation Pills */}
            <div className="pt-2 flex items-center justify-between">
              <div className="flex gap-2">
                {HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentSlideIndex(idx);
                      setIsAutoPlaying(false);
                    }}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === currentSlideIndex
                        ? 'w-8 bg-amber-400'
                        : 'w-2.5 bg-slate-700 hover:bg-slate-500'
                    }`}
                    aria-label={`Jump to event slide ${idx + 1}`}
                  />
                ))}
              </div>

              <a
                href="#portfolio"
                className="text-xs font-semibold text-blue-300 hover:text-amber-300 flex items-center gap-1 transition-colors"
              >
                <span>View Full Case Study</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Stats Grid under Card */}
          <div className="grid grid-cols-3 gap-3 pt-4">
            <div className="glass-sapphire rounded-xl p-3 text-center border border-blue-500/20">
              <div className="font-serif-luxury text-xl sm:text-2xl font-bold text-amber-300">
                1,200+
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                Events Staged
              </div>
            </div>
            <div className="glass-sapphire rounded-xl p-3 text-center border border-blue-500/20">
              <div className="font-serif-luxury text-xl sm:text-2xl font-bold text-amber-300">
                40m
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                Clear Spans
              </div>
            </div>
            <div className="glass-sapphire rounded-xl p-3 text-center border border-blue-500/20">
              <div className="font-serif-luxury text-xl sm:text-2xl font-bold text-amber-300">
                100%
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                Punctuality
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
