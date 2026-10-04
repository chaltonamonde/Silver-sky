'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Calendar as CalendarIcon, 
  Layers, 
  Share2, 
  Settings, 
  Search, 
  Bell, 
  Plus, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Download, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Zap, 
  DollarSign, 
  Filter, 
  RefreshCw,
  Eye,
  X,
  ChevronRight,
  TrendingUp,
  Award,
  Globe,
  Upload,
  Image as ImageIcon,
  Edit3,
  Trash2,
  Check,
  ChevronDown,
  BarChart3,
  Sliders,
  FileText
} from 'lucide-react';
import { 
  INITIAL_LEADS, 
  INITIAL_TRANSACTIONS, 
  INITIAL_INVENTORY, 
  INITIAL_CALENDAR,
  REGIONAL_SEO_DATA,
  REVENUE_RECOVERY_DATA,
  INITIAL_PACKAGES_CRUD,
  INITIAL_PORTFOLIO_UPLOADS,
  AdminLead,
  DarajaTransaction,
  InventoryAsset,
  CalendarBooking,
  RegionalSEOStat,
  EditablePackage,
  PortfolioUploadItem
} from '@/data/adminData';
import confetti from 'canvas-confetti';
import ExecutiveAnalyticsHub from '@/components/admin/ExecutiveAnalyticsHub';

type AdminModule = 
  | 'overview' 
  | 'analytics'
  | 'leads' 
  | 'transactions' 
  | 'portfolio' 
  | 'regional_seo' 
  | 'pricing_controller'
  | 'inventory'
  | 'calendar';

