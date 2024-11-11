/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function (eleventyConfig) {
	eleventyConfig.setInputDirectory("site");
	eleventyConfig.setOutputDirectory("public");
}
