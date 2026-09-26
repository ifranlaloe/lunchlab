# LunchLab

Slidev presentations for the LunchLab.

## Sessions

- [LunchLab #2 — Zooming with C4](./session-2-c4-for-developers/README.md)

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

- [slides.md](./slides.md) holds the 24 slides in presentation order. The migrated slides retain HTML markup for layout fidelity; new slides can use Slidev Markdown and Vue components.
- [style.css](./style.css) and [layouts/default.vue](./layouts/default.vue) preserve the LunchLab visual style.
- `public/assets/` contains the diagrams and logos. Reference them from slides with `/assets/...` paths.
- [session-2-c4-for-developers/README.md](./session-2-c4-for-developers/README.md) has the facilitation flow and complete slide list.
