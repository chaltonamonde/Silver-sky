export interface MonthlyRecoveryPoint {
  month: string;
  actualRecovered: number; // in KES
  midCaseTarget: number;   // KES 6.3M benchmark spread
  lowCaseTarget: number;   // KES 1.3M conservative benchmark
  highCaseTarget: number;  // KES 24.8M aggressive benchmark
  leakagePillarRecovered: string;
  growthPct: number;
}

export interface CashflowTimePoint {
  label: string;
  weddingsKES: number;
  corporateKES: number;
  decorKES: number;
  equipmentKES: number;
  totalDepositKES: number;
  txCount: number;
}

export interface RegionalMetric {
  town: string;
  county: string;
  enquiries: number;
  trafficImpressions: number;
  organicClicks: number;
  conversionRatePct: number;
  securedRevenueKES: number;
  topSearchIntent: string;
  growthRank: number;
}

export interface FunnelStage {
  step: number;
  name: string;
  shortLabel: string;
  count: number;
  dropOffRatePct: number;
  stageConversionPct: number;
  overallConversionPct: number;
  volumeLabel: string;
  croInsight: string;
  projectedLeakagePluggedKES: number;
}

export interface SocialGrowthPoint {
  date: string;
  followers: number;
  reachImpressions: number;
  engagementRatePct: number;
  milestone?: string;
  metaSyncStatus: 'synced' | 'optimized';
}

// 1. REVENUE LEAKAGE RECOVERY DATA (Audit Baseline KES 6.3M mid-case)
export const MONTHLY_RECOVERY_DATA: MonthlyRecoveryPoint[] = [
  {
    month: 'Oct 2025',
    actualRecovered: 450000,
    midCaseTarget: 525000,
    lowCaseTarget: 108000,
    highCaseTarget: 2060000,
    leakagePillarRecovered: 'Initial Audit & Baseline Setup',
    growthPct: 0,
  },
  {
    month: 'Nov 2025',
    actualRecovered: 950000,
    midCaseTarget: 1050000,
    lowCaseTarget: 216000,
    highCaseTarget: 4130000,
    leakagePillarRecovered: 'Instant WhatsApp Routing (<5m)',
    growthPct: 111.1,
  },
  {
    month: 'Dec 2025',
    actualRecovered: 2350000,
    midCaseTarget: 2100000,
    lowCaseTarget: 433000,
    highCaseTarget: 8260000,
    leakagePillarRecovered: 'M-Pesa STK Instant Booking Escrow',
    growthPct: 147.3,
  },
  {
    month: 'Jan 2026',
    actualRecovered: 3950000,
    midCaseTarget: 3150000,
    lowCaseTarget: 650000,
    highCaseTarget: 12400000,
    leakagePillarRecovered: 'Quote Calculator Price Transparency',
    growthPct: 68.1,
  },
  {
    month: 'Feb 2026',
    actualRecovered: 5600000,
    midCaseTarget: 4200000,
    lowCaseTarget: 866000,
    highCaseTarget: 16530000,
    leakagePillarRecovered: 'Regional SEO Landings (Msa/Naiv/Ksm)',
    growthPct: 41.7,
  },
  {
    month: 'Mar 2026',
    actualRecovered: 7450000,
    midCaseTarget: 5250000,
    lowCaseTarget: 1083000,
    highCaseTarget: 20660000,
    leakagePillarRecovered: 'Live Meta Graph Video Portfolio Sync',
    growthPct: 33.0,
  },
  {
    month: 'Apr 2026 (Est)',
    actualRecovered: 9200000,
    midCaseTarget: 6300000,
    lowCaseTarget: 1300000,
    highCaseTarget: 24800000,
    leakagePillarRecovered: 'Full Annual Audit Goal Exceeded',
    growthPct: 23.5,
  },
];

