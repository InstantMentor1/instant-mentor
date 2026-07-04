import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#101828",
        navy: {
          DEFAULT: "#0B1F4D",
          950: "#020818",
          900: "#060f2e",
          800: "#0a1845",
          700: "#0e2260",
        },
        electric: {
          500: "#2563EB",
          400: "#3B82F6",
          300: "#60A5FA",
          200: "#BFDBFE",
        },
        chalk: "#F8FAFC",
        deepblue: "#123C7C",
        academic: "#2563EB",
        coral: "#F15A3B",
        ivory: "#FFF8F0",
        peach: "#FFF0E8",
        skysoft: "#EAF3FF",
        iceblue: "#F5FAFF",
        teal: {
          50: "#EAF3FF",
          100: "#D8E9FF",
          500: "#2563EB",
          600: "#1D4ED8",
          700: "#0B1F4D",
          800: "#0B2147",
          900: "#071A38",
        },
        mentorblue: "#F15A3B",
      },
      boxShadow: {
        soft: "0 18px 42px -24px rgba(11, 31, 77, 0.22)",
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at 80% 18%, rgba(37,99,235,.16), transparent 28%), radial-gradient(circle at 12% 16%, rgba(241,90,59,.12), transparent 25%), linear-gradient(180deg, #F5FAFF 0%, #ffffff 56%, #EAF3FF 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
