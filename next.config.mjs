/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: process.env.NEXT_DIST_DIR || ".next",
  async redirects() {
    return [
      {
        source: "/categories",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/for-experts",
        destination: "/for-mentors",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
