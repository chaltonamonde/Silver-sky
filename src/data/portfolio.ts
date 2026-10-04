export interface CaseStudy {
  id: string;
  title: string;
  category: 'Weddings' | 'Corporate' | 'Private' | 'Infrastructure' | 'Diplomatic';
  tagline: string;
  venue: string;
  location: string;
  guests: number;
  date: string;
  heroImage: string;
  gallery: string[];
  client: {
    name: string;
    role: string;
    logo?: string;
  };
  narrative: {
    challenge: string;
    concept: string;
    infrastructure: string[];
    outcome: string;
    testimonial: string;
  };
  metrics: {
    label: string;
    value: string;
  }[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'windsor-royal-celestial-wedding',
    title: 'The Celestial Glass Pavilion Wedding',
    category: 'Weddings',
    tagline: 'A 600-guest transparent glass dome with 120 custom crystal chandeliers beneath the Kenyan night sky.',
    venue: 'Windsor Golf Hotel & Country Club',
    location: 'Ridgeways, Nairobi',
    guests: 600,
    date: 'December 2025',
    heroImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1400&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=85',
    ],
    client: {
      name: 'Dr. David & Sharon Mutua',
      role: 'Bride & Groom',
    },
    narrative: {
      challenge: 'The couple desired an outdoor starlit experience during the December Nairobi rainy season without risking unpredictable tropical downpours or compromising on 360-degree views of the 18th hole greens.',
      concept: 'Silver Sky engineered a fully climate-controlled 30m x 45m clear-span German glass marquee adorned with suspended cascading white wisteria, candlelit mirrored tables, and custom royal blue velvet lounge accents.',
      infrastructure: [
        '30m x 45m Clear B-Line German Structure with transparent PVC roof',
        '120 Crystal pendant chandeliers on automated DMX dimmers',
        'Two 150 kVA synchronized silent diesel generators with auto-changeover',
        'Elevated marine-grade wooden sub-flooring with plush champagne carpet',
        'Intelligent warm-white Martin MAC Quantum profile fixtures',
      ],
      outcome: 'A completely weatherproof fairytale celebration that concluded at 4:00 AM with zero power hitches or rain interference, capturing 1.2M impressions across social media.',
      testimonial: 'Silver Sky took our seemingly impossible dream of dining beneath the stars in Nairobi December rain and engineered a breathtaking reality. The sheer precision was unmatched.',
    },
    metrics: [
      { label: 'Guests Catered', value: '600 VIPs' },
      { label: 'Rigging Time', value: '38 Hours' },
      { label: 'Uptime Reliability', value: '100.0%' },
    ],
  },
  {
    id: 'safaricom-annual-leadership-gala',
    title: 'East Africa Digital Innovation Gala',
    category: 'Corporate',
    tagline: 'High-octane corporate summit and awards night featuring a 42-meter curved P3.9 LED backdrop.',
    venue: 'Radisson Blu Hotel, Upper Hill',
    location: 'Upper Hill, Nairobi',
    guests: 450,
    date: 'November 2025',
    heroImage: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1400&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=85',
    ],
    client: {
      name: 'Leading Telecom & Fintech Conglomerate',
      role: 'Enterprise Corporate Client',
    },
    narrative: {
      challenge: 'Delivering broadcast-grade live stream production for 450 C-Suite leaders in Nairobi with zero latency, alongside 18 concurrent satellite breakout hubs across East Africa.',
      concept: 'A futuristic sapphire and illuminated cobalt aesthetic blending high-tech aerospace LED structures with warm candlelight dining tablescapes.',
      infrastructure: [
        '42m x 4.5m Seamless curved P3.9 indoor high-refresh LED wall',
        'L-Acoustics Kiva II Line Array audio system with Shure Axient Digital mics',
        'Robotic PTZ 4K broadcast cameras with fiber-optic transmission',
        'Custom brushed-gold metallic keynote lecterns with teleprompters',
      ],
      outcome: 'Flawless 6-hour international broadcast with seamless VIP protocol, receiving formal commendations from regional directors.',
      testimonial: 'The acoustic clarity and visual grandiosity created by Silver Sky set a new benchmark for corporate galas in Kenya. True world-class execution.',
    },
    metrics: [
      { label: 'Live Stream Viewers', value: '28,000+' },
      { label: 'C-Suite Executives', value: '450 Leaders' },
      { label: 'Production Latency', value: '<12ms' },
    ],
  },
  {
    id: 'naivasha-lakeview-twilight-soiree',
    title: 'The Great Rift Valley Sunset Soirée',
    category: 'Private',
    tagline: 'An intimate 50th birthday celebration on the shores of Lake Naivasha with glowing geometric dome pavilions.',
    venue: 'Enashipai Resort & Spa Grounds',
    location: 'Lake Naivasha, Nakuru County',
    guests: 180,
    date: 'January 2026',
    heroImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1400&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=85',
    ],
    client: {
      name: 'Family of Ambassador J. K. Kariuki',
      role: 'Private Host',
    },
    narrative: {
      challenge: 'Transforming a raw lakeside lawn with heavy evening wind gusts into a warm, candlelit, acoustic sanctuary.',
      concept: 'Reinforced wind-rated geodetic domes styled with suspended indigenous Kenyan florals, live fire-pit ambient lounges, and acoustic shell audio.',
      infrastructure: [
        'Geodesic wind-rated dome pavilions with weighted ballasts',
        'Bespoke royal blue Chesterfield velvet lounge suites',
        'Custom hurricane lamp perimeter lighting with 400 floating beeswax candles',
        'Bose ShowMatch compact line array system for live jazz ensemble',
      ],
      outcome: 'A breathtaking sunset-to-dawn private celebration praised as the most memorable private function of the year.',
      testimonial: 'From the warm candlelight against the Lake Naivasha night to the velvet lounges, our guests felt like royalty all night long.',
    },
    metrics: [
      { label: 'Wind Resistance', value: 'Up to 75 km/h' },
      { label: 'Private Guests', value: '180 VIPs' },
      { label: 'Event Duration', value: '12 Hours' },
    ],
  },
  {
    id: 'diani-beachfront-bohemian-luxe-wedding',
    title: 'The Swahili Coast Coral Moon Wedding',
    category: 'Weddings',
    tagline: 'An oceanfront destination wedding on Diani Beach featuring bamboo archways, fairy light canopies, and barefoot luxury.',
    venue: 'Nomad Sands / The Sands at Nomad Grounds',
    location: 'Diani Beach, Kwale / South Coast',
    guests: 220,
    date: 'February 2026',
    heroImage: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1400&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
    ],
    client: {
      name: 'Amina & Tariq Al-Husseini',
      role: 'Destination Bride & Groom',
    },
    narrative: {
      challenge: 'Managing high coastal humidity, sea spray, and sandy ground conditions while maintaining pristine white silk drapery and precision electrical safety.',
      concept: 'Moisture-resistant marine-grade electrical conduits, elevated teak walkways, billowing royal cobalt & ivory silk drapes, and 2,000 warm fairy light drops.',
      infrastructure: [
        'Modular elevated interlocking treated-timber boardwalks',
        'IP65 water-resistant architectural floodlights and warm fairy drop canopies',
        'Custom bamboo and brass hexagonal ceremony altar',
        'Mobile silent marine generator units with secondary solar backup',
      ],
      outcome: 'An ethereal coastal celebration where the couple exchanged vows with waves lapping 15 meters away in complete acoustic isolation.',
      testimonial: 'Planning a Diani wedding from London was daunting until we met Silver Sky. Every single detail arrived on time and surpassed our expectations.',
    },
    metrics: [
      { label: 'Fairy Light Drops', value: '2,000 Pcs' },
      { label: 'Interlocking Decking', value: '650 sqm' },
      { label: 'Logistics Fleet', value: '3 Trucks (NBO-MBA)' },
    ],
  },
  {
    id: 'diplomatic-un-state-dinner',
    title: 'Pan-African Diplomatic Summit Banquet',
    category: 'Diplomatic',
    tagline: 'A presidential-grade state dinner for 32 visiting heads of delegations and ministers.',
    venue: 'United Nations Complex / Safari Park Hotel Ballroom',
    location: 'Gigiri / Thika Road, Nairobi',
    guests: 350,
    date: 'October 2025',
    heroImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=85',
    ],
    client: {
      name: 'Ministry of Foreign Affairs & Regional Secretariat',
      role: 'State Protocol Delegation',
    },
    narrative: {
      challenge: 'Adhering to strict international diplomatic protocols, security clearances, presidential motorcade staging, and multi-lingual simultaneous translation.',
      concept: 'An understated, deeply regal ballroom setup with custom royal blue silk chair covers, gold candelabra centerpieces, and secure acoustic translation booths.',
      infrastructure: [
        'ISO-certified multi-channel simultaneous translation booths',
        'High-security biometric staging and perimeter lighting',
        'Custom presidential dais with gold leaf embroidery and presidential seals',
        'Zero-glare high-CRI lighting for international media broadcasting',
      ],
      outcome: 'Commended by multiple ambassadors for punctual transitions, presidential protocol precision, and exquisite decor harmony.',
      testimonial: 'Silver Sky proved why they are the go-to agency for state-level and diplomatic hospitality in East Africa.',
    },
    metrics: [
      { label: 'Delegations Represented', value: '32 Nations' },
      { label: 'Security Clearance', value: 'Level 1 Vetted' },
      { label: 'Protocol Adherence', value: '100%' },
    ],
  },
  {
    id: 'heavy-dome-infrastructure-showcase',
    title: 'The Mega-Tent & Geodesic Rigging Showcase',
    category: 'Infrastructure',
    tagline: 'Heavy event engineering: 2,500-capacity German B-Line clear marquee, trussing, and stadium power distribution.',
    venue: 'Karen Country Club Grounds',
    location: 'Karen, Nairobi',
    guests: 2500,
    date: 'January 2026',
    heroImage: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1400&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=85',
    ],
    client: {
      name: 'East African Energy & Mining Forum',
      role: 'Conference Consortium',
    },
    narrative: {
      challenge: 'Erecting 1,800 square meters of pillarless, weather-tight exhibition space on uneven fairway turf within 48 hours.',
      concept: 'Heavy-duty German aluminum extrusions anchored with laser-leveled subflooring, heavy industrial HVAC ducting, and 400A 3-phase power distribution.',
      infrastructure: [
        '40m x 45m Clear-Span German B-Line structure (Zero central pillars)',
        '1,800 sqm laser-leveled elevated cassette flooring with load capacity 500kg/sqm',
        'Three 250 kVA Cummins silent diesel generator banks with automatic sync',
        'Industrial HVAC package delivering constant 21°C interior climate',
      ],
      outcome: 'Delivered 8 hours ahead of schedule; sustained 3 days of torrential downpours with zero water ingress or ground subsidence.',
      testimonial: 'The engineering capability of Silver Sky is leagues ahead of anyone else in the region. Their heavy infrastructure is European standard.',
    },
    metrics: [
      { label: 'Clear-Span Area', value: '1,800 m²' },
      { label: 'Pillarless Span', value: '40 Meters' },
      { label: 'Floor Load Capacity', value: '500 kg/m²' },
    ],
  },
];
