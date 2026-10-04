export interface GoogleReview {
  id: string;
  authorName: string;
  authorRole: string;
  avatar: string;
  rating: number;
  timeAgo: string;
  eventType: string;
  venue: string;
  reviewText: string;
  verified: boolean;
  likesCount: number;
}

export const GOOGLE_PROFILE = {
  businessName: 'Silver Sky Events & Infrastructure Ltd',
  rating: 4.9,
  totalReviews: 148,
  address: 'Karen Office Park & Industrial Logistics Center, Nairobi, Kenya',
  phone: '+254 700 123 456',
  hours: 'Open Mon - Sat: 8:00 AM – 7:00 PM | 24/7 Event Operations Team',
  googleMapsUrl: 'https://maps.google.com/?q=Silver+Sky+Events+Nairobi+Kenya',
  coordinates: {
    lat: -1.3197,
    lng: 36.7065,
  },
};

export const GOOGLE_REVIEWS_DATA: GoogleReview[] = [
  {
    id: 'rev-1',
    authorName: 'Brenda Wangari-Omondi',
    authorRole: 'Bride (Windsor Golf Hotel Reception)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    timeAgo: '2 weeks ago',
    eventType: 'Luxury Clear Dome Wedding (550 Guests)',
    venue: 'Windsor Golf Hotel & Country Club',
    reviewText: 'Silver Sky completely blew our expectations out of the water! We booked their Royal Opulence package for 550 guests. The German clear tent with cascading wisteria and crystal chandeliers looked like something out of a royal fairy tale. What impressed my husband most was the generator sync—we didn’t have a single power flicker all night even when the heavy rain started. Worth every single shilling!',
    verified: true,
    likesCount: 24,
  },
  {
    id: 'rev-2',
    authorName: 'Patrick M. Kilonzo',
    authorRole: 'Head of Corporate Affairs, Financial Services Group',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    timeAgo: '1 month ago',
    eventType: 'Annual C-Suite Gala & Awards (400 Delegates)',
    venue: 'Radisson Blu Hotel Upper Hill',
    reviewText: 'From a corporate standpoint, Silver Sky is the most disciplined event infrastructure partner in East Africa. Their audio-visual team deployed a 36-meter curved LED screen with zero pixel glitches and delivered simultaneous translation for 12 diplomatic delegations seamlessly. Punctual, polite, and totally unflappable under pressure.',
    verified: true,
    likesCount: 19,
  },
  {
    id: 'rev-3',
    authorName: 'Amina Al-Husseini',
    authorRole: 'Bride (Diani Beach Destination Wedding)',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    timeAgo: '3 weeks ago',
    eventType: 'Coastal Destination Wedding (220 Guests)',
    venue: 'The Sands at Nomad, Diani Beach',
    reviewText: 'Planning our wedding from the UK was stressful until we hired Silver Sky. They handled everything from the trucks coming down from Nairobi to the elevated wooden platforms on the sand so my grandmother could walk safely. The warm candlelight under the Swahili stars was breathtaking. All our international guests were speechless!',
    verified: true,
    likesCount: 31,
  },
  {
    id: 'rev-4',
    authorName: 'Dr. Evans Kiprono',
    authorRole: 'Host, 50th Golden Jubilee Soirée',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    timeAgo: '2 months ago',
    eventType: 'Private Milestone Celebration (180 Guests)',
    venue: 'Enashipai Resort & Spa, Lake Naivasha',
    reviewText: 'The team managed the Lake Naivasha winds with true engineering skill. We had geodetic heated dome tents, live fire pits, and acoustic jazz sound that filled the lawn without disturbing the nearby wildlife conservancy. Our guests are still texting us weeks later saying it was the best private party they’ve attended.',
    verified: true,
    likesCount: 16,
  },
  {
    id: 'rev-5',
    authorName: 'Grace Njeri Muthemba',
    authorRole: 'Managing Director, Pan-African Trade Summit',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    timeAgo: '3 months ago',
    eventType: 'Diplomatic Trade Expo (1,200 Delegates)',
    venue: 'Gigiri Diplomatic District / Safari Park',
    reviewText: 'Silver Sky handled our 3-day expo with presidential-grade security and protocol compliance. Their mobile generator fleets and laser-leveled flooring provided an exhibition ground that matched European standards. I will never work with another decor and rigging firm in Kenya.',
    verified: true,
    likesCount: 42,
  },
];
