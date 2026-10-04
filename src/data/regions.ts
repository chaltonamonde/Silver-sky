export interface RegionalHub {
  id: string;
  slug: string;
  name: string;
  badge: string;
  headline: string;
  subheadline: string;
  description: string;
  heroImage: string;
  coverageCounties: string[];
  popularVenues: {
    name: string;
    neighborhood: string;
    capacity: string;
    style: string;
  }[];
  regionalHighlights: {
    title: string;
    description: string;
  }[];
  localFleet: {
    depot: string;
    transportTimeline: string;
    teamCapacity: string;
  };
  startingPriceNote: string;
}

export const REGIONS_DATA: RegionalHub[] = [
  {
    id: 'nairobi-metropolitan',
    slug: 'nairobi',
    name: 'Nairobi & Environs',
    badge: 'Headquarters & Primary Hub',
    headline: 'Luxury Event Coordination & Clear Marquees in Nairobi',
    subheadline: 'Serving Karen, Gigiri, Muthaiga, Westlands, Runda, and Greater Nairobi with zero-lag mobilization.',
    description: 'As our primary operations hub, our 35,000 sq ft logistics depot in Nairobi houses Kenya’s most extensive fleet of German clear-span marquees, high-end Italian furniture, line-array audio, and concert lighting. From diplomatic galas in Gigiri to fairytale estate weddings in Karen and Muthaiga, our seasoned team delivers flawless events with 24/7 technical backup.',
    heroImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=85',
    coverageCounties: ['Nairobi County', 'Kiambu (Runda/Thika)', 'Kajiado (Ngong/Kitengela)', 'Machakos'],
    popularVenues: [
      { name: 'Windsor Golf Hotel & Country Club', neighborhood: 'Ridgeways', capacity: '1,500 Guests', style: 'Golf Course Lawn & Lakeview' },
      { name: 'Karen Country Club Grounds', neighborhood: 'Karen', capacity: '1,200 Guests', style: 'Heritage Colonial Fairways' },
      { name: 'Hemingways Nairobi', neighborhood: 'Karen', capacity: '350 Guests', style: 'Plantation Luxury & Boutique Lawn' },
      { name: 'Safari Park Hotel & Casino', neighborhood: 'Thika Road', capacity: '2,000 Guests', style: 'Tropical Flora & Grand Ballrooms' },
      { name: 'Radisson Blu Hotel Upper Hill', neighborhood: 'Upper Hill', capacity: '600 Guests', style: 'Contemporary Five-Star Ballroom' },
    ],
    regionalHighlights: [
      { title: 'Zero Transport Surcharges', description: 'Immediate mobilization within Nairobi metropolitan limits with zero interstate transit fees.' },
      { title: 'County Permit Management', description: 'We manage full NEMA noise permits, NCC event licenses, and Red Cross medical liaisons directly.' },
      { title: 'Synchronized Twin Generators', description: 'Dual backup generator redundancies ensure uninterrupted luxury audio and lighting throughout your event.' },
    ],
    localFleet: {
      depot: 'Silver Sky Logistics Center, Enterprise Rd / Karen Hub, Nairobi',
      transportTimeline: 'Same-day mobilization (2–4 hours)',
      teamCapacity: '120 Full-time event directors, riggers, and stylists',
    },
    startingPriceNote: 'Wedding packages from KES 480,000 | Corporate from KES 650,000',
  },
  {
    id: 'mombasa-diani-coast',
    slug: 'mombasa-diani',
    name: 'Mombasa & Diani Coast',
    badge: 'Coastal & Destination Weddings',
    headline: 'Beachfront Destination Weddings & Ocean Galas in Diani & Mombasa',
    subheadline: 'Swahili coast glamour, sea-spray resistant rigging, tropical floral architecture, and barefoot luxury.',
    description: 'Transforming the white sands of Diani, Nyali, Kilifi, and Watamu into starlit oceanside celebrations. We overcome coastal humidity and sea winds with specialized marine-grade electronics, elevated teak flooring, moisture-sealed lighting fixtures, and custom tropical bamboo pavilions.',
    heroImage: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1200&q=85',
    coverageCounties: ['Mombasa County', 'Kwale (Diani / Ukunda)', 'Kilifi (Vipingo / Watamu)', 'Malindi / Lamu'],
    popularVenues: [
      { name: 'Vipingo Ridge Beach Club', neighborhood: 'Kilifi Coast', capacity: '800 Guests', style: 'Clifftop & Private Beachfront' },
      { name: 'The Sands at Nomad', neighborhood: 'Diani Beach', capacity: '400 Guests', style: 'Indigenous Forest & Coral Beach' },
      { name: 'Serena Beach Resort & Spa', neighborhood: 'Shanzu / Mombasa', capacity: '650 Guests', style: 'Swahili Village Architecture' },
      { name: 'Medina Palms', neighborhood: 'Watamu', capacity: '300 Guests', style: 'Moroccan-Arabic Luxe Villas' },
    ],
    regionalHighlights: [
      { title: 'Marine-Grade Electrical Systems', description: 'IP65-rated waterproof cabling, distribution boards, and sealed LED wash fixtures designed for high-salinity air.' },
      { title: 'Elevated Sand Decking', description: 'Interlocking marine-treated timber boardwalks and platforms that protect high heels while maintaining sea views.' },
      { title: 'Nairobi-to-Coast Dedicated Logistics', description: 'Scheduled long-haul transport trucks with cushioned air-ride suspension to protect fragile chandeliers.' },
    ],
    localFleet: {
      depot: 'Mombasa Regional Logistics Depot, Shimanzi & Diani Staging Base',
      transportTimeline: '24-hour advance site staging prior to event day',
      teamCapacity: '45 Coastal rigging technicians and beach styling crew',
    },
    startingPriceNote: 'Coastal destination packages from KES 850,000',
  },
  {
    id: 'naivasha-nakuru-rift',
    slug: 'naivasha-nakuru',
    name: 'Naivasha & Nakuru',
    badge: 'Rift Valley Escapes',
    headline: 'Highland Sunset Celebrations & Vineyard Receptions in Naivasha',
    subheadline: 'Lakeview marquees, heated evening pavilions, and breathtaking Great Rift Valley backdrops.',
    description: 'Lake Naivasha and Nakuru are Kenya’s premier weekend wedding destinations. Our Rift Valley engineering specialists design wind-anchored clear marquees that handle sudden afternoon gusts and transform into warm, candlelit, heated sanctuaries once the cool African night sets in.',
    heroImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=85',
    coverageCounties: ['Nakuru County', 'Naivasha Basin', 'Gilgil / Elementaita', 'Nyandarua / Kinangop'],
    popularVenues: [
      { name: 'Enashipai Resort & Spa Grounds', neighborhood: 'Moi South Lake Rd, Naivasha', capacity: '1,200 Guests', style: 'Manicured Lakeside Lawns' },
      { name: 'Great Rift Valley Lodge & Golf', neighborhood: 'Green Park, Naivasha', capacity: '600 Guests', style: 'Panoramic Valley Escarpment' },
      { name: 'Lake Naivasha Sopa Resort', neighborhood: 'South Lake Rd', capacity: '900 Guests', style: 'Acacia Forests with Resident Wildlife' },
      { name: 'Lake Elementaita Serena Camp', neighborhood: 'Lake Elementaita', capacity: '350 Guests', style: 'Flamingo Shorelines & Luxury Canvas' },
    ],
    regionalHighlights: [
      { title: 'Wind-Engineered Ground Ballasts', description: 'Engineered for up to 80 km/h wind shear off the lake with 1.2m steel soil spikes and concrete dead-weights.' },
      { title: 'Outdoor Patio Heating Solutions', description: 'Commercial stainless-steel pyramid flame heaters and heated radiant canopies for cold mountain evenings.' },
      { title: 'Wildlife Protocol Compliance', description: 'Silent sound zoning and low-glare warm light arrays that respect sanctuary wildlife guidelines.' },
    ],
    localFleet: {
      depot: 'Naivasha Moi South Lake staging hub + Nairobi convoy',
      transportTimeline: '1.5-hour direct highway transit from Nairobi',
      teamCapacity: '35 Highland event coordinators and heavy riggers',
    },
    startingPriceNote: 'Naivasha packages starting from KES 620,000',
  },
  {
    id: 'kisumu-western-lake',
    slug: 'kisumu-western',
    name: 'Kisumu & Western Lake',
    badge: 'Grand Lakeside Galas',
    headline: 'State-Level Conferences & Grand Celebrations in Kisumu & Western Kenya',
    subheadline: 'Bespoke event architecture along Lake Victoria, Kakamega, Eldoret, and the Great Lakes basin.',
    description: 'We bring Nairobi-grade heavy infrastructure to Western Kenya. Specializing in high-capacity clear marquees for 1,000 to 5,000 delegates, political summits, traditional nuptials, and corporate launches across Kisumu, Eldoret, Kakamega, and Homabay.',
    heroImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=85',
    coverageCounties: ['Kisumu County', 'Uasin Gishu (Eldoret)', 'Kakamega County', 'Siaya & Homa Bay'],
    popularVenues: [
      { name: 'Acacia Premier Hotel Kisumu', neighborhood: 'Milimani, Kisumu', capacity: '500 Guests', style: 'Rooftop Lakeview & Ballrooms' },
      { name: 'Grand Royal Swiss Hotel', neighborhood: 'Riat Hills, Kisumu', capacity: '2,500 Guests', style: 'Hillside Grand Exhibition Lawns' },
      { name: 'Boma Inn Eldoret', neighborhood: 'Elgon View, Eldoret', capacity: '800 Guests', style: 'Highland Manicured Lawns' },
      { name: 'Ciala Resort', neighborhood: 'Daraja Mbili, Kisumu', capacity: '1,500 Guests', style: 'Scenic Countryside Luxury' },
    ],
    regionalHighlights: [
      { title: 'Mega-Capacity Structural Spans', description: '40m-wide clear German marquees accommodating up to 3,500 seated guests with zero visual obstruction.' },
      { title: 'High-Volume Cooling & HVAC', description: 'Ducted air-conditioning keeping humid lakeside afternoon temperatures crisp and comfortable.' },
      { title: 'Direct Eldoret & Kisumu Logistics Depot', description: 'Pre-positioned heavy rigging and staging equipment eliminating cross-country delays.' },
    ],
    localFleet: {
      depot: 'Kisumu City Staging Yard, Kibos Rd & Eldoret Hub',
      transportTimeline: 'Pre-positioned local equipment + specialized convoys',
      teamCapacity: '50 Regional engineers and hospitality specialists',
    },
    startingPriceNote: 'Western Kenya packages from KES 690,000',
  },
  {
    id: 'mt-kenya-nanyuki',
    slug: 'mt-kenya-nanyuki',
    name: 'Mount Kenya & Nanyuki',
    badge: 'Equatorial Alpine Luxury',
    headline: 'Fairmont & Safari Lodge Weddings at the Foot of Mount Kenya',
    subheadline: 'Timeless colonial charm, open fire pits, celestial mountain views, and luxury tented ballrooms.',
    description: 'From Nanyuki to Timau and Meru, create unforgettable celebrations under the shadow of Batian and Nelion. Our alpine event productions integrate open flame fireplaces, fur and velvet lounge textures, and warm candlelight that contrasts with crisp mountain breezes.',
    heroImage: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=85',
    coverageCounties: ['Laikipia County (Nanyuki)', 'Nyeri County', 'Meru County', 'Embu County'],
    popularVenues: [
      { name: 'Fairmont Mount Kenya Safari Club', neighborhood: 'Nanyuki Equator', capacity: '600 Guests', style: 'Equatorial Heritage Estate & Lawns' },
      { name: 'Ol Pejeta Bush Camp & Safari Grounds', neighborhood: 'Sweetwaters, Laikipia', capacity: '400 Guests', style: 'Conservancy Wilderness Luxe' },
      { name: 'Maiyan Luxury Resort', neighborhood: 'Nanyuki Road', capacity: '1,000 Guests', style: 'Equestrian Estate & Infinity Lawns' },
      { name: 'The Serena Mountain Lodge Grounds', neighborhood: 'Mount Kenya Forest', capacity: '250 Guests', style: 'Indigenous Forest Tree Canopy' },
    ],
    regionalHighlights: [
      { title: 'Thermal Comfort Engineering', description: 'Double-insulated ceiling linings and enclosed glass walls that retain day warmth into 8°C mountain nights.' },
      { title: 'Rustic-Luxe Styling & Woodcraft', description: 'Handcrafted local olive wood grazing boards, wrought-iron candelabras, and live stone firepits.' },
      { title: 'Equator Ceremony Styling', description: 'Custom ceremonial altars positioned precisely across the 0°00\' latitude line.' },
    ],
    localFleet: {
      depot: 'Nanyuki Town staging yard & Central Kenya mobile unit',
      transportTimeline: '2.5 hours transit from Nairobi logistics center',
      teamCapacity: '30 Alpine event technicians and bridal concierges',
    },
    startingPriceNote: 'Mount Kenya bespoke packages from KES 650,000',
  },
];
