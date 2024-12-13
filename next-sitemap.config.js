/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  generateRobotsTxt: false, // We already have a custom robots.txt
  exclude: ['/admin/*', '/api/*', '/auth/*'],
  generateIndexSitemap: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 7000,
  alternateRefs: [
    {
      href: `${process.env.NEXT_PUBLIC_SITE_URL}/en`,
      hreflang: 'en',
    },
    {
      href: `${process.env.NEXT_PUBLIC_SITE_URL}/ar`,
      hreflang: 'ar',
    },
  ],
  transform: async (config, path) => {
    // Custom transform function for dynamic routes
    if (path.startsWith('/product/')) {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }
    if (path.startsWith('/list')) {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      };
    }
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
