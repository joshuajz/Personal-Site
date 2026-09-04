export type Tool = {
  slug: string;
  title: string;
  description: string;
  category: string;
  addedAt: string;
};

/**
 * Add a tool here after creating its page in `src/pages/tools`.
 * The tools index uses this list as its single source of truth.
 */
export const tools: Tool[] = [
  {
    slug: "tfsa-contribution-room",
    title: "TFSA contribution room calculator",
    description:
      "Estimate your available TFSA contribution room based on your birth year and lifetime contributions.",
    category: "Personal finance",
    addedAt: "2026-08-31",
  },
];

export const getLatestTools = (limit = 3) =>
  [...tools]
    .sort((first, second) => second.addedAt.localeCompare(first.addedAt))
    .slice(0, limit);
