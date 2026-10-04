'use client';

import React, { useState } from 'react';
import { 
  Star, 
  MapPin, 
  Phone, 
  Clock, 
  CheckCircle2, 
  ThumbsUp, 
  ExternalLink, 
  Sparkles,
  ShieldCheck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { GOOGLE_PROFILE, GOOGLE_REVIEWS_DATA } from '@/data/reviews';

export default function GoogleReviewsSection() {
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  const nextReview = () => {
    setActiveReviewIndex((prev) => (prev + 1) % GOOGLE_REVIEWS_DATA.length);
  };

  const prevReview = () => {
    setActiveReviewIndex((prev) => (prev - 1 + GOOGLE_REVIEWS_DATA.length) % GOOGLE_REVIEWS_DATA.length);
  };

  return (
    <section id="reviews" className="relative py-24 bg-[#030712] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[400px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verified Google Business Profile</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Rated <span className="text-gold-gradient font-bold">4.9 / 5.0</span> by 148+ Couples & Executives
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Our reputation in Kenya is built on zero power failures, flawless structural engineering, and unforgettable sensory aesthetics. Read verified experiences from real event hosts.
          </p>
        </div>

        {/* Google Business Profile Snapshot Bar */}
        <div className="glass-royal-card rounded-2xl p-6 sm:p-8 border border-blue-500/20 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left Rating Summary (4 cols) */}
            <div className="md:col-span-4 space-y-3 text-center md:text-left border-b md:border-b-0 md:border-r border-slate-800 pb-6 md:pb-0 md:pr-6">
              <div className="flex items-center justify-center md:justify-start gap-2">
                {/* Google G Logo icon */}
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-slate-900 text-sm shadow">
                  <span className="text-blue-600 font-black">G</span>
                </div>
                <div>
                  <div className="font-bold text-white text-sm">Google Business Verified</div>
                  <div className="text-[11px] text-slate-400">Nairobi, Kenya</div>
                </div>
              </div>

              <div className="flex items-baseline justify-center md:justify-start gap-3">
                <span className="font-serif-luxury text-4xl sm:text-5xl font-bold text-white">
                  4.9
                </span>
                <div className="space-y-0.5">
                  <div className="flex text-amber-400 text-sm">
                    {'★★★★★'.split('').map((s, i) => (
                      <span key={i}>{s}</span>
                    ))}
                  </div>
                  <div className="text-xs text-slate-400">148 Verified Client Reviews</div>
                </div>
              </div>

              <div className="pt-1">
                <a
                  href="https://maps.google.com/?q=Silver+Sky+Events+Nairobi+Kenya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <span>View on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Center Operational Details (5 cols) */}
            <div className="md:col-span-5 space-y-3 text-xs text-slate-300 border-b md:border-b-0 md:border-r border-slate-800 pb-6 md:pb-0 md:pr-6">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Headquarters & Staging Yard:</strong>
                  <p className="text-slate-400">{GOOGLE_PROFILE.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Direct Line:</strong>
                  <p className="text-slate-400">{GOOGLE_PROFILE.phone} (24/7 Operations Duty Line)</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Operating Hours:</strong>
                  <p className="text-slate-400">{GOOGLE_PROFILE.hours}</p>
                </div>
              </div>
            </div>

            {/* Right Trust CTA (3 cols) */}
            <div className="md:col-span-3 text-center md:text-right space-y-3">
              <div className="inline-flex items-center gap-1 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>100% Five-Star Track Record</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Have an event with us? We appreciate your feedback.
              </p>
              <a
                href="#quote-estimator"
                className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all"
              >
                Inquire for Your Date
              </a>
            </div>

          </div>
        </div>

        {/* Reviews Carousel & Cards Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white">
              Recent Verified Client Reviews
            </h3>

            {/* Carousel navigation buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevReview}
                className="p-2 rounded-lg glass-sapphire border border-blue-500/30 text-slate-300 hover:text-white hover:border-amber-400 transition-colors"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextReview}
                className="p-2 rounded-lg glass-sapphire border border-blue-500/30 text-slate-300 hover:text-white hover:border-amber-400 transition-colors"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GOOGLE_REVIEWS_DATA.slice(0, 3).map((rev) => (
              <div
                key={rev.id}
                className="glass-royal-card rounded-2xl p-6 border border-blue-500/20 flex flex-col justify-between space-y-4 hover:border-amber-500/40 transition-all duration-300"
              >
                <div className="space-y-3">
                  {/* Rating Stars and Time */}
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400 text-xs">
                      {'★★★★★'.split('').map((s, i) => (
                        <span key={i}>{s}</span>
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-500">{rev.timeAgo}</span>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                    "{rev.reviewText}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-slate-800 space-y-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.authorName}
                      className="w-10 h-10 rounded-full object-cover border border-amber-500/30"
                    />
                    <div>
                      <div className="font-semibold text-white text-xs sm:text-sm flex items-center gap-1.5">
                        <span>{rev.authorName}</span>
                        {rev.verified && (
                          <span title="Verified Client Review">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-amber-300/90 font-medium">
                        {rev.authorRole}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span className="truncate max-w-[200px]">{rev.venue}</span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <ThumbsUp className="w-3 h-3 text-blue-400" />
                      <span>{rev.likesCount}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Google Maps Card Simulation */}
        <div className="rounded-2xl overflow-hidden glass-sapphire border border-blue-500/20 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-900/40 border border-blue-500/30 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h4 className="font-serif-luxury text-lg font-bold text-white">
                Visit Our Nairobi Staging Yard & Showroom
              </h4>
              <p className="text-xs text-slate-300">
                Inspect our clear German marquees, crystal chandeliers, and luxury velvet lounges in person. Bookings required.
              </p>
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=Silver+Sky+Events+Nairobi+Kenya"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-2 border border-slate-700 transition-colors shrink-0"
          >
            <span>Open Directions in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
          </a>
        </div>

      </div>
    </section>
  );
}
