import { VentoPlugin } from "eleventy-plugin-vento";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function(eleventyConfig) {
  eleventyConfig.setInputDirectory("site");
  eleventyConfig.setOutputDirectory("public");
  eleventyConfig.addPassthroughCopy("site/assets");
  eleventyConfig.addPassthroughCopy({ "bsky-pathfinder/dist": "tools/bsky-pathfinder" });
  eleventyConfig.addPlugin(VentoPlugin, {
    plugins: [],

    shortcodes: true,
    pairedShortcodes: true,
    filters: true,

    autotrim: false,

    ignoreTag: false,

    ventoOptions: {
      includes: eleventyConfig.directories.includes,
    },
  });
}
