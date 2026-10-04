export interface AdminLead {
  id: string;
  clientName: string;
  phone: string;
  email: string;
  eventType: string;
  targetDate: string;
  guestCount: number;
  region: string;
  venue: string;
  budgetBracket: string;
  estimatedKES: number;
  depositKES: number;
  status: 'New' | 'In Discussion' | 'Deposit Pending' | 'Confirmed';
  createdAt: string;
  assignedDirector: string;
  notes: string;
  source: 'Quote Calculator' | 'WhatsApp Direct' | 'Phone Call' | 'Regional Landing';
}

export interface DarajaTransaction {
  id: string;
  receiptNumber: string;
  bookingRef: string;
  clientName: string;
  phone: string;
  amountKES: number;
  packageName: string;
  serviceCategory: 'Weddings' | 'Corporate Contracts' | 'Decor Styling' | 'Equipment Hire';
  status: 'CONFIRMED' | 'PENDING' | 'RECONCILED';
  timestamp: string;
  paybill: string;
  channel: 'M-PESA STK Push' | 'M-PESA Paybill Direct';
}

export interface InventoryAsset {
  id: string;
  assetCode: string;
  name: string;
  category: 'Marquees & Domes' | 'Power & Generators' | 'Audio & Stage' | 'Video & LED' | 'VIP Seating';
  quantityTotal: number;
  quantityDeployed: number;
  location: 'Nairobi Depot' | 'Mombasa Base' | 'Naivasha Staging' | 'In Transit';
  dailyRateKES: number;
  status: 'Operational' | 'In Transit' | 'Deployed on Site' | 'Under Inspection';
  lastService: string;
}

export interface CalendarBooking {
  id: string;
  title: string;
  client: string;
  date: string;
  endDate: string;
  venue: string;
  region: string;
  packageType: string;
  guests: number;
  leadDirector: string;
  status: 'Rigging in Progress' | 'Confirmed' | 'Completed';
  generatorsAssigned: string;
  marqueeAssigned: string;
}

export interface RegionalSEOStat {
  id: string;
  city: string;
  county: string;
  pageUrl: string;
  monthlyImpressions: number;
  organicClicks: number;
  ctrPct: number;
  leadsGenerated: number;
  conversionRatePct: number;
  revenueGeneratedKES: number;
  topKeyword: string;
  seoStatus: 'Top 3 Ranking' | 'Page 1 Ranking' | 'Rising Fast';
}

export interface EditablePackage {
  id: string;
  name: string;
  tier: 'Starter' | 'Growth' | 'Pro' | 'Enterprise';
  category: 'Weddings' | 'Corporate' | 'Infrastructure';
  startingPriceKES: number;
  formattedPrice: string;
  guestCapacity: string;
  description: string;
  inclusions: string[];
  depositRequiredPct: number;
  isActive: boolean;
}

export interface PortfolioUploadItem {
  id: string;
  title: string;
  category: 'Weddings' | 'Corporate' | 'Private' | 'Infrastructure' | 'Diplomatic';
  venue: string;
  location: string;
  guests: number;
  date: string;
  imageUrl: string;
  syncedWithFB: boolean;
  fbPostId?: string;
  storyNarrative: string;
  status: 'Published' | 'Draft';
}

