/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.paskelabyrint.no/:path*',
        // destination: 'http://localhost:8080/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
