import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-inter",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://smitgadhiya.com"),
  title: "Smit Gadhiya | Full-Stack Developer",
  description:
    "Smit Gadhiya is a Full-Stack Developer building scalable web applications, AI-powered products, backend systems, and business automation workflows.",
  openGraph: {
    title: "Smit Gadhiya | Full-Stack Developer",
    description:
      "Scalable web applications, AI-powered products, backend systems, and business automation workflows.",
    type: "website",
    locale: "en_IN",
    siteName: "Smit Gadhiya"
  },
  twitter: {
    card: "summary_large_image",
    title: "Smit Gadhiya | Full-Stack Developer",
    description:
      "Full-stack developer building production-ready web applications, AI products, backend systems, and automation."
  },
  icons: {
    icon: "/favicon.svg"
  }
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