export const INITIAL_LEADS: AdminLead[] = [
  {
    id: 'lead-101',
    clientName: 'Wanjiku Kamau & Kevin Ochieng',
    phone: '0722 849 102',
    email: 'wanjiku.k@outlook.com',
    eventType: 'Luxury Wedding',
    targetDate: '2026-11-28',
    guestCount: 450,
    region: 'Nairobi Metropolitan',
    venue: 'Windsor Golf Hotel & Country Club',
    budgetBracket: 'KES 1,800,000 – KES 4,500,000',
    estimatedKES: 2650000,
    depositKES: 1060000,
    status: 'Confirmed',
    createdAt: 'Today, 14:20',
    assignedDirector: 'Evans Mutua (Lead)',
    notes: 'Requires 30m clear German dome with cascading white wisteria and twin synchronized 150 kVA generators.',
    source: 'Quote Calculator',
  },
  {
    id: 'lead-102',
    clientName: 'Equity Group Holdings (Corporate Affairs)',
    phone: '0711 500 230',
    email: 'events@equitygroupholdings.com',
    eventType: 'Corporate Gala / Summit',
    targetDate: '2026-10-15',
    guestCount: 600,
    region: 'Nairobi Metropolitan',
    venue: 'Radisson Blu Hotel Upper Hill',
    budgetBracket: 'KES 1,800,000 – KES 4,500,000',
    estimatedKES: 3100000,
    depositKES: 1240000,
    status: 'Deposit Pending',
    createdAt: 'Yesterday, 09:45',
    assignedDirector: 'Faith Cherono',
    notes: 'Requested 40m curved P3.9 LED screen, broadcast audio, and simultaneous translation booths for 8 delegations.',
    source: 'Quote Calculator',
  },
  {
    id: 'lead-103',
    clientName: 'Tariq & Amina Al-Husseini',
    phone: '0733 992 110',
    email: 'tariq.husseini@gmail.com',
    eventType: 'Luxury Wedding',
    targetDate: '2026-12-12',
    guestCount: 300,
    region: 'Mombasa & Diani Swahili Coast',
    venue: 'The Sands at Nomad, Diani Beach',
    budgetBracket: 'KES 1,800,000 – KES 4,500,000',
    estimatedKES: 2150000,
    depositKES: 860000,
    status: 'In Discussion',
    createdAt: '2 days ago',
    assignedDirector: 'Rashid Omar (Coast Hub)',
    notes: 'Beachfront setup. Elevated marine-grade boardwalks over sand and weather-sealed fairy light canopies.',
    source: 'Regional Landing',
  },
  {
    id: 'lead-104',
    clientName: 'Dr. Evans Kiprono',
    phone: '0708 442 819',
    email: 'e.kiprono@strathmore.edu',
    eventType: 'Milestone Soirée / Birthday',
    targetDate: '2026-10-24',
    guestCount: 180,
    region: 'Naivasha & Nakuru (Rift Valley)',
    venue: 'Enashipai Resort Grounds, Naivasha',
    budgetBracket: 'KES 850,000 – KES 1,800,000',
    estimatedKES: 1450000,
    depositKES: 580000,
    status: 'New',
    createdAt: '3 hours ago',
    assignedDirector: 'Evans Mutua (Lead)',
    notes: 'Lakeside wind protection required. Geodetic heated dome tents and outdoor fire pits.',
    source: 'WhatsApp Direct',
  },
  {
    id: 'lead-105',
    clientName: 'British High Commission Protocol Office',
    phone: '0720 100 445',
    email: 'protocol.nairobi@fco.gov.uk',
    eventType: 'State & Diplomatic Banquet',
    targetDate: '2026-11-05',
    guestCount: 250,
    region: 'Nairobi Metropolitan',
    venue: 'Muthaiga Country Club Lawns',
    budgetBracket: 'KES 1,800,000 – KES 4,500,000',
    estimatedKES: 2800000,
    depositKES: 1120000,
    status: 'In Discussion',
    createdAt: '3 days ago',
    assignedDirector: 'Faith Cherono',
    notes: 'Level 1 diplomatic security clearance required for all rigging and electrical crew.',
    source: 'Quote Calculator',
  },
  {
    id: 'lead-106',
    clientName: 'East African Breweries (Brand Activation)',
    phone: '0722 192 841',
    email: 'brandteam@eabl.com',
    eventType: 'Corporate Gala / Summit',
    targetDate: '2026-11-18',
    guestCount: 1200,
    region: 'Kisumu & Western Lake Region',
    venue: 'Grand Royal Swiss Hotel Grounds, Kisumu',
    budgetBracket: 'KES 4,500,000+',
    estimatedKES: 4200000,
    depositKES: 1680000,
    status: 'New',
    createdAt: '5 hours ago',
    assignedDirector: 'Evans Mutua (Lead)',
    notes: 'Requires 40m mega-span German marquee with full HVAC ducted cooling for Lake Victoria climate.',
    source: 'Regional Landing',
  }
];

