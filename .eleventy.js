import { VentoPlugin } from "eleventy-plugin-vento";
import markdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";

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
  eleventyConfig.setLibrary(
    "md",
    markdownIt({
      html: true,
      breaks: true,
      linkify: true,
    }).use(markdownItAttrs),
  );

  return {
    markdownTemplateEngine: "vto",
  };
}
