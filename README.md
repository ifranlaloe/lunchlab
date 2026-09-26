# LunchLab

Slidev presentations for the LunchLab.

## Sessions

- [LunchLab #2 — Zooming with C4](./zooming-with-c4/README.md)
- [LunchLab — Resource Scaling](./resource-scaling/README.md)

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

For Resource Scaling, run `npm run dev:scaling` (at `http://localhost:3031/`), `npm run build:scaling`, or `npm run export:scaling -- --format pdf`.

## Publish both decks

`npm run build:pages` builds both interactive Slidev sites and a deck selector in `dist/lunchlab/`. To preview the default `/lunchlab/` paths locally, run `python3 -m http.server 8000 --directory dist` and open `http://localhost:8000/lunchlab/`.

The [Pages workflow](./.github/workflows/pages.yml) publishes that directory on pushes to `master` (or when manually dispatched). It uses GitHub Pages' configured base path, so the deck links work at `https://ifranlaloe.github.io/lunchlab/` and if the Pages URL changes. The repository's Pages source must be **GitHub Actions**, not a branch.

## Edit the deck

- [slides.md](./slides.md) holds the 24 slides in presentation order. Write text in Markdown and choose a LunchLab layout in each slide's frontmatter.
- [resource-scaling.md](./resource-scaling.md) is the separate, unnumbered Resource Scaling deck.
- `layouts/lunchlab-*.vue` defines the shared slide structures; `components/` contains reusable columns and C4 visuals.
- [style.css](./style.css) preserves the LunchLab visual style.
- `public/assets/` contains the diagrams and logos. Reference them from slides with `/assets/...` paths.
- [zooming-with-c4/README.md](./zooming-with-c4/README.md) has the facilitation flow and complete slide list.
- [resource-scaling/README.md](./resource-scaling/README.md) has the Resource Scaling teaching model, case framing, and slide list.
