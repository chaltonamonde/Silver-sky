'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Sparkles, 
  Calendar, 
  Users, 
  MapPin, 
  Layers, 
  Check, 
  MessageCircle, 
  CreditCard, 
  ChevronRight, 
  HelpCircle,
  ShieldCheck,
  DollarSign
} from 'lucide-react';

interface QuoteCalculatorProps {
  onOpenMpesaModal: (pkgName?: string, amount?: number) => void;
  prefillEventType?: string;
  prefillVenue?: string;
}

const EVENT_TYPES = [
  { id: 'wedding', label: 'Luxury Wedding', baseKES: 480000, icon: '💍' },
  { id: 'corporate', label: 'Corporate Gala / Summit', baseKES: 650000, icon: '🏢' },
  { id: 'private', label: 'Milestone Soirée / Birthday', baseKES: 400000, icon: '✨' },
  { id: 'infrastructure', label: 'Clear Marquee & Tech Hire', baseKES: 550000, icon: '⛺' },
  { id: 'diplomatic', label: 'State & Diplomatic Banquet', baseKES: 950000, icon: '🏛️' },
];

const REGIONS = [
  'Nairobi Metropolitan (Karen, Westlands, Gigiri)',
  'Mombasa & Diani Swahili Coast',
  'Naivasha & Nakuru (Rift Valley)',
  'Kisumu & Western Lake Region',
  'Mount Kenya & Nanyuki Highlands',
  'Other Regional County in Kenya',
];

const INFRASTRUCTURE_OPTIONS = [
  { id: 'clear_marquee', label: 'German Clear-Span Dome Marquee', addKES: 350000, desc: 'Weather-tight transparent PVC roof & walling' },
  { id: 'chandeliers', label: 'Crystal Chandeliers & Overhead Canopies', addKES: 180000, desc: 'DMX automated dimming & suspended fairy drops' },
  { id: 'audio_array', label: 'Concert Line-Array Audio & Speech Mics', addKES: 150000, desc: 'L-Acoustics / RCF speech clarity & live band rig' },
  { id: 'led_wall', label: 'Curved P3.9 High-Refresh LED Video Wall', addKES: 220000, desc: 'Ultra-HD cinematic backdrop for speeches & media' },
  { id: 'vip_lounge', label: 'Royal Velvet & Gold Lounge Furniture', addKES: 160000, desc: 'Chesterfield couches, marble tables & Phoenix chairs' },
  { id: 'generators', label: 'Dual Synchronized Silent Generator Banks', addKES: 95000, desc: '100% uninterrupted power redundancy' },
];

const BUDGET_RANGES = [
  'KES 450,000 – KES 850,000',
  'KES 850,000 – KES 1,800,000',
  'KES 1,800,000 – KES 4,500,000',
  'KES 4,500,000+ (Ultra-Luxury / Mega Production)',
];

