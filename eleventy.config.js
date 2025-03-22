const path = require('path');

// Export formatDate function for testing
const formatDate = function (value, format) {
  if (format === 'year') {
    return new Date().getFullYear();
  }
  return value;
};

// Function to recursively get all JSON files from a directory
const getAllJsonFiles = (dir) => {
  const fs = require('fs');
  const path = require('path');
  const files = fs.readdirSync(dir);
  const jsonFiles = {};

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recursively get files from subdirectories
      Object.assign(jsonFiles, getAllJsonFiles(filePath));
    } else if (file.endsWith('.json')) {
      // Get the key name from the file path relative to the data directory
      const key = path
        .relative(path.join(__dirname, 'src/content/data'), filePath)
        .replace(/\.json$/, '')
        .replace(/\\/g, '/')
        .split('/')
        .pop();

      jsonFiles[key] = require(filePath);
    }
  });

  return jsonFiles;
};

module.exports = function (eleventyConfig) {
  // Add formatDate filter
  eleventyConfig.addFilter('formatDate', formatDate);

  // Add merge filter
  eleventyConfig.addFilter('merge', function (obj1, obj2) {
    return { ...obj1, ...obj2 };
  });

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
      if (data.page.filePathStem.startsWith('/content/pages/')) {
        const path = data.page.filePathStem.replace(/^\/content\/pages\//, '');
        return path === 'index' ? '/' : `/${path}/`;
      }
      return data.permalink;
    },
  });

  // Automatically load all JSON files from the data directory
  const dataDir = path.join(__dirname, 'src/content/data');
  const jsonFiles = getAllJsonFiles(dataDir);

  // Add each JSON file as global data
  Object.entries(jsonFiles).forEach(([key, data]) => {
    eleventyConfig.addGlobalData(key, data);
  });

  return {
    dir: {
      input: 'src',
      includes: 'content/components',
      layouts: 'layouts',
      output: 'dist',
      data: 'content/data',
    },
    templateFormats: ['njk', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};

// Export for testing
module.exports.formatDate = formatDate;
