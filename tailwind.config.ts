import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#172033",
        navy: "#102A56",
        academic: "#2563EB",
        coral: "#F15A3B",
        ivory: "#FFF8F0",
        peach: "#FFF0E8",
        skysoft: "#EAF3FF",
        teal: {
          50: "#EAF3FF",
          100: "#D8E9FF",
          500: "#2563EB",
          600: "#1D4ED8",
          700: "#102A56",
          800: "#0B2147",
          900: "#071A38",
        },
        mentorblue: "#F15A3B",
      },
      boxShadow: {
        soft: "0 18px 42px -24px rgba(16, 42, 86, 0.28)",
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at 80% 18%, rgba(241,90,59,.16), transparent 30%), radial-gradient(circle at 12% 12%, rgba(37,99,235,.14), transparent 28%), linear-gradient(180deg, #FFF8F0 0%, #ffffff 58%, #EAF3FF 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
