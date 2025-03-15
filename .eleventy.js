/**
 * Eleventy configuration
 */
module.exports = function (eleventyConfig) {
    // Copy assets that don't need processing
    eleventyConfig.addPassthroughCopy("src/assets/images");
    eleventyConfig.addPassthroughCopy("src/assets/favicon");
    eleventyConfig.addPassthroughCopy("src/assets/js");
    
    // Add date formatting filter
    eleventyConfig.addFilter("formatDate", function(date, format) {
        // Simple formatting for common date formats
        const d = new Date(date);
        
        if (format === "year") {
            return d.getFullYear();
        } else if (format === "full") {
            return d.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        } else if (format === "short") {
            return d.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });
        }
        
        return d.toLocaleDateString('en-US');
    });
    
    // Add limit filter for arrays/collections
    eleventyConfig.addFilter("limit", function (arr, limit) {
        return Array.isArray(arr) ? arr.slice(0, limit) : arr;
    });

    return {
        dir: {
            input: "src",
            output: "dist",
            includes: "_includes",
            layouts: "_layouts"
        }
    };
};
