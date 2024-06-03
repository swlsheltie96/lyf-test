require("dotenv").config();

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/css");
  console.log("FIMSDLKVJSDLKFJLSDKFJLSDKJF");
  eleventyConfig.addShortcode("fuck", function () {
    return "Hello from myFunction!";
  });
  return {
    pathPrefix: "/.netlify/functions",
    dir: {
      input: ".",
      output: "_site",
      includes: "src/_includes",
    },
  };
};
