import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-kanit)", "var(--font-noto-jp)", "sans-serif"],
        jp: ["var(--font-noto-jp)", "var(--font-kanit)", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#fdf2f8",
          100: "#fce7f3",
          500: "#ec4899",
          600: "#db2777",
          700: "#be185d",
          900: "#831843",
        },
        japan: {
          red: "#DC2626",
          dark: "#1E293B",
          card: "#F8FAFC",
        },
      },
    },
  },
  plugins: [],
};

export default config;
