module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("css");

  return {
    dir: {
      input: ".", // Input directory is now the root of your project
      output: "../_site", // Output directory is outside the `src/` folder
    },
    // Other configuration options
  };
};
