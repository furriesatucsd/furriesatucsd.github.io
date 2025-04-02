const eleventyConfig = require('../eleventy.config.js');

describe('Eleventy Permalink Configuration', () => {
  let mockEleventyConfig;

  beforeEach(() => {
    mockEleventyConfig = {
      addFilter: jest.fn(),
      addGlobalData: jest.fn(),
      addPassthroughCopy: jest.fn(),
    };
    eleventyConfig(mockEleventyConfig);
  });

  it('should generate correct permalinks for different page types', () => {
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
