/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.btv.dev',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/404', '/500'], // Add any paths you want to exclude
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
}
