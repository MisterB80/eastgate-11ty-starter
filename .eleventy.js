// Filters
const dateFilter = require('./src/filters/date-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');

// Scripts
const imageShortcode = require('./src/scripts/images.js');

module.exports = config => {

    // Create a helpful production flag
    const isProduction = process.env.NODE_ENV === 'production';

    // Returns a collection of blog posts in reverse date order
    config.addCollection('blog', collection => {
        return [...collection.getFilteredByGlob('./src/site/posts/*.md')].reverse();
    });

    // Add filters
    config.addFilter('dateFilter', dateFilter);
    config.addFilter('w3DateFilter', w3DateFilter);

    // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
    config.setUseGitIgnore(false);

    // Add shortcodes
    config.addNunjucksAsyncShortcode("image", imageShortcode);

    return {
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dir: {
            input: "src/site",
            includes: "../_includes",
            output: "dist",
            data: "../_data"
        },
    };
};