import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF6B35",
        secondary: "#4CAF50",
        accent: "#FFC107"
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem"
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,0.08)"
      }
    }
  }
};

export default config;