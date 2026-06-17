import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#123047",
        teal: {
          50: "#eff8ff",
          100: "#d9efff",
          500: "#2aa7df",
          600: "#138fc8",
          700: "#0879ad",
          800: "#0b5e86",
          900: "#0f4967",
        },
        mentorblue: "#f07a2a",
      },
      boxShadow: {
        soft: "0 20px 50px -24px rgba(19, 143, 200, 0.24)",
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at 80% 18%, rgba(240,122,42,.20), transparent 30%), radial-gradient(circle at 12% 12%, rgba(42,167,223,.18), transparent 28%), linear-gradient(180deg, #ffffff 0%, #eff8ff 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
