---
theme: default
layout: lunchlab-text
title: 'LunchLab — Resource Scaling'
eyebrow: LunchLab
aspectRatio: 16/9
canvasWidth: 1280
colorSchema: light
---

# Resource Scaling

<div class="subtitle">When demand grows, <strong>what actually needs to change?</strong></div>

<TwoColumns>
<template #left>

### Why this session

- See what actually limits a system under load.
- Recognize that workloads scale differently.
- Choose a response that fits the workload.

</template>
<template #right>

### What you will get

- A mental model for scaling decisions.
- Horizontal and vertical trade-offs.
- A case where a new limit appears.
- Questions for architecture discussions.

</template>
</TwoColumns>

<!--
Core idea: Scaling decisions start with rising demand and a system limit.
Why here: Open the question without revealing the wider set of responses yet.
Facilitate: Ask what people would do first if traffic doubled; take one or two quick answers without judging them yet. Promise a short theory segment followed by hands-on reasoning, not an infrastructure tutorial.
Build toward: Show when demand becomes a problem, then introduce the two familiar ways to add capacity.
-->

---
layout: lunchlab-scaling
eyebrow: Start with pressure
title: What do we mean by scaling?
prompt: When does rising demand become a scaling problem?
---

<div class="scaling-grid three">
  <div class="scaling-panel"><h3>Demand rises</h3><p>More requests, more data, more simultaneous work.</p></div>
  <div class="scaling-panel accent"><h3>Something reaches a limit</h3><p>CPU · memory · disk I/O · network · connections.</p></div>
  <div class="scaling-panel warning"><h3>Symptoms appear</h3><p>Latency, errors, or a growing queue backlog.</p></div>
</div>

<!--
Core idea: Rising demand becomes a scaling problem when a limit is reached and its symptoms become visible. More demand alone is not the diagnosis.
Why here: The group needs this cause-and-effect chain before comparing scaling techniques.
Facilitate: Ask someone to trace one example through the three boxes, such as more simultaneous requests, CPU saturation, then latency. Make clear that finding the actual limiting resource would still need evidence; this slide only shows the pattern.
Build toward: Name the two familiar capacity moves before looking at each in detail.
-->

---
layout: lunchlab-scaling
eyebrow: The familiar answer
title: Two ways to add capacity
prompt: Bigger, or more?
---

<div class="scaling-grid two">
  <div class="scaling-panel"><h3>Vertical scaling</h3><p>Make one machine <strong>bigger</strong>.</p></div>
  <div class="scaling-panel"><h3>Horizontal scaling</h3><p>Add <strong>more</strong> machines to share the work.</p></div>
</div>

<!--
Core idea: The familiar capacity choice is either more resources for one instance or more instances sharing work.
Why here: Give the audience names for “bigger” and “more” before examining their constraints.
Facilitate: Ask which side matched people's first instinct when traffic doubled. Keep the explanation to one sentence per side; save trade-offs and state for the following slides.
Build toward: Zoom into vertical scaling first, then horizontal scaling.
-->

---
layout: lunchlab-scaling
eyebrow: One node, more headroom
title: Vertical scaling
prompt: Can this workload benefit from a bigger machine?
---

<img class="scaling-figure" src="/assets/scaling/vertical.svg" alt="One processor becomes a larger processor with more CPU and memory, while remaining a single failure domain." />

<!--
Core idea: Giving one node more CPU or memory can be the simplest useful response when that local resource is the real limit.
Why here: Expand the “bigger” option from the preceding overview and give it a fair explanation.
Facilitate: Ask which workload might benefit from more memory or a faster processor. Name the ceiling and single failure domain, but do not call this an inferior choice.
Build toward: Contrast “one node does more” with “the work is divided.”
-->

---
layout: lunchlab-scaling
eyebrow: Divide the work
title: Horizontal scaling
prompt: Can this workload be safely divided across instances?
---

