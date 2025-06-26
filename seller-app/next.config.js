/** @type {import('next').NextConfig} */

//const result = require("dotenv").config({ path: `.env.${process.env.NODE_ENV}`, override: false });

//console.log("result", result);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  //env: result.parsed,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