export default function QuoteCalculator({
  onOpenMpesaModal,
  prefillEventType,
  prefillVenue,
}: QuoteCalculatorProps) {
  const [selectedEventType, setSelectedEventType] = useState('wedding');
  const [eventDate, setEventDate] = useState('');
  const [guestCount, setGuestCount] = useState(250);
  const [selectedRegion, setSelectedRegion] = useState(REGIONS[0]);
  const [venueName, setVenueName] = useState(prefillVenue || '');
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'clear_marquee',
    'chandeliers',
    'audio_array',
    'generators',
  ]);
  const [selectedBudget, setSelectedBudget] = useState(BUDGET_RANGES[1]);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');

  // Handle prefill props if passed from Portfolio
  useEffect(() => {
    if (prefillEventType) {
      const match = EVENT_TYPES.find((t) =>
        t.label.toLowerCase().includes(prefillEventType.toLowerCase())
      );
      if (match) setSelectedEventType(match.id);
    }
    if (prefillVenue) {
      setVenueName(prefillVenue);
    }
  }, [prefillEventType, prefillVenue]);

  // Calculate live estimate
  const currentBase = EVENT_TYPES.find((t) => t.id === selectedEventType)?.baseKES || 480000;
  const guestFactor = Math.max(1, guestCount / 100);
  const infrastructureAddon = selectedServices.reduce((sum, serviceId) => {
    const opt = INFRASTRUCTURE_OPTIONS.find((o) => o.id === serviceId);
    return sum + (opt ? opt.addKES : 0);
  }, 0);

  const estimatedTotalKES = Math.round((currentBase * (1 + (guestFactor - 1) * 0.35) + infrastructureAddon) / 10000) * 10000;
  const deposit40Pct = Math.round(estimatedTotalKES * 0.4);

  const toggleService = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(selectedServices.filter((s) => s !== serviceId));
    } else {
      setSelectedServices([...selectedServices, serviceId]);
    }
  };

  // Build formatted WhatsApp message
  const handleWhatsAppQuote = () => {
    const eventTypeObj = EVENT_TYPES.find((t) => t.id === selectedEventType);
    const serviceLabels = selectedServices
      .map((id) => INFRASTRUCTURE_OPTIONS.find((o) => o.id === id)?.label)
      .filter(Boolean)
      .join(', ');

    const text = `*New Event Quotation Request — Silver Sky Events*\n` +
      `--------------------------------------\n` +
      `*Client:* ${clientName || 'Valued Client'}\n` +
      `*Phone:* ${clientPhone || 'Not provided'}\n` +
      `*Event Type:* ${eventTypeObj?.label}\n` +
      `*Target Date:* ${eventDate || 'Tentative (2026/2027)'}\n` +
      `*Estimated Guests:* ${guestCount} Guests\n` +
      `*Region / County:* ${selectedRegion}\n` +
      `*Proposed Venue:* ${venueName || 'To Be Finalized'}\n` +
      `*Services Requested:* ${serviceLabels || 'Custom package'}\n` +
      `*Budget Bracket:* ${selectedBudget}\n` +
      `*Estimated Cost:* KES ${estimatedTotalKES.toLocaleString()} (Deposit: KES ${deposit40Pct.toLocaleString()})\n` +
      `*Special Notes:* ${specialNotes || 'None'}\n` +
      `--------------------------------------\n` +
      `Please provide formal date availability and full itemized rate card.`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/254700123456?text=${encoded}`, '_blank');
  };

  return (
    <section id="quote-estimator" className="relative py-24 bg-[#060e28] overflow-hidden">
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Calculator className="w-3.5 h-3.5 text-amber-400" />
            <span>Fast, Structured Event Cost Estimator</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Design Your Event &{' '}
            <span className="text-gold-gradient italic font-normal">Calculate Live Quote</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Eliminate guesswork. Configure dates, guests, infrastructure, and styling in seconds to get an instant realistic estimate and fast WhatsApp routing.
          </p>
        </div>

        {/* Form Container Grid: 2 Columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form Wizard (7 cols) */}
          <div className="lg:col-span-7 glass-royal-card rounded-2xl p-6 sm:p-8 border border-blue-500/20 space-y-8">
            
            {/* Step 1: Event Type */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-400">
                1. Select Event Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {EVENT_TYPES.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedEventType(type.id)}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      selectedEventType === type.id
                        ? 'bg-blue-600/30 border-amber-400 text-white shadow-lg shadow-blue-900/40'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xl mb-1">{type.icon}</span>
                    <span className="text-xs font-semibold leading-tight">{type.label}</span>
                    <span className="text-[10px] text-slate-400 mt-1">From KES {(type.baseKES / 1000).toFixed(0)}k</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Date & Guest Count */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>2. Target Event Date</span>
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                />
                <span className="text-[10px] text-slate-400">Tentative dates can be adjusted later.</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    <span>3. Guests ({guestCount})</span>
                  </label>
                  <span className="text-xs font-mono font-bold text-amber-300 px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">
                    {guestCount} Pax
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="2000"
                  step="25"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full accent-amber-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>50 Guests</span>
                  <span>500</span>
                  <span>1,000</span>
                  <span>2,000+</span>
                </div>
              </div>
            </div>

            {/* Step 3: Region & Venue */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>4. Regional Hub</span>
                </label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  {REGIONS.map((r) => (
                    <option key={r} value={r} className="bg-slate-900 text-white">
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-400">
                  5. Proposed Venue Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Windsor Golf, Private Lawn, Enashipai..."
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Step 4: Required Infrastructure & Styling Items */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>6. Required Infrastructure & Production Items</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {INFRASTRUCTURE_OPTIONS.map((opt) => {
                  const isChecked = selectedServices.includes(opt.id);
                  return (
                    <div
                      key={opt.id}
                      onClick={() => toggleService(opt.id)}
                      className={`p-3 rounded-xl border cursor-pointer flex items-start gap-3 transition-all ${
                        isChecked
                          ? 'bg-blue-900/40 border-amber-400 text-white'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                          isChecked
                            ? 'bg-amber-400 border-amber-400 text-slate-950'
                            : 'border-slate-600 bg-transparent'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div className="text-xs">
                        <div className="font-semibold text-white">{opt.label}</div>
                        <div className="text-[11px] text-slate-400">{opt.desc}</div>
                        <div className="text-[10px] text-amber-300 font-mono mt-0.5">
                          + KES {opt.addKES.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Target Budget Bracket */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-400">
                7. Anticipated Overall Budget Bracket
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {BUDGET_RANGES.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setSelectedBudget(b)}
                    className={`p-2.5 rounded-lg border text-center text-[11px] font-semibold transition-all ${
                      selectedBudget === b
                        ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 6: Client Contact Details */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-400">
                8. Your Details for Direct Routing
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                />
                <input
                  type="tel"
                  placeholder="Phone / WhatsApp (e.g. 0712...)"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <textarea
                rows={2}
                placeholder="Any specific design vision, floral preferences, or dietary/staging notes..."
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400 placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Right Column: Live Breakdown & CRO Summary Card (5 cols) */}
          <div className="lg:col-span-5 sticky top-24 space-y-6">
            <div className="glass-candlelight rounded-2xl p-6 sm:p-7 border border-amber-500/30 space-y-6 relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-amber-500/20">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="font-serif-luxury text-lg font-bold text-white">
                    Quotation Summary
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  Instant Estimate
                </span>
              </div>

              {/* Itemized Overview */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Selected Event:</span>
                  <span className="font-semibold text-white">
                    {EVENT_TYPES.find((t) => t.id === selectedEventType)?.label}
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Guest Capacity:</span>
                  <span className="font-semibold text-white">{guestCount} Guests</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Target Date:</span>
                  <span className="font-semibold text-white">{eventDate || 'Pending Selection'}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Location Hub:</span>
                  <span className="font-semibold text-white truncate max-w-[200px]">
                    {venueName ? `${venueName} (${selectedRegion.split(' ')[0]})` : selectedRegion.split(' ')[0]}
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Add-on Items:</span>
                  <span className="font-semibold text-amber-300">{selectedServices.length} Selected</span>
                </div>
              </div>

              {/* Total Calculation Display */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/20 space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                    Estimated Production
                  </span>
                  <span className="font-serif-luxury text-2xl sm:text-3xl font-bold text-gold-gradient">
                    KES {estimatedTotalKES.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-[11px] text-slate-300 pt-1 border-t border-slate-800">
                  <span>Standard 40% Date Hold Deposit:</span>
                  <span className="font-semibold text-emerald-400">
                    KES {deposit40Pct.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* High-Converting CTA Triggers */}
              <div className="space-y-3 pt-2">
                {/* 1-Tap WhatsApp Dispatch Button */}
                <button
                  type="button"
                  onClick={handleWhatsAppQuote}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-emerald-900/40 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Send Quote via WhatsApp Instantly</span>
                </button>

                {/* Direct M-Pesa Deposit Button */}
                <button
                  type="button"
                  onClick={() =>
                    onOpenMpesaModal(
                      `${EVENT_TYPES.find((t) => t.id === selectedEventType)?.label} (${guestCount} Pax)`,
                      deposit40Pct
                    )
                  }
                  className="w-full py-3 px-4 rounded-xl bg-blue-950/80 hover:bg-blue-900 text-blue-200 border border-blue-500/30 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  <span>Lock Date with M-Pesa Deposit (KES {deposit40Pct.toLocaleString()})</span>
                </button>
              </div>

              <div className="pt-2 flex items-center justify-center gap-2 text-[10px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Zero obligation • All quotes confirmed in writing within 15 minutes</span>
              </div>
            </div>

            {/* Quick Consultation Call Box */}
            <div className="p-4 rounded-xl glass-sapphire border border-blue-500/20 flex items-center justify-between text-xs text-slate-300">
              <div>
                <div className="font-semibold text-white">Prefer to talk directly?</div>
                <div className="text-[11px] text-slate-400">Our Senior Production Directors are on standby.</div>
              </div>
              <a
                href="tel:+254700123456"
                className="px-3 py-1.5 rounded-lg bg-amber-400/10 text-amber-300 border border-amber-400/30 hover:bg-amber-400 hover:text-slate-950 font-bold text-xs transition-all"
              >
                Call Now
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
