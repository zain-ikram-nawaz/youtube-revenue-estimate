/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['yt3.googleusercontent.com','yt3.ggpht.com','channelincome.com','res.cloudinary.com',],
    },
    async redirects() {
        return [
            // Component pages ko homepage pe redirect
            {
                source: '/components/:path*',
                destination: '/',
                permanent: false, 
            },
            // Old youtube-guides redirects
            {
                source: '/youtube-guides/youtube-monetization-rpm-cpm-guide',
                destination: '/guide/youtube-monetization-rpm-cpm-guide',
                permanent: true,
            },
            {
                source: '/youtube-guides/how-to-grow-on-youtube-2025-tips-trends-mistakes',
                destination: '/guide/how-to-grow-on-youtube-2025-tips-trends-mistakes',
                permanent: true,
            },
            {
                source: '/youtube-guides/:slug*',
                destination: '/guide/:slug*',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;