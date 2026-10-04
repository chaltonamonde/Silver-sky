import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#030712",
};

export const metadata: Metadata = {
  title: "Silver Sky Events | Luxury Event Coordination, Decor & Heavy Infrastructure | Nairobi, Kenya",
  description: "Silver Sky Events is East Africa's premier event production agency. Specializing in luxury weddings, corporate galas, German clear-span marquees, concert line-array audio, and bespoke lighting in Nairobi, Mombasa, Naivasha & beyond.",
  keywords: [
    "Silver Sky Events",
    "Luxury event planner Nairobi",
    "Wedding decor Kenya",
    "Clear tent hire Nairobi",
    "German marquee rental Kenya",
    "Corporate gala production Nairobi",
    "LED screen rental Kenya",
    "Event sound and lighting Nairobi",
    "Diani beach destination weddings",
    "Naivasha wedding venues",
    "M-Pesa event booking",
  ],
  authors: [{ name: "Silver Sky Events Ltd" }],
  creator: "Silver Sky Events Ltd",
  openGraph: {
    title: "Silver Sky Events | Luxury Event Production & German Marquee Tents",
    description: "End-to-end luxury wedding decor, corporate summit staging, and heavy infrastructure across Nairobi and East Africa. 4.9★ Google rating.",
    url: "https://silverskyevents.co.ke",
    siteName: "Silver Sky Events",
    images: [
      {
        url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=85",
        width: 1200,
        height: 630,
        alt: "Silver Sky Events Luxury Clear Dome Production at Windsor Golf Hotel Nairobi",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Silver Sky Events | Luxury Event Coordination & Decor Kenya",
    description: "East Africa's premier event styling, German clear tents, line-array audio & bespoke production.",
    images: ["https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=85"],
  },
  alternates: {
    canonical: "https://silverskyevents.co.ke",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    name: "Silver Sky Events & Infrastructure Ltd",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=85",
    "@id": "https://silverskyevents.co.ke/#localbusiness",
    url: "https://silverskyevents.co.ke",
    telephone: "+254700123456",
    priceRange: "KES 450,000 - KES 15,000,000",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Enterprise Rd & Karen Hub Office Park",
      addressLocality: "Nairobi",
      addressRegion: "Nairobi County",
      postalCode: "00100",
      addressCountry: "KE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -1.3197,
      longitude: 36.7065,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "148",
      bestRating: "5",
      worstRating: "1",
    },
    areaServed: [
      { "@type": "City", name: "Nairobi" },
      { "@type": "City", name: "Mombasa" },
      { "@type": "City", name: "Diani Beach" },
      { "@type": "City", name: "Naivasha" },
      { "@type": "City", name: "Nakuru" },
      { "@type": "City", name: "Kisumu" },
      { "@type": "City", name: "Nanyuki" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:00",
        closes: "19:00",
      },
    ],
  };

  return (
    <html lang="en" className={`${cormorant.variable} ${plusJakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#030712] text-slate-100 antialiased selection:bg-amber-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
