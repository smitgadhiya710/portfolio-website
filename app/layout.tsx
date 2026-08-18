import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://smitgadhiya.com"),
  title: "Smit Gadhiya — Full-Stack Developer",
  description:
    "Smit Gadhiya engineers expressive product interfaces, resilient backend systems, and useful AI workflows.",
  openGraph: {
    title: "Smit Gadhiya — Building Digital Systems",
    description:
      "Full-stack development, backend architecture, applied AI, and automation built with intent.",
    type: "website",
    locale: "en_IN",
    siteName: "Smit Gadhiya",
    images: [
      {
        url: "/og.png",
        width: 1744,
        height: 910,
        alt: "Smit Gadhiya — Building Digital Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Smit Gadhiya — Building Digital Systems",
    description: "Product interfaces, backend systems, and AI workflows built for the real world.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
