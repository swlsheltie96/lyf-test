require("dotenv").config();

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/css");

  eleventyConfig.addCollection(
    "portfolio",
    function (collection) {
      return collection.getFilteredByGlob(
        "portfolio/*.md"
      );
    }
  );

  return {
    pathPrefix: "/.netlify/functions",
    dir: {
      input: ".",
      output: "_site",
      includes: "src/_includes",
    },
  };
};
