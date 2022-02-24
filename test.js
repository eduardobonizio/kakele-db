const siteUrl = 'https://www.kakeletools.com/';

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', disallow: '/wiki-to-json' },
      { userAgent: '*', allow: '/' },
    ],
  },
  exclude: ['/wiki-to-json'],
};
