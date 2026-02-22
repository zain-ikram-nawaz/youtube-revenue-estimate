/** @type {import('next').NextConfig} */
const nextConfig = {
    // 1. Slash handling fix karein
    trailingSlash: false,

    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'yt3.googleusercontent.com' },
            { protocol: 'https', hostname: 'yt3.ggpht.com' },
            { protocol: 'https', hostname: 'channelincome.com' },
            { protocol: 'https', hostname: 'res.cloudinary.com' },
        ],
    },
    async redirects() {
        return [
            // Component pages ko homepage pe permanent redirect karein (301)
            {
                source: '/components/:path*',
                destination: '/',
                permanent: true,
            },
            // Specific redirects ko pehle rakhein
            {
                source: '/youtube-revenue-estimator',
                destination: '/tool/youtube-revenue-estimator',
                permanent: true,
            },
            // Pattern based redirects
            {
                source: '/youtube-guides/:slug*',
                destination: '/guide/:slug*',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;