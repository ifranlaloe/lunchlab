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

Four component slides then turn possible diagnoses into conditional patterns. The **API** can gain headroom or replicas, do less work per request, or limit simultaneous calls to a struggling dependency. The **database** can gain node capacity, separate reads, improve queries and indexes, or shorten write transactions when avoidable work holds them open. **External-service** calls can be cached, batched, limited, or deferred when the contract allows it. **Workers and queues** can add consumers, reduce job cost, partition ownership, or control intake; a queue alone does not create processing capacity. Each option is a hypothesis to validate, not a result or universal recommendation. The **Scaling is a toolbox** slide follows as a synthesis of capacity, work, and demand levers, with architecture changes enabling some of them. The fictional Big Bands Ticket Gatekeeper introduction is followed by C1 system context, C2 containers, and C3 Web/API components. One participant question board then stays on screen through the quests.

The opening example assumes demand waiting behind the API: relieving its limit lets more work reach the database. Adding API capacity alone does not create database load when demand is unchanged. A component change can improve system throughput up to the next limit; it should not be presented as useless.

## Theory-to-hands-on flow

Keep the theory and discussion to roughly **20 minutes**, then introduce the case at slide 14. This is facilitator guidance, not an agenda slide. Every slide in `resource-scaling.md` has presenter notes covering its core idea, why it appears there, a way to involve the room, and the bridge to the next idea.

- **Slides 1–2 (about 2 min):** Establish rising demand, a reached limit, and visible symptoms.
- **Slides 3–8 (about 6 min):** Introduce bigger and more, then explain each. On slide 6, pause on the false ending and click to reveal the full-screen Samara still. On slide 7, predict where the bottleneck moves. On slide 8, reveal the question, competing hypotheses, evidence, and implementation cause after starting from the observed symptom.
- **Slides 9–12 (about 8–10 min):** Work through API, database, external-service, and worker/queue patterns. Reveal each option, ask which evidence would support it, and discuss its prerequisite or trade-off. Spend longest on the database slide.
- **Slide 13 (about 1 min):** Use the toolbox as a recap of the options just explored.
- **Slides 14–17 (about 4 min):** Introduce Big Bands Ticket Gatekeeper and zoom from C1 context to C2 containers and C3 components.
- **Slide 18 (keep visible during quests):** Show the participant question board and read [Quest 1 — slow event pages](host/quests/01-event-pages.md). Participants use the cards in any order to investigate all four quests. Bring back the C3 or updated diagram when they need to trace a path; reveal each updated host diagram only after the group supports its change. Use slide 12's worker patterns for [Quest 3 — confirmation backlog](host/quests/03-confirmation-backlog.md); introduce nine simultaneous shows and revisit slide 10's database patterns for [Quest 4 — seat inventory memory](host/quests/04-seat-inventory-memory.md).
- **Slide 19 (about 1 min):** Close with the single takeaway question after the final quest.

Every group starts with Quest 1 and moves through the path in order. Begin each new quest by briefly restating the accepted change, the pressure it relieved, and any new workload condition. Let participants investigate the new symptom with evidence, state, and ownership questions. Move only after the host guide's conditions are met.

## Big Bands Ticket Gatekeeper case framing

