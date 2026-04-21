/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allows Next.js to compile the shared package
  transpilePackages: ['@rxconnect/shared'],
}

module.exports = nextConfig
