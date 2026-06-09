import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#102a36",
        teal: {
          50: "#eaf8f7",
          100: "#ccecea",
          500: "#0d8985",
          600: "#087570",
          700: "#006460",
          800: "#064f4d",
          900: "#063f3e",
        },
        mentorblue: "#71889b",
      },
      boxShadow: {
        soft: "0 20px 50px -24px rgba(6, 79, 77, 0.28)",
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at 76% 30%, rgba(13,137,133,.18), transparent 32%), radial-gradient(circle at 12% 12%, rgba(113,136,155,.16), transparent 25%)",
      },
    },
  },
  plugins: [],
};

export default config;
