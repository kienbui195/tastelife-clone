/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['shortdrama.lotusa.net'], loader: 'default',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'shortdrama.lotusa.net'
      }
    ]
  },
  reactStrictMode: false
};

export default nextConfig;
