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
            // ── Keyword URL variants → canonical tool page ──
            {
                source: '/youtube-revenue-estimator',
                destination: '/tool/youtube-revenue-calculator',
                permanent: true,
            },
            {
                source: '/youtube-cpm-calculator',
                destination: '/tool/youtube-revenue-calculator',
                permanent: true,
            },
            {
                source: '/cpm-calculator',
                destination: '/tool/youtube-revenue-calculator',
                permanent: true,
            },
            {
                source: '/youtube-rpm-estimator',
                destination: '/tool/youtube-revenue-calculator',
                permanent: true,
            },
            {
                source: '/youtube-earnings-estimator',
                destination: '/tool/youtube-revenue-calculator',
                permanent: true,
            },
            {
                source: '/youtube-income-estimator',
                destination: '/tool/youtube-revenue-calculator',
                permanent: true,
            },
            {
                source: '/youtube-money-calculator',
                destination: '/tool/youtube-revenue-calculator',
                permanent: true,
            },
            {
                source: '/youtube-earnings-calculator',
                destination: '/tool/youtube-revenue-calculator',
                permanent: true,
            },
            {
                source: '/youtube-channel-earnings-calculator',
                destination: '/tool/youtube-revenue-calculator',
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