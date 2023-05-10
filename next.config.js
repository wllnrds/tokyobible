const STUDIO_REWRITE = {
    source: "/studio/:path*",
    destination: process.env.NODE_ENV === "development" ? 
    "http://localhost:3333/studio/:path*" : "/studio/index.html",
}

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,  
	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.resolve.fallback = { fs: false }
		}
		return config;
	},
	images: {
		domains: [
			'cdn.sanity.io',
			'avatars.dicebear.com'
		]
	},
	rewrites: async () => [STUDIO_REWRITE],
}

const withPWA = require('next-pwa')({
  dest: './public',
  mode: 'production'
})

module.exports = withPWA(nextConfig)