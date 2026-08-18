import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--color-background) / <alpha-value>)",
        foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        panel: "rgb(var(--color-panel) / <alpha-value>)",
        panel2: "rgb(var(--color-panel-2) / <alpha-value>)",
        line: "rgb(var(--color-line) / var(--color-line-opacity))",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        "accent-hover": "rgb(var(--color-accent-hover) / <alpha-value>)",
        "accent-foreground": "rgb(var(--color-accent-foreground) / <alpha-value>)",
        amber: "rgb(var(--color-amber) / <alpha-value>)",
        steel: "rgb(var(--color-steel) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)"
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
