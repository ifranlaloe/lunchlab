# LunchLab #2: Choosing the Right API Style

This session is a trimmed LunchLab format focused on one practical question:

> Which API style fits which interaction?

The session uses one fixed case: a Deliveroo-like food delivery platform.

## Purpose

- explain when a specific API style fits
- practice explaining trade-offs
- keep the discussion grounded in one real-world case
- use C4 to keep the discussion at the right scope

## Core message

There is no single best API style for a system.

The useful question is:

> What is the interaction, and which style fits it best?

## Current slide flow

The current deck is intentionally slimmer than the original draft.

### 1. Opening

Start with:

- why this session exists
- what participants should get out of it
- the high-level session flow

### 2. Shared case

Use one Deliveroo-like platform as the reference system.

Cover:

- customer app
- restaurant portal
- driver app
- the delivery platform itself

Main flow:

- browse restaurants and menus
- place and pay for an order
- restaurant accepts the order
- driver delivers the order
- customer tracks progress

Important constraints:

- responsive mobile experience
- reliable payment confirmation
- low-latency tracking
- scale during lunch and dinner peaks
- realistic external and legacy integrations

### 3. API styles

Explain API styles through the delivery case.

Current styles in scope:

- REST
- GraphQL
- WebSocket
- Webhook
- gRPC
- SOAP

Use the case to explain:

- client-facing interactions
- service-to-service communication
- external callbacks and legacy integrations

### 4. C4 framing

Explain why the model is called C4:

- Context
- Containers
- Components
- Code

Then make the session rule explicit:

- stay at Level 1 and Level 2
- use Level 3 and Level 4 only as a warning that the discussion is going too deep

The helpful facilitation phrase remains:

> We only talk about communication between boxes, not inside them.

### 5. Whole-room exercise

The exercise is done with the full room on the same food delivery case.

Ask the room to:

- identify the relevant interactions
- choose an API style per interaction
- explain the trade-off
- state the C4 level

Useful prompt questions:

- Which C4 level is this decision on?
- Are we still talking between boxes?
- Why does this interaction need this style?
- What trade-off are we making?

### 6. Close

End with:

- the takeaway slide
- the cheat sheet slide

The cheat sheet is there as a final reference, not as a new concept.

## C4 scope for API styles

Two points matter for this session:

- SOAP fits naturally at Level 1 when it represents an external legacy or enterprise integration.
- gRPC fits naturally at Level 2 when it is framed as communication between containers or services.

## Files

- [index.html](./index.html)

## Teaching concept (cartography zoom journey)

Use one continuous metaphor across the full session:

> Physical infrastructure choices (land/water/air/rail) mirror IT and API infrastructure choices.

### Zoom narrative

Use a Netherlands map sequence to make C4 levels intuitive:

- **Level 1 (System Context):** national/regional boundary view with external connections crossing the system border.
- **Level 2 (Container):** city-scale infrastructure inside the boundary with routes between internal places/containers.
- **Level 3 (Component):** one building’s internal organization.
- **Level 4 (Code):** engineering blueprint-level implementation detail.

### Level 1 emphasis

At Level 1, explicitly model different boundary route modalities:

- sea routes
- river routes
- air routes
- truck routes
- rail routes

Use these modalities to discuss differences in latency, governance, reliability, and coupling before selecting API styles.

### Workshop flow (facilitation order)

Keep this order during facilitation:

1. Zoom-level explanation first.
2. Room puzzle on the food-delivery case second.
3. Prepared solution slides as facilitator backup only.

### C4 scope discipline for this LunchLab

Preserve scope discipline in discussions and decision prompts:

- Prioritize Level 1 and Level 2 decisions.
- Treat Level 3 and Level 4 as useful context, but mostly out-of-scope for this lunch-and-learn.
- Re-anchor with: “between boxes, not inside boxes” whenever conversation drifts.

## C4 facilitation deepening notes (for future expansion)

Use this section as a working draft for future iterations of the C4 chapter.

### How to frame each level with the cartography metaphor

- **Level 1 (Context):** national/regional map view. Focus on border crossings and external route choices.
- **Level 2 (Container):** city logistics map. Focus on routes between hubs inside one boundary.
- **Level 3 (Component):** one building floor plan. Focus on internal hand-offs in one container.
- **Level 4 (Code):** engineering blueprint. Focus on implementation details and quality controls.

### What decisions belong at each C level

- **Level 1 (Context):** external integrations, trust boundaries, governance constraints, and boundary-level SLAs.
- **Level 2 (Container):** service responsibilities, communication patterns (sync/async/stream/callback), and reliability/latency trade-offs between containers.
- **Level 3 (Component):** internal module responsibilities, orchestration, and cohesion/coupling choices.
- **Level 4 (Code):** concrete contracts, retries/timeouts, error mapping, observability instrumentation, and test implementation.

### Facilitation question bank by C level

#### Level 1 (Context)

- Which systems or actors cross our boundary?
- What do we exchange at that boundary?
- Which trust, compliance, or governance constraints apply?
- Which boundary route modality best fits this interaction (sea/river/air/truck/rail analogy)?
- What failure behavior is acceptable at this boundary?

#### Level 2 (Container)

- Which containers are talking to each other?
- Is this interaction request/response, event, stream, or callback?
- What are the latency, throughput, and reliability expectations for this route?
- Where should we place idempotency, retries, and fallback behavior?
- Why is this API style the best fit for this specific container interaction?

#### Level 3 (Component)

- Which component owns this decision inside the container?
- Where do business rules and invariants live?
- What internal interfaces reduce coupling and improve changeability?
- Which internal dependencies are allowed, and which should be blocked?

#### Level 4 (Code)

- How is the contract encoded in types/schemas?
- How are errors mapped and surfaced consistently?
- What exact timeout/retry/backoff values are implemented?
- What tests prove behavior and protect against regressions?
- What telemetry confirms this route meets its SLOs?

### Scope-control prompts for facilitators

Use these prompts live to keep depth aligned with lunch-and-learn scope:

- “What C4 level are we on right now?”
- “Are we still talking between boxes?”
- “If this is Level 3 or 4, do we park it and return to Level 1 or 2 first?”