// 2. M-PESA CASHFLOW ANALYTICS BY CATEGORY & TIMEFRAME
export const CASHFLOW_DATA_SETS: {
  daily: CashflowTimePoint[];
  weekly: CashflowTimePoint[];
  monthly: CashflowTimePoint[];
  yearly: CashflowTimePoint[];
} = {
  daily: [
    { label: 'Mon 22', weddingsKES: 240000, corporateKES: 180000, decorKES: 90000, equipmentKES: 120000, totalDepositKES: 630000, txCount: 4 },
    { label: 'Tue 23', weddingsKES: 350000, corporateKES: 250000, decorKES: 120000, equipmentKES: 80000, totalDepositKES: 800000, txCount: 5 },
    { label: 'Wed 24', weddingsKES: 540000, corporateKES: 420000, decorKES: 150000, equipmentKES: 160000, totalDepositKES: 1270000, txCount: 7 },
    { label: 'Thu 25', weddingsKES: 410000, corporateKES: 310000, decorKES: 110000, equipmentKES: 140000, totalDepositKES: 970000, txCount: 6 },
    { label: 'Fri 26', weddingsKES: 850000, corporateKES: 620000, decorKES: 240000, equipmentKES: 350000, totalDepositKES: 2060000, txCount: 11 },
    { label: 'Sat 27', weddingsKES: 1060000, corporateKES: 480000, decorKES: 320000, equipmentKES: 450000, totalDepositKES: 2310000, txCount: 14 },
    { label: 'Sun 28', weddingsKES: 620000, corporateKES: 190000, decorKES: 180000, equipmentKES: 210000, totalDepositKES: 1200000, txCount: 8 },
    { label: 'Mon 29', weddingsKES: 390000, corporateKES: 380000, decorKES: 130000, equipmentKES: 180000, totalDepositKES: 1080000, txCount: 6 },
    { label: 'Tue 30', weddingsKES: 450000, corporateKES: 520000, decorKES: 170000, equipmentKES: 240000, totalDepositKES: 1380000, txCount: 9 },
    { label: 'Wed 01', weddingsKES: 780000, corporateKES: 440000, decorKES: 210000, equipmentKES: 290000, totalDepositKES: 1720000, txCount: 10 },
    { label: 'Thu 02', weddingsKES: 640000, corporateKES: 590000, decorKES: 190000, equipmentKES: 310000, totalDepositKES: 1730000, txCount: 10 },
    { label: 'Fri 03', weddingsKES: 1120000, corporateKES: 750000, decorKES: 280000, equipmentKES: 420000, totalDepositKES: 2570000, txCount: 15 },
    { label: 'Sat 04', weddingsKES: 1250000, corporateKES: 820000, decorKES: 360000, equipmentKES: 480000, totalDepositKES: 2910000, txCount: 17 },
  ],
  weekly: [
    { label: 'Wk 35', weddingsKES: 1850000, corporateKES: 1200000, decorKES: 640000, equipmentKES: 850000, totalDepositKES: 4540000, txCount: 28 },
    { label: 'Wk 36', weddingsKES: 2400000, corporateKES: 1650000, decorKES: 810000, equipmentKES: 920000, totalDepositKES: 5780000, txCount: 36 },
    { label: 'Wk 37', weddingsKES: 2950000, corporateKES: 1890000, decorKES: 940000, equipmentKES: 1150000, totalDepositKES: 6930000, txCount: 42 },
    { label: 'Wk 38', weddingsKES: 3400000, corporateKES: 2150000, decorKES: 1100000, equipmentKES: 1320000, totalDepositKES: 7970000, txCount: 48 },
    { label: 'Wk 39', weddingsKES: 3820000, corporateKES: 2480000, decorKES: 1250000, equipmentKES: 1480000, totalDepositKES: 9030000, txCount: 54 },
    { label: 'Wk 40', weddingsKES: 4350000, corporateKES: 2900000, decorKES: 1420000, equipmentKES: 1750000, totalDepositKES: 10420000, txCount: 62 },
  ],
  monthly: [
    { label: 'Nov 25', weddingsKES: 4200000, corporateKES: 2800000, decorKES: 1400000, equipmentKES: 1800000, totalDepositKES: 10200000, txCount: 78 },
    { label: 'Dec 25', weddingsKES: 7900000, corporateKES: 4600000, decorKES: 2300000, equipmentKES: 3100000, totalDepositKES: 17900000, txCount: 142 },
    { label: 'Jan 26', weddingsKES: 5800000, corporateKES: 5200000, decorKES: 1950000, equipmentKES: 2850000, totalDepositKES: 15800000, txCount: 118 },
    { label: 'Feb 26', weddingsKES: 6850000, corporateKES: 5900000, decorKES: 2200000, equipmentKES: 3400000, totalDepositKES: 18350000, txCount: 136 },
    { label: 'Mar 26', weddingsKES: 9400000, corporateKES: 7200000, decorKES: 2950000, equipmentKES: 4150000, totalDepositKES: 23700000, txCount: 174 },
    { label: 'Apr 26', weddingsKES: 11200000, corporateKES: 8600000, decorKES: 3400000, equipmentKES: 5100000, totalDepositKES: 28300000, txCount: 205 },
  ],
  yearly: [
    { label: '2024 (Pre-Audit)', weddingsKES: 18500000, corporateKES: 12400000, decorKES: 5800000, equipmentKES: 7200000, totalDepositKES: 43900000, txCount: 310 },
    { label: '2025 (Transition)', weddingsKES: 39400000, corporateKES: 28100000, decorKES: 12600000, equipmentKES: 16900000, totalDepositKES: 97000000, txCount: 720 },
    { label: '2026 (Scaled Ops)', weddingsKES: 74500000, corporateKES: 52800000, decorKES: 24500000, equipmentKES: 33400000, totalDepositKES: 185200000, txCount: 1420 },
  ],
};