export const INITIAL_TRANSACTIONS: DarajaTransaction[] = [
  {
    id: 'tx-001',
    receiptNumber: 'QKZ2NEXDJM',
    bookingRef: 'SSK-29815',
    clientName: 'Wanjiku Kamau',
    phone: '254722849102',
    amountKES: 1060000,
    packageName: 'Royal Opulence Wedding (40% Deposit)',
    serviceCategory: 'Weddings',
    status: 'CONFIRMED',
    timestamp: '2026-10-03 14:32:10',
    paybill: '782910',
    channel: 'M-PESA STK Push',
  },
  {
    id: 'tx-002',
    receiptNumber: 'QK983M10LP',
    bookingRef: 'SSK-78421',
    clientName: 'Patrick Kilonzo (Safaricom)',
    phone: '254707119283',
    amountKES: 640000,
    packageName: 'Annual Gala & Awards (40% Deposit)',
    serviceCategory: 'Corporate Contracts',
    status: 'CONFIRMED',
    timestamp: '2026-10-02 11:15:42',
    paybill: '782910',
    channel: 'M-PESA STK Push',
  },
  {
    id: 'tx-003',
    receiptNumber: 'QKA719208K',
    bookingRef: 'SSK-11492',
    clientName: 'David Mutua',
    phone: '254712345678',
    amountKES: 540000,
    packageName: 'Windsor Glass Pavilion Date Hold',
    serviceCategory: 'Weddings',
    status: 'CONFIRMED',
    timestamp: '2026-10-01 16:48:09',
    paybill: '782910',
    channel: 'M-PESA STK Push',
  },
  {
    id: 'tx-004',
    receiptNumber: 'QK8910238M',
    bookingRef: 'SSK-66391',
    clientName: 'EABL Corporate Activations',
    phone: '254722000192',
    amountKES: 980000,
    packageName: 'Brand Activation Rigging & LED',
    serviceCategory: 'Equipment Hire',
    status: 'RECONCILED',
    timestamp: '2026-09-28 09:22:15',
    paybill: '782910',
    channel: 'M-PESA Paybill Direct',
  },
  {
    id: 'tx-005',
    receiptNumber: 'QK3819201L',
    bookingRef: 'SSK-44910',
    clientName: 'Boutique Flora & Styling Lab',
    phone: '254711829104',
    amountKES: 350000,
    packageName: 'Crystal Chandelier & Drape Hire',
    serviceCategory: 'Decor Styling',
    status: 'CONFIRMED',
    timestamp: '2026-09-25 15:10:33',
    paybill: '782910',
    channel: 'M-PESA STK Push',
  },
];

export const REVENUE_RECOVERY_DATA = {
  benchmarkTargetKES: 6300000, // Mid-case target identified in digital audit
  actualRecoveredKES: 7450000, // Recovered to date through digital strategies
  recoveryRatePct: 118.25,
  monthlyProgression: [
    { month: 'Nov 2025', target: 1200000, recovered: 950000, leakagePlugged: 'Fast WhatsApp Routing' },
    { month: 'Dec 2025', target: 2400000, recovered: 2350000, leakagePlugged: 'M-Pesa STK Instant Deposits' },
    { month: 'Jan 2026', target: 3700000, recovered: 3950000, leakagePlugged: 'Quote Calculator Elimination of Dropout' },
    { month: 'Feb 2026', target: 5100000, recovered: 5600000, leakagePlugged: 'Regional Landing SEO Pages' },
    { month: 'Mar 2026', target: 6300000, recovered: 7450000, leakagePlugged: 'Facebook Live Meta Graph Trust' },
  ],
  leakagePillars: [
    {
      source: 'Unanswered WhatsApp Leads (<5m response)',
      recoveredKES: 2850000,
      sharePct: 38.2,
      impact: 'Eliminated lead bounce to competitor decor agencies in Nairobi.',
    },
    {
      source: 'Opaque Pricing Friction (Quote Calculator)',
      recoveredKES: 1950000,
      sharePct: 26.2,
      impact: 'Sets buyer expectations immediately, filtering serious high-ticket clients.',
    },
    {
      source: 'Unsecured Tentative Date Loss (Daraja M-Pesa)',
      recoveredKES: 1650000,
      sharePct: 22.1,
      impact: 'Clients lock the date immediately with 40% STK push instead of wire delay.',
    },
    {
      source: 'Unindexed Regional Searches (Mombasa/Naivasha/Kisumu)',
      recoveredKES: 1000000,
      sharePct: 13.5,
      impact: 'High-intent destination wedding planners find local depot logistics.',
    },
  ],
};

