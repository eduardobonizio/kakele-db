/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com'],
  },
  i18n: {
    locales: ['en', 'pt'],
    defaultLocale: 'en',
  },
};

module.exports = nextConfig;
