
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

const withPWA = require('next-pwa')({
  dest: './public',
  mode: 'production'
})

module.exports = withPWA(nextConfig)