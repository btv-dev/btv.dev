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
  title: "BTV.dev",
  description: "We're a web agency looking to make the world a better place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${rubikMonoOne.variable} antialiased text-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
