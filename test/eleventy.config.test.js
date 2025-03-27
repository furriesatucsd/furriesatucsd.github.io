const eleventyConfig = require('../eleventy.config.js');

describe('Eleventy Configuration', () => {
  let config;
  let mockEleventyConfig;

  beforeEach(() => {
    mockEleventyConfig = {
      addFilter: jest.fn(),
      addPassthroughCopy: jest.fn(),
      addGlobalData: jest.fn(),
    };
    config = eleventyConfig(mockEleventyConfig);
  });

  describe('Directory Configuration', () => {
    it('should have correct directory structure', () => {
      expect(config.dir).toEqual({
        input: 'src',
        includes: 'content/components',
        layouts: 'layouts',
        output: 'dist',
        data: 'content/data',
      });
    });

    it('should have correct template formats', () => {
      expect(config.templateFormats).toEqual(['njk', 'md']);
      expect(config.htmlTemplateEngine).toBe('njk');
      expect(config.markdownTemplateEngine).toBe('njk');
    });
  });

  describe('Filters', () => {
    it('should add formatDate filter', () => {
      expect(mockEleventyConfig.addFilter).toHaveBeenCalledWith('formatDate', expect.any(Function));
    });
  });

  describe('Passthrough Copy', () => {
    it('should configure static asset copying', () => {
      expect(mockEleventyConfig.addPassthroughCopy).toHaveBeenCalledWith({
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
    });
  });

  describe('Permalink Configuration', () => {
    it('should add eleventyComputed global data', () => {
      expect(mockEleventyConfig.addGlobalData).toHaveBeenCalledWith(
        'eleventyComputed',
        expect.any(Object)
      );
    });

    it('should generate correct permalinks', () => {
      const { permalink } = mockEleventyConfig.addGlobalData.mock.calls.find(
        (call) => call[0] === 'eleventyComputed'
      )[1];

      // Test index page
      expect(
        permalink({
          page: {
            filePathStem: '/content/pages/index',
          },
        })
      ).toBe('/');

      // Test regular page
      expect(
        permalink({
          page: {
            filePathStem: '/content/pages/about',
          },
        })
      ).toBe('/about/');

      // Test non-content page
      expect(
        permalink({
          page: {
            filePathStem: '/other/path',
          },
          permalink: '/custom/',
        })
      ).toBe('/custom/');
    });
  });
});
