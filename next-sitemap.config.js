/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://channelincome.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  autoLastmod: true,
  exclude: ['/404', '/admin'], // pages you don't want indexed
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://channelincome.com/sitemap.xml',
    ],
  },
};
