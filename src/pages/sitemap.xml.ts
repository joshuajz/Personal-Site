import type { APIRoute } from "astro";
import { site } from "../data/site";
import { tools } from "../data/tools";
import { getAllTags, getPostPath, getPublishedPosts, normalizeTag } from "../lib/blog";

type SitemapEntry = {
  path: string;
  lastmod?: Date;
};

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();
  const blogTimestamps = posts.flatMap((post) => [
    post.data.publishedAt.getTime(),
    post.data.updatedAt?.getTime() ?? 0,
  ]);
  const latestBlogDate = blogTimestamps.length > 0
    ? new Date(Math.max(...blogTimestamps))
    : undefined;
  const toolEntries = tools.map((tool) => ({
    path: `/tools/${tool.slug}/`,
    lastmod: new Date(`${tool.addedAt}T00:00:00Z`),
  }));
  const latestToolDate = toolEntries.length > 0
    ? new Date(Math.max(...toolEntries.map(({ lastmod }) => lastmod.getTime())))
    : undefined;
  const latestSiteDate = latestBlogDate && latestToolDate
    ? new Date(Math.max(latestBlogDate.getTime(), latestToolDate.getTime()))
    : latestBlogDate ?? latestToolDate;
  const entries: SitemapEntry[] = [
    { path: "/", lastmod: latestSiteDate },
    { path: "/blog/", lastmod: latestBlogDate },
    ...getAllTags(posts).map((tag) => ({
      path: `/blog/tags/${normalizeTag(tag)}/`,
      lastmod: latestBlogDate,
    })),
    ...posts.map((post) => ({
      path: getPostPath(post),
      lastmod: post.data.updatedAt ?? post.data.publishedAt,
    })),
    { path: "/tools/", lastmod: latestToolDate },
    ...toolEntries,
  ];
  const urls = entries.map(({ path, lastmod }) => `
  <url>
    <loc>${new URL(path, site.url).toString()}</loc>${lastmod ? `
    <lastmod>${lastmod.toISOString().slice(0, 10)}</lastmod>` : ""}
  </url>`).join("");
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
