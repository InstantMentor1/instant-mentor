import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#181012",
        teal: {
          50: "#fff1f1",
          100: "#ffdede",
          500: "#ef1f24",
          600: "#d90d12",
          700: "#bd0005",
          800: "#8f0004",
          900: "#580003",
        },
        mentorblue: "#5d5a69",
      },
      boxShadow: {
        soft: "0 20px 50px -24px rgba(189, 0, 5, 0.28)",
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at 76% 24%, rgba(239,31,36,.20), transparent 32%), radial-gradient(circle at 10% 10%, rgba(24,16,18,.10), transparent 28%), linear-gradient(180deg, #fff 0%, #fff5f5 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
