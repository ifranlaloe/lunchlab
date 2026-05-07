# LunchLab #2: Choosing the Right API Style

This session focuses on one practical question:

> Which API style fits which interaction?

## Core message

There is no single best API style.

Use C4 as **infrastructure cartography** to choose the right map scale first, then pick the transport mechanism.

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

- `assets/svg/c4-level-1.svg`
- `assets/svg/c4-level-2.svg`
- `assets/svg/c4-level-3.svg`
- `assets/svg/c4-level-4.svg`

Levels 2–4 include an explicit system boundary treatment, aligned with the boundary framing in Level 1.

## Facilitation lines

- “Before choosing the transport mechanism, first agree on the map scale.”
- “Are we discussing the system boundary, the major internal domains, one domain internally, or engineering detail?”
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

## File

- [index.html](./index.html)