export const REGIONAL_SEO_DATA: RegionalSEOStat[] = [
  {
    id: 'reg-nbo',
    city: 'Nairobi',
    county: 'Nairobi & Kiambu',
    pageUrl: '/#regions?tab=nairobi',
    monthlyImpressions: 28450,
    organicClicks: 3820,
    ctrPct: 13.4,
    leadsGenerated: 84,
    conversionRatePct: 2.2,
    revenueGeneratedKES: 26000000,
    topKeyword: 'luxury clear marquee tent hire nairobi',
    seoStatus: 'Top 3 Ranking',
  },
  {
    id: 'reg-mba',
    city: 'Mombasa & Diani',
    county: 'Kwale & Kilifi',
    pageUrl: '/#regions?tab=mombasa-diani',
    monthlyImpressions: 14200,
    organicClicks: 1940,
    ctrPct: 13.6,
    leadsGenerated: 38,
    conversionRatePct: 1.95,
    revenueGeneratedKES: 10600000,
    topKeyword: 'diani beach destination wedding decor kenya',
    seoStatus: 'Top 3 Ranking',
  },
  {
    id: 'reg-nva',
    city: 'Naivasha & Nakuru',
    county: 'Nakuru County',
    pageUrl: '/#regions?tab=naivasha-nakuru',
    monthlyImpressions: 9800,
    organicClicks: 1210,
    ctrPct: 12.3,
    leadsGenerated: 24,
    conversionRatePct: 1.98,
    revenueGeneratedKES: 6700000,
    topKeyword: 'lake naivasha wedding marquee enashipai',
    seoStatus: 'Page 1 Ranking',
  },
  {
    id: 'reg-ksm',
    city: 'Kisumu & Western',
    county: 'Kisumu & Uasin Gishu',
    pageUrl: '/#regions?tab=kisumu-western',
    monthlyImpressions: 7100,
    organicClicks: 890,
    ctrPct: 12.5,
    leadsGenerated: 16,
    conversionRatePct: 1.8,
    revenueGeneratedKES: 4900000,
    topKeyword: 'corporate conference tent hire kisumu eldoret',
    seoStatus: 'Page 1 Ranking',
  },
  {
    id: 'reg-nyk',
    city: 'Mount Kenya & Nanyuki',
    county: 'Laikipia & Nyeri',
    pageUrl: '/#regions?tab=mt-kenya-nanyuki',
    monthlyImpressions: 5400,
    organicClicks: 680,
    ctrPct: 12.6,
    leadsGenerated: 12,
    conversionRatePct: 1.76,
    revenueGeneratedKES: 3800000,
    topKeyword: 'fairmont mount kenya safari club wedding tent',
    seoStatus: 'Rising Fast',
  },
];

export const INITIAL_PACKAGES_CRUD: EditablePackage[] = [
  {
    id: 'pkg-sapphire',
    name: 'Sapphire Intimate',
    tier: 'Starter',
    category: 'Weddings',
    startingPriceKES: 480000,
    formattedPrice: 'KES 480,000',
    guestCapacity: 'Up to 150 Guests',
    description: 'Designed for intimate boutique celebrations with refined luxury styling.',
    inclusions: [
      'Bridal concierge on-the-day',
      'Fresh floral Ecuadorian roses',
      '16x Wireless warm uplighters',
      'Phoenix acrylic chairs',
    ],
    depositRequiredPct: 40,
    isActive: true,
  },
  {
    id: 'pkg-royal',
    name: 'Royal Opulence',
    tier: 'Growth',
    category: 'Weddings',
    startingPriceKES: 1350000,
    formattedPrice: 'KES 1,350,000',
    guestCapacity: '250 – 500 Guests',
    description: 'Signature luxury wedding production: crystal chandeliers, suspended wisteria, and mirror dancefloor.',
    inclusions: [
      '30m Clear-span dome setup',
      '20+ Crystal droplet chandeliers',
      'High-gloss white dance floor',
      'L-Acoustics line array sound',
      'Twin synchronized generator backup',
    ],
    depositRequiredPct: 40,
    isActive: true,
  },
  {
    id: 'pkg-celestial',
    name: 'Celestial Grandeur',
    tier: 'Pro',
    category: 'Weddings',
    startingPriceKES: 2900000,
    formattedPrice: 'KES 2,900,000',
    guestCapacity: '500 – 1,200+ Guests',
    description: 'Architectural tour de force: German glass marquee over raw terrain with complete HVAC climate control.',
    inclusions: [
      'Pillarless German glass marquee',
      'Climate control HVAC units',
      'Curved 4K LED video wall',
      'Robotic broadcast camera package',
      'Presidential VVIP security liaison',
    ],
    depositRequiredPct: 40,
    isActive: true,
  },
  {
    id: 'pkg-summit',
    name: 'Executive Summit',
    tier: 'Starter',
    category: 'Corporate',
    startingPriceKES: 650000,
    formattedPrice: 'KES 650,000',
    guestCapacity: '100 – 250 Delegates',
    description: 'High-level conference staging, zero-latency digital acoustics, and executive registration.',
    inclusions: [
      'Branded acrylic stage backdrop',
      'Dual 85" Ultra-HD monitors',
      'Push-to-talk delegate mics',
      'Dedicated technical director',
    ],
    depositRequiredPct: 40,
    isActive: true,
  },
  {
    id: 'pkg-gala',
    name: 'Annual Gala & Awards',
    tier: 'Enterprise',
    category: 'Corporate',
    startingPriceKES: 1600000,
    formattedPrice: 'KES 1,600,000',
    guestCapacity: '300 – 800 Attendees',
    description: 'Red-carpet corporate celebration: 36m curved LED video backdrop, stage pyrotechnics, and black-tie dining.',
    inclusions: [
      '50m Red carpet arrival setup',
      '36m Curved P3.9 LED screen',
      'Moving head stage lighting cues',
      'Stage confetti & cryo jets',
    ],
    depositRequiredPct: 40,
    isActive: true,
  },
];

