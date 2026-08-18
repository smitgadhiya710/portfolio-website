import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const themeInitializationScript = `
  (() => {
    try {
      const storedTheme = localStorage.getItem("portfolio-theme");
      const theme = storedTheme === "light" || storedTheme === "dark"
        ? storedTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

      document.documentElement.dataset.theme = theme;
    } catch {
      document.documentElement.dataset.theme = "dark";
    }
  })();
`;

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializationScript }} />
      </head>
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
