export type Tool = {
  slug: string;
  title: string;
  description: string;
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
      "Estimate your available TFSA room from your birth year and lifetime contributions.",
  },
];
