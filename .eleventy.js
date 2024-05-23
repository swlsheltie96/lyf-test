module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addShortcode("figmaAccessToken", function () {
    return process.env.FIGMA_ACCESS_TOKEN;
  });
  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "src/_includes",
    },
  };
};
