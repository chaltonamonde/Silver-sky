'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustMetrics from '@/components/TrustMetrics';
import PortfolioHub from '@/components/PortfolioHub';
import QuoteCalculator from '@/components/QuoteCalculator';
import PackagesSection from '@/components/PackagesSection';
import RegionalLandingSection from '@/components/RegionalLandingSection';
import GoogleReviewsSection from '@/components/GoogleReviewsSection';
import Footer from '@/components/Footer';
import MetaFeedModal from '@/components/MetaFeedModal';
import MpesaDepositModal from '@/components/MpesaDepositModal';
import WhatsAppWidget from '@/components/WhatsAppWidget';

export default function HomePage() {
  const [isMpesaModalOpen, setIsMpesaModalOpen] = useState(false);
  const [mpesaTargetPackage, setMpesaTargetPackage] = useState<string | undefined>(undefined);
  const [mpesaTargetAmount, setMpesaTargetAmount] = useState<number | undefined>(undefined);
  
  const [isMetaModalOpen, setIsMetaModalOpen] = useState(false);

  // Cross-component prefill state
  const [prefillEventType, setPrefillEventType] = useState<string | undefined>(undefined);
  const [prefillVenue, setPrefillVenue] = useState<string | undefined>(undefined);

  const handleOpenMpesa = (pkgName?: string, amount?: number) => {
    setMpesaTargetPackage(pkgName);
    setMpesaTargetAmount(amount);
    setIsMpesaModalOpen(true);
  };

  const handleSelectCaseStudyForQuote = (category: string, venue: string) => {
    setPrefillEventType(category);
    setPrefillVenue(venue);
    // Smooth scroll down to Quote Calculator
    const element = document.getElementById('quote-estimator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar
        onOpenMpesaModal={() => handleOpenMpesa()}
        onOpenMetaFeedModal={() => setIsMetaModalOpen(true)}
      />

      {/* Hero Section with Dynamic Moving Facebook-Linked Background */}
      <Hero
        onOpenMpesaModal={() => handleOpenMpesa()}
        onOpenMetaFeedModal={() => setIsMetaModalOpen(true)}
      />

      {/* Social Proof & Trust Metrics Bar */}
      <TrustMetrics />

      {/* Module 1: Portfolio & Narrative Case Studies Hub */}
      <PortfolioHub
        onSelectForQuote={handleSelectCaseStudyForQuote}
      />

      {/* Module 2: Event-Specific Quote Form & Cost Estimator */}
      <QuoteCalculator
        onOpenMpesaModal={handleOpenMpesa}
        prefillEventType={prefillEventType}
        prefillVenue={prefillVenue}
      />

      {/* Module 4: Transparent Packages & Starting Prices */}
      <PackagesSection
        onOpenMpesaModal={handleOpenMpesa}
      />

      {/* Module 5: Regional Landing Hubs (Nairobi, Mombasa, Naivasha, Kisumu, Nanyuki) */}
      <RegionalLandingSection
        onOpenMpesaModal={() => handleOpenMpesa()}
      />

      {/* Module 6A: Google Business Profile (4.9★) & Verified Client Reviews */}
      <GoogleReviewsSection />

      {/* Luxury Footer */}
      <Footer
        onOpenMpesaModal={() => handleOpenMpesa()}
        onOpenMetaFeedModal={() => setIsMetaModalOpen(true)}
      />

      {/* Module 3: Floating WhatsApp VIP Concierge Widget */}
      <WhatsAppWidget />

      {/* Module 6B: Safaricom Daraja M-Pesa Interactive Deposit STK Push Gateway */}
      <MpesaDepositModal
        isOpen={isMpesaModalOpen}
        onClose={() => setIsMpesaModalOpen(false)}
        initialPackageName={mpesaTargetPackage}
        initialAmount={mpesaTargetAmount}
      />

      {/* Meta Graph API Live Facebook Posts Modal */}
      <MetaFeedModal
        isOpen={isMetaModalOpen}
        onClose={() => setIsMetaModalOpen(false)}
      />
    </main>
  );
}