export const INITIAL_PORTFOLIO_UPLOADS: PortfolioUploadItem[] = [
  {
    id: 'port-1',
    title: 'The Celestial Glass Pavilion Wedding',
    category: 'Weddings',
    venue: 'Windsor Golf Hotel & Country Club',
    location: 'Ridgeways, Nairobi',
    guests: 600,
    date: 'Dec 2025',
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=85',
    syncedWithFB: true,
    fbPostId: '109283921820',
    storyNarrative: 'A 600-guest transparent glass dome with 120 custom crystal chandeliers beneath the Kenyan night sky.',
    status: 'Published',
  },
  {
    id: 'port-2',
    title: 'East Africa Digital Innovation Gala',
    category: 'Corporate',
    venue: 'Radisson Blu Hotel Upper Hill',
    location: 'Upper Hill, Nairobi',
    guests: 450,
    date: 'Nov 2025',
    imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=85',
    syncedWithFB: true,
    fbPostId: '109283921821',
    storyNarrative: 'High-octane corporate summit and awards night featuring a 42-meter curved P3.9 LED backdrop.',
    status: 'Published',
  },
  {
    id: 'port-3',
    title: 'The Swahili Coast Coral Moon Wedding',
    category: 'Weddings',
    venue: 'The Sands at Nomad Grounds',
    location: 'Diani Beach, Kwale',
    guests: 220,
    date: 'Feb 2026',
    imageUrl: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1200&q=85',
    syncedWithFB: true,
    fbPostId: '109283921822',
    storyNarrative: 'An oceanfront destination wedding on Diani Beach featuring bamboo archways, fairy light canopies, and barefoot luxury.',
    status: 'Published',
  },
  {
    id: 'port-4',
    title: 'The Great Rift Valley Sunset Soirée',
    category: 'Private',
    venue: 'Enashipai Resort & Spa Grounds',
    location: 'Lake Naivasha, Nakuru',
    guests: 180,
    date: 'Jan 2026',
    imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=85',
    syncedWithFB: true,
    fbPostId: '109283921824',
    storyNarrative: 'An intimate 50th birthday celebration on the shores of Lake Naivasha with glowing geometric dome pavilions.',
    status: 'Published',
  },
];

