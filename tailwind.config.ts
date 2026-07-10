import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#004F57",
        secondary: "#0297C7",
        accent: "#ED3B17",
        highlight: "#FCD727",
        dark: "#0a0a0a",
        darker: "#1a1a1a",
        light: "#f9fafb",
        cyanbright: "#00D9FF",
      },
      fontFamily: {
        header: ["Syne", "sans-serif"],
        body: ["Satoshi", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