<img class="scaling-figure" src="/assets/scaling/horizontal.svg" alt="Requests pass through traffic distribution to three API instances." />

<!--
Core idea: Horizontal scaling adds workers only when the work can be routed or partitioned safely.
Why here: Complete the familiar “bigger or more” frame before challenging its completeness.
Facilitate: Explain traffic distribution and ask only whether more instances could help. Hold the deeper questions about state and dependencies for after the reveal.
Build toward: Briefly act as though bigger or more has finished the scaling story.
-->

---
layout: lunchlab-text
eyebrow: The usual answer
title: "That's scaling. Thanks, everyone."
closing: true
---

<div class="scaling-finish">
  <div v-click.hide="1" class="scaling-finish-setup">
    <p>One bigger machine. Or more machines.</p>
    <h1>That's scaling.<br>Thanks, everyone.</h1>
  </div>
  <div v-click="1" class="scaling-finish-reveal">
    <div class="scaling-finish-not">NOT</div>
    <p>Those were only two ways to add capacity.</p>
  </div>
</div>

<!--
Core idea: Vertical and horizontal scaling add capacity, but they do not settle what the workload actually needs.
Why here: Let the familiar model feel complete for a moment, then expose the assumption behind it.
Facilitate: Deliver the false ending deadpan, pause for two or three seconds, then click once. Clarify immediately that bigger and more are valid choices; the point is that capacity is only one class of response.
Build toward: Show why increasing one component's capacity does not settle the capacity of the whole system.
-->

---
layout: lunchlab-scaling
eyebrow: Component capacity vs system capacity
title: The bottleneck
prompt: What happens when the API handles more requests?
---

<div class="scaling-sequence">
  <img v-click.hide="1" class="scaling-figure" src="/assets/scaling/bottleneck-api.svg" alt="Users send work through an API, database, and external service. The API is the current bottleneck limiting completed work." />
  <img v-click="1" class="scaling-figure" src="/assets/scaling/bottleneck-db.svg" alt="With waiting demand, three API replicas can pass more work to the shared database, which becomes the system bottleneck." />
</div>

<!--
Core idea: The bottleneck is the part currently limiting completed work. Component capacity can rise while system capacity remains limited by another component.
Why here: Give the “NOT” reveal immediate causal evidence and a name for the limit before opening the wider toolbox. The landscape will return later with a new constraint.
Facilitate: Let the room read the definition, then name the API as the current bottleneck. Ask what adding API replicas changes, wait for a prediction, then click. A larger API node could expose the same next limit. With enough waiting demand, more work can now reach the database, which may become the next bottleneck. Explain that system capacity means completed end-to-end work for this workload at an acceptable response time. Do not imply the API change had no benefit: throughput may rise until the database limit. Without waiting demand, extra API capacity would not itself increase database load.
Build toward: The diagram supplied a bottleneck; in a real incident, we must first discover whether the slow API is doing work or waiting on something else.
Source: https://learn.microsoft.com/en-us/azure/architecture/guide/design-principles/scale-out
-->

---
layout: lunchlab-scaling
eyebrow: From symptom to diagnosis
title: Investigating slow responses
---

<div class="scaling-diagnosis">
  <div class="scaling-diagnosis-step observation">
    <span>Observation</span><p>API responses are <strong>slow.</strong></p>
  </div>
  <div v-click="1" class="scaling-diagnosis-step question">
    <span>Question</span><p>What is actually limiting the response?</p>
  </div>
  <div v-click="2" class="scaling-diagnosis-step hypotheses">
    <span>Hypotheses</span><p>API CPU? Database waits? External latency?</p>
  </div>
  <div v-click="3" class="scaling-diagnosis-step evidence">
    <span>Evidence</span><p>Trace requests. Check CPU, waits, and dependency time.</p>
  </div>
  <div v-click="4" class="scaling-diagnosis-step cause">
    <span>Cause</span><p>What in the implementation creates this limit?</p>
  </div>
</div>