**Big Bands Ticket Gatekeeper (BBTG)** is a fictional ticket platform. Its gate logo uses a spooky mansion motif and the purple, cream, and orange palette seen on [bbtg.com](https://www.bbtg.com/); it is not that company's product. The ticketing exercise is inspired by a familiar Ticketmaster-like product flow, not by Ticketmaster's production architecture or traffic. A major artist's Ziggo Dome on-sale opens at 12:00. Users browse, check availability, reserve, and purchase. Browse volume and seat-purchase contention create different scaling constraints. Later host-only rates are invented exercise figures.

Use the case introduction and three architecture levels to establish the product flow, owned system boundary, containers, and internal components. Leave slide 18's participant questions visible during the quests. Let participants propose possible limits and request evidence before revealing a cause. Ask what happens if only the API is replicated. Reveal catalog caching, admission control, and inventory contention through the quests as possible design considerations, not an answer key. Protecting checkout can mean delaying or rejecting less essential work.

The [host guide](host/README.md) introduces a C4-style Web/API component view and an ordered four-quest path. Its outer system boundary contains the owned database; Checkout leads to an internal Email service that calls the external Email provider. Payment and email providers are external software systems visible from the start. Quest 3 adds a durable queue and worker application. The same fictional system moves from catalog reads to seat reservations to confirmation rendering. Quest 4 introduces a separate, nine-show workload that strains the primary database's memory for live seat data. Quest 1's successful fix exposes Quest 2's reservation limit; Quest 4 does not need to be a consequence of Quest 3. Each quest includes an updated diagram for its preferred change; use the group's own drawing when it takes another valid route. Each quest pairs the participants' symptom, questions, and proposals with prepared host answers, a preferred change, and conditions for revealing the next constraint. Keep hidden facts off the projected slides.

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
- **False ending:** “bigger or more” feels complete, then one click cuts to a full-screen Samara still before the bottleneck slide opens the second half.
- **Component versus system capacity:** more API throughput may help only until shared database capacity limits completed work.
- **One current bottleneck:** name it at the API, then move the orange label to the database on click.
- **Symptom before diagnosis:** a slow API response starts a progressively revealed investigation: observation, question, hypotheses, evidence, then the implementation cause. It does not identify the bottleneck by itself.
- **Component patterns:** four progressively revealed diagrams per component show a current path and one conditional option on white cards, matching the white diagram surfaces on the vertical and horizontal scaling slides. Their labels distinguish infrastructure, implementation, architecture, and operations changes.
- **Queue as a boundary:** arrivals and worker completion have separate rates; persistent backlog still requires more throughput or less admitted work.
- **Gatekeeper logo:** an old mansion gate inside an orange ring introduces the fictional platform.
- **Starting architecture:** three full-stage diagrams zoom from C1 system context to C2 containers and C3 Web/API components without changing the underlying design. White cards, a cream canvas, purple connections, and the orange BBTG boundary carry the deck's visual theme through the walkthrough.
- **Participant guide:** six white question cards combine the former diagnosis, mental-model, and facilitator prompts into one reusable screen. There is no prescribed order.
- **Halloween cutouts:** bats, a skeleton hand, a gargoyle, zombie hands, a hooded scream mask, a cobweb with spider, and a pumpkin decorate selected slide margins. The C1–C3 diagrams use cutouts in their open upper-right margins.

The component diagrams are editable Slidev content in [`ScalingPatterns.vue`](../components/ScalingPatterns.vue), styled in [`style.css`](../style.css). The complete scaling deck uses a flat Gatekeeper cream background, white cards, purple connections, and orange accents. The case intro uses the transparent [`gatekeeper-logo.png`](../public/assets/scaling/gatekeeper-logo.png). The three full-slide architecture assets in [`public/assets/scaling/`](../public/assets/scaling/) are copies of the [host's C1](host/ticket-on-sale-c1.svg), [C2](host/ticket-on-sale-c2.svg), and [C3](host/ticket-on-sale-c3.svg) source diagrams; keep each slide copy in sync with its host source.

Each decorated slide selects cutouts with a `halloween: [...]` frontmatter list in [`resource-scaling.md`](../resource-scaling.md). Remove the line to turn that slide's decorations off, or add any placement key defined in [`HalloweenDecor.vue`](../components/HalloweenDecor.vue). The transparent images live in [`public/assets/scaling/halloween/`](../public/assets/scaling/halloween/). Placements are fixed so they do not jump between reloads or cover diagram labels.

## Slide list

1. Resource Scaling — why this session and what participants get.
2. When do we need to scale? — demand, limit, and symptoms.
3. Two ways to add capacity — introduce bigger and more.
4. Vertical scaling — one node gets more headroom.
5. Horizontal scaling — divide work across instances.
6. That's scaling. Thanks, everyone. — false ending; click to reveal a full-screen Samara still.
7. The bottleneck — define the current limit; reveal the database bottleneck and distinguish component from system capacity.
8. Investigating slow responses — observe the symptom, then reveal the question, hypotheses, evidence, and implementation cause.
9. API: when the request path is hot — local capacity, replicas, cheaper requests, and limits on simultaneous calls.
10. Database: find the pressured path — node capacity, read replicas, query/index work, and shorter write transactions.
11. External service: protect the dependency — cache, batch, limit simultaneous calls, or defer optional work.
12. Workers & queue: separate arrival from capacity — consumers, job cost, ownership, and admission.
13. Scaling is a toolbox — synthesize capacity, work, and demand levers.
14. Big Bands Ticket Gatekeeper — introduce the fictional ticket platform and its gate logo.
15. C1 system context — User, BBTG, and external providers.
16. C2 containers — owned Web/API application and primary database.
17. C3 components — request router, catalog, reservation, checkout, and Email service inside Web/API.
18. Questions for every quest — six participant-facing cards, kept visible during the exercise.
19. Find the pressure. — final takeaway after the last quest.

## Run and sources

From the repository root: `npm run dev:scaling` (port 3031), `npm run build:scaling`, or `npm run export:scaling -- --format pdf`.

Conceptual references, adapted rather than copied: [Azure scale-out principles](https://learn.microsoft.com/en-us/azure/architecture/guide/design-principles/scale-out), [PostgreSQL resource scaling](https://learn.microsoft.com/en-us/azure/postgresql/scale/concepts-scaling-resources), [data performance guidance](https://learn.microsoft.com/en-us/azure/well-architected/performance-efficiency/optimize-data-performance), [caching](https://learn.microsoft.com/en-us/azure/architecture/best-practices/caching), [throttling](https://learn.microsoft.com/en-us/azure/architecture/patterns/throttling), [competing consumers](https://learn.microsoft.com/en-us/azure/architecture/patterns/competing-consumers), and [background jobs](https://learn.microsoft.com/en-us/azure/architecture/best-practices/background-jobs). The on-sale is a fictional design exercise; [Ticketmaster Netherlands lists the Ziggo Dome](https://www.ticketmaster.nl/venue/ziggo-dome-amsterdam-tickets/ziggo/107?language=en-us), making it a recognizable local product domain. The intro slide's palette was drawn from [BBTG's website](https://www.bbtg.com/).
