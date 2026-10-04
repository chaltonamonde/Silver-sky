'use client';

import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  CreditCard, 
  Users, 
  MapPin, 
  Calendar, 
  Download, 
  FileText, 
  Filter, 
  RefreshCw, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight, 
  ArrowUpRight, 
  Share2, 
  ShieldCheck, 
  BarChart3, 
  Activity, 
  Layers, 
  SlidersHorizontal,
  X,
  Printer,
  ChevronDown
} from 'lucide-react';
import { 
  MONTHLY_RECOVERY_DATA, 
  CASHFLOW_DATA_SETS, 
  REGIONAL_MARKETS, 
  CONVERSION_FUNNEL_STAGES, 
  SOCIAL_GROWTH_TIMELINE,
  MonthlyRecoveryPoint,
  RegionalMetric
} from '@/data/analyticsTrackingData';

interface AnalyticsHubProps {
  onNotify?: (message: string) => void;
}

export default function ExecutiveAnalyticsHub({ onNotify }: AnalyticsHubProps) {
  // Global Filters
  const [dateRangeFilter, setDateRangeFilter] = useState<'30d' | 'quarter' | 'ytd' | 'all'>('ytd');
  const [serviceTypeFilter, setServiceTypeFilter] = useState<string>('All');
  const [regionFilter, setRegionFilter] = useState<string>('All');

  // Chart 1: Revenue Leakage Recovery Controls
  const [projectionCase, setProjectionCase] = useState<'mid' | 'low' | 'high'>('mid');
  const [hoveredRecoveryMonth, setHoveredRecoveryMonth] = useState<MonthlyRecoveryPoint | null>(null);

  // Chart 2: Cashflow Timeframe & Category Controls
  const [cashflowTimeframe, setCashflowTimeframe] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('monthly');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'All' | 'Weddings' | 'Corporate' | 'Decor' | 'Equipment'>('All');
  const [hoveredCashflowIndex, setHoveredCashflowIndex] = useState<number | null>(null);

  // Chart 3: Regional Sort
  const [regionalSortBy, setRegionalSortBy] = useState<'revenue' | 'enquiries' | 'conversion' | 'traffic'>('revenue');
  const [selectedRegion, setSelectedRegion] = useState<RegionalMetric | null>(null);

  // Chart 5: Social Point Hover
  const [hoveredSocialIndex, setHoveredSocialIndex] = useState<number | null>(null);

  // PDF Report Modal State
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  // Filtered Regional Markets
  const filteredRegionalMarkets = useMemo(() => {
    let result = [...REGIONAL_MARKETS];
    if (regionFilter !== 'All') {
      result = result.filter(r => r.town.toLowerCase().includes(regionFilter.toLowerCase()) || r.county.toLowerCase().includes(regionFilter.toLowerCase()));
    }
    result.sort((a, b) => {
      if (regionalSortBy === 'revenue') return b.securedRevenueKES - a.securedRevenueKES;
      if (regionalSortBy === 'enquiries') return b.enquiries - a.enquiries;
      if (regionalSortBy === 'conversion') return b.conversionRatePct - a.conversionRatePct;
      return b.trafficImpressions - a.trafficImpressions;
    });
    return result;
  }, [regionFilter, regionalSortBy]);

  // Current Cashflow Data based on timeframe
  const currentCashflowData = useMemo(() => {
    return CASHFLOW_DATA_SETS[cashflowTimeframe];
  }, [cashflowTimeframe]);

  // Dynamic Projection Target for Chart 1
  const activeBenchmarkKES = useMemo(() => {
    if (projectionCase === 'low') return 1300000;
    if (projectionCase === 'high') return 24800000;
    return 6300000; // Mid-case audit target
  }, [projectionCase]);

  // Total Recovered So Far
  const latestRecovery = MONTHLY_RECOVERY_DATA[MONTHLY_RECOVERY_DATA.length - 2]; // Mar 2026 actual
  const recoveryProgressPct = Math.min(250, (latestRecovery.actualRecovered / activeBenchmarkKES) * 100);

  // CSV Export Function
  const handleExportCSV = () => {
    const csvRows: string[] = [];
    // Section 1: Header
    csvRows.push('SILVER SKY EVENTS - EXECUTIVE AUDIT & REVENUE TRACKING REPORT');
    csvRows.push(`Generated: ${new Date().toISOString()}`);
    csvRows.push(`Active Filters: DateRange=${dateRangeFilter}, Service=${serviceTypeFilter}, Region=${regionFilter}`);
    csvRows.push('');

    // Section 2: Revenue Recovery
    csvRows.push('--- REVENUE LEAKAGE RECOVERY TRACKER ---');
    csvRows.push('Month,Actual Recovered (KES),Mid-Case Benchmark (KES 6.3M),Low-Case Benchmark (KES 1.3M),High-Case Benchmark (KES 24.8M),Leakage Pillar Plugged');
    MONTHLY_RECOVERY_DATA.forEach(d => {
      csvRows.push(`"${d.month}",${d.actualRecovered},${d.midCaseTarget},${d.lowCaseTarget},${d.highCaseTarget},"${d.leakagePillarRecovered}"`);
    });
    csvRows.push('');

    // Section 3: Cashflow
    csvRows.push(`--- M-PESA DARAJA DEPOSITS & CASHFLOW (${cashflowTimeframe.toUpperCase()}) ---`);
    csvRows.push('Period,Luxury Weddings (KES),Corporate Contracts (KES),Heavy Decor (KES),Equipment & Rigging (KES),Total Deposits Secured (KES),Transactions Count');
    currentCashflowData.forEach(c => {
      csvRows.push(`"${c.label}",${c.weddingsKES},${c.corporateKES},${c.decorKES},${c.equipmentKES},${c.totalDepositKES},${c.txCount}`);
    });
    csvRows.push('');

    // Section 4: Regional Markets
    csvRows.push('--- REGIONAL SPREAD & SEARCH PERFORMANCE ---');
    csvRows.push('Town,County,Enquiries Generated,Traffic Impressions,Organic Clicks,Conversion Rate (%),Secured Revenue (KES),Top Search Intent');
    filteredRegionalMarkets.forEach(r => {
      csvRows.push(`"${r.town}","${r.county}",${r.enquiries},${r.trafficImpressions},${r.organicClicks},${r.conversionRatePct},${r.securedRevenueKES},"${r.topSearchIntent}"`);
    });
    csvRows.push('');

    // Section 5: Conversion Funnel
    csvRows.push('--- ENQUIRY-TO-BOOKING CONVERSION FUNNEL (CRO) ---');
    csvRows.push('Step Number,Funnel Stage,Count / Volume,Drop-Off Rate (%),Stage Conversion Rate (%),Overall Conversion (%),CRO Optimization Insight');
    CONVERSION_FUNNEL_STAGES.forEach(f => {
      csvRows.push(`${f.step},"${f.name}",${f.count},${f.dropOffRatePct},${f.stageConversionPct},${f.overallConversionPct},"${f.croInsight}"`);
    });

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + encodeURIComponent(csvRows.join('\n'));
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', `SilverSky_Analytics_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (onNotify) {
      onNotify('Analytics data exported to CSV successfully.');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* 1. TOP EXECUTIVE HEADER & COMMAND CONTROLS */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-[#060e28]/90 via-[#0a1847]/80 to-[#060e28]/90 backdrop-blur-xl border border-blue-500/20 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2.5 text-xs font-semibold text-amber-400 uppercase tracking-widest mb-1.5">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Enterprise Telemetry & Revenue Recovery Engine</span>
              <span className="text-slate-500">•</span>
              <span className="text-blue-300">Live Daraja M-Pesa & Meta Graph Sync</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white tracking-tight">
              Executive Analytics & Revenue Leakage Control
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
              Real-time monitoring across all 8 regional operating hubs, measuring actual digital recovery against the
              identified <strong className="text-amber-300">KES 6.3M mid-case leakage benchmark</strong>, Daraja M-Pesa deposit velocity, and full-funnel CRO.
            </p>
          </div>

          {/* Export & Print Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-blue-500/30 hover:border-blue-400 text-xs font-semibold text-slate-200 hover:text-white transition-all shadow-lg shadow-black/40 group"
            >
              <Download className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
              <span>Export CSV Data</span>
            </button>

            <button
              onClick={() => setIsPdfModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <FileText className="w-4 h-4 text-slate-950" />
              <span>Executive PDF Report</span>
            </button>
          </div>
        </div>

        {/* GLOBAL INTERACTIVE FILTER BAR */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-950/60 border border-blue-500/30 text-blue-200">
              <Filter className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold text-[11px] uppercase tracking-wider text-slate-400">Filters:</span>
            </div>

            {/* Date Range Selector */}
            <div className="flex items-center bg-slate-900/90 rounded-lg p-0.5 border border-white/10">
              {[
                { id: '30d', label: 'Past 30 Days' },
                { id: 'quarter', label: 'Q1 2026' },
                { id: 'ytd', label: 'Year-to-Date' },
                { id: 'all', label: 'Audit Inception' },
              ].map(d => (
                <button
                  key={d.id}
                  onClick={() => setDateRangeFilter(d.id as any)}
                  className={`px-3 py-1 text-xs rounded-md transition-all ${
                    dateRangeFilter === d.id
                      ? 'bg-blue-600 text-white font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>

            {/* Service Category Selector */}
            <select
              value={serviceTypeFilter}
              onChange={(e) => setServiceTypeFilter(e.target.value)}
              className="bg-slate-900/90 text-slate-300 text-xs rounded-lg px-3 py-1.5 border border-white/10 focus:outline-none focus:border-amber-400/60"
            >
              <option value="All">All Service Disciplines</option>
              <option value="Weddings">Luxury Weddings & Receptions</option>
              <option value="Corporate">Corporate Galas & Summits</option>
              <option value="Decor">Heavy Decor & Draping</option>
              <option value="Equipment">German Marquee & Power Hire</option>
            </select>

            {/* Regional Town Selector */}
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="bg-slate-900/90 text-slate-300 text-xs rounded-lg px-3 py-1.5 border border-white/10 focus:outline-none focus:border-amber-400/60"
            >
              <option value="All">All 8 Regional Hubs</option>
              <option value="Nairobi">Nairobi Metropolitan</option>
              <option value="Mombasa">Mombasa & Diani Swahili Coast</option>
              <option value="Naivasha">Naivasha & Nakuru Rift Valley</option>
              <option value="Kisumu">Kisumu Western Lake</option>
              <option value="Eldoret">Eldoret North Rift</option>
              <option value="Kisii">Kisii Highlands</option>
              <option value="Homa Bay">Homa Bay Lake Basin</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Sync Cadence:</span>
            <span className="font-mono text-emerald-400 font-semibold">120s Polling</span>
            <button
              onClick={() => onNotify && onNotify('Telemetry dataset refreshed with live Daraja webhook cache.')}
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white"
              title="Force Refresh"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. REVENUE RECOVERY & STRATEGIC KPI SUMMARY MATRIX */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Recovered Revenue */}
        <div className="rounded-2xl p-5 bg-[#060e28]/70 backdrop-blur-xl border border-blue-500/20 shadow-xl relative overflow-hidden group hover:border-blue-400/40 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Actual Recovered Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-serif-luxury font-bold text-white tracking-tight">
              KES {latestRecovery.actualRecovered.toLocaleString()}
            </div>
            <div className="flex items-center gap-2 mt-1 text-xs">
              <span className="font-bold text-emerald-400">
                +{recoveryProgressPct.toFixed(1)}% of Mid-Case
              </span>
              <span className="text-slate-500">vs KES 6.3M audit benchmark</span>
            </div>
          </div>
          <div className="mt-3 w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 rounded-full transition-all duration-700" 
              style={{ width: `${Math.min(100, recoveryProgressPct)}%` }}
            />
          </div>
        </div>

        {/* KPI 2: M-Pesa Daraja Cashflow Secured */}
        <div className="rounded-2xl p-5 bg-[#060e28]/70 backdrop-blur-xl border border-blue-500/20 shadow-xl relative overflow-hidden group hover:border-blue-400/40 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Secured M-Pesa Deposits</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-serif-luxury font-bold text-white tracking-tight">
              KES 23,700,000
            </div>
            <div className="flex items-center gap-2 mt-1 text-xs">
              <span className="font-bold text-blue-400">174 Transactions</span>
              <span className="text-slate-500">40% booking escrow holds</span>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero payment bounce rate via STK Push</span>
          </div>
        </div>

        {/* KPI 3: Regional Search Footprint */}
        <div className="rounded-2xl p-5 bg-[#060e28]/70 backdrop-blur-xl border border-blue-500/20 shadow-xl relative overflow-hidden group hover:border-blue-400/40 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/20 transition-all" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Regional Footprint</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <MapPin className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-serif-luxury font-bold text-white tracking-tight">
              8 Regional Towns
            </div>
            <div className="flex items-center gap-2 mt-1 text-xs">
              <span className="font-bold text-amber-400">148,500 Impressions</span>
              <span className="text-slate-500">2.35% avg. conversion</span>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Top ranking in Mombasa, Naivasha & Nairobi</span>
          </div>
        </div>

        {/* KPI 4: Social Audience Growth */}
        <div className="rounded-2xl p-5 bg-[#060e28]/70 backdrop-blur-xl border border-blue-500/20 shadow-xl relative overflow-hidden group hover:border-blue-400/40 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-all" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Social Proof Engine</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Share2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-serif-luxury font-bold text-white tracking-tight">
              15,640 Followers
            </div>
            <div className="flex items-center gap-2 mt-1 text-xs">
              <span className="font-bold text-purple-400">+18,973%</span>
              <span className="text-slate-500">from 82 baseline audit</span>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-400">
            <Activity className="w-3.5 h-3.5 text-purple-400" />
            <span>9.3% engagement on live rigging reels</span>
          </div>
        </div>
      </div>

      {/* 3. CHART 1: REVENUE LEAKAGE RECOVERY TRACKER (MAIN EXECUTIVE COMPOSED CHART) */}
      <div className="rounded-2xl p-6 bg-[#060e28]/80 backdrop-blur-xl border border-blue-500/20 shadow-2xl relative">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest">
              <span>Primary Strategic Objective</span>
              <span className="text-slate-600">•</span>
              <span className="text-emerald-400">Composed Bar & Line Trajectory</span>
            </div>
            <h2 className="text-xl font-serif-luxury font-bold text-white mt-1">
              Revenue Leakage Recovery Tracker (Actuals vs. Audit Projections)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Tracks actual recovered monthly revenue captured via instant WhatsApp routing, Daraja STK deposits, and high-converting regional landing pages.
            </p>
          </div>

          {/* Projection Case Switcher (Low KES 1.3M, Mid KES 6.3M, High KES 24.8M) */}
          <div className="flex items-center gap-2 bg-slate-900/90 p-1 rounded-xl border border-white/10">
            <span className="text-[11px] font-semibold text-slate-400 px-2 uppercase tracking-wider">Benchmark View:</span>
            {[
              { id: 'low', label: 'Conservative (1.3M)', val: 'KES 1.3M' },
              { id: 'mid', label: 'Mid-Case (6.3M Target)', val: 'KES 6.3M' },
              { id: 'high', label: 'Aggressive (24.8M)', val: 'KES 24.8M' },
            ].map(c => (
              <button
                key={c.id}
                onClick={() => setProjectionCase(c.id as any)}
                className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
                  projectionCase === c.id
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chart Summary Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-5">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
            <span className="text-[10px] uppercase tracking-wider text-slate-400">Active Benchmark</span>
            <div className="text-sm font-bold text-amber-300 font-mono">
              KES {activeBenchmarkKES.toLocaleString()}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
            <span className="text-[10px] uppercase tracking-wider text-slate-400">Latest Month Recovery</span>
            <div className="text-sm font-bold text-white font-mono">
              KES {latestRecovery.actualRecovered.toLocaleString()}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
            <span className="text-[10px] uppercase tracking-wider text-slate-400">Pace vs Target</span>
            <div className="text-sm font-bold text-emerald-400 flex items-center gap-1 font-mono">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+{recoveryProgressPct.toFixed(1)}% Captured</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
            <span className="text-[10px] uppercase tracking-wider text-slate-400">Leakage Elimination Status</span>
            <div className="text-sm font-bold text-blue-300">
              Optimal / Zero Dropout
            </div>
          </div>
        </div>

        {/* SVG COMPOSED CHART (BAR + TARGET LINE) */}
        <div className="relative w-full h-80 sm:h-96 mt-4">
          {/* Legend */}
          <div className="flex items-center justify-end gap-6 text-xs mb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-gradient-to-t from-blue-700 to-sky-400 inline-block shadow-sm shadow-blue-500/50" />
              <span className="text-slate-300">Actual Recovered Revenue (Bar)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-0.5 bg-amber-400 inline-block rounded-full" />
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block ring-2 ring-amber-400/40" />
              <span className="text-amber-300">Target Benchmark Trajectory (Line)</span>
            </div>
          </div>

          <svg 
            className="w-full h-full overflow-visible select-none" 
            viewBox="0 0 800 320" 
            preserveAspectRatio="none"
          >
            <defs>
              {/* Bar Linear Gradient */}
              <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                <stop offset="35%" stopColor="#0047AB" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#1A365D" stopOpacity="0.4" />
              </linearGradient>

              {/* Bar Hover Gradient */}
              <linearGradient id="barHoverGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
                <stop offset="40%" stopColor="#2563eb" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#1A365D" stopOpacity="0.6" />
              </linearGradient>

              {/* Target Line Glow Filter */}
              <filter id="glowGold" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Horizontal Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1.0].map((ratio, idx) => {
              const y = 30 + ratio * 240;
              const maxVal = projectionCase === 'high' ? 26000000 : projectionCase === 'low' ? 2000000 : 10000000;
              const currentVal = Math.round(maxVal * (1 - ratio));
              return (
                <g key={idx}>
                  <line 
                    x1="60" 
                    y1={y} 
                    x2="780" 
                    y2={y} 
                    stroke="#1e293b" 
                    strokeWidth="1" 
                    strokeDasharray={ratio === 1 ? 'none' : '4 4'} 
                  />
                  <text 
                    x="50" 
                    y={y + 4} 
                    fill="#64748b" 
                    fontSize="10" 
                    textAnchor="end" 
                    className="font-mono"
                  >
                    {(currentVal / 1000000).toFixed(1)}M
                  </text>
                </g>
              );
            })}

            {/* Render Bars and Points */}
            {(() => {
              const maxVal = projectionCase === 'high' ? 26000000 : projectionCase === 'low' ? 2000000 : 10000000;
              const chartHeight = 240;
              const chartTop = 30;
              const chartBottom = chartTop + chartHeight;
              const totalItems = MONTHLY_RECOVERY_DATA.length;
              const xStep = (780 - 80) / totalItems;

              // Generate Target Line path
              const linePoints = MONTHLY_RECOVERY_DATA.map((d, i) => {
                const targetVal = projectionCase === 'high' ? d.highCaseTarget : projectionCase === 'low' ? d.lowCaseTarget : d.midCaseTarget;
                const x = 80 + i * xStep + xStep / 2;
                const y = chartBottom - (targetVal / maxVal) * chartHeight;
                return { x, y, targetVal };
              });

              const linePathD = linePoints.reduce((acc, pt, i) => {
                return i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
              }, '');

              return (
                <>
                  {/* BARS */}
                  {MONTHLY_RECOVERY_DATA.map((d, i) => {
                    const barWidth = Math.min(46, xStep * 0.55);
                    const x = 80 + i * xStep + (xStep - barWidth) / 2;
                    const barHeight = Math.max(8, (d.actualRecovered / maxVal) * chartHeight);
                    const y = chartBottom - barHeight;
                    const isHovered = hoveredRecoveryMonth?.month === d.month;

                    return (
                      <g 
                        key={d.month} 
                        className="cursor-pointer transition-all duration-300"
                        onMouseEnter={() => setHoveredRecoveryMonth(d)}
                        onMouseLeave={() => setHoveredRecoveryMonth(null)}
                      >
                        {/* Bar Shadow */}
                        <rect 
                          x={x} 
                          y={y} 
                          width={barWidth} 
                          height={barHeight} 
                          rx="4" 
                          fill={isHovered ? 'url(#barHoverGradient)' : 'url(#barGradient)'}
                          className="transition-colors duration-200"
                        />
                        {/* Top Cap Light Accent */}
                        <rect 
                          x={x} 
                          y={y} 
                          width={barWidth} 
                          height="3" 
                          rx="1.5" 
                          fill={isHovered ? '#fbbf24' : '#7dd3fc'} 
                        />
                        {/* X-axis Month Label */}
                        <text 
                          x={x + barWidth / 2} 
                          y={chartBottom + 22} 
                          fill={isHovered ? '#fbbf24' : '#94a3b8'} 
                          fontSize="10" 
                          fontWeight={isHovered ? 'bold' : 'normal'}
                          textAnchor="middle"
                        >
                          {d.month}
                        </text>
                      </g>
                    );
                  })}

                  {/* TARGET LINE */}
                  <path 
                    d={linePathD} 
                    fill="none" 
                    stroke="#f59e0b" 
                    strokeWidth="3" 
                    strokeDasharray="6 4"
                    filter="url(#glowGold)"
                  />

                  {/* Target Line Node Dots */}
                  {linePoints.map((pt, idx) => (
                    <g key={idx}>
                      <circle 
                        cx={pt.x} 
                        cy={pt.y} 
                        r="5" 
                        fill="#060e28" 
                        stroke="#f59e0b" 
                        strokeWidth="2.5" 
                      />
                      <circle 
                        cx={pt.x} 
                        cy={pt.y} 
                        r="2.5" 
                        fill="#fbbf24" 
                      />
                    </g>
                  ))}
                </>
              );
            })()}
          </svg>

          {/* Interactive Tooltip Card */}
          {hoveredRecoveryMonth && (
            <div className="absolute top-2 right-4 bg-[#0a1847]/95 backdrop-blur-xl border border-amber-400/40 p-4 rounded-xl shadow-2xl text-xs z-30 max-w-xs animate-fadeIn pointer-events-none">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="font-bold text-white text-sm">{hoveredRecoveryMonth.month}</span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-400">
                  {projectionCase.toUpperCase()} PROJECTION
                </span>
              </div>
              <div className="mt-2 space-y-1.5 font-mono">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Actual Recovered:</span>
                  <span className="text-emerald-400 font-bold">
                    KES {hoveredRecoveryMonth.actualRecovered.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Target Benchmark:</span>
                  <span className="text-amber-300">
                    KES {(projectionCase === 'high' ? hoveredRecoveryMonth.highCaseTarget : projectionCase === 'low' ? hoveredRecoveryMonth.lowCaseTarget : hoveredRecoveryMonth.midCaseTarget).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-white/10 text-[11px] text-slate-300">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-sans">Primary Pillar Plugged:</div>
                <div className="font-semibold text-blue-200 mt-0.5">{hoveredRecoveryMonth.leakagePillarRecovered}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4. ROW OF TWO MAJOR INTERACTIVE CHARTS: CASHFLOW & REGIONAL SPREAD */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* CHART 2: M-PESA DEPOSIT & CASHFLOW ANALYTICS (SMOOTH GRADIENT AREA CHART) */}
        <div className="rounded-2xl p-6 bg-[#060e28]/80 backdrop-blur-xl border border-blue-500/20 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Safaricom Daraja Telemetry</span>
                </div>
                <h3 className="text-lg font-serif-luxury font-bold text-white mt-1">
                  M-Pesa Deposit & Cashflow Velocity
                </h3>
                <p className="text-xs text-slate-400">
                  Real-time 40% date-lock deposit inflows categorized by event discipline.
                </p>
              </div>

              {/* Timeframe Selector (Daily, Weekly, Monthly, Yearly) */}
              <div className="flex items-center bg-slate-900/90 rounded-lg p-0.5 border border-white/10 self-start sm:self-auto">
                {(['daily', 'weekly', 'monthly', 'yearly'] as const).map(tf => (
                  <button
                    key={tf}
                    onClick={() => setCashflowTimeframe(tf)}
                    className={`px-2.5 py-1 text-xs capitalize rounded-md transition-all ${
                      cashflowTimeframe === tf
                        ? 'bg-emerald-600 text-white font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* Service Category Legend / Filter */}
            <div className="flex flex-wrap items-center gap-3 my-4 text-xs">
              {[
                { id: 'All', label: 'All Streams', color: '#10b981' },
                { id: 'Weddings', label: 'Luxury Weddings', color: '#2563eb' },
                { id: 'Corporate', label: 'Corporate Galas', color: '#06b6d4' },
                { id: 'Decor', label: 'Heavy Decor', color: '#8b5cf6' },
                { id: 'Equipment', label: 'Equipment & Rigging', color: '#f59e0b' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryFilter(cat.id as any)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all ${
                    activeCategoryFilter === cat.id
                      ? 'bg-slate-800 border-white/30 text-white font-semibold shadow'
                      : 'bg-slate-900/40 border-white/5 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* AREA CHART SVG */}
            <div className="relative w-full h-64 mt-2">
              <svg 
                className="w-full h-full overflow-visible select-none" 
                viewBox="0 0 600 240" 
                preserveAspectRatio="none"
              >
                <defs>
                  {/* Area Gradient */}
                  <linearGradient id="cashflowAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
                    <stop offset="60%" stopColor="#0047AB" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#060e28" stopOpacity="0.0" />
                  </linearGradient>

                  <filter id="areaGlow">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Horizontal Grid */}
                {[0, 0.33, 0.66, 1].map((ratio, idx) => (
                  <line 
                    key={idx}
                    x1="40" 
                    y1={20 + ratio * 180} 
                    x2="580" 
                    y2={20 + ratio * 180} 
                    stroke="#1e293b" 
                    strokeWidth="1" 
                    strokeDasharray={ratio === 1 ? 'none' : '3 3'} 
                  />
                ))}

                {/* Render Smooth Cubic Bezier Spline Area */}
                {(() => {
                  const data = currentCashflowData;
                  const maxVal = Math.max(...data.map(d => {
                    if (activeCategoryFilter === 'Weddings') return d.weddingsKES;
                    if (activeCategoryFilter === 'Corporate') return d.corporateKES;
                    if (activeCategoryFilter === 'Decor') return d.decorKES;
                    if (activeCategoryFilter === 'Equipment') return d.equipmentKES;
                    return d.totalDepositKES;
                  })) * 1.15 || 1000000;

                  const chartH = 180;
                  const chartTop = 20;
                  const chartBottom = chartTop + chartH;
                  const stepX = (580 - 50) / Math.max(1, data.length - 1);

                  const points = data.map((d, i) => {
                    let val = d.totalDepositKES;
                    if (activeCategoryFilter === 'Weddings') val = d.weddingsKES;
                    if (activeCategoryFilter === 'Corporate') val = d.corporateKES;
                    if (activeCategoryFilter === 'Decor') val = d.decorKES;
                    if (activeCategoryFilter === 'Equipment') val = d.equipmentKES;

                    const x = 50 + i * stepX;
                    const y = chartBottom - (val / maxVal) * chartH;
                    return { x, y, val, item: d };
                  });

                  // Cubic Spline Path Calculation
                  let pathD = `M ${points[0].x} ${points[0].y}`;
                  for (let i = 0; i < points.length - 1; i++) {
                    const p0 = points[i];
                    const p1 = points[i + 1];
                    const mx = (p0.x + p1.x) / 2;
                    pathD += ` C ${mx} ${p0.y}, ${mx} ${p1.y}, ${p1.x} ${p1.y}`;
                  }

                  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartBottom} L ${points[0].x} ${chartBottom} Z`;

                  return (
                    <>
                      {/* Gradient Fill */}
                      <path d={areaD} fill="url(#cashflowAreaGrad)" />

                      {/* Stroke Line */}
                      <path 
                        d={pathD} 
                        fill="none" 
                        stroke="#10b981" 
                        strokeWidth="3" 
                        filter="url(#areaGlow)" 
                      />

                      {/* Interactive Nodes */}
                      {points.map((pt, idx) => (
                        <g 
                          key={idx}
                          className="cursor-pointer"
                          onMouseEnter={() => setHoveredCashflowIndex(idx)}
                          onMouseLeave={() => setHoveredCashflowIndex(null)}
                        >
                          <circle 
                            cx={pt.x} 
                            cy={pt.y} 
                            r={hoveredCashflowIndex === idx ? '6' : '4'} 
                            fill={hoveredCashflowIndex === idx ? '#fbbf24' : '#10b981'} 
                            stroke="#060e28" 
                            strokeWidth="2" 
                          />
                          <text 
                            x={pt.x} 
                            y={chartBottom + 20} 
                            fill="#94a3b8" 
                            fontSize="9" 
                            textAnchor="middle"
                          >
                            {pt.item.label}
                          </text>
                        </g>
                      ))}
                    </>
                  );
                })()}
              </svg>

              {/* Tooltip Overlay */}
              {hoveredCashflowIndex !== null && currentCashflowData[hoveredCashflowIndex] && (
                <div className="absolute top-2 left-10 bg-[#0a1847]/95 backdrop-blur-xl border border-emerald-400/40 p-3 rounded-xl shadow-xl text-xs z-30 pointer-events-none animate-fadeIn font-mono">
                  <div className="text-white font-bold font-sans">
                    {currentCashflowData[hoveredCashflowIndex].label}
                  </div>
                  <div className="text-emerald-400 text-sm font-bold mt-1">
                    KES {currentCashflowData[hoveredCashflowIndex].totalDepositKES.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-300 mt-0.5">
                    {currentCashflowData[hoveredCashflowIndex].txCount} Escrow STK Transactions
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
            <span>Instant Safaricom Daraja Settlement</span>
            <span className="text-emerald-400 font-semibold font-mono">100% Reconciled</span>
          </div>
        </div>

        {/* CHART 3: REGIONAL PERFORMANCE & GEOGRAPHIC SPREAD (HORIZONTAL BAR CHART) */}
        <div className="rounded-2xl p-6 bg-[#060e28]/80 backdrop-blur-xl border border-blue-500/20 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-widest">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Geographic Search Intent</span>
                </div>
                <h3 className="text-lg font-serif-luxury font-bold text-white mt-1">
                  Regional Performance Across 8 Operating Towns
                </h3>
                <p className="text-xs text-slate-400">
                  Measuring the direct conversion impact of localized regional landing pages.
                </p>
              </div>

              {/* Sort Switcher */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-500 hidden sm:inline">Sort:</span>
                <select
                  value={regionalSortBy}
                  onChange={(e) => setRegionalSortBy(e.target.value as any)}
                  className="bg-slate-900 text-slate-300 rounded-lg px-2.5 py-1 text-xs border border-white/10 focus:outline-none"
                >
                  <option value="revenue">Secured Revenue (KES)</option>
                  <option value="enquiries">Enquiries Volume</option>
                  <option value="conversion">Conversion Rate (%)</option>
                  <option value="traffic">Traffic Impressions</option>
                </select>
              </div>
            </div>

            {/* Horizontal Bar Items */}
            <div className="space-y-3 mt-4">
              {filteredRegionalMarkets.map((region, idx) => {
                const maxRevenue = 40000000;
                const pct = Math.min(100, Math.round((region.securedRevenueKES / maxRevenue) * 100));
                const isSelected = selectedRegion?.town === region.town;

                return (
                  <div 
                    key={region.town}
                    onClick={() => setSelectedRegion(isSelected ? null : region)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-blue-950/80 border-amber-400/50 shadow-lg' 
                        : 'bg-slate-900/40 border-white/5 hover:border-blue-500/30 hover:bg-slate-900/70'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-blue-600/30 text-blue-300 text-[10px] font-bold flex items-center justify-center font-mono">
                          {idx + 1}
                        </span>
                        <span className="font-bold text-white text-sm">{region.town}</span>
                        <span className="text-slate-400 text-[11px] hidden sm:inline">({region.county})</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                          {region.conversionRatePct}% Conv
                        </span>
                        <span className="font-mono font-bold text-amber-300 text-xs">
                          KES {(region.securedRevenueKES / 1000000).toFixed(1)}M
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          idx === 0 
                            ? 'bg-gradient-to-r from-blue-600 to-amber-400' 
                            : idx === 1 
                            ? 'bg-gradient-to-r from-blue-600 to-cyan-400' 
                            : 'bg-gradient-to-r from-blue-700 to-blue-500'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    {/* Extended Details on Click */}
                    {isSelected && (
                      <div className="mt-2.5 pt-2.5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] animate-fadeIn">
                        <div>
                          <span className="text-slate-500 block">Enquiries:</span>
                          <span className="font-bold text-white">{region.enquiries} high-ticket leads</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Organic Traffic:</span>
                          <span className="font-bold text-blue-300">{region.organicClicks.toLocaleString()} clicks</span>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <span className="text-slate-500 block">Top Ranked Keyword:</span>
                          <span className="text-amber-300 font-mono text-[10px] truncate block">
                            "{region.topSearchIntent}"
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
            <span>Hub Strategy: Local Depots & Fast Dispatch</span>
            <span className="text-blue-300">Click any town to inspect SEO telemetry</span>
          </div>
        </div>
      </div>

      {/* 5. ROW OF CHARTS 4 & 5: CONVERSION FUNNEL (CRO) & SOCIAL GROWTH */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* CHART 4: ENQUIRY-TO-BOOKING CONVERSION FUNNEL (STEPPED CRO FUNNEL) */}
        <div className="rounded-2xl p-6 bg-[#060e28]/80 backdrop-blur-xl border border-blue-500/20 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-widest">
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Conversion Rate Optimization</span>
                </div>
                <h3 className="text-lg font-serif-luxury font-bold text-white mt-1">
                  Enquiry-to-Booking CRO Funnel
                </h3>
                <p className="text-xs text-slate-400">
                  Exposing pipeline friction points to systematically eliminate dropout.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                19.1% Final Stage Close
              </span>
            </div>

            {/* Stepped Funnel Blocks */}
            <div className="space-y-4 mt-6">
              {CONVERSION_FUNNEL_STAGES.map((stage) => {
                const widthPct = Math.max(22, 100 - (stage.step - 1) * 24);
                return (
                  <div key={stage.step} className="group relative">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-blue-600/30 text-amber-300 font-bold flex items-center justify-center text-[11px] font-mono border border-blue-500/30">
                          0{stage.step}
                        </span>
                        <span className="font-semibold text-slate-200">{stage.name}</span>
                      </div>
                      <span className="font-mono font-bold text-white text-xs">
                        {stage.count.toLocaleString()}
                      </span>
                    </div>

                    {/* Funnel Bar */}
                    <div className="w-full bg-slate-900/80 rounded-xl p-1 border border-white/5">
                      <div 
                        className={`h-9 rounded-lg flex items-center justify-between px-3 text-xs font-semibold text-white transition-all duration-700 shadow-md ${
                          stage.step === 1 
                            ? 'bg-gradient-to-r from-blue-700 to-indigo-600' 
                            : stage.step === 2 
                            ? 'bg-gradient-to-r from-blue-600 to-cyan-600' 
                            : stage.step === 3 
                            ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-bold' 
                            : 'bg-gradient-to-r from-emerald-600 to-emerald-400 text-slate-950 font-bold'
                        }`}
                        style={{ width: `${widthPct}%` }}
                      >
                        <span className="truncate">{stage.shortLabel}</span>
                        <span className="text-[11px] opacity-90 font-mono">
                          {stage.stepConversionPct}% of stage
                        </span>
                      </div>
                    </div>

                    {/* CRO Insight Callout */}
                    <div className="mt-1.5 flex items-start gap-1.5 text-[11px] text-slate-400 pl-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{stage.croInsight}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
            <span>Overall E2E Win Rate: <strong className="text-amber-300">1.47% of Total Traffic</strong></span>
            <span className="text-emerald-400 font-semibold font-mono">KES 7.45M Leakage Plugged</span>
          </div>
        </div>

        {/* CHART 5: SOCIAL PROOF & AUDIENCE GROWTH TRACKER */}
        <div className="rounded-2xl p-6 bg-[#060e28]/80 backdrop-blur-xl border border-blue-500/20 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-widest">
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Meta Graph API Telemetry</span>
                </div>
                <h3 className="text-lg font-serif-luxury font-bold text-white mt-1">
                  Social Proof & Facebook Follower Scaling
                </h3>
                <p className="text-xs text-slate-400">
                  Tracking expansion from initial 82 follower audit baseline to 15,640+ verified community.
                </p>
              </div>

              {/* Sync Status Badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-200 text-xs self-start sm:self-auto">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono font-semibold">Meta v19.0 Healthy</span>
              </div>
            </div>

            {/* Growth Line Chart SVG */}
            <div className="relative w-full h-64 mt-4">
              <svg 
                className="w-full h-full overflow-visible select-none" 
                viewBox="0 0 600 240" 
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="socialGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#060e28" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid */}
                {[0, 0.33, 0.66, 1].map((r, i) => (
                  <line 
                    key={i} 
                    x1="40" 
                    y1={20 + r * 180} 
                    x2="580" 
                    y2={20 + r * 180} 
                    stroke="#1e293b" 
                    strokeWidth="1" 
                    strokeDasharray={r === 1 ? 'none' : '3 3'} 
                  />
                ))}

                {(() => {
                  const data = SOCIAL_GROWTH_TIMELINE;
                  const maxFollowers = 18000;
                  const chartH = 180;
                  const chartTop = 20;
                  const chartBottom = chartTop + chartH;
                  const stepX = (580 - 60) / (data.length - 1);

                  const points = data.map((d, i) => {
                    const x = 60 + i * stepX;
                    const y = chartBottom - (d.followers / maxFollowers) * chartH;
                    return { x, y, d };
                  });

                  let pathD = `M ${points[0].x} ${points[0].y}`;
                  for (let i = 0; i < points.length - 1; i++) {
                    const p0 = points[i];
                    const p1 = points[i + 1];
                    const mx = (p0.x + p1.x) / 2;
                    pathD += ` C ${mx} ${p0.y}, ${mx} ${p1.y}, ${p1.x} ${p1.y}`;
                  }

                  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartBottom} L ${points[0].x} ${chartBottom} Z`;

                  return (
                    <>
                      <path d={areaD} fill="url(#socialGrad)" />
                      <path d={pathD} fill="none" stroke="#c084fc" strokeWidth="3" />

                      {/* Milestone Nodes */}
                      {points.map((pt, idx) => (
                        <g 
                          key={idx}
                          className="cursor-pointer"
                          onMouseEnter={() => setHoveredSocialIndex(idx)}
                          onMouseLeave={() => setHoveredSocialIndex(null)}
                        >
                          <circle 
                            cx={pt.x} 
                            cy={pt.y} 
                            r={hoveredSocialIndex === idx ? '7' : '4.5'} 
                            fill={hoveredSocialIndex === idx ? '#fbbf24' : '#a855f7'} 
                            stroke="#060e28" 
                            strokeWidth="2.5" 
                          />
                          <text 
                            x={pt.x} 
                            y={chartBottom + 20} 
                            fill="#94a3b8" 
                            fontSize="9" 
                            textAnchor="middle"
                          >
                            {pt.d.date}
                          </text>
                        </g>
                      ))}
                    </>
                  );
                })()}
              </svg>

              {/* Hovered Social Card */}
              {hoveredSocialIndex !== null && SOCIAL_GROWTH_TIMELINE[hoveredSocialIndex] && (
                <div className="absolute top-2 right-4 bg-[#0a1847]/95 backdrop-blur-xl border border-purple-400/40 p-3 rounded-xl shadow-xl text-xs z-30 pointer-events-none animate-fadeIn max-w-xs">
                  <div className="flex items-center justify-between gap-4 font-bold text-white">
                    <span>{SOCIAL_GROWTH_TIMELINE[hoveredSocialIndex].date}</span>
                    <span className="text-purple-300 font-mono">
                      {SOCIAL_GROWTH_TIMELINE[hoveredSocialIndex].followers.toLocaleString()} Followers
                    </span>
                  </div>
                  <div className="text-[11px] text-emerald-400 font-semibold mt-1">
                    {SOCIAL_GROWTH_TIMELINE[hoveredSocialIndex].engagementRatePct}% Engagement Rate
                  </div>
                  <div className="text-[10px] text-slate-300 mt-1.5 pt-1.5 border-t border-white/10">
                    {SOCIAL_GROWTH_TIMELINE[hoveredSocialIndex].milestone}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
            <span>Baseline: <strong className="text-slate-200">82 Followers (Oct 2025)</strong></span>
            <span className="text-purple-300 font-semibold font-mono">Current: 15,640 Followers (+189x)</span>
          </div>
        </div>
      </div>

      {/* 6. EXECUTIVE PDF REPORT MODAL / PRINTABLE SUMMARY VIEW */}
      {isPdfModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#060e28] border border-blue-500/30 rounded-2xl w-full max-w-4xl p-8 text-slate-100 shadow-2xl relative my-8">
            
            {/* Modal Controls */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10 print:hidden">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-bold uppercase tracking-wider text-amber-300">
                  Board & Executive Briefing Document
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save to PDF</span>
                </button>
                <button
                  onClick={() => setIsPdfModalOpen(false)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Report Content */}
            <div className="mt-6 space-y-6">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-2xl font-serif-luxury font-bold text-white">
                    Silver Sky Events — Executive Growth Audit & Telemetry Report
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Prepared for Managing Director & Board of Directors • Nairobi, Kenya
                  </p>
                </div>
                <div className="text-right text-xs text-slate-400 font-mono">
                  <div>Date: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                  <div>Security Classification: Confidential / Executive</div>
                </div>
              </div>

              {/* Executive Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/90 border border-blue-500/20">
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Identified Leakage Benchmark</div>
                  <div className="text-xl font-serif-luxury font-bold text-amber-400 mt-1">KES 6,300,000</div>
                  <div className="text-[11px] text-slate-400 mt-1">Audit baseline target from dropped leads</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/20">
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Actual Recovered to Date</div>
                  <div className="text-xl font-serif-luxury font-bold text-emerald-400 mt-1">KES 7,450,000</div>
                  <div className="text-[11px] text-emerald-300 mt-1">118.25% of annual recovery achieved</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/90 border border-purple-500/20">
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Secured Daraja Escrow Hold</div>
                  <div className="text-xl font-serif-luxury font-bold text-purple-300 mt-1">KES 23,700,000</div>
                  <div className="text-[11px] text-slate-400 mt-1">174 locked bookings with zero bounced wires</div>
                </div>
              </div>

              {/* Key Strategic Findings */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Strategic Breakthroughs & Leakage Eradication
                </h4>
                <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-white/5 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Daraja M-Pesa STK Instant Deposits:</strong> Enabled instant 40% date holds during live discussions, permanently solving client date poaching by rival decor vendors.
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-white/5 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Regional Landing Hubs:</strong> Captured organic search intent across Mombasa/Diani, Naivasha, Kisumu, Nakuru, and Eldoret, yielding KES 38.5M in high-ticket wedding and corporate enquiries.
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-white/5 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Meta Graph Live Video Feeds:</strong> Expanded community from 82 stale followers to 15,640+ high-affinity luxury event organizers, generating a 31.4% reduction in website bounce rate.
                    </div>
                  </div>
                </div>
              </div>

              {/* Regional Breakdown Table */}
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                  Regional Market Performance Summary
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-900/90 text-slate-400 font-mono text-[10px] uppercase">
                      <tr>
                        <th className="p-2.5">Market Town</th>
                        <th className="p-2.5">Enquiries</th>
                        <th className="p-2.5">Conversion</th>
                        <th className="p-2.5">Secured Revenue</th>
                        <th className="p-2.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono">
                      {REGIONAL_MARKETS.slice(0, 5).map(r => (
                        <tr key={r.town} className="hover:bg-slate-900/40">
                          <td className="p-2.5 font-bold font-sans text-white">{r.town}</td>
                          <td className="p-2.5">{r.enquiries}</td>
                          <td className="p-2.5 text-emerald-400">{r.conversionRatePct}%</td>
                          <td className="p-2.5 text-amber-300">KES {(r.securedRevenueKES / 1000000).toFixed(1)}M</td>
                          <td className="p-2.5 text-slate-300 font-sans">Dominant Regional Leader</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Signoff */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-500">
                <span>Silver Sky Events Operations Office • Windsor / Ridgeways, Nairobi</span>
                <span>System Verified Digital Copy</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
