/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["supernovas.app", "assets.vercel.com", "images.deso.org", "*.arweave.next", "www.arweave.net", "pbs.twimg.com"]
  }
};

module.exports = nextConfig;
