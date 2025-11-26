/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@mui/x-editor', '@base-ui-components/react'],
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
