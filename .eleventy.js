
module.exports = function (eleventyConfig) {

    eleventyConfig.addPassthroughCopy("assets");

    return {

        dir: {
            // ⚠️ These values are both relative to your input directory.
            includes: "assets",
            layouts: "_layouts"
        }

    }
};