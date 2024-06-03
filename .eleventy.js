require("dotenv").config();

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/css");
  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "src/_includes",
    },
  };
};
