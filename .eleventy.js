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
  eleventyConfig.addPairedShortcode("navlink", function(content, href, text, collections) {
    const newContent = collections.newContent.map(x => x.page.url);
    const id = href.replaceAll("/", "-");
    return `<a id="tooltip-${id}" data-has-tooltip href=${href} ${
      newContent.includes(href) ? "class=\"new\"" : ""
    }>${content} <div id="tooltip-${id}-content" class="tooltip">${text}</div></a>`;
  });
  eleventyConfig.addPairedShortcode("tooltip", function(content, id, text) {
    return `<button id="tooltip-${id}" data-has-tooltip>${content} <div id="tooltip-${id}-content" class="tooltip">${text}</div></button>`;
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
