# LunchLab #2: Choosing the Right API Style

This session focuses on one practical question:

> Which API style fits which interaction?

## Core message

There is no single best API style.

Use C4 as **infrastructure cartography** to choose the right map scale first, then pick the transport mechanism.

## Current focus pivot

- In Level 1 discussions, split "travelers" into four actor groups: road, water, air, and railway.
- Keep this modality split explicit in prompts, example answers, and facilitation language.

## Scope rule

- Introduce all four C4 levels.
- Keep workshop decisions mostly at **Level 1 (System Context)** and **Level 2 (Container)**.
- Treat Level 3 and Level 4 as useful depth references, not the main facilitation scope.

## C4 mapping used in this deck

- **Level 1 — System Context:** The Netherlands in its external context.
- **Level 2 — Container:** Main infrastructure domains inside the Netherlands.
- **Level 3 — Component:** Inside one infrastructure domain.
- **Level 4 — Code:** Engineering blueprint / construction specification.

SVG naming is now stable and metaphor-neutral:

- `assets/svg/c4-infrastructure-level-1.svg`
- `assets/svg/c4-infrastructure-level-2-overlay-road-network.svg`
- `assets/svg/c4-infrastructure-level-2-overlay-rail-network.svg`
- `assets/svg/c4-infrastructure-level-2-overlay-water-system.svg`
- `assets/svg/c4-infrastructure-level-3.svg`
- `assets/svg/c4-infrastructure-level-4.svg`

Level 2 teaching visuals are now a traveler-mode progressive build: road → rail → water.

Official data sources used in Level 2 geometry overlays:

- Road network: PDOK / Rijkswaterstaat `NWB - Wegen` OGC API, collection `wegvakken` (main A-road-focused filter).
- Rail network: PDOK / ProRail `Spoorwegen` OGC API, collection `trace`.
- Water system: PDOK / Rijkswaterstaat `NWB - Vaarwegen` OGC API, collection `vaarwegvakken`.

Levels 2–4 include an explicit system boundary treatment, aligned with the boundary framing in Level 1.

## Facilitation lines

- “Before choosing the transport mechanism, first agree on the map scale.”
- “Are we discussing the system boundary, the major internal domains, one domain internally, or engineering detail?”
- “When we say travelers, are we talking about road, water, air, or railway users?”
- “That sounds like we are inside one infrastructure domain. Let’s park it unless we intentionally move to Level 3.”
- “That belongs on the engineering blueprint. Let’s first agree on the infrastructure map.”

## API style mapping used in this deck

API styles are transport mechanisms between infrastructure domains, systems, or access points:

- REST = Standard public road access
- GraphQL = Smart route planner / custom itinerary
- WebSocket = Live traffic control channel
- Webhook = Scheduled delivery/drop-off from outside
- gRPC = Dedicated high-speed service corridor
- SOAP = Regulated legacy cross-border rail connection

## Full slide list (one-to-one with `index.html`)

Current deck length: **16 slides**.

1. **LunchLab #2** - Choosing the Right API Style
2. **C4 framing** - C4 as infrastructure cartography
3. **Cheat sheet** - C4 levels overview
4. **Level 1** - Level 1: The system in its external context (with C4 Level 1 questions)
5. **Level 1 answers** - Level 1: The system in its external context (with modality-specific traveler answers)
6. **Level 2 build** - Road network layer
7. **Level 2 build** - Rail network layer
8. **Level 2 build** - Water system layer
9. **Level 3** - Level 3: Inside one infrastructure domain
10. **Level 4** - Level 4: Engineering blueprint
11. **Level detail** - What each C4 level shows
12. **C4 at a glance** - All four levels on one page
13. **Depth references** - Level 3 and Level 4 (useful, but mostly out of scope today)
14. **API mapping** - API styles as transport mechanisms
15. **Facilitation** - Scope-control lines for the workshop
16. **Takeaway** - Final takeaway

## File

- [index.html](./index.html)
