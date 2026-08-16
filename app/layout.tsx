import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Roboto_Mono } from "next/font/google";
import AnalyticsConsent from "./AnalyticsConsent";
import TabTitleMessage from "./TabTitleMessage";
import ConsentHead from "./consent/ConsentHead";
import { consentConfig } from "./consent/config";
import "./globals.css";

const siteUrl = "https://jonasknppel.me";
const siteTitle = "Jonas Knüppel | Co-Founder, Managing Director & CTO at Kernscale";
const siteName = "Jonas Knüppel";
const siteDescription =
  "Jonas Knüppel is co-founder, managing director and CTO at Kernscale, leading technical architecture, product development and digital attention systems.";
const previewImage = "/opengraph-image";
const tabHiddenTitles = [
  "Attention is currency.",
  "Jonas heralds a new era of persuasion.",
  "Kernscale keeps moving.",
  "Come back before the market scrolls away.",
];

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
  alternates: {
    canonical: "/",
  },
  applicationName: siteName,
  keywords: [
    "Jonas Knüppel",
    "Kernscale CTO",
    "Kernscale managing director",
    "attention is currency",
    "Kernscale",
    "organic intelligence",
    "generative intelligence",
    "artificial perception",
    "digital marketing",
    "branding",
    "digital persuasion",
    "innovative marketing",
  ],
  authors: [{ name: "Jonas Knüppel", url: siteUrl }],
  creator: "Jonas Knüppel",
  publisher: "Jonas Knüppel",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName,
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: "Jonas Knüppel — Co-Founder, Managing Director & CTO at Kernscale",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [previewImage],
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
  children: ReactNode;
}>) {
  const personJsonLd = {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: "Jonas Knüppel",
    url: `${siteUrl}/`,
    image: `${siteUrl}/icon.png`,
    sameAs: [
      "https://www.instagram.com/jonasknppel/",
      "https://x.com/Knaviation_og",
    ],
    jobTitle: "Co-Founder, Managing Director & CTO",
    description: siteDescription,
    knowsAbout: [
      "organic intelligence",
      "generative intelligence",
      "artificial perception",
      "digital persuasion",
      "innovative marketing",
      "brand systems",
    ],
    worksFor: [
      {
        "@type": "Organization",
        "@id": "https://www.kernscale.de/#organization",
        name: "Kernscale",
        legalName: "Kernscale UG (haftungsbeschränkt) i. G.",
        url: "https://www.kernscale.de/",
      },
    ],
  };

  const websiteJsonLd = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: siteName,
    url: `${siteUrl}/`,
    inLanguage: "en",
    description: siteDescription,
    publisher: {
      "@id": `${siteUrl}/#person`,
    },
  };

  const webPageJsonLd = {
    "@type": "ProfilePage",
    "@id": `${siteUrl}/#webpage`,
    url: `${siteUrl}/`,
    name: siteTitle,
    description: siteDescription,
    inLanguage: "en",
    isPartOf: {
      "@id": `${siteUrl}/#website`,
    },
    mainEntity: {
      "@id": `${siteUrl}/#person`,
    },
    about: [
      {
        "@type": "Thing",
        name: "Organic intelligence",
      },
      {
        "@type": "Thing",
        name: "Generative intelligence",
      },
      {
        "@type": "Thing",
        name: "Artificial perception",
      },
    ],
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [personJsonLd, websiteJsonLd, webPageJsonLd],
  };

  return (
    <html lang="en" style={{ backgroundColor: "#020612", colorScheme: "dark" }}>
      <head>
        <meta name="theme-color" content="#020612" />
        <style>{`html,body{background:#020612!important;color:#f4f1ec}`}</style>
        <ConsentHead />
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
        <TabTitleMessage hiddenTitles={tabHiddenTitles} />
        {children}
        <AnalyticsConsent measurementId={consentConfig.measurementId} />
      </body>
    </html>
  );
}
