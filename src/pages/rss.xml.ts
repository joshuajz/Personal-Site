import type { APIRoute } from "astro";
import { site } from "../data/site";
import { getPostPath, getPublishedPosts } from "../lib/blog";

const escapeXml = (value: string) => value.replace(/[<>&'"]/g, (character) => ({
  "<": "&lt;",
  ">": "&gt;",
  "&": "&amp;",
  "'": "&apos;",
  "\"": "&quot;",
})[character] ?? character);

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();
  const lastBuildDate = posts.reduce<Date | undefined>((latestDate, post) => {
    const postDate = post.data.updatedAt ?? post.data.publishedAt;
    return !latestDate || postDate > latestDate ? postDate : latestDate;
  }, undefined);
  const items = posts.map((post) => {
    const url = new URL(getPostPath(post), site.url).toString();
    return `
      <item>
        <title>${escapeXml(post.data.title)}</title>
        <description>${escapeXml(post.data.description)}</description>
        <link>${url}</link>
        <guid isPermaLink="true">${url}</guid>
        <pubDate>${post.data.publishedAt.toUTCString()}</pubDate>
        ${post.data.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("\n        ")}
      </item>`;
  }).join("");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${site.name} Blog`)}</title>
    <description>${escapeXml("Notes on full-stack systems, product decisions, and building software.")}</description>
    <link>${site.url}/blog/</link>
    <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml" />
    <language>${site.language}</language>
    <lastBuildDate>${(lastBuildDate ?? new Date()).toUTCString()}</lastBuildDate>${items}
  </channel>
</rss>`;

  return new Response(body, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
};
