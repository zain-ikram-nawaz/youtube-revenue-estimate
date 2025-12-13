/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['yt3.googleusercontent.com','yt3.ggpht.com','channelincome.com','res.cloudinary.com',],
    },
    async redirects() {
        return [
            // Old youtube-guides URLs ko new guide URLs pe redirect
            {
                source: '/youtube-guides/youtube-monetization-rpm-cpm-guide',
                destination: '/guide/youtube-monetization-rpm-cpm-guide',
                permanent: true, // 301 redirect
            },
            // {
            //     source: '/youtube-guides/how-to-grow-on-youtube-2025-tips-trends-mistakes',
            //     destination: '/guide/how-to-grow-on-youtube-2025-tips-trends-mistakes',
            //     permanent: true,
            // },
            // Catch-all: Baaki saare youtube-guides URLs ko guide pe redirect
            {
                source: '/youtube-guides/:slug*',
                destination: '/guide/:slug*',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;