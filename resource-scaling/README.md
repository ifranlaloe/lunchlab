# LunchLab — Resource Scaling

## Core message

Scaling starts with the bottleneck, the workload, and the state — not the replica count. Increasing one component's capacity may expose the next limit without increasing end-to-end system capacity as much as expected. The useful response might be infrastructure capacity, an implementation improvement, a new architectural boundary, or demand control.

## Scope and teaching model

This is an architecture-awareness LunchLab, not a Kubernetes or implementation workshop. Work from an observed limit to five questions:

1. What is under pressure, what evidence shows it, and what work creates that pressure?
2. Can the work be divided safely, or can one node gain useful headroom?
3. Where does state live, and who owns each piece of work?
4. What dependency receives more load after this change?
5. Are boundaries, ownership, or communication patterns preventing scaling?

The opening names the two familiar ways to add capacity, then explains vertical and horizontal scaling in turn. A brief false ending makes that pair feel like a complete answer. Immediately afterward, **The bottleneck** names the part currently limiting completed work. Adding API capacity may improve throughput until the database becomes the next bottleneck. This distinguishes **component capacity** from **system capacity**, meaning end-to-end completed work for a particular workload at an acceptable response time. Neither vertical nor horizontal scaling is portrayed as wrong. The next slide resets from an illustrative diagram with a known bottleneck to a real investigation: slow API responses are the **observation**, “what is actually limiting the response?” is the **question**, and API CPU, database waits, and external-service delay are **hypotheses** to check against request timing and resource evidence. A final question asks what in the implementation creates the measured limit. Do not assume that a resource is saturated merely because a response is slow.

Four component slides then turn possible diagnoses into conditional patterns. The **API** can gain headroom or replicas, do less work per request, or bound calls to a struggling dependency. The **database** can gain node capacity, separate reads, improve queries and indexes, or divide contended writes. **External-service** calls can be cached, batched, bounded, or deferred when the contract allows it. **Workers and queues** can add consumers, reduce job cost, partition ownership, or control intake; a queue alone does not create processing capacity. Each option is a hypothesis to validate, not a result or universal recommendation. The **Scaling is a toolbox** slide follows as a synthesis of capacity, work, and demand levers, with architecture changes enabling some of them. The fictional on-sale case applies these questions to a burst and a contended shared resource.

The opening example assumes demand waiting behind the API: relieving its limit lets more work reach the database. Adding API capacity alone does not create database load when demand is unchanged. A component change can improve system throughput up to the next limit; it should not be presented as useless.

## Theory-to-hands-on flow

Keep the theory to roughly **20–30 minutes**, then move into hands-on reasoning. This is facilitator guidance, not an agenda slide. Every slide in `resource-scaling.md` now has presenter notes covering its core idea, why it appears there, a way to involve the room, and the bridge to the next idea.

- **Slides 1–2 (about 2 min):** Establish rising demand, a reached limit, and visible symptoms.
- **Slides 3–8 (about 6 min):** Introduce bigger and more, then explain each. On slide 6, pause on the false ending and click to reveal “NOT.” On slide 7, predict where the bottleneck moves. On slide 8, reveal the question, competing hypotheses, evidence, and implementation cause after starting from the observed symptom.
- **Slides 9–12 (about 8–10 min):** Work through API, database, external-service, and worker/queue patterns. Reveal each option, ask which evidence would support it, and discuss its prerequisite or trade-off. Spend longest on the database slide.
- **Slide 13 (about 1 min):** Use the toolbox as a recap of the options just explored.
- **Slides 14–18 (about 6–8 min):** Transfer the model to the fictional on-sale. Pause longest on slides 16–17 so participants can make and test their own assumptions.
- **Slides 19–21 (about 2–3 min):** Retrieve the reasoning questions and hand off to practice. Do not read the summary tiles aloud one by one.

For hands-on work, ask each group to name the observed pressure and evidence, where state and ownership sit, whether the work can be divided, what receives extra load after their proposed change, and whether a boundary must change first. Let the practical scenario determine the exact design exercise.

## Ticketmaster case framing

The case is a **fictional design exercise inspired by the Ticketmaster product**, not a description of Ticketmaster's production architecture or traffic. A major artist's Ziggo Dome on-sale opens at 10:00. Fans browse, check availability, reserve, and purchase. Browse volume and seat-purchase contention create different scaling constraints. No precise traffic numbers are claimed.

