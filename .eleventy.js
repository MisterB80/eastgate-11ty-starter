// Filters
const dateFilter = require('./src/filters/date-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');

// Scripts
const imageShortcode = require('./src/scripts/images.js');

// Transforms
const htmlmin = require('html-minifier');

const htmlMinTransform = (value, outputPath) => {
    if (outputPath && outputPath.indexOf('.html') > -1) {
        return htmlmin.minify(value, {
            useShortDoctype: true,
            removeComments: true,
            collapseWhitespace: true,
            minifyCSS: true
        });
    }

    return value;
};

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

    // Add transforms
    // Only minify HTML if we are in production because it slows builds _right_ down
    if (isProduction) {
        config.addTransform('htmlmin', htmlMinTransform);
    }

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