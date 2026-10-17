# LunchLab — Resource Scaling

## Core message

Scaling starts with the bottleneck, the workload, and the state — not the replica count. Increasing one component's capacity may expose the next limit without increasing end-to-end system capacity as much as expected. Sometimes the architecture must change before a workload can scale independently.

## Scope and teaching model

This is an architecture-awareness LunchLab, not a Kubernetes or implementation workshop. Work from an observed limit to five questions:

1. What is under pressure, and what evidence shows it?
2. Can the work be divided safely, or can one node gain useful headroom?
3. Where does state live, and who owns each piece of work?
4. What dependency receives more load after this change?
5. Are boundaries, ownership, or communication patterns preventing scaling?

The opening names the two familiar ways to add capacity, then explains vertical and horizontal scaling in turn. A brief false ending makes that pair feel like a complete answer. Immediately afterward, **The bottleneck** names the part currently limiting completed work. Adding API capacity may improve throughput until the database becomes the next bottleneck. This distinguishes **component capacity** from **system capacity**, meaning end-to-end completed work for a particular workload at an acceptable response time. “Landscape capacity” is a useful visual metaphor, but not the term taught on the slide. Neither vertical nor horizontal scaling is portrayed as wrong. The next slide resets from an illustrative diagram with a known bottleneck to a real investigation: slow API responses are the **observation**, “what is actually limiting the response?” is the **question**, and API CPU, database waits, and external-service delay are **hypotheses** to check against request timing and resource evidence. Do not assume that a resource is saturated merely because a response is slow. Only then does the toolbox organize responses by capacity, work, and demand. The deck then tests state and workload assumptions before returning to the same landscape as its bottleneck moves to an external service. The queue and order-service diagrams show that an architectural change can precede resource scaling. Autoscaling comes only after the workload and signal are understood.

The opening example assumes demand waiting behind the API: relieving its limit lets more work reach the database. Adding API capacity alone does not create database load when demand is unchanged. A component change can improve system throughput up to the next limit; it should not be presented as useless.

## Theory-to-hands-on flow

Keep the theory to roughly **20–30 minutes**, then move into hands-on reasoning. This is facilitator guidance, not an agenda slide. Every slide in `resource-scaling.md` now has presenter notes covering its core idea, why it appears there, a way to involve the room, and the bridge to the next idea.

- **Slides 1–2 (about 2 min):** Establish rising demand, a reached limit, and visible symptoms.
- **Slides 3–9 (about 6 min):** Introduce bigger and more, then explain each. On slide 6, pause on the false ending and click to reveal “NOT.” On slide 7, predict where the bottleneck moves. On slide 8, reveal the question, competing hypotheses, and evidence after starting from the observed symptom. Open the toolbox on slide 9.
- **Slides 10–13 (3–4 min):** Test when replicas work and how state, ownership, and coordination change the answer.
- **Slides 14–19 (5–7 min):** Return to the same landscape for its next bottleneck; show why read/write paths, queues, architecture boundaries, and scaling signals matter.
- **Slides 20–24 (6–8 min):** Transfer the model to the fictional on-sale. Pause longest on slides 22–23 so participants can make and test their own assumptions.
- **Slides 25–27 (2–3 min):** Retrieve the reasoning questions and hand off to practice. Do not read the summary tiles aloud one by one.

For hands-on work, ask each group to name the observed pressure and evidence, where state and ownership sit, whether the work can be divided, what receives extra load after their proposed change, and whether a boundary must change first. Let the practical scenario determine the exact design exercise.

## Ticketmaster case framing

The case is a **fictional design exercise inspired by the Ticketmaster product**, not a description of Ticketmaster's production architecture or traffic. A major artist's Ziggo Dome on-sale opens at 10:00. Fans browse, check availability, reserve, and purchase. Browse volume and seat-purchase contention create different scaling constraints. No precise traffic numbers are claimed.

Let participants propose which components could scale without redesign, then ask what happens if only the API is replicated. Reveal catalog caching, browse/purchase separation, admission control, and inventory contention as possible design considerations, not an answer key. Protecting checkout can mean delaying or rejecting less essential work.

## Facilitation lines

