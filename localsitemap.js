const siteUrl = 'https://www.kakeletools.com/';

const links = ['/wiki'];

const test = async config => {
  const result = await Promise.all(
    links.map(async link => await config.transform(config, link)),
  );
  return result;
};

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
  additionalPaths: async config => await test(config),
};
