import type { Metadata, Viewport } from "next";
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
  metadataBase: new URL("https://smit-gadhiya-portfolio.vansita-empiricinfot.chatgpt.site"),
  title: {
    default: "Smit Gadhiya — Full Stack. Full Depth.",
    template: "%s",
  },
  description:
    "Smit Gadhiya engineers expressive product interfaces, resilient backend systems, and useful AI workflows.",
  openGraph: {
    title: "Smit Gadhiya — Full Stack. Full Depth.",
    description:
      "Full-stack development, backend architecture, applied AI, and automation built with intent.",
    type: "website",
    locale: "en_IN",
    siteName: "Smit Gadhiya",
    images: [
      {
        url: "/og.png",
        alt: "Smit Gadhiya — Full Stack. Full Depth.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Smit Gadhiya — Full Stack. Full Depth.",
    description: "Product interfaces, backend systems, and AI workflows built for the real world.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#06070B",
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