- “What resource is saturated? What evidence tells us that?”
- “Is the API doing work, or waiting for a dependency?”
- “Can this workload be divided? Where does its state live?”
- “Who owns this data or job? What coordination is required?”
- “Would another instance increase throughput?”
- “Did we increase capacity in one component or across the whole workload?”
- “What receives additional load when we scale this?”
- “Where is the pressure now?”
- “Are we solving average traffic or the peak?”
- “Could we remove, delay, batch, cache, or reject this work?”
- “We are discussing Kubernetes now — what scaling problem are we solving?”
- “Does the architecture need to change before resources help?”

## Visual metaphors

- **One larger node / several replicas:** capacity and division are different moves.
- **Bigger / more:** matching cards name the two directions before the detailed diagrams.
- **False ending:** “bigger or more” feels complete until the landscape exposes another limit.
- **Component versus system capacity:** more API throughput may help only until shared database capacity limits completed work.
- **State ownership:** identical boxes do not imply interchangeable workers.
- **One current bottleneck:** name it at the API, move the orange label to the database on click, then return to the landscape when the external service becomes the next limit.
- **Symptom before diagnosis:** a slow API response starts a progressively revealed investigation: observation, question, hypotheses, evidence. It does not identify the bottleneck by itself.
- **Queue as a boundary:** arrival rate and processing capacity become separate concerns.
- **Four-step redesign:** coupled work → blocked replication → new boundary → independently scalable workloads.
- **On-sale spike:** a deliberately illustrative jump from normal demand to a burst.

All new diagrams are SVGs in [`public/assets/scaling/`](../public/assets/scaling/). They use the existing LunchLab palette and typography.
Diagram canvases and the “NOT” reveal are transparent so the slide background stays continuous. Filled shapes identify components or bottlenecks; comparison and stage outlines do not create separate white backplates.

## Slide list

1. Resource Scaling — why this session and what participants get.
2. What do we mean by scaling? — demand, limit, and symptoms.
3. Two ways to add capacity — introduce bigger and more.
4. Vertical scaling — one node gets more headroom.
5. Horizontal scaling — divide work across instances.
6. That's scaling. Thanks, everyone. — false ending; click to reveal “NOT.”
7. The bottleneck — define the current limit; reveal the database bottleneck and distinguish component from system capacity.
8. Investigating slow responses — observe the symptom, then reveal the question, hypotheses, and evidence.
9. Scaling is a toolbox — capacity, work, and demand.
10. A stateless API — why the easy case is easy.
11. What changed? — add state and ownership.
12. Replicas are not equally useful everywhere — workload dimensions.
13. Horizontal or vertical? It depends. — workload-dependent constraints.
14. The bottleneck moves again — return to the landscape and expose the external dependency.
15. The next limit — pause and predict the next bottleneck.
16. Reads and writes scale differently — different options and constraints.
17. Queues change the scaling model — decouple arrival and processing.
18. Sometimes the first scaling action is redesign — four-step boundary change.
19. Autoscaling: based on what? — signals tied to pressure.
20. At 10:00, demand changes shape — fictional Ticketmaster on-sale surge.
21. What must the fictional system protect? — needs and overload priorities.
22. What could scale without redesign? — audience exercise.
23. More APIs will not create more seats — browse and purchase pressure.
24. Sometimes, accept less work — protect, shape, and drop work.
25. Ask in this order — scaling mental model.
26. Keep the conversation architectural — facilitator guide.
27. Find the pressure. — final takeaway.

## Run and sources

From the repository root: `npm run dev:scaling` (port 3031), `npm run build:scaling`, or `npm run export:scaling -- --format pdf`.

Conceptual references, adapted rather than copied: [Azure Architecture Center on system bottlenecks and scale-out](https://learn.microsoft.com/en-us/azure/architecture/guide/design-principles/scale-out), [HelloInterview Scaling Reads](https://www.hellointerview.com/learn/system-design/patterns/scaling-reads), [Scaling Writes](https://www.hellointerview.com/learn/system-design/patterns/scaling-writes), [Ticketmaster design exercise](https://www.hellointerview.com/learn/system-design/problem-breakdowns/ticketmaster), and [contention](https://www.hellointerview.com/learn/system-design/patterns/dealing-with-contention). [Ticketmaster Netherlands lists the Ziggo Dome](https://www.ticketmaster.nl/venue/ziggo-dome-amsterdam-tickets/ziggo/107?language=en-us), making it a recognizable local product domain.
