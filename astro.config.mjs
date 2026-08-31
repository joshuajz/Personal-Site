import { defineConfig } from "astro/config";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeFootnoteLinks from "./src/lib/rehype-footnote-links.mjs";
import rehypeHeadingLinks from "./src/lib/rehype-heading-links.mjs";

export default defineConfig({
  site: "https://joshcowan.com",
  markdown: {
    gfm: true,
    rehypePlugins: [rehypeHeadingIds, rehypeHeadingLinks, rehypeFootnoteLinks],
  },
});
