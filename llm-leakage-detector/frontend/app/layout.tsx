import type { Metadata } from "next";
import { Special_Elite, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const stamp = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-stamp",
  display: "swap",
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Data Leakage Detector",
  description: "Scan text for leaked secrets and PII, redacted in real time.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${stamp.variable} ${sans.variable} ${mono.variable}`}>
        {children}
      </body>
    </html>
  );
}