<!--
Core idea: Slow API responses are an observation, not a diagnosis. First locate the limiting factor, then ask what in the current implementation creates that limit. A resource might be saturated because the code repeats expensive work; a lock can cap throughput even when CPU is idle.
Why here: The previous diagram supplied a known bottleneck. A real investigation begins with an observed symptom, then asks a question, proposes competing explanations, checks evidence, and investigates the cause before choosing a response.
Facilitate: Show only the observation. Ask the room for the main question, then reveal it. Collect possible causes before revealing the hypotheses. Ask what would distinguish high API CPU from database waiting or external-service delay. Reveal the evidence next; request timing and resource measurements, not guesses. On the final click, ask whether repeated computation, excessive queries, or serialized work could be creating the measured limit. Do not treat implementation and resource pressure as mutually exclusive, and do not declare a cause without data.
Build toward: The cause may call for more capacity, less work per request, or control over admitted demand. Open the toolbox as a set of responses to evidence, not a list of defaults.
-->

---
layout: lunchlab-scaling
eyebrow: Beyond capacity
title: Scaling is a toolbox
prompt: Which response fits the evidence?
---

<div class="scaling-grid three">
  <div class="scaling-panel"><h3>Add capacity</h3><p>Bigger node · more instances · distribute work.</p></div>
  <div class="scaling-panel accent"><h3>Change the work</h3><p>Make it cheaper · cache · batch · delay it.</p></div>
  <div class="scaling-panel warning"><h3>Control demand</h3><p>Queue · slow intake · reject optional work · change boundaries.</p></div>
</div>

<!--
Core idea: Capacity, amount of work, and admitted demand are different levers.
Why here: The investigation has shown why the right response depends on both the limiting factor and what creates it, not just the symptom. Now organize the possible responses beyond bigger or more.
Facilitate: Point to “Add capacity” as the familiar move, then ask what the other two columns would change if the API were waiting on the database. Treat these as possible levers, not an answer key or a decision tree; the investigation has not yet supplied an answer.
Build toward: Before adding instances, test the crucial assumption that any instance can safely handle the work.
-->

---
layout: lunchlab-scaling
eyebrow: The easy case
title: A stateless API
prompt: Why can any replica handle the next request?
---

<img class="scaling-figure" src="/assets/scaling/horizontal.svg" alt="Independent requests can be routed to any of three stateless API replicas." />

<!--
Core idea: A stateless request can go to any healthy API replica because no single replica owns its history.
Why here: Return to horizontal scaling and test when its simple picture is actually true.
Facilitate: Ask why routing request two to another replica is safe. Keep the answer narrow: the API tier is relatively easy to replicate, not the whole system.
Build toward: Change just one assumption by giving a piece of work an owner.
-->

---
layout: lunchlab-scaling
eyebrow: Now add state
title: What changed?
prompt: Where does the state live — and who owns the work?
---

<img class="scaling-figure" src="/assets/scaling/state.svg" alt="A stateless request can reach either API, while a stateful order needs ownership and duplicate-processing coordination." />

<!--
Core idea: Once state or one-time work has an owner, identical replicas are not automatically interchangeable.
Why here: The audience can compare this directly with the stateless diagram and notice what changed.
Facilitate: Ask, “What if both workers process Order 123?” Draw out duplicate effects, ownership, and coordination; avoid implementation detail such as a particular lock or platform.
Build toward: Use these concerns as dimensions for evaluating other workload types.
-->

---
layout: lunchlab-scaling
eyebrow: Workload characteristics
title: Replicas are not equally useful everywhere
prompt: Which property would you ask about first?
---

<div>
  <div class="scaling-tags">
    <span class="scaling-tag">State</span><span class="scaling-tag">Ownership</span><span class="scaling-tag">Partitionability</span>
    <span class="scaling-tag">Ordering</span><span class="scaling-tag">Consistency</span><span class="scaling-tag">Local resources</span>
  </div>
  <p class="scaling-note" style="margin-top: 35px">Think API, worker, WebSocket, cache, broker, database, CPU- or memory-heavy processor — not a universal ranking.</p>
