import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        clay: {
          50: "#faf9f7",
          100: "#f5f3f0",
          200: "#ede8e3",
          300: "#e5ddd5",
          400: "#d4c8bc",
          500: "#c4b5a0",
          600: "#b5a690",
          700: "#a89682",
          800: "#8f7a66",
          900: "#6b5d4f",
        },
      },
      boxShadow: {
        clay: "0 10px 30px rgba(0, 0, 0, 0.08), 0 1px 8px rgba(0, 0, 0, 0.04)",
        "clay-lg": "0 20px 50px rgba(0, 0, 0, 0.12), 0 2px 12px rgba(0, 0, 0, 0.06)",
      },
      backdropBlur: {
        clay: "10px",
      },
    },
  },
  plugins: [],
};

export default config;

