# LunchLab #2: Choosing the Right API Style

This session is designed for a LunchLab knowledge-sharing event about system design. The trigger for this second edition is simple: during the first session, it became clear that common API concepts are not equally clear to everyone yet.

The goal of this session is to make API style choices easier to understand and easier to explain.

## Purpose

- Explain when different API styles are a good fit.
- Practice explaining design decisions and trade-offs.
- Use real-world platforms and interactions so the discussion stays concrete.
- Use C4 to keep the discussion at the right architectural scope.

## Session framing

The session focuses on one core message:

> You do not choose one API style for the whole system. You choose the right style for each interaction.

To make that tangible, this edition uses one fixed case: a food delivery platform in the space of Deliveroo. That gives the session one shared mental model and makes it easier to compare API style choices in a realistic context.

## Recommended format

Total duration: 60 to 90 minutes.

### 1. Warm-up: API spotting

Use a short interactive opening with recognizable platforms such as:

- Uber
- Spotify
- Stripe
- WhatsApp

Ask the room which API styles they think are involved:

- REST
- GraphQL
- WebSocket
- Webhook
- gRPC

The point is to show early that modern platforms usually combine multiple API styles.

### 2. Explain the case first

Use one shared case before introducing the API styles.

Suggested case: a food delivery platform similar to Deliveroo.

Explain the basic flow of the platform:

- customers browse restaurants and menus
- customers place and pay for orders
- restaurants receive and accept orders
- drivers pick up and deliver orders
- customers track delivery progress

This creates the system context participants need before API terminology is introduced.

### 3. Explain the API styles through the case

Once the room understands the food delivery case, map the API styles onto that scenario:

- REST or GraphQL for app-to-backend data retrieval
- WebSocket for real-time delivery tracking
- Webhook for payment status callbacks
- gRPC for service-to-service communication between containers
- SOAP for external legacy or enterprise integrations

This keeps the API discussion practical instead of abstract.

### 4. Explain C4 before the exercise

Before using C4 as a discussion guardrail, explain the name itself:

- C4 stands for Context, Containers, Components, and Code.
- The name is useful because it already tells the room which four abstraction levels exist in the model.
- For this session, only the first two matter: Context and Containers.

This session should stay intentionally narrow in C4 scope:

- Level 1: System Context
- Level 2: Container

Do not go to Component level unless there is a very strong reason. In practice, that level tends to make the discussion more complex than useful for this format.

Use these rules during the session:

- Always state which C4 level you are discussing.
- Only discuss communication between boxes, not inside them.
- Keep the conversation at architecture and interaction level, not implementation level.

The purpose of this part is to give the room a shared discussion discipline before the interactive work starts.

### 5. Interactive group exercise

Run the exercise with the full room on the same food delivery case.

That keeps the discussion shared, makes facilitation easier, and avoids time loss from breakout discussions.

Ask the room to:

- identify the relevant interactions
- choose an API style per interaction
- explain why that style fits
- name the trade-off
- state whether the decision is at System Context or Container level

Optional twist cards can be added halfway through, such as:

- real-time updates are now required
- latency must stay below a given threshold
- a legacy partner system must be integrated

### 6. Group discussion

As the room works through the case, keep asking:

- Which C4 level is this decision on?
- Why does this API style fit this interaction?
- What trade-off are you accepting?
- What would change if traffic or latency requirements changed?

The session should reward reasoning, not guessing the single correct answer.

### 7. Wrap-up

Close with a short summary:

- there is no single best API style
- real systems use multiple API styles together
- API choices only make sense in context
- C4 helps keep the discussion structured

## C4 scope for API styles

One important clarification from the preparation discussion:

- SOAP fits naturally at Level 1 when it represents an external legacy or enterprise system.
- gRPC still fits cleanly at Level 2, as long as it is framed as communication between containers or services.

That means this session can stay fully within Level 1 and Level 2 while still discussing gRPC.

Good phrasing for the room:

> We only talk about communication between boxes, not inside them.

And for gRPC specifically:

> Even though gRPC feels technical, in this session we treat it as a container-level decision: how services talk to each other.

## Practical takeaway

The most useful framing for participants is:

> API styles are less about technology preference and more about fit for purpose within a specific C4 scope.

## Files

- [index.html](/Users/i18121/sourcen/lunchlab/session-2-api-styles/index.html)
