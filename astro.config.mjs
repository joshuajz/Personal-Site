import { defineConfig } from "astro/config";
import { rehypeHeadingIds, unified } from "@astrojs/markdown-remark";
import rehypeFootnoteLinks from "./src/lib/rehype-footnote-links.mjs";
import rehypeHeadingLinks from "./src/lib/rehype-heading-links.mjs";

export default defineConfig({
  site: "https://joshcowan.com",
  compressHTML: true,
  markdown: {
    processor: unified({
      gfm: true,
      rehypePlugins: [rehypeHeadingIds, rehypeHeadingLinks, rehypeFootnoteLinks],
    }),
  },
});