</div>

<!--
Core idea: The scaling properties belong to the workload, not to its generic component label.
Why here: The state example supplies a concrete reason to ask about ownership, ordering, and partitionability.
Facilitate: Pick two labels, such as API and database, and ask which tag could change the answer. Resist ranking all component types: an API can hold sessions, and workers can contend over one job.
Build toward: Compare where horizontal division or vertical headroom actually helps.
-->

---
layout: lunchlab-scaling
eyebrow: Choose for the workload
title: Horizontal or vertical? It depends.
prompt: The more coordination required, the less trivial adding replicas becomes.
---

<img class="scaling-figure" src="/assets/scaling/workloads.svg" alt="Four comparisons show when horizontal division is easier or harder and when vertical headroom helps or does not address the real limit." />

<!--
Core idea: Neither scaling direction wins universally; each addresses a different constraint under different workload assumptions.
Why here: Consolidate the stateless/stateful contrast without turning it into “horizontal good, vertical bad.”
Facilitate: Ask for one workload where another replica helps and one where a larger node may help more. Then ask what coordination or shared dependency could invalidate each answer.
Build toward: Return to the same landscape from the opening and test what happens when we remove some database work.
-->

---
layout: lunchlab-scaling
eyebrow: Bottleneck migration
title: The bottleneck moves again
prompt: What work did the cache remove, and what still has to happen?
---

<img class="scaling-figure" src="/assets/scaling/bottleneck-external.svg" alt="The same landscape now includes a cache to reduce database reads. The external service becomes the next bottleneck." />

<!--
Core idea: A successful optimization can expose a different shared dependency; it does not eliminate all limits.
Why here: Return to the landscape introduced just after “NOT” so the audience can see the next change, not learn a new system.
Facilitate: Recall that the database became the bottleneck after adding APIs. Ask what the cache can avoid and what it cannot. Then point to the external service and ask how more completed requests affect it. Do not imply that a cache fixes write contention.
Build toward: Generalize the question we should ask after every scaling change.
-->

---
layout: lunchlab-text
eyebrow: Pause and reason
---

# The next limit

<p class="lead">Scaling one part often reveals the next limit.</p>

<ContentCard>

### Ask before changing anything

**“What becomes the next bottleneck if we successfully scale this component?”**

</ContentCard>

<!--
Core idea: Scaling is an iterative system-level investigation. The current bottleneck can move when we relieve it.
Why here: Pause after two migrations so the audience can state the pattern in their own words without repeating the previous slide's title.
Facilitate: Let someone answer the quoted question for the diagram we just saw. Accept a hypothesis, then ask what metric would confirm it. Keep this brief; the question is the tool to reuse later.
Build toward: Some limits depend on whether the pressured path is mostly reads or contended writes.
-->

---
layout: lunchlab-scaling
eyebrow: Different demand paths
title: Reads and writes scale differently
prompt: Which path needs more coordination in this system?
---

<div class="scaling-grid two">
  <div class="scaling-panel accent"><h3>Reads: avoid or spread work</h3><p>Cache · CDN · indexes · read replicas · read models.</p><p class="scaling-small">Trade-off: freshness and cache misses still matter.</p></div>
  <div class="scaling-panel warning"><h3>Writes: control shared change</h3><p>Partition ownership · batch · queue · coordinate · shed load.</p><p class="scaling-small">Trade-off: contention, ordering, and consistency.</p></div>
</div>

<!--
Core idea: Reads can often be reused or spread, while writes to shared state may require ownership and coordination.
Why here: Explain why “add database replicas” is not one universal answer to the previous bottleneck.
Facilitate: Ask which side a seat-availability lookup belongs on and which side the act of reserving a particular seat belongs on. Mention freshness and contention as trade-offs, not implementation details.
Build toward: For processing that can finish later, changing the timing may let that workload scale independently.
Sources: https://www.hellointerview.com/learn/system-design/patterns/scaling-reads ; https://www.hellointerview.com/learn/system-design/patterns/scaling-writes
-->

