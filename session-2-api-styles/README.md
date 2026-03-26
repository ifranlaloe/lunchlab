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

### 5. WhatsApp zoom example

Use the WhatsApp SVG to explain C4 as zooming into the same system:

- Level 1: system context
- Level 2: containers
- Level 3: components
- Level 4: code

This slide is there to make the abstraction levels intuitive, not to change the scope of the session.

### 6. Whole-room exercise

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

### 7. Close

End with:

- the takeaway slide
- the cheat sheet slide

The cheat sheet is there as a final reference, not as a new concept.

## C4 scope for API styles

Two points matter for this session:

- SOAP fits naturally at Level 1 when it represents an external legacy or enterprise integration.
- gRPC fits naturally at Level 2 when it is framed as communication between containers or services.

## Files

- [index.html](/Users/i18121/sourcen/lunchlab/session-2-api-styles/index.html)
