// Export formatDate function for testing
const formatDate = function (value, format) {
  if (format === 'year') {
    return new Date().getFullYear();
  }
  return value;
};

module.exports = function (eleventyConfig) {
  // Add formatDate filter
  eleventyConfig.addFilter('formatDate', formatDate);

  // Copy static assets that don't need processing
  eleventyConfig.addPassthroughCopy({
    'src/assets/images': 'assets/images',
    'src/assets/fonts': 'assets/fonts',
    'src/assets/favicon/favicon.ico': 'favicon.ico',
    'src/assets/favicon/favicon.svg': 'favicon.svg',
    'src/assets/favicon/favicon-96x96.png': 'favicon-96x96.png',
    'src/assets/favicon/apple-touch-icon.png': 'apple-touch-icon.png',
    'src/assets/favicon/site.webmanifest': 'site.webmanifest',
    'src/assets/favicon/web-app-manifest-192x192.png': 'web-app-manifest-192x192.png',
    'src/assets/favicon/web-app-manifest-512x512.png': 'web-app-manifest-512x512.png',
    'src/google4ab10371724a18a3.html': 'google4ab10371724a18a3.html',
  });

  // Configure permalinks for content pages
  eleventyConfig.addGlobalData('eleventyComputed', {
    permalink: (data) => {
      if (data.page.filePathStem.startsWith('/_content/pages/')) {
        const path = data.page.filePathStem.replace(/^\/_content\/pages\//, '');
        return path === 'index' ? '/' : `/${path}/`;
      }
      return data.permalink;
    },
  });

  return {
    dir: {
      input: 'src',
      includes: '_includes',
      layouts: '_layouts',
      output: 'dist',
      data: '_data',
    },
    templateFormats: ['njk', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};

// Export for testing
module.exports.formatDate = formatDate;