---
layout: lunchlab-scaling
eyebrow: Decouple demand
title: Queues change the scaling model
prompt: Can incoming demand be separated from processing capacity?
---

<img class="scaling-figure" src="/assets/scaling/queue.svg" alt="Synchronous heavy work delays a response; a queue separates incoming requests from independently scalable workers." />

<!--
Core idea: A queue separates the rate of incoming requests from the rate at which workers finish expensive work.
Why here: This is the first example where an architectural boundary changes the scaling model, rather than just the machine count.
Facilitate: Ask what the caller gets back now, and what happens if arrivals exceed worker capacity for too long. Stress that backlog is finite and work still has to be processed correctly.
Build toward: Show the fuller pattern: coupled work, blocked replication, new boundary, then independent worker scaling.
-->

---
layout: lunchlab-scaling
eyebrow: Architecture before capacity
title: Sometimes the first scaling action is redesign
prompt: Change boundaries, ownership, or communication — then scale.
---

<img class="scaling-figure" src="/assets/scaling/architecture.svg" alt="Four-step sequence: coupled order service becomes hot, replication is blocked by state ownership, a queue splits workloads, and worker pools then scale independently." />

<!--
Core idea: Sometimes the bottleneck cannot scale at its current boundary; changing ownership or communication comes first.
Why here: This is the architectural insight behind the session, and the four-step visual makes the causal chain explicit.
Facilitate: Walk left to right: identify the hot work, explain why replicas remain coupled, introduce the queue and separated workers, then ask which workload can now scale independently. Ask who owns each job after the split.
Build toward: Once work can scale, we still need a signal that tells us when to add or remove capacity.
-->

---
layout: lunchlab-scaling
eyebrow: Signals after workload
title: 'Autoscaling: based on what?'
prompt: A scaling signal should represent pressure on this workload.
---

<div>
  <div class="scaling-tags">
    <span class="scaling-tag">CPU</span><span class="scaling-tag">Memory</span><span class="scaling-tag">Concurrency</span><span class="scaling-tag">Latency</span>
    <span class="scaling-tag">Queue depth</span><span class="scaling-tag">Oldest message age</span><span class="scaling-tag">DB connections</span><span class="scaling-tag">IOPS</span>
  </div>
  <p class="scaling-note" style="margin-top: 34px">A busy metric is useful only if adding capacity can relieve the bottleneck it represents.</p>
</div>

<!--
Core idea: An autoscaling metric is useful only when it tracks pressure that the chosen scaling action can relieve.
Why here: Automation belongs after understanding workload shape, state, and dependencies; otherwise it can amplify the wrong tier.
Facilitate: Compare CPU for a CPU-bound worker with oldest-message age for a queue. Ask whether adding API instances helps if database connections are already exhausted.
Build toward: Apply the full reasoning chain to a familiar bursty product scenario.
-->

---
layout: lunchlab-scaling
eyebrow: Case · Ticketmaster
title: At 10:00, demand changes shape
prompt: What reaches its limit first?
---

<img class="scaling-figure" src="/assets/scaling/ticket-spike.svg" alt="Illustrative concert ticket demand is normal at 09:59 and surges as a Ziggo Dome on-sale opens at 10:00." />

<!--
Core idea: A sudden on-sale is a workload-shape change, not merely a larger version of normal traffic.
Why here: The familiar scenario lets participants use the earlier questions without needing a detailed system-design briefing.
Facilitate: State clearly that this is a fictional design exercise inspired by Ticketmaster, not its actual architecture or traffic. Ask which resource might hit a limit first; collect possibilities without solving them yet.
Build toward: Decide what the system must preserve under this burst before choosing scaling tactics.
Source: https://www.ticketmaster.nl/venue/ziggo-dome-amsterdam-tickets/ziggo/107?language=en-us
-->