// 3. REGIONAL PERFORMANCE & GEOGRAPHIC SPREAD (8 Core Regional Markets)
export const REGIONAL_MARKETS: RegionalMetric[] = [
  {
    town: 'Nairobi',
    county: 'Nairobi Metropolitan & Kiambu',
    enquiries: 342,
    trafficImpressions: 48600,
    organicClicks: 6200,
    conversionRatePct: 2.85,
    securedRevenueKES: 38500000,
    topSearchIntent: 'luxury clear marquee tent hire nairobi',
    growthRank: 1,
  },
  {
    town: 'Mombasa',
    county: 'Mombasa & Diani Coastal Hub',
    enquiries: 184,
    trafficImpressions: 29400,
    organicClicks: 3850,
    conversionRatePct: 2.42,
    securedRevenueKES: 24800000,
    topSearchIntent: 'diani beach destination wedding decor',
    growthRank: 2,
  },
  {
    town: 'Naivasha',
    county: 'Nakuru Lake Corridor',
    enquiries: 136,
    trafficImpressions: 21500,
    organicClicks: 2680,
    conversionRatePct: 2.38,
    securedRevenueKES: 17900000,
    topSearchIntent: 'lake naivasha enashipai dome wedding',
    growthRank: 3,
  },
  {
    town: 'Kisumu',
    county: 'Kisumu & Western Lake Region',
    enquiries: 98,
    trafficImpressions: 16200,
    organicClicks: 1940,
    conversionRatePct: 2.15,
    securedRevenueKES: 13400000,
    topSearchIntent: 'corporate conference tent hire kisumu',
    growthRank: 4,
  },
  {
    town: 'Nakuru',
    county: 'Rift Valley Agricultural Heartland',
    enquiries: 74,
    trafficImpressions: 12400,
    organicClicks: 1420,
    conversionRatePct: 1.95,
    securedRevenueKES: 9200000,
    topSearchIntent: 'nakuru mega dome marquee hire',
    growthRank: 5,
  },
  {
    town: 'Eldoret',
    county: 'Uasin Gishu & North Rift',
    enquiries: 58,
    trafficImpressions: 9800,
    organicClicks: 1110,
    conversionRatePct: 1.84,
    securedRevenueKES: 7800000,
    topSearchIntent: 'championship event staging eldoret',
    growthRank: 6,
  },
  {
    town: 'Kisii',
    county: 'South Nyanza & Highlands',
    enquiries: 42,
    trafficImpressions: 7400,
    organicClicks: 820,
    conversionRatePct: 1.72,
    securedRevenueKES: 5600000,
    topSearchIntent: 'executive banquet tents kisii town',
    growthRank: 7,
  },
  {
    town: 'Homa Bay',
    county: 'Lake South & Rusinga Island',
    enquiries: 29,
    trafficImpressions: 5100,
    organicClicks: 560,
    conversionRatePct: 1.65,
    securedRevenueKES: 3900000,
    topSearchIntent: 'rusinga island marquee destination wedding',
    growthRank: 8,
  },
];

