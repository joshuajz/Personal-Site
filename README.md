# Josh Cowan Personal Site

Personal portfolio site for [joshcowan.com](https://joshcowan.com), built with Astro, TypeScript, Tailwind CSS, and tsparticles.

## Features

- Static Astro site with componentized sections for hero, work experience, projects, volunteering, navigation, and footer.
- Centralized content and profile metadata in `src/data/site.ts`.
- SEO metadata in `src/layouts/BaseLayout.astro`, including canonical URLs, Open Graph tags, Twitter card tags, `rel="me"` profile links, and JSON-LD structured data.
- Discord/social preview image served as `public/social-preview.png`, with `public/social-preview.svg` kept as the clean vector source.
- `robots.txt`, `sitemap.xml`, favicon, and web manifest in `public/`.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the local dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run linting:

```bash
npm run lint
```

## Project Structure

```text
src/
  components/     Astro UI sections and shared icons
  data/site.ts    Site content, links, SEO description, and project data
  layouts/        Base HTML layout and metadata
  pages/          Astro routes
  scripts/        Client-side interactions
  styles/         Global styles

public/
  robots.txt
  sitemap.xml
  site.webmanifest
  social-preview.png
  social-preview.svg
```

## SEO Notes

The homepage metadata is managed in `src/layouts/BaseLayout.astro` and pulls shared values from `src/data/site.ts`.

After deploying SEO or social-preview changes:

- Confirm `https://joshcowan.com/social-preview.png` opens directly.
- Test link embeds with a cache-busting URL, such as `https://joshcowan.com/?v=2`.
- Submit `https://joshcowan.com/sitemap.xml` in Google Search Console.