---
layout: lunchlab-scaling
eyebrow: Case · Ticketmaster
title: What must the fictional system protect?
prompt: Which flow matters most when demand exceeds capacity?
---

<div class="scaling-grid two">
  <div class="scaling-panel"><h3>Fans need to…</h3><p>Browse events · view availability · reserve a seat · purchase a ticket.</p></div>
  <div class="scaling-panel warning"><h3>The design must…</h3><p>Handle bursts · prevent double-selling · protect checkout · degrade gracefully.</p></div>
</div>

<!--
Core idea: Scaling decisions must protect product invariants and priorities, not just maximize accepted requests.
Why here: Browsing, reserving, and purchasing have different failure costs; seat ownership makes the tension concrete.
Facilitate: Ask which flow must remain correct even if another becomes slower. Elicit “no double-selling” and protection of the purchase path. Keep the design fictional and avoid claiming knowledge of Ticketmaster's production system.
Build toward: Have the room classify components by workload and state before proposing a scaling move.
Source: https://www.hellointerview.com/learn/system-design/problem-breakdowns/ticketmaster
-->

---
layout: lunchlab-scaling
eyebrow: Audience exercise
title: What could scale without redesign?
prompt: For each component: state, ownership, contention, dependencies, workload shape?
---

<div class="scaling-tags">
  <span class="scaling-tag">Web / API</span><span class="scaling-tag">Event catalog</span><span class="scaling-tag">Search</span>
  <span class="scaling-tag">Checkout</span><span class="scaling-tag">Reservations</span><span class="scaling-tag">Database</span>
  <span class="scaling-tag">Notification workers</span>
</div>

<!--
Core idea: The right answer depends on what each component owns, whether its work can be divided, and which dependency it stresses.
Why here: Give participants a chance to transfer the mental model before the case reveals another bottleneck.
Facilitate: Spend about 60–90 seconds asking for one “likely easier” and one “needs an assumption” choice. For each, ask where state lives; allow disagreement. There is no universal ranking or hidden answer key.
Build toward: Test the tempting answer of scaling only the Web/API tier.
-->

---
layout: lunchlab-scaling
eyebrow: Case · pressure moves
title: More APIs will not create more seats
prompt: Where is the pressure now?
---

<img class="scaling-figure" src="/assets/scaling/ticket-flow.svg" alt="Fictional Ticketmaster flow separates browsing through a catalog cache from checkout, where seat inventory is a contended shared resource." />

<!--
Core idea: More front-end capacity can push more contenders toward a finite, shared seat inventory.
Why here: The case makes bottleneck migration and state ownership tangible in the same moment.
Facilitate: First ask what scaling only Web/API changes. Then trace browse reads through the catalog cache and purchases toward seat ownership. Ask “Where is the pressure now?” before mentioning path separation or admission control. This is not Ticketmaster's real architecture.
Build toward: When critical shared work cannot accept everyone at once, controlling demand becomes part of scaling.
-->

---
layout: lunchlab-scaling
eyebrow: Protect the critical path
title: Sometimes, accept less work
prompt: Which work would you protect, delay, reduce, or reject?
---

<div class="scaling-grid three">
  <div class="scaling-panel accent"><h3>Protect</h3><p>Checkout and seat ownership ahead of recommendations.</p></div>
  <div class="scaling-panel"><h3>Shape</h3><p>Waiting room · rate limits · slower refresh · queued tasks.</p></div>
  <div class="scaling-panel warning"><h3>Drop gracefully</h3><p>Disable optional features or reject non-essential work.</p></div>
</div>

<!--
Core idea: When demand exceeds safe capacity, deliberately shape or reject lower-priority work to protect the critical path.
Why here: Complete the toolbox introduced early: some pressure cannot be solved by accepting unlimited work.
Facilitate: Ask the room to place recommendations, availability refreshes, notifications, and checkout into protect, delay/reduce, or drop. A waiting room is admission control, not extra seat inventory; an endless queue is not a solution.
Build toward: Pull the different moves back into one reusable decision sequence.
-->

