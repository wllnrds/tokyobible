const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA(nextConfig)