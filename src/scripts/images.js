const Image = require("@11ty/eleventy-img");

module.exports = async function imageShortcode(src, alt, sizes) {
    let metadata = await Image(src, {
        widths: [400, 800, 1280],
        formats: ['webp', 'jpg'],
        outputDir: "./dist/images/",
        urlPath: "../../images/"
    });

    let imageAttributes = {
        alt,
        sizes,
        loading: "lazy",
        decoding: "async",
    };

    // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
    return Image.generateHTML(metadata, imageAttributes);
};