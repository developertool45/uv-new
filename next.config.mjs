/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/news-api/:path*",
        destination: "https://feeds.feedburner.com/:path*", // NDTV ke liye
      },
      {
        source: "/hindu-api/:path*",
        destination: "https://www.thehindu.com/:path*", // The Hindu ke liye
      },
    ];
  },
};

export default nextConfig;
