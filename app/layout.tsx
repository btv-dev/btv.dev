import type { Metadata } from "next";
import localFont from "next/font/local";
import { Rubik_Mono_One } from "next/font/google";
import "./globals.css";

// Local fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Google font
const rubikMonoOne = Rubik_Mono_One({
  subsets: ["latin"], // Ensure correct subsets are used
  weight: "400", // Rubik Mono One only supports 400 weight
  variable: "--font-rubik-mono-one", // Add a custom variable
});

export const metadata: Metadata = {
  title: "BTV dot Dev",
  description:
    "We craft digital identities for organizations that take pride in doing things differently.",
  openGraph: {
    title: "BTV dot Dev",
    description: "We craft digital identities for organizations that take pride in doing things differently.",
    url: "https://btv.dev",
    siteName: "BTV dot Dev",
    images: [
      {
        url: '/images/opengraph.png',
        width: 1200,
        height: 630,
        alt: "BTV dot Dev - Vermont Web Design Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BTV dot Dev",
    description: "We craft digital identities for organizations that take pride in doing things differently.",
    images: ['/images/opengraph.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${rubikMonoOne.variable} antialiased text-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