export default function AdminDashboardPage() {
  const [activeModule, setActiveModule] = useState<AdminModule>('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Leads State
  const [leads, setLeads] = useState<AdminLead[]>(INITIAL_LEADS);
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('All');
  const [selectedLeadForDrawer, setSelectedLeadForDrawer] = useState<AdminLead | null>(null);
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);

  // New Lead Form
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadPhone, setNewLeadPhone] = useState('');
  const [newLeadEmail, setNewLeadEmail] = useState('');
  const [newLeadEvent, setNewLeadEvent] = useState('Luxury Wedding');
  const [newLeadVenue, setNewLeadVenue] = useState('Windsor Golf Hotel & Country Club');
  const [newLeadRegion, setNewLeadRegion] = useState('Nairobi Metropolitan');
  const [newLeadGuests, setNewLeadGuests] = useState(350);
  const [newLeadKES, setNewLeadKES] = useState(1950000);

  // 2. Transactions State
  const [transactions, setTransactions] = useState<DarajaTransaction[]>(INITIAL_TRANSACTIONS);
  const [txCategoryFilter, setTxCategoryFilter] = useState<string>('All');
  const [isSTKModalOpen, setIsSTKModalOpen] = useState(false);
  const [simPhone, setSimPhone] = useState('0712345678');
  const [simAmount, setSimAmount] = useState(540000);
  const [simClient, setSimClient] = useState('David Mutua');
  const [simPackage, setSimPackage] = useState('Royal Opulence Wedding (40% Deposit)');
  const [simCategory, setSimCategory] = useState<DarajaTransaction['serviceCategory']>('Weddings');
  const [isSimulating, setIsSimulating] = useState(false);

  // 3. Packages CRUD State
  const [packages, setPackages] = useState<EditablePackage[]>(INITIAL_PACKAGES_CRUD);
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);
  const [tempPriceKES, setTempPriceKES] = useState<number>(0);
  const [isNewPackageModalOpen, setIsNewPackageModalOpen] = useState(false);
  const [newPkgName, setNewPkgName] = useState('');
  const [newPkgTier, setNewPkgTier] = useState<EditablePackage['tier']>('Growth');
  const [newPkgCat, setNewPkgCat] = useState<EditablePackage['category']>('Weddings');
  const [newPkgPrice, setNewPkgPrice] = useState(1500000);
  const [newPkgGuests, setNewPkgGuests] = useState('300 - 500 Guests');
  const [newPkgDesc, setNewPkgDesc] = useState('');
  const [newPkgInclusion, setNewPkgInclusion] = useState('');

  // 4. Portfolio Media State
  const [portfolioItems, setPortfolioItems] = useState<PortfolioUploadItem[]>(INITIAL_PORTFOLIO_UPLOADS);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newPortTitle, setNewPortTitle] = useState('');
  const [newPortCat, setNewPortCat] = useState<PortfolioUploadItem['category']>('Weddings');
  const [newPortVenue, setNewPortVenue] = useState('');
  const [newPortLocation, setNewPortLocation] = useState('Nairobi');
  const [newPortGuests, setNewPortGuests] = useState(400);
  const [newPortImg, setNewPortImg] = useState('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=85');
  const [newPortStory, setNewPortStory] = useState('');
  const [isFBSyncActive, setIsFBSyncActive] = useState(true);
  const [fbSyncStatusMsg, setFbSyncStatusMsg] = useState('Meta Graph API v19.0 Connected (Live Feed Active)');

  // 5. Regional SEO State
  const [regionalStats, setRegionalStats] = useState<RegionalSEOStat[]>(REGIONAL_SEO_DATA);

  // Notification Toast
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Calculations
  const totalPipelineKES = leads.reduce((sum, l) => sum + l.estimatedKES, 0);
  const totalDepositsSecuredKES = transactions.reduce((sum, t) => sum + t.amountKES, 0);
  const totalOrganicImpressions = regionalStats.reduce((sum, r) => sum + r.monthlyImpressions, 0);
  const totalOrganicClicks = regionalStats.reduce((sum, r) => sum + r.organicClicks, 0);

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = leadStatusFilter === 'All' || lead.status === leadStatusFilter;
    const matchesSearch = lead.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  // Filtered Transactions
  const filteredTransactions = transactions.filter((tx) => {
    const matchesCategory = txCategoryFilter === 'All' || tx.serviceCategory === txCategoryFilter;
    const matchesSearch = tx.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.receiptNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.phone.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  // Action: Add New Lead
  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: AdminLead = {
      id: `lead-${Date.now().toString().slice(-4)}`,
      clientName: newLeadName || 'Direct Phone Inquiry',
      phone: newLeadPhone || '0722 000 000',
      email: newLeadEmail || 'client@silversky.co.ke',
      eventType: newLeadEvent,
      targetDate: '2026-11-20',
      guestCount: Number(newLeadGuests),
      region: newLeadRegion,
      venue: newLeadVenue,
      budgetBracket: 'KES 1,800,000 – KES 4,500,000',
      estimatedKES: Number(newLeadKES),
      depositKES: Math.round(Number(newLeadKES) * 0.4),
      status: 'New',
      createdAt: 'Just now',
      assignedDirector: 'Evans Mutua (Lead)',
      notes: 'Captured via Executive Dashboard fast logger.',
      source: 'Quote Calculator',
    };
    setLeads([newEntry, ...leads]);
    setIsNewLeadModalOpen(false);
    setNewLeadName('');
    setNewLeadPhone('');
    showToast(`Lead for ${newEntry.clientName} created successfully.`);
  };

  // Action: Update Lead Status
  const handleUpdateStatus = (leadId: string, newStatus: AdminLead['status']) => {
    setLeads(leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
    showToast(`Lead status updated to "${newStatus}".`);
  };

  // Action: Trigger Simulated STK Push
  const handleTriggerSimulatedSTK = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSimulating(true);

    try {
      const res = await fetch('/api/mpesa/stkpush', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: simPhone,
          amount: simAmount,
          packageName: simPackage,
          clientName: simClient,
        }),
      });

      const data = await res.json();
      if (data.transactionDetails) {
        const newTx: DarajaTransaction = {
          id: `tx-${Date.now().toString().slice(-4)}`,
          receiptNumber: data.transactionDetails.receiptNumber,
          bookingRef: data.transactionDetails.bookingRef,
          clientName: simClient,
          phone: data.transactionDetails.phone,
          amountKES: Number(simAmount),
          packageName: simPackage,
          serviceCategory: simCategory,
          status: 'CONFIRMED',
          timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
          paybill: '782910',
          channel: 'M-PESA STK Push',
        };
        setTransactions([newTx, ...transactions]);
        setIsSTKModalOpen(false);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#f59e0b', '#2563eb'],
        });
        showToast(`M-Pesa STK payment KES ${Number(simAmount).toLocaleString()} confirmed (${newTx.receiptNumber})!`);
      }
    } catch (err) {
      console.error(err);
      showToast('Error processing STK simulation.');
    } finally {
      setIsSimulating(false);
    }
  };

  // Action: Inline Update Package Price
  const handleSavePriceEdit = (pkgId: string) => {
    if (!tempPriceKES || tempPriceKES <= 0) return;
    setPackages(packages.map(p => {
      if (p.id === pkgId) {
        return {
          ...p,
          startingPriceKES: tempPriceKES,
          formattedPrice: `KES ${tempPriceKES.toLocaleString()}`,
        };
      }
      return p;
    }));
    setEditingPackageId(null);
    showToast('Package pricing updated live on client website!');
  };

  // Action: Toggle Package Active
  const handleTogglePackageActive = (pkgId: string) => {
    setPackages(packages.map(p => p.id === pkgId ? { ...p, isActive: !p.isActive } : p));
  };

  // Action: Add New Package
  const handleCreatePackage = (e: React.FormEvent) => {
    e.preventDefault();
    const newPkg: EditablePackage = {
      id: `pkg-${Date.now().toString().slice(-4)}`,
      name: newPkgName || 'Custom Signature Package',
      tier: newPkgTier,
      category: newPkgCat,
      startingPriceKES: Number(newPkgPrice),
      formattedPrice: `KES ${Number(newPkgPrice).toLocaleString()}`,
      guestCapacity: newPkgGuests || '200 - 400 Guests',
      description: newPkgDesc || 'Custom tailored event experience.',
      inclusions: newPkgInclusion.split('\n').filter(Boolean),
      depositRequiredPct: 40,
      isActive: true,
    };
    setPackages([...packages, newPkg]);
    setIsNewPackageModalOpen(false);
    setNewPkgName('');
    showToast(`New package "${newPkg.name}" added to tier lineup!`);
  };

  // Action: Add Portfolio Story
  const handleUploadStory = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: PortfolioUploadItem = {
      id: `port-${Date.now().toString().slice(-4)}`,
      title: newPortTitle || 'Untitled Event Transformation',
      category: newPortCat,
      venue: newPortVenue || 'Windsor Golf Hotel & Country Club',
      location: newPortLocation || 'Nairobi',
      guests: Number(newPortGuests),
      date: 'March 2026',
      imageUrl: newPortImg,
      syncedWithFB: isFBSyncActive,
      storyNarrative: newPortStory || 'An exquisite luxury event production executed with perfection.',
      status: 'Published',
    };
    setPortfolioItems([newItem, ...portfolioItems]);
    setIsUploadModalOpen(false);
    setNewPortTitle('');
    setNewPortStory('');
    showToast(`Event "${newItem.title}" published to live portfolio & Facebook feed.`);
  };

  // Action: Force Facebook Feed Refresh
  const handleRefreshFacebookFeed = async () => {
    try {
      const res = await fetch('/api/facebook-feed');
      const data = await res.json();
      setFbSyncStatusMsg(`Successfully synchronized! ${data.total} Live Facebook media assets active.`);
      showToast('Meta Graph API synced successfully!');
    } catch {
      showToast('Sync completed using verified cache.');
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col md:flex-row antialiased selection:bg-amber-500 selection:text-black">
      
      {/* Toast Notification Banner */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 px-4 py-2.5 rounded-xl bg-emerald-950/90 border border-emerald-500 text-emerald-200 text-xs font-semibold shadow-2xl flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* COLLAPSIBLE SIDEBAR */}
      <aside 
        className={`${
          isSidebarCollapsed ? 'w-full md:w-20' : 'w-full md:w-72'
        } bg-[#060e28]/95 backdrop-blur-xl border-r border-blue-500/20 flex flex-col justify-between shrink-0 transition-all duration-300 z-40`}
      >
        <div>
          {/* Top Brand Header */}
          <div className="p-4 border-b border-blue-500/15 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-700 via-blue-900 to-slate-950 p-[1px] shadow-lg shadow-blue-900/50 shrink-0">
                <div className="w-full h-full rounded-xl bg-[#060e28] flex items-center justify-center border border-amber-500/40">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              {!isSidebarCollapsed && (
                <div className="leading-tight">
                  <span className="font-serif-luxury text-base font-bold text-white tracking-tight">
                    Silver Sky
                  </span>
                  <div className="text-[10px] font-semibold text-amber-400 tracking-wider uppercase flex items-center gap-1">
                    <span>Executive OPS</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                </div>
              )}
            </Link>

            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="hidden md:flex p-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white"
              title="Toggle Sidebar Collapse"
            >
              <Sliders className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1 text-xs font-medium">
            
            {/* 1. Overview */}
            <button
              onClick={() => setActiveModule('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeModule === 'overview'
                  ? 'bg-blue-600/30 text-amber-300 border border-blue-500/40 shadow-md font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-amber-400 shrink-0" />
              {!isSidebarCollapsed && <span>Command Center</span>}
            </button>

            {/* 2. Executive Analytics & Tracking */}
            <button
              onClick={() => setActiveModule('analytics')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeModule === 'analytics'
                  ? 'bg-blue-600/30 text-amber-300 border border-blue-500/40 shadow-md font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <BarChart3 className="w-4 h-4 text-amber-400 shrink-0" />
                {!isSidebarCollapsed && <span>Analytics & Tracking</span>}
              </div>
              {!isSidebarCollapsed && (
                <span className="px-1.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">
                  LIVE
                </span>
              )}
            </button>

            {/* 2. Enquiries & Quotes */}
            <button
              onClick={() => setActiveModule('leads')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeModule === 'leads'
                  ? 'bg-blue-600/30 text-amber-300 border border-blue-500/40 shadow-md font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-blue-400 shrink-0" />
                {!isSidebarCollapsed && <span>Enquiries & CRM</span>}
              </div>
              {!isSidebarCollapsed && (
                <span className="px-1.5 py-0.2 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold">
                  {leads.length}
                </span>
              )}
            </button>

            {/* 3. M-Pesa & Financials */}
            <button
              onClick={() => setActiveModule('transactions')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeModule === 'transactions'
                  ? 'bg-blue-600/30 text-amber-300 border border-blue-500/40 shadow-md font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-4 h-4 text-emerald-400 shrink-0" />
                {!isSidebarCollapsed && <span>M-Pesa Daraja Escrow</span>}
              </div>
              {!isSidebarCollapsed && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </button>

            {/* 4. Portfolio Media Manager */}
            <button
              onClick={() => setActiveModule('portfolio')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeModule === 'portfolio'
                  ? 'bg-blue-600/30 text-amber-300 border border-blue-500/40 shadow-md font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-purple-400 shrink-0" />
              {!isSidebarCollapsed && <span>Portfolio & Media</span>}
            </button>

            {/* 5. Regional SEO Analytics */}
            <button
              onClick={() => setActiveModule('regional_seo')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeModule === 'regional_seo'
                  ? 'bg-blue-600/30 text-amber-300 border border-blue-500/40 shadow-md font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <Globe className="w-4 h-4 text-blue-400 shrink-0" />
              {!isSidebarCollapsed && <span>Regional SEO & Traffic</span>}
            </button>

            {/* 6. Package & Pricing Controller */}
            <button
              onClick={() => setActiveModule('pricing_controller')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeModule === 'pricing_controller'
                  ? 'bg-blue-600/30 text-amber-300 border border-blue-500/40 shadow-md font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
              {!isSidebarCollapsed && <span>Pricing & Tier Controller</span>}
            </button>

            {/* Master Calendar */}
            <button
              onClick={() => setActiveModule('calendar')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeModule === 'calendar'
                  ? 'bg-blue-600/30 text-amber-300 border border-blue-500/40 shadow-md font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <CalendarIcon className="w-4 h-4 text-amber-400 shrink-0" />
              {!isSidebarCollapsed && <span>Master Calendar</span>}
            </button>

            {/* Heavy Gear Inventory */}
            <button
              onClick={() => setActiveModule('inventory')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeModule === 'inventory'
                  ? 'bg-blue-600/30 text-amber-300 border border-blue-500/40 shadow-md font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <Layers className="w-4 h-4 text-blue-400 shrink-0" />
              {!isSidebarCollapsed && <span>Heavy Gear Inventory</span>}
            </button>
          </nav>
        </div>

        {/* Sidebar Footer Link */}
        <div className="p-3 border-t border-slate-900 space-y-2">
          <Link
            href="/"
            className="w-full py-2 px-3 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 border border-slate-800 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            {!isSidebarCollapsed && <span>View Client Website</span>}
          </Link>

          {!isSidebarCollapsed && (
            <div className="flex items-center justify-between text-[10px] text-slate-500 px-1">
              <span>Next.js 16 • Daraja v2</span>
              <span className="text-emerald-400 font-mono">100% Uptime</span>
            </div>
          )}
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Executive App Bar */}
        <header className="sticky top-0 z-30 bg-[#030712]/90 backdrop-blur-xl border-b border-blue-500/20 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white capitalize">
                {activeModule === 'overview' && 'Executive Command Center & Recovery'}
                {activeModule === 'analytics' && 'Executive Analytics & Revenue Tracking Engine'}
                {activeModule === 'leads' && 'Event Enquiries & Pipeline Management'}
                {activeModule === 'transactions' && 'Safaricom Daraja M-Pesa Escrow Ledger'}
                {activeModule === 'portfolio' && 'Event Portfolio & Media Story Manager'}
                {activeModule === 'regional_seo' && 'Regional SEO & Conversion Analytics'}
                {activeModule === 'pricing_controller' && 'Package & Starting Price Controller'}
                {activeModule === 'calendar' && 'Master Production Logistics Calendar'}
                {activeModule === 'inventory' && 'Heavy Infrastructure & Fleet Equipment'}
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-[10px] text-blue-300 font-mono">
                Kenya Operations (EAT UTC+3)
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Enterprise Dashboard for Silver Sky Events Ltd • Nairobi Headquarters
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Action Button: New Lead */}
            <button
              onClick={() => setIsNewLeadModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Log New Enquiry</span>
            </button>

            {/* Quick Action Button: STK Simulation */}
            <button
              onClick={() => setIsSTKModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Simulate STK Push</span>
            </button>

            {/* Profile Pill */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <div className="w-8 h-8 rounded-full bg-blue-900/90 border border-amber-400/50 flex items-center justify-center font-bold text-amber-300 text-xs">
                EM
              </div>
              <div className="hidden lg:block text-left text-xs">
                <div className="font-semibold text-white">Evans Mutua</div>
                <div className="text-[10px] text-amber-400">Lead Director</div>
              </div>
            </div>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* MODULE 1: EXECUTIVE OVERVIEW (COMMAND CENTER) */}
        {/* ========================================================================= */}
        {activeModule === 'overview' && (
          <div className="p-6 sm:p-8 space-y-8 animate-fadeIn">
            
            {/* 4 High-Level Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Card 1: Total Active Enquiries */}
              <div className="glass-royal-card p-5 rounded-2xl border border-blue-500/20 space-y-2 relative overflow-hidden">
                <div className="flex justify-between items-center text-xs text-slate-400 uppercase font-semibold">
                  <span>Total Active Enquiries</span>
                  <Users className="w-4 h-4 text-blue-400" />
                </div>
                <div className="font-serif-luxury text-3xl font-bold text-white">
                  {leads.length} Active Leads
                </div>
                <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+18.4% month-over-month</span>
                </div>
              </div>

              {/* Card 2: M-Pesa Deposits Secured */}
              <div className="glass-royal-card p-5 rounded-2xl border border-emerald-500/20 space-y-2 relative overflow-hidden">
                <div className="flex justify-between items-center text-xs text-slate-400 uppercase font-semibold">
                  <span>M-Pesa Deposits Secured</span>
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="font-serif-luxury text-3xl font-bold text-emerald-300 font-mono">
                  KES {(totalDepositsSecuredKES / 1000000).toFixed(2)}M
                </div>
                <div className="text-[11px] text-slate-300">
                  {transactions.length} Verified Daraja STK Settlements
                </div>
              </div>

              {/* Card 3: Revenue Leakage Recovered (Benchmarked KES 6.3M) */}
              <div className="glass-royal-card p-5 rounded-2xl border border-amber-500/30 space-y-2 relative overflow-hidden bg-gradient-to-br from-amber-500/10 via-transparent to-blue-900/20">
                <div className="flex justify-between items-center text-xs text-amber-300 uppercase font-bold tracking-wider">
                  <span>Revenue Leakage Recovered</span>
                  <Award className="w-4 h-4 text-amber-400" />
                </div>
                <div className="font-serif-luxury text-3xl font-bold text-gold-gradient font-mono">
                  KES {(REVENUE_RECOVERY_DATA.actualRecoveredKES / 1000000).toFixed(2)}M
                </div>
                <div className="text-[11px] text-amber-300 flex items-center gap-1 font-semibold">
                  <span>Target: KES {(REVENUE_RECOVERY_DATA.benchmarkTargetKES / 1000000).toFixed(1)}M ({REVENUE_RECOVERY_DATA.recoveryRatePct}% Achieved)</span>
                </div>
              </div>

              {/* Card 4: Website Traffic & Conversion */}
              <div className="glass-royal-card p-5 rounded-2xl border border-blue-500/20 space-y-2 relative overflow-hidden">
                <div className="flex justify-between items-center text-xs text-slate-400 uppercase font-semibold">
                  <span>Monthly Local Search Traffic</span>
                  <Globe className="w-4 h-4 text-blue-400" />
                </div>
                <div className="font-serif-luxury text-3xl font-bold text-white font-mono">
                  {totalOrganicClicks.toLocaleString()} Clicks
                </div>
                <div className="text-[11px] text-blue-300">
                  Across {totalOrganicImpressions.toLocaleString()} Regional Impressions (13.1% CTR)
                </div>
              </div>

            </div>

            {/* Revenue Leakage Recovery Engine: Visualized */}
            <div className="glass-sapphire p-6 sm:p-8 rounded-2xl border border-amber-500/30 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-blue-500/20">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold text-[10px] uppercase border border-amber-400/30">
                      Audit Growth Benchmark
                    </span>
                    <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white">
                      Revenue Leakage Recovery vs. KES 6.3M Target
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Quantifying recovered lost revenue plugged by the digital growth audit strategies (Frictionless WhatsApp routing, instant quote estimator, M-Pesa deposits, and regional landing SEO).
                  </p>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-xl text-emerald-400">
                    +118.25%
                  </div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">
                    Target Exceeded
                  </div>
                </div>
              </div>

              {/* Month by Month Recovery Timeline Progress */}
              <div className="space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Month-by-Month Cumulative Recovery Progression:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                  {REVENUE_RECOVERY_DATA.monthlyProgression.map((item, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 hover:border-amber-400/40 transition-colors"
                    >
                      <div className="flex justify-between items-center text-[11px] text-slate-400">
                        <span>{item.month}</span>
                        <span className="font-mono text-emerald-400 font-bold">
                          KES {(item.recovered / 1000000).toFixed(1)}M
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-amber-400 rounded-full"
                          style={{ width: `${Math.min(100, (item.recovered / item.target) * 100)}%` }}
                        />
                      </div>
                      <div className="text-[10px] text-amber-300/90 truncate font-medium">
                        Plug: {item.leakagePlugged}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4 Pillars of Revenue Recovery Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                {REVENUE_RECOVERY_DATA.leakagePillars.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl glass-royal-card border border-blue-500/20 space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold text-white leading-tight">
                        {p.source}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-400/10 px-1.5 py-0.5 rounded">
                        {p.sharePct}%
                      </span>
                    </div>
                    <div className="font-serif-luxury text-xl font-bold text-gold-gradient font-mono">
                      KES {p.recoveredKES.toLocaleString()}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      {p.impact}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl glass-royal-card border border-blue-500/20">
              <div className="space-y-0.5">
                <h4 className="font-serif-luxury text-base font-bold text-white">
                  Quick Production Operations
                </h4>
                <p className="text-xs text-slate-400">
                  Update customer-facing rates or publish recent weekend event reels directly.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setActiveModule('portfolio');
                    setIsUploadModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Event Story</span>
                </button>

                <button
                  onClick={() => setActiveModule('analytics')}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-600 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-900/40"
                >
                  <BarChart3 className="w-3.5 h-3.5 text-amber-300" />
                  <span>Launch Analytics & Tracking Hub</span>
                </button>

                <button
                  onClick={() => setActiveModule('pricing_controller')}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Modify Starting Prices</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* MODULE: EXECUTIVE ANALYTICS & REVENUE TRACKING ENGINE */}
        {/* ========================================================================= */}
        {activeModule === 'analytics' && (
          <div className="p-6 sm:p-8">
            <ExecutiveAnalyticsHub onNotify={showToast} />
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODULE 2: ENQUIRY & QUOTE MANAGEMENT HUB */}
        {/* ========================================================================= */}
        {activeModule === 'leads' && (
          <div className="p-6 sm:p-8 space-y-6 animate-fadeIn">
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Filter by client, venue, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Status Filter Badges */}
              <div className="flex flex-wrap gap-1.5 text-xs">
                {(['All', 'New', 'In Discussion', 'Deposit Pending', 'Confirmed'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setLeadStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                      leadStatusFilter === st
                        ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                        : 'bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Leads Table */}
            <div className="glass-royal-card rounded-2xl overflow-hidden border border-blue-500/20 shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-[#030712] text-slate-400 uppercase font-semibold text-[11px] border-b border-slate-800">
                    <tr>
                      <th className="p-4">Client Name & Channel</th>
                      <th className="p-4">Event Type & Date</th>
                      <th className="p-4">Venue & Region</th>
                      <th className="p-4">Guests & Budget (KES)</th>
                      <th className="p-4">Status Tracking</th>
                      <th className="p-4 text-right">Quick WhatsApp Follow-Up</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-blue-950/20 transition-colors">
                        <td className="p-4">
                          <div className="font-semibold text-white text-sm">{lead.clientName}</div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                            <span>{lead.phone}</span>
                            <span>•</span>
                            <span className="px-1.5 py-0.2 rounded bg-blue-900/40 text-blue-300 text-[10px]">
                              {lead.source}
                            </span>
                          </div>
                        </td>

                        <td className="p-4">
                          <div className="font-medium text-slate-200">{lead.eventType}</div>
                          <div className="text-[11px] text-amber-300 font-mono">
                            {lead.targetDate}
                          </div>
                        </td>

                        <td className="p-4">
                          <div className="text-white font-medium">{lead.venue}</div>
                          <div className="text-[11px] text-slate-400">{lead.region}</div>
                        </td>

                        <td className="p-4">
                          <div className="font-bold text-gold-gradient text-sm font-mono">
                            KES {lead.estimatedKES.toLocaleString()}
                          </div>
                          <div className="text-[10px] text-emerald-400">
                            {lead.guestCount} Guests • 40% Dep: KES {lead.depositKES.toLocaleString()}
                          </div>
                        </td>

                        <td className="p-4">
                          <select
                            value={lead.status}
                            onChange={(e) => handleUpdateStatus(lead.id, e.target.value as any)}
                            className={`px-2.5 py-1 rounded-md text-[11px] font-bold border focus:outline-none cursor-pointer ${
                              lead.status === 'Confirmed'
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                : lead.status === 'Deposit Pending'
                                ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
                                : lead.status === 'In Discussion'
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                            }`}
                          >
                            <option value="New" className="bg-slate-900 text-white">New</option>
                            <option value="In Discussion" className="bg-slate-900 text-white">In Discussion</option>
                            <option value="Deposit Pending" className="bg-slate-900 text-white">Deposit Pending</option>
                            <option value="Confirmed" className="bg-slate-900 text-white">Confirmed</option>
                          </select>
                        </td>

                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedLeadForDrawer(lead)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                              title="View Brief Details"
                            >
                              <FileText className="w-3.5 h-3.5" />
                            </button>

                            <a
                              href={`https://wa.me/254${lead.phone.replace(/[^0-9]/g, '').slice(-9)}?text=${encodeURIComponent(
                                `Hello ${lead.clientName}! This is Evans Mutua from Silver Sky Events. Regarding your upcoming ${lead.eventType} at ${lead.venue} (${lead.guestCount} guests, estimate KES ${lead.estimatedKES.toLocaleString()}), we have provisionally reserved your date. Shall we finalize the site inspection?`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow transition-all"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODULE 3: M-PESA & FINANCIAL TRANSACTION TRACKER */}
        {/* ========================================================================= */}
        {activeModule === 'transactions' && (
          <div className="p-6 sm:p-8 space-y-6 animate-fadeIn">
            {/* Header Escrow Summary */}
            <div className="p-6 rounded-2xl glass-sapphire border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-400/40 flex items-center justify-center font-black text-emerald-400 text-lg">
                  KSh
                </div>
                <div>
                  <h3 className="font-serif-luxury text-xl font-bold text-white">
                    Safaricom Daraja API Settlement Hub (Paybill 782910)
                  </h3>
                  <p className="text-xs text-slate-300">
                    Active Escrow Pool: <strong className="text-emerald-400 font-mono text-sm">KES {totalDepositsSecuredKES.toLocaleString()}</strong> across 40% date-hold deposits.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsSTKModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/40 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Simulate Customer STK Push</span>
                </button>
              </div>
            </div>

            {/* Service Category Breakdown Selector */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2 text-xs">
                {(['All', 'Weddings', 'Corporate Contracts', 'Decor Styling', 'Equipment Hire'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setTxCategoryFilter(cat)}
                    className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                      txCategoryFilter === cat
                        ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 shadow-md font-bold'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <span className="text-xs text-slate-400 font-mono">
                Showing {filteredTransactions.length} Settled Transactions
              </span>
            </div>

            {/* Transactions Ledger Table */}
            <div className="glass-royal-card rounded-2xl overflow-hidden border border-blue-500/20 shadow-xl">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#030712] text-slate-400 uppercase font-semibold text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="p-4">Receipt Number</th>
                    <th className="p-4">Booking Ref</th>
                    <th className="p-4">Client Name & Contact</th>
                    <th className="p-4">Service Category</th>
                    <th className="p-4">Amount Secured (KES)</th>
                    <th className="p-4">Channel & Time</th>
                    <th className="p-4 text-right">Daraja Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-blue-950/20 transition-colors">
                      <td className="p-4 font-mono font-bold text-amber-300">{tx.receiptNumber}</td>
                      <td className="p-4 font-mono text-slate-300">{tx.bookingRef}</td>
                      <td className="p-4">
                        <div className="font-semibold text-white">{tx.clientName}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{tx.phone}</div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-500/20 text-[10px] font-semibold">
                          {tx.serviceCategory}
                        </span>
                        <div className="text-[11px] text-slate-400 mt-0.5 truncate max-w-[180px]">
                          {tx.packageName}
                        </div>
                      </td>
                      <td className="p-4 font-mono font-bold text-emerald-400 text-sm">
                        KES {tx.amountKES.toLocaleString()}
                      </td>
                      <td className="p-4 text-slate-400">
                        <div className="text-white text-[11px]">{tx.channel}</div>
                        <div className="text-[10px] text-slate-500">{tx.timestamp}</div>
                      </td>
                      <td className="p-4 text-right">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODULE 4: PORTFOLIO & MEDIA CONTENT MANAGER */}
        {/* ========================================================================= */}
        {activeModule === 'portfolio' && (
          <div className="p-6 sm:p-8 space-y-6 animate-fadeIn">
            {/* Top Bar with Facebook Sync Toggle */}
            <div className="p-6 rounded-2xl glass-sapphire border border-blue-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase">
                    Meta Graph v19.0
                  </span>
                  <h3 className="font-serif-luxury text-xl font-bold text-white">
                    Live Facebook Reel & Hero Background Sync
                  </h3>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  {fbSyncStatusMsg}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleRefreshFacebookFeed}
                  className="px-4 py-2 rounded-xl bg-blue-950 hover:bg-blue-900 border border-blue-500/30 text-blue-300 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Sync Meta Graph Now</span>
                </button>

                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Upload Event Story</span>
                </button>
              </div>
            </div>

            {/* Portfolio Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {portfolioItems.map((item) => (
                <div
                  key={item.id}
                  className="glass-royal-card rounded-2xl overflow-hidden border border-blue-500/20 flex flex-col justify-between group hover:border-amber-400/40 transition-all duration-300"
                >
                  <div className="relative h-44 overflow-hidden bg-slate-950">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-bold text-amber-300 border border-amber-500/30">
                        {item.category}
                      </span>
                    </div>

                    {item.syncedWithFB && (
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-blue-900/90 backdrop-blur-md text-[10px] text-blue-200 border border-blue-400/30 flex items-center gap-1">
                        <Share2 className="w-3 h-3 text-blue-300" />
                        <span>FB Synced</span>
                      </div>
                    )}
                  </div>

                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif-luxury text-base font-bold text-white group-hover:text-amber-200 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                        {item.storyNarrative}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{item.venue.split(' ')[0]}</span>
                      <span className="font-semibold text-amber-300">{item.guests} Pax</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODULE 5: REGIONAL SEO & TRAFFIC ANALYTICS */}
        {/* ========================================================================= */}
        {activeModule === 'regional_seo' && (
          <div className="p-6 sm:p-8 space-y-6 animate-fadeIn">
            {/* Overview Banner */}
            <div className="p-6 rounded-2xl glass-sapphire border border-blue-500/20 space-y-2">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-400" />
                <h3 className="font-serif-luxury text-xl font-bold text-white">
                  Local Search Intent Performance Across Kenyan Hubs
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                Dedicated regional landing pages capture destination wedding planners and corporate event directors searching directly within Nairobi, the Swahili Coast, and the Great Rift Valley.
              </p>
            </div>

            {/* Regional Performance Table */}
            <div className="glass-royal-card rounded-2xl overflow-hidden border border-blue-500/20 shadow-xl">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#030712] text-slate-400 uppercase font-semibold text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="p-4">Regional Hub</th>
                    <th className="p-4">Top Ranking Keyword</th>
                    <th className="p-4">Monthly Impressions</th>
                    <th className="p-4">Clicks & CTR</th>
                    <th className="p-4">Leads & Conv %</th>
                    <th className="p-4">Revenue Attributed</th>
                    <th className="p-4 text-right">SEO Rank</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {regionalStats.map((reg) => (
                    <tr key={reg.id} className="hover:bg-blue-950/20 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-white text-sm">{reg.city}</div>
                        <div className="text-[11px] text-slate-400">{reg.county}</div>
                      </td>

                      <td className="p-4">
                        <div className="text-amber-300 font-mono text-[11px]">"{reg.topKeyword}"</div>
                        <div className="text-[10px] text-slate-500">{reg.pageUrl}</div>
                      </td>

                      <td className="p-4 font-mono font-bold text-white">
                        {reg.monthlyImpressions.toLocaleString()}
                      </td>

                      <td className="p-4">
                        <span className="font-mono font-bold text-blue-400">{reg.organicClicks.toLocaleString()}</span>
                        <span className="text-[10px] text-slate-400 block font-mono">({reg.ctrPct}% CTR)</span>
                      </td>

                      <td className="p-4">
                        <span className="font-mono font-bold text-emerald-400">{reg.leadsGenerated} Leads</span>
                        <span className="text-[10px] text-slate-400 block font-mono">({reg.conversionRatePct}% Conv)</span>
                      </td>

                      <td className="p-4 font-mono font-bold text-gold-gradient text-sm">
                        KES {(reg.revenueGeneratedKES / 1000000).toFixed(1)}M
                      </td>

                      <td className="p-4 text-right">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          {reg.seoStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODULE 6: PACKAGE & PRICING CONTROLLER */}
        {/* ========================================================================= */}
        {activeModule === 'pricing_controller' && (
          <div className="p-6 sm:p-8 space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl glass-sapphire border border-blue-500/20">
              <div>
                <h3 className="font-serif-luxury text-xl font-bold text-white">
                  Live Pricing & Tier Controller
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Adjust baseline package prices and feature inclusions in real-time without modifying code files.
                </p>
              </div>

              <button
                onClick={() => setIsNewPackageModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create New Tier</span>
              </button>
            </div>

            {/* Packages Grid with Inline Price Editing */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`glass-royal-card rounded-2xl p-6 border flex flex-col justify-between space-y-4 transition-all ${
                    pkg.isActive ? 'border-blue-500/30' : 'border-slate-800 opacity-60'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
                        {pkg.tier} Tier
                      </span>
                      <button
                        onClick={() => handleTogglePackageActive(pkg.id)}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded transition-colors cursor-pointer ${
                          pkg.isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {pkg.isActive ? 'Active on Site' : 'Hidden'}
                      </button>
                    </div>

                    <div>
                      <h4 className="font-serif-luxury text-2xl font-bold text-white">
                        {pkg.name}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {pkg.description}
                      </p>
                    </div>

                    {/* Price with Inline Edit Toggle */}
                    <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">
                        Starting Price (KES)
                      </div>

                      {editingPackageId === pkg.id ? (
                        <div className="flex gap-2">
                          <input
                            type="number"
                            value={tempPriceKES}
                            onChange={(e) => setTempPriceKES(Number(e.target.value))}
                            className="w-full px-2 py-1 rounded bg-black border border-amber-400 text-sm font-mono text-amber-300 focus:outline-none"
                          />
                          <button
                            onClick={() => handleSavePriceEdit(pkg.id)}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                          <span className="font-serif-luxury text-2xl font-bold text-gold-gradient font-mono">
                            {pkg.formattedPrice}
                          </span>
                          <button
                            onClick={() => {
                              setEditingPackageId(pkg.id);
                              setTempPriceKES(pkg.startingPriceKES);
                            }}
                            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                            title="Edit Price"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Inclusions checklist */}
                    <div className="space-y-1.5 pt-2">
                      <div className="text-[11px] font-bold uppercase text-slate-300">
                        Inclusions:
                      </div>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {pkg.inclusions.map((inc, i) => (
                          <li key={i} className="flex items-start gap-2 text-[11px]">
                            <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex justify-between text-[11px] text-slate-400">
                    <span>{pkg.guestCapacity}</span>
                    <span className="font-semibold text-emerald-400">40% Deposit Rule</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODULE 7: MASTER CALENDAR & INVENTORY (SUPPLEMENTAL VIEWS) */}
        {/* ========================================================================= */}
        {activeModule === 'calendar' && (
          <div className="p-6 sm:p-8 space-y-6 animate-fadeIn">
            <h3 className="font-serif-luxury text-xl font-bold text-white">
              Master Rigging & Staging Calendar (2026/2027)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {INITIAL_CALENDAR.map((b) => (
                <div key={b.id} className="glass-royal-card p-6 rounded-2xl border border-blue-500/20 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold uppercase">
                        {b.region}
                      </span>
                      <h4 className="font-serif-luxury text-lg font-bold text-white mt-1">{b.title}</h4>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-1 rounded">
                      {b.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 space-y-1 pt-2 border-t border-slate-800">
                    <div>Venue: <strong>{b.venue}</strong></div>
                    <div>Dates: <strong>{b.date} to {b.endDate}</strong></div>
                    <div>Generator: <strong className="text-amber-300">{b.generatorsAssigned}</strong></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeModule === 'inventory' && (
          <div className="p-6 sm:p-8 space-y-6 animate-fadeIn">
            <h3 className="font-serif-luxury text-xl font-bold text-white">
              Heavy Infrastructure Equipment Inventory
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {INITIAL_INVENTORY.map((item) => (
                <div key={item.id} className="glass-royal-card p-5 rounded-2xl border border-blue-500/20 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded">
                      {item.assetCode}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                      {item.status}
                    </span>
                  </div>
                  <h4 className="font-serif-luxury text-base font-bold text-white">{item.name}</h4>
                  <div className="text-xs text-slate-400">Deployed: {item.quantityDeployed} / {item.quantityTotal} Active</div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* MODAL: LOG NEW ENQUIRY */}
      {/* ========================================================================= */}
      {isNewLeadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-lg glass-sapphire rounded-2xl border border-amber-500/30 p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-serif-luxury text-lg font-bold text-white">Log Event Lead to CRM</h3>
              <button onClick={() => setIsNewLeadModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Client Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Wanjiku Mutua"
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Phone Number (WhatsApp)</label>
                  <input
                    type="tel"
                    required
                    placeholder="07XX XXX XXX"
                    value={newLeadPhone}
                    onChange={(e) => setNewLeadPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="client@gmail.com"
                    value={newLeadEmail}
                    onChange={(e) => setNewLeadEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Event Type</label>
                  <select
                    value={newLeadEvent}
                    onChange={(e) => setNewLeadEvent(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white"
                  >
                    <option>Luxury Wedding</option>
                    <option>Corporate Gala / Summit</option>
                    <option>Milestone Birthday</option>
                    <option>State & Diplomatic</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Guest Capacity</label>
                  <input
                    type="number"
                    value={newLeadGuests}
                    onChange={(e) => setNewLeadGuests(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Venue Location</label>
                  <input
                    type="text"
                    value={newLeadVenue}
                    onChange={(e) => setNewLeadVenue(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Regional Hub</label>
                  <select
                    value={newLeadRegion}
                    onChange={(e) => setNewLeadRegion(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white"
                  >
                    <option>Nairobi Metropolitan</option>
                    <option>Mombasa & Diani Swahili Coast</option>
                    <option>Naivasha & Nakuru (Rift Valley)</option>
                    <option>Kisumu & Western Lake Region</option>
                    <option>Mount Kenya & Nanyuki</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Estimated Budget (KES)</label>
                <input
                  type="number"
                  value={newLeadKES}
                  onChange={(e) => setNewLeadKES(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewLeadModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs shadow hover:bg-amber-400 transition-colors"
                >
                  Save to Pipeline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: SIMULATE STK PUSH */}
      {/* ========================================================================= */}
      {isSTKModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md glass-sapphire rounded-2xl border border-emerald-500/40 p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                  M
                </div>
                <h3 className="font-serif-luxury text-base font-bold text-white">
                  Daraja STK Push Simulation
                </h3>
              </div>
              <button onClick={() => setIsSTKModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleTriggerSimulatedSTK} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Client Name</label>
                <input
                  type="text"
                  required
                  value={simClient}
                  onChange={(e) => setSimClient(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Safaricom Mobile Number</label>
                <input
                  type="tel"
                  required
                  value={simPhone}
                  onChange={(e) => setSimPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Service Category</label>
                <select
                  value={simCategory}
                  onChange={(e) => setSimCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white"
                >
                  <option value="Weddings">Weddings</option>
                  <option value="Corporate Contracts">Corporate Contracts</option>
                  <option value="Decor Styling">Decor Styling</option>
                  <option value="Equipment Hire">Equipment Hire</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Deposit Target (KES)</label>
                <input
                  type="number"
                  required
                  value={simAmount}
                  onChange={(e) => setSimAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsSTKModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSimulating}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow flex items-center gap-1.5"
                >
                  {isSimulating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                  <span>Trigger & Confirm Deposit</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: UPLOAD PORTFOLIO EVENT STORY */}
      {/* ========================================================================= */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-lg glass-sapphire rounded-2xl border border-purple-500/40 p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-serif-luxury text-lg font-bold text-white">Publish Event to Portfolio & Facebook</h3>
              <button onClick={() => setIsUploadModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadStory} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Mount Kenya Alpine Fairway Wedding"
                  value={newPortTitle}
                  onChange={(e) => setNewPortTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Category</label>
                  <select
                    value={newPortCat}
                    onChange={(e) => setNewPortCat(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white"
                  >
                    <option value="Weddings">Weddings</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Private">Private</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Diplomatic">Diplomatic</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Guest Count</label>
                  <input
                    type="number"
                    value={newPortGuests}
                    onChange={(e) => setNewPortGuests(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Venue Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fairmont Mount Kenya Safari Club"
                  value={newPortVenue}
                  onChange={(e) => setNewPortVenue(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Image URL (High-Resolution CDN)</label>
                <input
                  type="url"
                  required
                  value={newPortImg}
                  onChange={(e) => setNewPortImg(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Narrative Case Story</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe the challenge, creative styling, and technical infrastructure deployed..."
                  value={newPortStory}
                  onChange={(e) => setNewPortStory(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="fbsync"
                  checked={isFBSyncActive}
                  onChange={(e) => setIsFBSyncActive(e.target.checked)}
                  className="accent-amber-400"
                />
                <label htmlFor="fbsync" className="text-slate-300 text-[11px]">
                  Automatically push to official Facebook Page & Homepage Hero carousel
                </label>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow"
                >
                  Publish to Portfolio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: CREATE NEW PRICING PACKAGE */}
      {/* ========================================================================= */}
      {isNewPackageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-lg glass-sapphire rounded-2xl border border-amber-500/40 p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-serif-luxury text-lg font-bold text-white">Create New Pricing Package</h3>
              <button onClick={() => setIsNewPackageModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePackage} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Package Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Swahili Coast Presidential Bespoke"
                  value={newPkgName}
                  onChange={(e) => setNewPkgName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Tier Badge</label>
                  <select
                    value={newPkgTier}
                    onChange={(e) => setNewPkgTier(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white"
                  >
                    <option value="Starter">Starter</option>
                    <option value="Growth">Growth</option>
                    <option value="Pro">Pro</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Category</label>
                  <select
                    value={newPkgCat}
                    onChange={(e) => setNewPkgCat(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white"
                  >
                    <option value="Weddings">Weddings</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Infrastructure">Infrastructure</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Starting Price (KES)</label>
                  <input
                    type="number"
                    required
                    value={newPkgPrice}
                    onChange={(e) => setNewPkgPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Guest Capacity</label>
                  <input
                    type="text"
                    placeholder="e.g. 250 - 500 Guests"
                    value={newPkgGuests}
                    onChange={(e) => setNewPkgGuests(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Package Description</label>
                <textarea
                  rows={2}
                  placeholder="Summary of experience and aesthetic styling..."
                  value={newPkgDesc}
                  onChange={(e) => setNewPkgDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Inclusions (One per line)</label>
                <textarea
                  rows={3}
                  placeholder="30m German Dome&#10;L-Acoustics Sound System&#10;Twin Synchronized Generators"
                  value={newPkgInclusion}
                  onChange={(e) => setNewPkgInclusion(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewPackageModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow"
                >
                  Save Package Tier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DRAWER: VIEW LEAD DETAILS */}
      {/* ========================================================================= */}
      {selectedLeadForDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md h-full bg-[#060e28] border-l border-blue-500/20 p-6 flex flex-col justify-between overflow-y-auto space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <div>
                  <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold uppercase">
                    {selectedLeadForDrawer.eventType}
                  </span>
                  <h3 className="font-serif-luxury text-xl font-bold text-white mt-1">
                    {selectedLeadForDrawer.clientName}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedLeadForDrawer(null)}
                  className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Financial Expectation</div>
                  <div className="font-serif-luxury text-xl font-bold text-gold-gradient font-mono">
                    KES {selectedLeadForDrawer.estimatedKES.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-emerald-400">
                    40% Deposit Required: KES {selectedLeadForDrawer.depositKES.toLocaleString()}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Venue</span>
                    <strong>{selectedLeadForDrawer.venue}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Target Date</span>
                    <strong>{selectedLeadForDrawer.targetDate}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Guest Count</span>
                    <strong>{selectedLeadForDrawer.guestCount} Attendees</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Lead Director</span>
                    <strong>{selectedLeadForDrawer.assignedDirector}</strong>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold mb-1">Notes & Specifications</span>
                  <p className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 text-xs leading-relaxed">
                    {selectedLeadForDrawer.notes}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-800">
              <a
                href={`https://wa.me/254${selectedLeadForDrawer.phone.replace(/[^0-9]/g, '').slice(-9)}?text=${encodeURIComponent(
                  `Hello ${selectedLeadForDrawer.clientName}! This is Evans Mutua from Silver Sky Events. We have reviewed your inquiry for ${selectedLeadForDrawer.eventType} at ${selectedLeadForDrawer.venue} and reserved your target date.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Client on WhatsApp</span>
              </a>

              <button
                onClick={() => setSelectedLeadForDrawer(null)}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
