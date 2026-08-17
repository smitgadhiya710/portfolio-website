import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#07090d",
        foreground: "#f4f7fb",
        muted: "#99a3b2",
        panel: "#0d1118",
        panel2: "#111722",
        line: "rgba(255,255,255,0.1)",
        accent: "#52d2bc",
        amber: "#f1b85b",
        steel: "#8aa4c8"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"]
      },
      boxShadow: {
        glow: "0 18px 70px rgba(82, 210, 188, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
