export interface PackageItem {
  id: string;
  name: string;
  badge?: string;
  startingPriceKES: number;
  formattedPrice: string;
  category: 'Weddings' | 'Corporate' | 'Infrastructure';
  targetAudience: string;
  guestCapacity: string;
  description: string;
  inclusions: string[];
  equipmentDetails: string[];
  depositRequiredPct: number;
  depositAmountKES: number;
}

export const PACKAGES_DATA: PackageItem[] = [
  // WEDDING PACKAGES
  {
    id: 'wedding-sapphire-intimate',
    name: 'Sapphire Intimate',
    badge: 'Curated Elegance',
    startingPriceKES: 480000,
    formattedPrice: 'KES 480,000',
    category: 'Weddings',
    targetAudience: 'Intimate gatherings, boutique receptions, and traditional ceremonies',
    guestCapacity: 'Up to 150 Guests',
    description: 'Designed for couples seeking refined, timeless beauty with essential luxury decor, bespoke floral styling, and atmospheric warm lighting.',
    inclusions: [
      'Complete event coordination & on-the-day bridal concierge',
      'Bespoke bridal table styling with custom linen & velvet runner',
      'Fresh floral centerpieces with local & imported Ecuadorian roses',
      'Ambient warm-white LED uplighting (16 wireless fixtures)',
      'Luxury Chiavari or Phoenix acrylic chairs with silk seat pads',
      'Custom gold-framed welcome mirror & personalized table stationery',
      'Full setup, professional staging, and strike-down crew',
    ],
    equipmentDetails: [
      '16x Wireless battery-powered RGBWA+UV uplighters',
      'High-clarity speech PA system with 2 wireless Shure microphones',
      'Custom cake display plinth with directional spotlight',
    ],
    depositRequiredPct: 40,
    depositAmountKES: 192000,
  },
  {
    id: 'wedding-royal-opulence',
    name: 'Royal Opulence',
    badge: 'Most Popular',
    startingPriceKES: 1350000,
    formattedPrice: 'KES 1,350,000',
    category: 'Weddings',
    targetAudience: 'Grand celebrations, high-society weddings, and luxury estate affairs',
    guestCapacity: '250 – 500 Guests',
    description: 'Our signature luxury wedding production. A breathtaking fusion of suspended floral canopies, crystal chandeliers, mirror dancefloors, and intelligent ambient lighting.',
    inclusions: [
      'End-to-end event design, 3D venue renders & floor plan CAD modeling',
      'Grand bridal entrance runway with low-fog dry ice clouds & cold spark fountains',
      'Suspended floral ceiling installations & 20+ crystal droplet chandeliers',
      'Custom seamless high-gloss white or gold-mirrored dance floor',
      'VIP lounge suite styling with velvet Chesterfield couches & marble cocktail tables',
      'Backlit photo-moment floral art installation with neon couple monogram',
      'Dedicated wedding day director and 12-member hospitality coordination crew',
      'Full audio-visual production, live band line-array, and intelligent stage moving heads',
    ],
    equipmentDetails: [
      'Line-array concert audio with dedicated digital sound engineer',
      '12x Beam/Spot moving heads with custom gobo texture projection',
      '4x Sparkular cold pyrotechnics + low-lying fog generator',
      'Dedicated 80 kVA silent backup diesel generator with auto-switchover',
    ],
    depositRequiredPct: 40,
    depositAmountKES: 540000,
  },
  {
    id: 'wedding-celestial-grandeur',
    name: 'Celestial Grandeur',
    badge: 'Ultra-Bespoke',
    startingPriceKES: 2900000,
    formattedPrice: 'KES 2,900,000',
    category: 'Weddings',
    targetAudience: 'VVIP, diplomatic, and destination weddings requiring full structural transformation',
    guestCapacity: '500 – 1,200+ Guests',
    description: 'An architectural and artistic tour de force. We build a custom German glass marquee over raw terrain, complete with climate control, curved LED video, and Michelin-worthy dining decor.',
    inclusions: [
      'Pillarless German clear-span glass dome structure tailored to your grounds',
      'Laser-leveled cassette sub-flooring fully carpeted in virgin champagne fleece',
      'Climate control HVAC systems maintaining optimal 20°C interior comfort',
      'Massive curved 4K LED video screen for cinematic couple documentaries & live feed',
      'Ultra-luxury velvet dining chairs, gold cutlery, crystal glassware, and custom charger plates',
      'Overhead kinetic light fixtures and custom automated lighting shows',
      'Full VVIP protocol, presidential security liaison, and helicopter landing coordination',
      '48-hour prior setup window ensuring zero-stress rehearsals and sound checks',
    ],
    equipmentDetails: [
      'German B-Line Clear Tent Structure with reinforced storm wind anchors',
      '2x 150 kVA Synchronized redundant generator banks',
      'Robotic broadcast camera package with satellite uplink capability',
      'Custom architectural entrance tunnel with infinity LED mirrors',
    ],
    depositRequiredPct: 40,
    depositAmountKES: 1160000,
  },

  // CORPORATE PACKAGES
  {
    id: 'corporate-executive-summit',
    name: 'Executive Summit',
    badge: 'Corporate Standard',
    startingPriceKES: 650000,
    formattedPrice: 'KES 650,000',
    category: 'Corporate',
    targetAudience: 'High-level executive conferences, investor roundtables, and board summits',
    guestCapacity: '100 – 250 Delegates',
    description: 'Crisp corporate branding, zero-latency digital acoustics, seamless presentation switching, and broadcast-ready stage backdrops.',
    inclusions: [
      'Custom branded executive stage backdrop with 3D acrylic corporate crest',
      'High-definition dual presentation screens with seamless seamless Roland switchers',
      'Full conference audio with push-to-talk delegate microphones & wireless lavaliers',
      'Executive registration zone with digital check-in counters & branded lanyard stations',
      'Comfortable ergonomic leather conference seating with stationery packs',
      'Dedicated technical director, audio technician, and stage manager throughout',
    ],
    equipmentDetails: [
      'Dual 85" Ultra-HD commercial display monitors or P2.9 LED wall segment',
      'Yamaha digital console with acoustic feedback suppression',
      'Live presentation clickers, confidence monitor, and countdown timers',
    ],
    depositRequiredPct: 40,
    depositAmountKES: 260000,
  },
  {
    id: 'corporate-annual-gala',
    name: 'Annual Gala & Awards',
    badge: 'Enterprise Choice',
    startingPriceKES: 1600000,
    formattedPrice: 'KES 1,600,000',
    category: 'Corporate',
    targetAudience: 'End-of-year corporate galas, regional awards ceremonies, and multinational celebrations',
    guestCapacity: '300 – 800 Attendees',
    description: 'An electrifying red-carpet awards night production. Immersive dynamic lighting, giant LED walls, customized award stingers, and luxury banqueting decor.',
    inclusions: [
      '50-meter outdoor red carpet arrival experience with custom press media wall & stanchions',
      'Giant 36-meter high-refresh P3.9 LED screen with custom motion graphics & award stingers',
      'Full intelligent theatrical stage lighting with motorized wash, beam, and spotlight profiles',
      'Black-tie dinner decor with satin tablecloths, gold accents, and architectural uplighting',
      'Broadcast live stream to YouTube/LinkedIn and multi-camera live video switching',
      'Stage pyrotechnics, confetti cannons for trophy winners, and custom podiums',
    ],
    equipmentDetails: [
      'Full L-Acoustics / RCF line-array sound system calibrated for large ballrooms',
      'Chamsys / grandMA lighting console with pre-programmed award cues',
      'Dual CO2 cryo jets + 4x automated stage confetti blowers',
      '100 kVA silent generator backup with zero-second transfer switch',
    ],
    depositRequiredPct: 40,
    depositAmountKES: 640000,
  },

  // INFRASTRUCTURE & EQUIPMENT
  {
    id: 'infrastructure-german-dome',
    name: 'German Clear-Span Marquee Hire',
    badge: 'Heavy Infrastructure',
    startingPriceKES: 550000,
    formattedPrice: 'KES 550,000 / Day',
    category: 'Infrastructure',
    targetAudience: 'Planners, corporate event managers, and outdoor luxury weddings',
    guestCapacity: '200 to 3,000+ Guests',
    description: 'European-certified German B-Line clear and white marquee structures. Zero internal pillars, maximum architectural grandeur, and total weatherproofing.',
    inclusions: [
      'Span widths available: 15m, 20m, 25m, 30m, 40m with modular bay lengths',
      'Heavy-duty hot-dipped galvanized steel connections & extruded aluminum rafters',
      'Wind-load certified up to 100 km/h with heavy earth anchoring or concrete ballasts',
      'Clear transparent PVC roof covers or blackout luxury white covers',
      'Elevated wooden or aluminum cassette sub-floor options available',
      'Comprehensive safety sign-off, fire retardant certifications, and structural engineer approval',
    ],
    equipmentDetails: [
      'Clear PVC walls with panoramic window options',
      'Heavy-duty industrial anchoring pegs (1.2m forged steel)',
      'Integral aluminum gutters for rapid rainwater drainage',
    ],
    depositRequiredPct: 40,
    depositAmountKES: 220000,
  },
];

export const INFRASTRUCTURE_CATALOG = [
  {
    name: 'Clear German B-Line Domes',
    specs: '15m to 40m clear span, modular length',
    startingAt: 'KES 1,200 / sqm',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Curved P3.9 Indoor/Outdoor LED Screen',
    specs: 'Up to 60 meters wide, 4K NovaStar processing',
    startingAt: 'KES 15,000 / panel / day',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Concert Line Array Audio System',
    specs: 'L-Acoustics / RCF line array + digital consoles',
    startingAt: 'KES 180,000 / day',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Intelligent Beam & Wash Moving Heads',
    specs: 'Martin / Robe 380W moving heads + DMX',
    startingAt: 'KES 8,000 / fixture',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Silent Diesel Generator Fleets',
    specs: '60 kVA, 100 kVA, 150 kVA, 250 kVA with auto-switch',
    startingAt: 'KES 65,000 / day',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Royal Velvet & Gold Furniture Suites',
    specs: 'Chesterfield sofas, Phoenix chairs, marble tables',
    startingAt: 'KES 450 / chair | KES 15,000 / lounge set',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80',
  },
];
