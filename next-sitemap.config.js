/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://channelincome.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  autoLastmod: true,

  // ❌ Ye pages & folders sitemap se bahar rahenge
  exclude: [
    '/404',
    '/admin',
    '/components/*',
    '/src/*',
    '/_app',
    '/_document',
    '/models',
    '/middelware',
    '/form',
    '/hooks',
    '/lib',
    '/register',

  ],
  // ✅ Add manually included pages (force include homepage)
  additionalPaths: async (config) => [
    await config.transform(config, '/'),
  ],

  // ✅ robots.txt config (optional but recommended)
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/components/', '/src/', '/_next/', '/api/','middleware','models'],
      },
    ],
    additionalSitemaps: [
      'https://channelincome.com/sitemap.xml',
    ],
  },
};
