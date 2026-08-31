import type { APIRoute } from "astro";
import { site } from "../data/site";
import { getAllTags, getPostPath, getPublishedPosts, normalizeTag } from "../lib/blog";

type SitemapEntry = {
  path: string;
  lastmod?: Date;
};

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();
  const timestamps = posts.flatMap((post) => [
    post.data.publishedAt.getTime(),
    post.data.updatedAt?.getTime() ?? 0,
  ]);
  const latestDate = timestamps.length > 0 ? new Date(Math.max(...timestamps)) : undefined;
  const entries: SitemapEntry[] = [
    { path: "/", lastmod: latestDate },
    { path: "/blog/", lastmod: latestDate },
    ...getAllTags(posts).map((tag) => ({ path: `/blog/tags/${normalizeTag(tag)}/`, lastmod: latestDate })),
    ...posts.map((post) => ({
      path: getPostPath(post),
      lastmod: post.data.updatedAt ?? post.data.publishedAt,
    })),
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
