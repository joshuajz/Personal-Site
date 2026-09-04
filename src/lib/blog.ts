import { getCollection, type CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<"blog">;

const WORDS_PER_MINUTE = 220;

export function normalizeTag(tag: string): string {
  return tag
    .trim()
    .toLocaleLowerCase("en-CA")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getPostPath(post: BlogPost): string {
  const slug = post.id.replace(/\.(md|mdx)$/i, "");
  return `/blog/${slug}/`;
}

export function sortPosts(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime(),
  );
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getCollection("blog", ({ data }) => {
    return import.meta.env.DEV || !data.draft;
  });

  return sortPosts(posts);
}

export async function getLatestPosts(limit: number): Promise<BlogPost[]> {
  if (!Number.isInteger(limit) || limit < 0) {
    throw new RangeError("Post limit must be a non-negative integer.");
  }

  return (await getPublishedPosts()).slice(0, limit);
}

export function getAllTags(posts: BlogPost[]): string[] {
  const tags = [...new Set(posts.flatMap((post) => post.data.tags))].sort((a, b) =>
    a.localeCompare(b, "en-CA"),
  );
  const tagsBySlug = new Map<string, string>();

  for (const tag of tags) {
    const slug = normalizeTag(tag);

    if (!slug) {
      throw new Error(`Blog tag "${tag}" does not produce a valid URL slug.`);
    }

    const existingTag = tagsBySlug.get(slug);
    if (existingTag && existingTag !== tag) {
      throw new Error(`Blog tags "${existingTag}" and "${tag}" both produce the URL slug "${slug}".`);
    }

    tagsBySlug.set(slug, tag);
  }

  return tags;
}

export function filterPostsByTag(posts: BlogPost[], tag: string): BlogPost[] {
  const normalizedTag = normalizeTag(tag);
  return posts.filter((post) =>
    post.data.tags.some((postTag) => normalizeTag(postTag) === normalizedTag),
  );
}

export function getReadingTime(markdown = ""): number {
  const readableText = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_~\-|]/g, " ");
  const wordCount = readableText.match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu)?.length ?? 0;

  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

export function formatPostDate(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function formatArchiveDate(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
