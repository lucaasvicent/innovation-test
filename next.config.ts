/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imgprodutos.s3.us-east-2.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'apihomolog.innovationbrindes.com.br',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'innovationbrindes.com.br',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;