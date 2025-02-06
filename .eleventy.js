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
  eleventyConfig.addCollection("newContent", async function(collectionsApi) {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    return collectionsApi.getAll().filter(function(item) {
      return item.page.date > oneWeekAgo;
    });
  });
  eleventyConfig.addPairedShortcode("inlink", function(content, href, collections) {
    const newContent = collections.newContent.map(x => x.page.url);
    return `<a href=${href} ${newContent.includes(href) ? "class=\"new\"" : ""}>${content}</a>`;
  });

  return {
    markdownTemplateEngine: "vto",
  };
}