Let participants propose which components could scale without redesign, then ask what happens if only the API is replicated. Reveal catalog caching, browse/purchase separation, admission control, and inventory contention as possible design considerations, not an answer key. Protecting checkout can mean delaying or rejecting less essential work.

## Facilitation lines

- “What resource is saturated? What evidence tells us that?”
- “Is the API doing work, or waiting for a dependency?”
- “What in the implementation creates this limit?”
- “Is this a node-capacity problem, repeated work, or contention?”
- “Would a read replica help this path, or does the write owner remain the limit?”
- “What does this queue change, and what is the worker completion rate?”
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
- **One current bottleneck:** name it at the API, then move the orange label to the database on click.
- **Symptom before diagnosis:** a slow API response starts a progressively revealed investigation: observation, question, hypotheses, evidence, then the implementation cause. It does not identify the bottleneck by itself.
- **Component patterns:** four progressively revealed diagrams per component show a current path and one conditional option. Their labels distinguish infrastructure, implementation, architecture, and operations changes.
- **Queue as a boundary:** arrivals and worker completion have separate rates; persistent backlog still requires more throughput or less admitted work.
- **On-sale spike:** a deliberately illustrative jump from normal demand to a burst.

The component diagrams are editable Slidev content in [`ScalingPatterns.vue`](../components/ScalingPatterns.vue), styled in [`style.css`](../style.css). Existing landscape diagrams remain SVGs in [`public/assets/scaling/`](../public/assets/scaling/). Both use the LunchLab palette and typography.

## Slide list

1. Resource Scaling — why this session and what participants get.
2. What do we mean by scaling? — demand, limit, and symptoms.
3. Two ways to add capacity — introduce bigger and more.
4. Vertical scaling — one node gets more headroom.
5. Horizontal scaling — divide work across instances.
6. That's scaling. Thanks, everyone. — false ending; click to reveal “NOT.”
7. The bottleneck — define the current limit; reveal the database bottleneck and distinguish component from system capacity.
8. Investigating slow responses — observe the symptom, then reveal the question, hypotheses, evidence, and implementation cause.
9. API: when the request path is hot — local capacity, replicas, cheaper requests, and bounded calls.
10. Database: find the pressured path — node capacity, read replicas, query/index work, and write partitioning.
11. External service: protect the dependency — cache, batch, bound calls, or defer optional work.
12. Workers & queue: separate arrival from capacity — consumers, job cost, ownership, and admission.
13. Scaling is a toolbox — synthesize capacity, work, and demand levers.
14. At 10:00, demand changes shape — fictional Ticketmaster on-sale surge.
15. What must the fictional system protect? — needs and overload priorities.
16. What could scale without redesign? — audience exercise.
17. More APIs will not create more seats — browse and purchase pressure.
18. Sometimes, accept less work — protect, shape, and drop work.
19. Ask in this order — scaling mental model.
20. Keep the conversation architectural — facilitator guide.
21. Find the pressure. — final takeaway.

## Run and sources

From the repository root: `npm run dev:scaling` (port 3031), `npm run build:scaling`, or `npm run export:scaling -- --format pdf`.

Conceptual references, adapted rather than copied: [Azure scale-out principles](https://learn.microsoft.com/en-us/azure/architecture/guide/design-principles/scale-out), [PostgreSQL resource scaling](https://learn.microsoft.com/en-us/azure/postgresql/scale/concepts-scaling-resources), [data performance guidance](https://learn.microsoft.com/en-us/azure/well-architected/performance-efficiency/optimize-data-performance), [caching](https://learn.microsoft.com/en-us/azure/architecture/best-practices/caching), [throttling](https://learn.microsoft.com/en-us/azure/architecture/patterns/throttling), [competing consumers](https://learn.microsoft.com/en-us/azure/architecture/patterns/competing-consumers), and [background jobs](https://learn.microsoft.com/en-us/azure/architecture/best-practices/background-jobs). The on-sale is a fictional design exercise; [Ticketmaster Netherlands lists the Ziggo Dome](https://www.ticketmaster.nl/venue/ziggo-dome-amsterdam-tickets/ziggo/107?language=en-us), making it a recognizable local product domain.
