import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'MNI Archive',
    template: '%s | MNI Archive',
  },
  description: "The chaotic yet lovely universe of Meenoi. Explore artworks, music, videos, and writings from MNI.",
  keywords: ['mni', 'meenoi', 'archive', 'artist', 'portfolio', 'artwork', 'music', 'video', 'writing'],
  authors: [{ name: 'MNI (Meenoi)' }],
  creator: 'MNI',
  publisher: 'MNI Archive',
  openGraph: {
    type: 'website',
    url: 'https://mni-archive-v2.pages.dev',
    title: 'MNI Archive',
    description: "The chaotic yet lovely universe of Meenoi. Explore artworks, music, videos, and writings from MNI.",
    siteName: 'MNI Archive',
    images: [
      {
        url: 'https://mni-archive-v2.pages.dev/mni-artwork-sample.png',
        width: 1200,
        height: 630,
        alt: 'MNI Archive',
      },
    ],
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MNI Archive',
    description: "The chaotic yet lovely universe of Meenoi. Explore artworks, music, videos, and writings from MNI.",
    images: ['https://mni-archive-v2.pages.dev/mni-artwork-sample.png'],
    creator: '@mni',
    site: '@mni',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Google Search Console verification (add your code later)
    // google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={inter.variable}>
      <body className="font-sans">
        <Navigation />
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}
