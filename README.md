# Shaun Moss — Developer Portfolio

A complete, responsive portfolio for Shaun Moss, a web developer based in Zambia. Built with React, TypeScript, Vite, Tailwind CSS, Motion, Lucide, and locally hosted Inter and Space Grotesk fonts. Includes all nine requested sections, real project links, direct WhatsApp and email inquiries, accessible navigation, image fallbacks, and a four-step working process.

## Run locally

Use Node.js 22.12+ (or a current supported version) and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

```sh
npm run build       # TypeScript check + production build into dist/
npm run preview     # Preview the production build
npm run lint        # React/TypeScript lint; warnings fail the check
npm run format:check
```

## Content and styling

- `src/data/site.ts`: contact details, social links, and navigation. The WhatsApp inquiry message is URL-encoded.
- `src/data/projects.ts`: all four projects, descriptions, URLs, disciplines, screenshot paths, and verified repository links.
- `src/data/services.ts`: the three service cards and their offerings.
- `src/data/skills.ts`: development skills, complementary skills, and process steps.
- `src/components/`: reusable sections, project cards, reveal animation, navigation, and clipboard controls.
- `src/styles/globals.css`: design tokens, typography, responsive layouts, and reduced-motion styles. Tailwind v4 is configured through the Vite plugin.
- `index.html`: title, description, Open Graph, and Twitter sharing metadata.

The site intentionally includes no invented testimonials, client statistics, experience claims, marketing guarantees, fake submission form, or inferred repository links. Agron AI is explicitly labeled a concept/prototype; its landing page is not evidence that prediction models or AI analytics are operational.

## Your photograph

The portfolio includes Shaun’s supplied portrait, optimized as a 960 × 1280 progressive JPEG while preserving its original proportions. To replace it, use:

```text
public/images/shaun-profile.jpg
```

Use an optimized portrait JPEG (approximately 640–1000 pixels wide) and update the image dimensions in `Hero.tsx` if needed. The portrait frame crops with `object-fit: cover` and focuses at `center 30%`; adjust `.portrait-image` in the stylesheet if needed. Restart the development server after adding the file, or rebuild for deployment. Vite detects its presence at startup/build time. If the file is absent or fails to load, the SM initials design appears. The original photograph is kept outside the repository; only the optimized public asset is included.

## Project screenshots

```text
public/images/projects/klassmate.webp
public/images/projects/pmotors.webp
public/images/projects/elevatelabs.webp
public/images/projects/agron-ai.webp
```

KlassMate, P Motors, and Agron AI use genuine screenshots captured from their supplied live URLs on 13 October 2026. Elevate Labs was captured from its published website on 17 October 2026. All screenshots use a desktop viewport of 1440 × 960 pixels and are encoded as optimized WebP files.

The Elevate Labs website is published at `https://elevatelabsweb.pages.dev`; its genuine screenshot is shown in the portfolio project card.

You can replace any screenshot with a WebP at the same path. Use a 3:2 desktop screenshot at least 1000 pixels wide. Missing or broken screenshots fall back gracefully to the project name and category. Adding/removing files requires restarting Vite or rebuilding, because the image inventory is detected at startup/build time.

To recapture the live websites:

```sh
npx playwright install chromium
npm run capture:projects
```

The capture script validates HTTP responses and rejects blank pages; it never creates fictitious screenshots. `artifacts/project-verification.json` contains the local capture report (ignored by Git). A capture failure leaves any existing screenshot untouched, so review the report when updating assets.

## Browser verification

```sh
npx playwright install chromium
npm run test:e2e
```

The Playwright suite covers 360, 390, 768, 1024, and 1440 pixel viewports; horizontal overflow; real images; WCAG A/AA axe checks; anchor navigation; project and contact URL accuracy; mobile menu focus wrapping and Escape; clipboard success and denial; image fallbacks; metadata; skip navigation; and reduced/full motion.

Playwright starts Vite on `127.0.0.1:5173`, or reuses an existing development server outside CI. On Windows it uses installed Chrome by default; other systems use Playwright Chromium. `PLAYWRIGHT_CHANNEL` overrides that choice. PowerShell example:

```powershell
$env:PLAYWRIGHT_CHANNEL = 'chrome'
npm run test:e2e
```

To check a running production preview instead, set `PLAYWRIGHT_BASE_URL` to its URL (for example `http://127.0.0.1:4173`). The tests then use that server without starting Vite.

To save full-page and section screenshots locally, run `node scripts/visual-check.mjs` while Vite is running. Reports, screenshots, and browser traces are ignored by Git.

## Sharing and SEO

The site includes a custom favicon, `robots.txt`, and a real 1200 × 630 sharing image at `public/images/og-cover.jpg`. To regenerate the sharing graphic, run `node scripts/create-social-image.mjs`.

No domain, canonical URL, sitemap location, or social handle is invented. After you choose a deployment URL, set `og:image` and `twitter:image` in `index.html` to the absolute URL of `/images/og-cover.jpg`; absolute image URLs improve compatibility with sharing crawlers. Add a canonical URL only once your actual production URL is known. This is a static React single-page application with metadata in the initial HTML.

## Deployment

No backend, account integration, API keys, or environment secrets are required. The deployable folder is `dist/`.

**Cloudflare Pages:** connect your GitHub repository, use build command `npm run build`, and output directory `dist`. Set a supported Node version if the hosting environment defaults to an older runtime.

**Vercel:** import the repository, choose the Vite preset, use `npm run build`, and output directory `dist`.

**Manual/static hosting:** run `npm run build` and upload the contents of `dist/`. This site uses section anchors, so it does not need server route rewrites. Root-relative assets assume deployment at the root of a host. For GitHub Pages beneath a repository subpath, configure Vite's `base` and adjust root-relative public asset paths before deploying.

Uploading the source repository does not deploy the site. Deploy separately when ready.
