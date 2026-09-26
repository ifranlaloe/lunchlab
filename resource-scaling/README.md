# LunchLab — Resource Scaling

## Core message

Scaling starts with the bottleneck, the workload, and the state — not the replica count. Adding capacity is only one response to pressure. A successful change may move the constraint to the next dependency, and sometimes the architecture must change before a workload can scale independently.

## Scope and teaching model

This is an architecture-awareness LunchLab, not a Kubernetes or implementation workshop. Work from an observed limit to five questions:

1. What is under pressure, and what evidence shows it?
2. Can the work be divided safely, or can one node gain useful headroom?
3. Where does state live, and who owns each piece of work?
4. What dependency receives more load after this change?
5. Are boundaries, ownership, or communication patterns preventing scaling?

The first half contrasts vertical and horizontal scaling without ranking them. It then follows one architecture as its bottleneck moves from API to database to an external service. The queue and order-service diagrams show that an architectural change can precede resource scaling. Autoscaling comes only after the workload and signal are understood.

## Ticketmaster case framing

The case is a **fictional design exercise inspired by the Ticketmaster product**, not a description of Ticketmaster's production architecture or traffic. A major artist's Ziggo Dome on-sale opens at 10:00. Fans browse, check availability, reserve, and purchase. Browse volume and seat-purchase contention create different scaling constraints. No precise traffic numbers are claimed.

Let participants propose which components could scale without redesign, then ask what happens if only the API is replicated. Reveal catalog caching, browse/purchase separation, admission control, and inventory contention as possible design considerations, not an answer key. Protecting checkout can mean delaying or rejecting less essential work.

## Facilitation lines

- “What resource is saturated? What evidence tells us that?”
- “Can this workload be divided? Where does its state live?”
- “Who owns this data or job? What coordination is required?”
- “Would another instance increase throughput?”
- “What receives additional load when we scale this?”
- “Where is the pressure now?”
- “Are we solving average traffic or the peak?”
- “Could we remove, delay, batch, cache, or reject this work?”
- “We are discussing Kubernetes now — what scaling problem are we solving?”
- “Does the architecture need to change before resources help?”

## Visual metaphors

- **One larger node / several replicas:** capacity and division are different moves.
- **State ownership:** identical boxes do not imply interchangeable workers.
- **Same pipeline, moving hotspot:** scaling exposes the next shared constraint.
- **Queue as a boundary:** arrival rate and processing capacity become separate concerns.
- **Four-step redesign:** coupled work → blocked replication → new boundary → independently scalable workloads.
- **On-sale spike:** a deliberately illustrative jump from normal demand to a burst.

All new diagrams are SVGs in [`public/assets/scaling/`](../public/assets/scaling/). They use the existing LunchLab palette and typography.

## Slide list

1. Resource Scaling — why this session and what participants get.
2. What do we mean by scaling? — demand, limit, and symptoms.
3. Scaling is a toolbox — capacity, work, and demand.
4. Vertical scaling — one node gets more headroom.
5. Horizontal scaling — divide work across instances.
6. A stateless API — why the easy case is easy.
7. What changed? — add state and ownership.
8. Replicas are not equally useful everywhere — workload dimensions.
9. Horizontal or vertical? It depends. — workload-dependent constraints.
10. We scale the API. Then what? — API hotspot, then database hotspot on click.
11. Remove database work. Then what? — external dependency hotspot.
12. The bottleneck moves — pause and predict the next limit.
13. Reads and writes scale differently — different options and constraints.
14. Queues change the scaling model — decouple arrival and processing.
15. Sometimes the first scaling action is redesign — four-step boundary change.
16. Autoscaling: based on what? — signals tied to pressure.
17. At 10:00, demand changes shape — fictional Ticketmaster on-sale surge.
18. What must the fictional system protect? — needs and overload priorities.
19. What could scale without redesign? — audience exercise.
20. More APIs will not create more seats — browse and purchase pressure.
21. Sometimes, accept less work — protect, shape, and drop work.
22. Ask in this order — scaling mental model.
23. Keep the conversation architectural — facilitator guide.
24. Find the pressure. — final takeaway.

## Run and sources

From the repository root: `npm run dev:scaling` (port 3031), `npm run build:scaling`, or `npm run export:scaling -- --format pdf`.

Conceptual references, adapted rather than copied: [HelloInterview Scaling Reads](https://www.hellointerview.com/learn/system-design/patterns/scaling-reads), [Scaling Writes](https://www.hellointerview.com/learn/system-design/patterns/scaling-writes), [Ticketmaster design exercise](https://www.hellointerview.com/learn/system-design/problem-breakdowns/ticketmaster), and [contention](https://www.hellointerview.com/learn/system-design/patterns/dealing-with-contention). [Ticketmaster Netherlands lists the Ziggo Dome](https://www.ticketmaster.nl/venue/ziggo-dome-amsterdam-tickets/ziggo/107?language=en-us), making it a recognizable local product domain.
