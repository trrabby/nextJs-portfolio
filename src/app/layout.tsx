// RootLayout.tsx (Server Component)
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/Providers";

export const metadata: Metadata = {
  title: {
    default: "Towfiq's Portfolio | Full-Stack Developer",
    template: "%s | Towfiq's Portfolio",
  },
  description:
    "Explore the professional portfolio of Md Towfiqur Rahman — a full-stack developer specializing in MERN, Next.js, and modern web applications.",
  applicationName: "Towfiq's Portfolio",
  creator: "Md Towfiqur Rahman",
  authors: [
    {
      name: "Md Towfiqur Rahman",
      url: "https://towfiq-portfolio.netlify.app",
    },
  ],
  keywords: [
    "Towfiqur Rahman",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "MERN Stack",
    "Web Portfolio",
    "Bangladesh Developer",
  ],
  metadataBase: new URL("https://towfiq-portfolio.netlify.app"),
  openGraph: {
    title: "Towfiqur Rahman | Full-Stack Developer",
    description:
      "Professional portfolio of Md Towfiqur Rahman — showcasing modern web projects built with MERN, Next.js, and TypeScript.",
    url: "https://towfiq-portfolio.netlify.app",
    siteName: "Towfiq's Portfolio",
    images: [
      {
        url: "https://i.ibb.co.com/PZW421Y9/Whats-App-Image-2025-05-14-at-19-20-19.jpg",
        width: 1200,
        height: 630,
        alt: "Towfiq's Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Towfiqur Rahman | Full-Stack Developer",
    description:
      "Explore my professional portfolio showcasing Next.js, MERN stack, and TypeScript projects.",
    creator: "@towfiqurrahman",
    images: [
      "https://i.ibb.co.com/PZW421Y9/Whats-App-Image-2025-05-14-at-19-20-19.jpg",
    ],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
