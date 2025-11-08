// /** @type {import('next-sitemap').IConfig} */
// const fetch = require('node-fetch');

// module.exports = {
//   siteUrl: 'https://channelincome.com',
//   generateRobotsTxt: true,
//   sitemapSize: 7000,
//   changefreq: 'daily',
//   priority: 0.7,
//   autoLastmod: true,

// exclude: [
//   '/404',
//   '/_app',
//   '/_document',
//   '/admin',       // exact page
//   '/admin/*',     // agar aur subroutes hain
//   '/form',        // exact form page
//   '/login',
//   '/register',
//   '/unauthorized',
//   '/components/*',
//   '/src/*',
//   '/api/*',
//   '/middleware',
//   '/models',
// ],


//   // Additional paths: static + dynamic
//   additionalPaths: async (config) => {
//     const paths = [];

//     // ✅ Static important pages
//     const staticPages = [
//       '/',
//       '/guide',
//       '/about-us',
//       '/contact-us',
//       '/privacy-policy',
//       '/terms-of-service',
//       '/disclaimer',
//     ];
//     for (const page of staticPages) {
//       paths.push(await config.transform(config, page));
//     }

//     // ✅ Dynamic guide pages
//     try {
//       const res = await fetch('https://channelincome.com/api/guide'); // your API endpoint
//       const data = await res.json();
//  const guidesArray = data?.guides;
//       if (Array.isArray(guidesArray)) {
//         for (const item of guidesArray) {
//           if (item.slug) {
//             paths.push(await config.transform(config, `/guide/${item.slug}`));
//           }
//         }
//       }
//     } catch (error) {
//       console.error('❌ Sitemap guide fetch error:', error);
//     }

//     return paths;
//   },

//   robotsTxtOptions: {
//     policies: [
//       {
//         userAgent: '*',
//         allow: '/',
//         disallow: [
//           '/components/',
//           '/src/',
//           '/_next/',
//           '/api/',
//           '/middleware/',
//           '/models/',
//           '/login',
//           '/unauthorized',
//           '/form'
//         ],
//       },
//     ],
//     additionalSitemaps: [
//       'https://channelincome.com/sitemap.xml',
//     ],
//   },
// };