export const INITIAL_INVENTORY: InventoryAsset[] = [
  {
    id: 'ast-01',
    assetCode: 'TENT-GER-30M',
    name: '30m x 45m Clear-Span German B-Line Dome',
    category: 'Marquees & Domes',
    quantityTotal: 4,
    quantityDeployed: 2,
    location: 'Nairobi Depot',
    dailyRateKES: 550000,
    status: 'Operational',
    lastService: '2026-09-15',
  },
  {
    id: 'ast-02',
    assetCode: 'TENT-GER-20M',
    name: '20m x 30m White High-Peak Marquee',
    category: 'Marquees & Domes',
    quantityTotal: 6,
    quantityDeployed: 4,
    location: 'Mombasa Base',
    dailyRateKES: 380000,
    status: 'Deployed on Site',
    lastService: '2026-09-20',
  },
  {
    id: 'ast-03',
    assetCode: 'GEN-CUM-150',
    name: '150 kVA Cummins Silent Diesel Generator (Twin Sync)',
    category: 'Power & Generators',
    quantityTotal: 8,
    quantityDeployed: 5,
    location: 'Nairobi Depot',
    dailyRateKES: 85000,
    status: 'Operational',
    lastService: '2026-09-25',
  },
  {
    id: 'ast-04',
    assetCode: 'LED-NOV-P39',
    name: 'Curved P3.9 High-Refresh LED Screen (120 Panels)',
    category: 'Video & LED',
    quantityTotal: 120,
    quantityDeployed: 80,
    location: 'Nairobi Depot',
    dailyRateKES: 15000,
    status: 'Deployed on Site',
    lastService: '2026-09-18',
  },
  {
    id: 'ast-05',
    assetCode: 'SND-LAC-KIV',
    name: 'L-Acoustics Kiva II Line Array Concert Rig',
    category: 'Audio & Stage',
    quantityTotal: 4,
    quantityDeployed: 2,
    location: 'Nairobi Depot',
    dailyRateKES: 180000,
    status: 'Operational',
    lastService: '2026-09-10',
  },
  {
    id: 'ast-06',
    assetCode: 'FUR-CHEST-BLU',
    name: 'Royal Blue Velvet Chesterfield Couches (3-Seater)',
    category: 'VIP Seating',
    quantityTotal: 40,
    quantityDeployed: 28,
    location: 'Nairobi Depot',
    dailyRateKES: 15000,
    status: 'Deployed on Site',
    lastService: '2026-09-22',
  },
];

export const INITIAL_CALENDAR: CalendarBooking[] = [
  {
    id: 'bk-101',
    title: 'Kamau & Ochieng Royal Glass Dome Wedding',
    client: 'Wanjiku Kamau',
    date: '2026-11-28',
    endDate: '2026-11-29',
    venue: 'Windsor Golf Hotel & Country Club',
    region: 'Nairobi',
    packageType: 'Royal Opulence (600 Pax)',
    guests: 600,
    leadDirector: 'Evans Mutua',
    status: 'Confirmed',
    generatorsAssigned: 'GEN-CUM-150 (Twin Sync #1 & #2)',
    marqueeAssigned: 'TENT-GER-30M (Bay A)',
  },
  {
    id: 'bk-102',
    title: 'East Africa Digital Innovation Gala',
    client: 'Fintech Leadership Forum',
    date: '2026-10-15',
    endDate: '2026-10-16',
    venue: 'Radisson Blu Hotel Upper Hill',
    region: 'Nairobi',
    packageType: 'Annual Gala Production',
    guests: 450,
    leadDirector: 'Faith Cherono',
    status: 'Confirmed',
    generatorsAssigned: 'GEN-CUM-150 (#3)',
    marqueeAssigned: 'Indoor Ballroom Rigging',
  },
  {
    id: 'bk-103',
    title: 'Coral Moon Swahili Coast Wedding',
    client: 'Tariq Al-Husseini',
    date: '2026-12-12',
    endDate: '2026-12-13',
    venue: 'The Sands at Nomad, Diani Beach',
    region: 'Mombasa / Diani',
    packageType: 'Coastal Bespoke',
    guests: 300,
    leadDirector: 'Rashid Omar',
    status: 'Confirmed',
    generatorsAssigned: 'Marine Generator #1 + Solar',
    marqueeAssigned: 'Elevated Teak Boardwalks + Bamboo Arch',
  },
  {
    id: 'bk-104',
    title: '50th Jubilee Sunset Soirée',
    client: 'Dr. Evans Kiprono',
    date: '2026-10-24',
    endDate: '2026-10-25',
    venue: 'Enashipai Resort Grounds, Naivasha',
    region: 'Naivasha',
    packageType: 'Lakeside Dome & Fire Pits',
    guests: 180,
    leadDirector: 'Evans Mutua',
    status: 'Confirmed',
    generatorsAssigned: 'GEN-CUM-150 (#4)',
    marqueeAssigned: 'Geodesic Heated Domes',
  },
];
