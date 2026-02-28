import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const siteUrl = "https://jonasknppel.me";
const siteTitle = "Attention is currency";
const siteDescription =
  "Attention is currency. Jonas Knüppel builds digital persuasion and brand systems with Booked and Kernscale.";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
    "@context": "https://schema.org",
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
    "@context": "https://schema.org",
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

  const structuredData = [personJsonLd, websiteJsonLd];

  return (
    <html lang="en">
      <body className={inter.variable}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