// 4. ENQUIRY-TO-BOOKING CONVERSION FUNNEL (CRO Diagnostic)
export const CONVERSION_FUNNEL_STAGES: FunnelStage[] = [
  {
    step: 1,
    name: 'Website Visits & FB Reel Impressions',
    shortLabel: 'Traffic Inflow',
    count: 148500,
    dropOffRatePct: 0,
    stageConversionPct: 100,
    overallConversionPct: 100,
    volumeLabel: '148,500 Unique Touchpoints',
    croInsight: 'Meta Graph video reels on homepage dropped bounce rate by 31.4% vs static photos.',
    projectedLeakagePluggedKES: 0,
  },
  {
    step: 2,
    name: 'Quote Form Submissions & WhatsApp Clicks',
    shortLabel: 'High-Intent Enquiries',
    count: 7820,
    dropOffRatePct: 94.7,
    stageConversionPct: 5.27,
    overallConversionPct: 5.27,
    volumeLabel: '7,820 High-Intent Leads',
    croInsight: 'Instant cost estimator provides transparency, eliminating cold bounces.',
    projectedLeakagePluggedKES: 2850000,
  },
  {
    step: 3,
    name: 'Active Negotiations & Custom Proposals',
    shortLabel: 'Qualified Quotes Sent',
    count: 1140,
    dropOffRatePct: 85.4,
    stageConversionPct: 14.58,
    overallConversionPct: 0.77,
    volumeLabel: '1,140 Verified Event Profiles',
    croInsight: 'Dedicated director assignment within 5 minutes prevents lead poaching by competitors.',
    projectedLeakagePluggedKES: 1950000,
  },
  {
    step: 4,
    name: 'Confirmed Bookings via M-Pesa 40% Deposit',
    shortLabel: 'Locked Bookings',
    count: 218,
    dropOffRatePct: 80.9,
    stageConversionPct: 19.12,
    overallConversionPct: 0.15,
    volumeLabel: '218 Locked Escrow Bookings',
    croInsight: 'Daraja STK push allows instant date lock-in without waiting for wire transfers.',
    projectedLeakagePluggedKES: 2650000,
  },
];

// 5. SOCIAL PROOF & AUDIENCE GROWTH TRACKER (From 82 FB baseline)
export const SOCIAL_GROWTH_TIMELINE: SocialGrowthPoint[] = [
  {
    date: 'Oct 2025',
    followers: 82,
    reachImpressions: 1200,
    engagementRatePct: 1.2,
    milestone: 'Initial Audit Baseline (82 Followers, Stale Feed)',
    metaSyncStatus: 'synced',
  },
  {
    date: 'Nov 2025',
    followers: 890,
    reachImpressions: 14500,
    engagementRatePct: 4.8,
    milestone: 'Brand Facelift & Meta Graph API Integration',
    metaSyncStatus: 'synced',
  },
  {
    date: 'Dec 2025',
    followers: 3420,
    reachImpressions: 48900,
    engagementRatePct: 6.4,
    milestone: 'Windsor Glass Pavilion 4K Drone Reel Viral Spike',
    metaSyncStatus: 'optimized',
  },
  {
    date: 'Jan 2026',
    followers: 7150,
    reachImpressions: 92400,
    engagementRatePct: 7.9,
    milestone: 'Regional Landing Hub Launch (Coast & Naivasha)',
    metaSyncStatus: 'optimized',
  },
  {
    date: 'Feb 2026',
    followers: 11200,
    reachImpressions: 148000,
    engagementRatePct: 8.5,
    milestone: 'Daraja STK Push Instant Proof & Verified Testimonials',
    metaSyncStatus: 'optimized',
  },
  {
    date: 'Mar 2026',
    followers: 15640,
    reachImpressions: 214000,
    engagementRatePct: 9.3,
    milestone: 'Meta Verified Partner Status & Continuous Sync',
    metaSyncStatus: 'optimized',
  },
];
