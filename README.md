# Josh Cowan's Personal Site

The source for [joshcowan.com](https://joshcowan.com): a personal portfolio, blog, and collection of small web tools.

Built with Astro, TypeScript, MDX, and Tailwind CSS.

## Run locally

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev
```

The development server will print the local URL.

## Useful commands

```bash
npm run build    # Create a production build
npm run preview  # Preview the production build
npm run lint     # Check code style
npm run test     # Run tests
```

## Project layout

```text
src/
  components/  Reusable page sections
  content/     Blog posts and content collections
  data/        Site copy and structured content
  layouts/     Shared page layouts
  pages/       Routes, including the blog and tools
  styles/      Site styles
  lib/         Shared helpers
public/        Static assets
tests/         Automated tests
```

## Analytics

Blog analytics are optional and use GoatCounter. To enable them, copy `.env.example` to `.env.local` and set `PUBLIC_GOATCOUNTER_URL` to the public counting endpoint from GoatCounter. Leaving it blank disables analytics.
