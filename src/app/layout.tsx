import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const SITE_NAME = "Floría";
const SITE_URL = "https://floria.com.mx";
const DESCRIPTION =
  "Florería en Guadalajara con entrega a domicilio el mismo día. Arreglos florales frescos para bodas, cumpleaños, aniversarios y más. Flores frescas garantizadas 5 días.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} · Florería en Guadalajara con Entrega a Domicilio`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  keywords: [
    "florería guadalajara",
    "flores a domicilio guadalajara",
    "arreglos florales guadalajara",
    "ramos de flores guadalajara",
    "florería online jalisco",
    "flores para bodas guadalajara",
    "rosas a domicilio guadalajara",
    "arreglos para cumpleaños guadalajara",
    "florería zapopan",
    "flores tlaquepaque",
    "floristería guadalajara",
    "flores frescas guadalajara",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} · Florería en Guadalajara con Entrega a Domicilio`,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} · Florería en Guadalajara`,
    description: DESCRIPTION,
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Florist",
  name: SITE_NAME,
  description: DESCRIPTION,
  url: SITE_URL,
  telephone: "+523221575991",
  priceRange: "$$",
  image: `${SITE_URL}/og-image.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Calle Madero 423, Col. Centro",
    addressLocality: "Guadalajara",
    addressRegion: "Jalisco",
    postalCode: "44100",
    addressCountry: "MX",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 20.6597,
    longitude: -103.3496,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: "10:00",
      closes: "15:00",
    },
  ],
  hasMap: "https://maps.google.com/?q=Guadalajara,Jalisco",
  areaServed: [
    "Guadalajara", "Zapopan", "Tlaquepaque", "Tonalá",
    "Providencia", "Chapalita",
  ],
  sameAs: [
    `https://wa.me/523221575991`,
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
