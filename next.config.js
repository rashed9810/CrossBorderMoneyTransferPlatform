module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',  // This allows all hostnames
      },
    ],
  },
    experimental: {
      missingSuspenseWithCSRBailout: false,
    },
  }