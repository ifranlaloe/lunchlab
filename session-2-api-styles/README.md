# LunchLab #2: Zooming with C4

This session focuses on one practical capability:

> Keep architecture discussions at the right zoom level.

## Core message

Use C4 as **traveler-system cartography**: agree on the map scale first, then decide what details belong in scope.

## Scope rule

- Introduce all four C4 levels.
- Keep workshop decisions mostly at **Level 1 (Context)** and **Level 2 (Container)**.
- Treat Level 3 and Level 4 as useful depth references, not the default facilitation scope.

## Traveler framing in this deck

- In Level 1 discussions, split "travelers" into four actor groups: road, water, air, and railway.
- Keep this modality split explicit in prompts and example answers.

## C4 mapping used in this deck

- **Level 1 — Context:** The Netherlands in its external context.
- **Level 2 — Container:** Main services inside the system.
- **Level 3 — Component:** Inside one infrastructure domain.
- **Level 4 — Code:** Implementation detail inside one component.

SVG naming is stable and metaphor-neutral:

- `assets/svg/c4-infrastructure-level-1.svg`
- `assets/svg/c4-infrastructure-level-2-overlay-road-network.svg`
- `assets/svg/c4-infrastructure-level-2-overlay-rail-network.svg`
- `assets/svg/c4-infrastructure-level-2-overlay-water-system.svg`
- `assets/svg/c4-infrastructure-level-2-overlay-airports.svg`
- `assets/svg/c4-infrastructure-level-3.svg`
- `assets/svg/c4-infrastructure-level-4.svg`

Level 2 teaching visuals use a progressive build of service layers (1/4 to 4/4).

## Case inserts in this deck

- WhatsApp transition + C4 context slides (L1/L2 and expanded L3/L4 view).
- Flink transition + case brief (goal, functional requirements, non-functional requirements).

## Facilitation lines

- “Before deciding, let’s agree on the C4 level we are discussing.”
- “Are we discussing context, containers, components, or implementation detail?”
- “That sounds like a Level 3 concern; let’s park it until we intentionally zoom in.”
- “Let’s finish boundaries and responsibilities first, then discuss detailed design choices.”
- “If we are debating framework or protocol specifics, we may be zoomed in too far.”

## Full slide list (one-to-one with `index.html`)

Current deck length: **24 slides**.

1. **LunchLab #2** - Zooming with C4
2. **C4 Explained** - What is C4?
3. **C4 Explained** - Level 1: Context
4. **C4 Explained** - Level 2: Container
5. **C4 Explained** - Level 3: Component
6. **C4 Explained** - Level 4: Code
7. **Transition** - From model to practice
8. **Level 1** - Level 1: Traveler Context
9. **Level 1** - Level 1: Traveler Context (answers)
10. **Level 2 build** - Travel Containers (Road Service)
11. **Level 2 build** - Travel Containers (Road + Rail)
12. **Level 2 build** - Travel Containers (Road + Rail + Water)
13. **Level 2 build** - Travel Containers (Road + Rail + Water + Air)
14. **Level 3** - Component (Rail Service Container)
15. **Level 4** - Code
16. **C4 matrix** - All four levels in one 2x2 view
17. **C4 framing** - C4 as a map-and-zoom language
18. **Transition** - WhatsApp logo
19. **Previous case** - WhatsApp L1/L2 context
20. **Previous case** - WhatsApp L1/L2 plus L3/L4 details
21. **Transition** - Flink logo
22. **New case** - Flink goal and requirements
23. **Facilitation** - Session master guide
24. **Takeaway** - Final takeaway

## File

- [index.html](./index.html)
