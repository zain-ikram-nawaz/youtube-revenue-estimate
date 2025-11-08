/** @type {import('next-sitemap').IConfig} */
const fetch = require('node-fetch');

const EXCLUDED_PATHS = [
  '/404',
  '/admin',
  '/components/*',
  '/src/*',
  '/_app',
  '/_document',
  '/models',
  '/middleware',
  '/form',
  '/hooks',
  '/lib',
  '/register',
  '/login',
  '/unauthorized',
];

module.exports = {
  siteUrl: 'https://channelincome.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  autoLastmod: true,
  exclude: EXCLUDED_PATHS,

  additionalPaths: async (config) => {
    const paths = [];

    // ✅ Include static important pages
    const staticPages = [
      '/',
      '/guide',
      '/about-us',
      '/contact-us',
      '/privacy-policy',
      '/terms-of-service',
      '/disclaimer',
    ];

    for (const page of staticPages) {
      paths.push(await config.transform(config, page));
    }

    // ✅ Fetch blog or guide pages dynamically from your API
    try {
      const res = await fetch('https://channelincome.com/api/guide');
      const data = await res.json();

      if (Array.isArray(data)) {
        for (const item of data) {
          if (item.slug) {
            const guidePath = `/guide/${item.slug}`;

            // ❌ Exclude sensitive or invalid paths
            const invalidSlugs = ['login', 'unauthorized', 'admin', 'register'];
            if (!invalidSlugs.includes(item.slug)) {
              paths.push(await config.transform(config, guidePath));
            }
          }
        }
      }
    } catch (error) {
      console.error('❌ Sitemap guide fetch error:', error);
    }

    return paths;
  },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/components/',
          '/src/',
          '/_next/',
          '/api/',
          '/middleware',
          '/models',
          '/login',
          '/unauthorized',
          '/register',
          '/admin',
        ],
      },
    ],
    additionalSitemaps: ['https://channelincome.com/sitemap.xml'],
  },
};