---
layout: lunchlab-scaling
eyebrow: Scaling mental model
title: Ask in this order
prompt: Scaling starts with understanding the bottleneck, workload, and state.
---

<div class="scaling-table">
  <div class="scaling-panel"><h3>What is saturated?</h3><p>CPU · memory · I/O · connections · latency</p></div>
  <div class="scaling-panel"><h3>Can work divide?</h3><p>Horizontal scaling and partitioning</p></div>
  <div class="scaling-panel"><h3>Can one node do more?</h3><p>Vertical headroom and limits</p></div>
  <div class="scaling-panel"><h3>Where is state?</h3><p>Coordination and ownership</p></div>
  <div class="scaling-panel"><h3>Can work wait?</h3><p>Queues and asynchronous processing</p></div>
  <div class="scaling-panel"><h3>Can work be avoided?</h3><p>Cache, reuse, and cheaper work</p></div>
  <div class="scaling-panel"><h3>Can demand be controlled?</h3><p>Backpressure and load shedding</p></div>
  <div class="scaling-panel"><h3>Is architecture blocking us?</h3><p>Boundaries, ownership, communication</p></div>
</div>

<!--
Core idea: Start with evidence and workload properties; only then choose a capacity, work-reduction, demand-control, or architecture move.
Why here: This is the retrieval cue for the hands-on exercise, not eight new concepts to lecture through.
Facilitate: Do not read every tile. Ask someone to walk a hypothetical bottleneck through the first four questions, then have the room pick one relevant lever from the remaining tiles.
Build toward: Give participants a few facilitation prompts they can use when their design conversation drifts into tools.
-->

---
layout: lunchlab-scaling
eyebrow: Facilitator guide
title: Keep the conversation architectural
---

<div class="scaling-facilitator">
  <div class="scaling-panel accent"><h3>Start / diagnose</h3><ul>
    <li>What is saturated? What evidence shows it?</li>
    <li>Can the workload be divided?</li>
    <li>Where does state live? Who owns it?</li>
    <li>What receives extra load if we scale this?</li>
    <li>What becomes the next bottleneck?</li>
  </ul></div>
  <div class="scaling-panel warning"><h3>Re-scope</h3><ul>
    <li>We are discussing Kubernetes — what problem are we solving?</li>
    <li>Would another instance increase throughput?</li>
    <li>Average demand or the peak?</li>
    <li>Can we remove, delay, batch, cache, or reject work?</li>
    <li>Must the architecture change first?</li>
  </ul></div>
</div>

<!--
Core idea: Good scaling conversations stay anchored to evidence, state, ownership, and consequences.
Why here: Turn the mental model into language participants can use with teammates during hands-on work.
Facilitate: Treat this as a prompt card, not another lecture slide. Choose one diagnosis question and one re-scoping question; invite participants to use them when a solution jumps straight to Kubernetes or replica counts.
Build toward: End with the shortest memorable version of the reasoning chain.
-->

---
layout: lunchlab-text
eyebrow: Takeaway
slideClass: closing-slide
---

# Find the pressure.

<p class="lead">Understand the state. <strong>Scale the workload — not just the infrastructure.</strong></p>

<ContentCard>

### One question to take away

**“What becomes the bottleneck after this change?”**

</ContentCard>

<!--
Core idea: Find the pressure, understand state and ownership, and scale the workload rather than only its infrastructure.
Why here: Compress the session to one question participants can carry into the practical exercise.
Facilitate: Ask each group to start hands-on work by writing down the observed limit, evidence, where state lives, whether work can divide, and the likely next bottleneck before proposing resources or tooling. Leave the quote on screen while they begin.
Build toward: The hands-on exercise applies the same reasoning to a concrete design; no extra theory recap is needed.
-->
