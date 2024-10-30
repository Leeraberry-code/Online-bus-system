const path = require('path'); // Import the path module

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... other configurations
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname), // Resolve '@/...' to the project root
    };
    return config;
  },
};

module.exports = nextConfig;
