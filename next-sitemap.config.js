/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://channelincome.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  autoLastmod: true,
  exclude: ['/404', '/admin'],
};
