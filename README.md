# LunchLab

Slidev presentations for the LunchLab.

## Sessions

- [LunchLab #2 — Zooming with C4](./session-2-zooming-with-c4/README.md)

## Run the deck

Requires Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

Slidev opens the presentation at `http://localhost:3030/`. Use its navigation, overview, presenter mode, and fullscreen controls while presenting.

```sh
npm run build
npm run export -- --format pdf
```

The static site is written to `dist/`. For a site hosted below a URL path, pass a base path to the build, for example `npm run build -- --base /lunchlab/`.

## Edit the deck

- [slides.md](./slides.md) holds the 24 slides in presentation order. Write text in Markdown and choose a LunchLab layout in each slide's frontmatter.
- `layouts/lunchlab-*.vue` defines the shared slide structures; `components/` contains reusable columns and C4 visuals.
- [style.css](./style.css) preserves the LunchLab visual style.
- `public/assets/` contains the diagrams and logos. Reference them from slides with `/assets/...` paths.
- [session-2-zooming-with-c4/README.md](./session-2-zooming-with-c4/README.md) has the facilitation flow and complete slide list.
