module.exports = {
  async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:3010/api/:path*',
        },
      ]
    },
};
