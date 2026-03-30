import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const siteUrl = "https://jonasknppel.me";
const siteTitle = "Attention is currency";
const siteDescription =
  "Attention is currency. Jonas Knüppel builds digital persuasion and brand systems with Booked and Kernscale.";
const gaMeasurementId = "G-VW07BRCCZ3";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  applicationName: siteTitle,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Jonas Knüppel",
    "attention is currency",
    "Booked",
    "Kernscale",
    "digital marketing",
    "branding",
    "digital persuasion",
  ],
  authors: [{ name: "Jonas Knüppel", url: siteUrl }],
  creator: "Jonas Knüppel",
  publisher: "Jonas Knüppel",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: siteTitle,
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Attention is currency preview",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = {
    "@type": "Person",
    name: "Jonas Knüppel",
    url: siteUrl,
    sameAs: [
      "https://www.instagram.com/jonasknppel/",
      "https://x.com/Knaviation_og",
    ],
    jobTitle: "Digital Marketing and Brand Strategy",
    worksFor: [
      {
        "@type": "Organization",
        name: "Booked",
        url: "https://bookedin4u.com/",
      },
      {
        "@type": "Organization",
        name: "Kernscale",
        url: "https://www.kernscale.de/",
      },
    ],
  };

  const websiteJsonLd = {
    "@type": "WebSite",
    name: siteTitle,
    url: siteUrl,
    inLanguage: "en",
    description: siteDescription,
    publisher: {
      "@type": "Person",
      name: "Jonas Knüppel",
    },
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [personJsonLd, websiteJsonLd],
  };

  return (
    <html lang="en" style={{ backgroundColor: "#020612", colorScheme: "dark" }}>
      <head>
        <meta name="theme-color" content="#020612" />
        <style>{`html,body{background:#020612!important;color:#f4f1ec}`}</style>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaMeasurementId}');
          `}
        </Script>
      </head>
      <body
        className={`${inter.variable} ${robotoMono.variable}`}
        style={{
          margin: 0,
          backgroundColor: "#020612",
          color: "#f4f1ec",
          minHeight: "100vh",
        }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
