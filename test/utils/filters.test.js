const { formatDate } = require('../../eleventy.config.js');

describe('formatDate filter', () => {
  it('should return current year when format is "year"', () => {
    const currentYear = new Date().getFullYear();
    expect(formatDate(null, 'year')).toBe(currentYear);
  });

  it('should return original value for non-year formats', () => {
    const testDate = '2024-03-14';
    expect(formatDate(testDate, 'invalid')).toBe(testDate);
  });
});
