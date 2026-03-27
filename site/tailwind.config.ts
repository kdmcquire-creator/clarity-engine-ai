import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: { 900: "#0a0f1e", 800: "#0d1526", 700: "#111d36", 600: "#162044" },
        blue: { 600: "#2563eb", 500: "#3b82f6", 400: "#60a5fa" },
        cyan: { 400: "#22d3ee", 500: "#06b6d4" },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Syne", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
