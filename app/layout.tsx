import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const siteUrl = "https://jonasknppel.me";
const siteTitle = "Jonas Knüppel";
const siteDescription = "Attention is curency";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Jonas Knoppel",
  },
  description: siteDescription,
  applicationName: "Jonas Knüppel",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Jonas Knoppel",
    "Booked",
    "Kernscale",
    "personal website",
    "digital marketing",
    "branding",
  ],
  authors: [{ name: "Jonas Knüppel", url: siteUrl }],
  creator: "Jonas Knüppel",
  publisher: "Jonas Knüppel",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: "Jonas Knüppel",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Jonas Knüppel personal website preview",
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
  };

  return (
    <html lang="en">
      <body className={inter.variable}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
