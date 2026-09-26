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

<div class="subtitle">More resources do not automatically mean <strong>more scalability.</strong></div>

<TwoColumns>
<template #left>

### Why this session

- See what actually limits a system under load.
- Recognize that workloads scale differently.
- Look beyond “just add more instances.”

</template>
<template #right>

### What you will get

- A mental model for scaling decisions.
- Horizontal and vertical trade-offs.
- A case where the bottleneck moves.
- Questions for architecture discussions.

</template>
</TwoColumns>

---
layout: lunchlab-scaling
eyebrow: Start with pressure
title: What do we mean by scaling?
prompt: What resource is actually under pressure?
---

<div class="scaling-grid three">
  <div class="scaling-panel"><h3>Demand rises</h3><p>More requests, more data, more simultaneous work.</p></div>
  <div class="scaling-panel accent"><h3>Something reaches a limit</h3><p>CPU · memory · disk I/O · network · connections.</p></div>
  <div class="scaling-panel warning"><h3>Symptoms appear</h3><p>Latency, errors, or a growing queue backlog.</p></div>
</div>

<!-- Ask for an observable signal before naming a solution. A downstream service can be the resource under pressure. -->

---
layout: lunchlab-scaling
eyebrow: More than capacity
title: Scaling is a toolbox
prompt: Which response changes the amount of work, not just the amount of hardware?
---

<div class="scaling-grid three">
  <div class="scaling-panel"><h3>Add capacity</h3><p>Bigger node · more instances · distribute work.</p></div>
  <div class="scaling-panel accent"><h3>Change the work</h3><p>Make it cheaper · cache · batch · delay it.</p></div>
  <div class="scaling-panel warning"><h3>Control demand</h3><p>Queue · slow intake · reject optional work · change boundaries.</p></div>
</div>

---
layout: lunchlab-scaling
eyebrow: One node, more headroom
title: Vertical scaling
prompt: Can this workload benefit from a bigger machine?
---

<img class="scaling-figure" src="/assets/scaling/vertical.svg" alt="One processor becomes a larger processor with more CPU and memory, while remaining a single failure domain." />

<!-- Vertical scaling is a valid design choice, not a failed attempt at horizontal scaling. Discuss local limits and the upper bound. -->

---
layout: lunchlab-scaling
eyebrow: Divide the work
title: Horizontal scaling
prompt: Can this workload be safely divided across instances?
---

<img class="scaling-figure" src="/assets/scaling/horizontal.svg" alt="Requests pass through traffic distribution to three API instances." />

---
layout: lunchlab-scaling
eyebrow: The easy case
title: A stateless API
prompt: Why can any replica handle the next request?
---

<img class="scaling-figure" src="/assets/scaling/horizontal.svg" alt="Independent requests can be routed to any of three stateless API replicas." />

<!-- The diagram repeats deliberately: the architecture has not changed, only the workload assumption. -->

---
layout: lunchlab-scaling
eyebrow: Now add state
title: What changed?
prompt: Where does the state live — and who owns the work?
---

<img class="scaling-figure" src="/assets/scaling/state.svg" alt="A stateless request can reach either API, while a stateful order needs ownership and duplicate-processing coordination." />

<!-- Ask what could happen if both workers process Order 123. Introduce ownership, coordination, and consistency without implementation detail. -->

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

---
layout: lunchlab-scaling
eyebrow: Choose for the workload
title: Horizontal or vertical? It depends.
prompt: The more coordination required, the less trivial adding replicas becomes.
---

<img class="scaling-figure" src="/assets/scaling/workloads.svg" alt="Four comparisons show when horizontal division is easier or harder and when vertical headroom helps or does not address the real limit." />

---
layout: lunchlab-scaling
eyebrow: Bottleneck migration
title: We scale the API. Then what?
prompt: Did we scale the system, or move the bottleneck?
---

<div class="scaling-sequence">
  <img class="scaling-figure" src="/assets/scaling/bottleneck-api.svg" alt="Users to API to database to external service, with the API saturated." />
  <img v-click="1" class="scaling-figure" src="/assets/scaling/bottleneck-db.svg" alt="Three API replicas now push work to one saturated database." />
</div>

<!-- Click once after the group predicts what a second or third API instance will change. -->

---
layout: lunchlab-scaling
eyebrow: Bottleneck migration
title: Remove database work. Then what?
prompt: Scaling exposes the next shared constraint.
---

<img class="scaling-figure" src="/assets/scaling/bottleneck-external.svg" alt="APIs use a cache to reduce database reads; the external service is now the bottleneck." />

---
layout: lunchlab-text
eyebrow: Pause and reason
---

# The bottleneck moves

<p class="lead">Scaling one part often reveals the next limit.</p>

<ContentCard>

### Ask before changing anything

**“What becomes the next limiting resource if we successfully scale this one?”**

</ContentCard>

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

<!-- Inspired by https://www.hellointerview.com/learn/system-design/patterns/scaling-reads and https://www.hellointerview.com/learn/system-design/patterns/scaling-writes. These are options, not a universal recipe. -->

---
layout: lunchlab-scaling
eyebrow: Decouple demand
title: Queues change the scaling model
prompt: Can incoming demand be separated from processing capacity?
---

<img class="scaling-figure" src="/assets/scaling/queue.svg" alt="Synchronous heavy work delays a response; a queue separates incoming requests from independently scalable workers." />

<!-- A queue absorbs a burst only within finite capacity. It changes timing and failure modes; it does not make work disappear. -->

---
layout: lunchlab-scaling
eyebrow: Architecture before capacity
title: Sometimes the first scaling action is redesign
prompt: Change boundaries, ownership, or communication — then scale.
---

<img class="scaling-figure" src="/assets/scaling/architecture.svg" alt="Four-step sequence: coupled order service becomes hot, replication is blocked by state ownership, a queue splits workloads, and worker pools then scale independently." />

<!-- This is a conceptual architecture, not a claim that every order flow should be decomposed this way. State ownership must still be defined in the new design. -->

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

---
layout: lunchlab-scaling
eyebrow: Case · Ticketmaster
title: At 10:00, demand changes shape
prompt: What reaches its limit first?
---

<img class="scaling-figure" src="/assets/scaling/ticket-spike.svg" alt="Illustrative concert ticket demand is normal at 09:59 and surges as a Ziggo Dome on-sale opens at 10:00." />

<!-- Fictional design exercise inspired by the Ticketmaster product in the Netherlands. Not a depiction of Ticketmaster's actual system or traffic. https://www.ticketmaster.nl/venue/ziggo-dome-amsterdam-tickets/ziggo/107?language=en-us -->

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

<!-- Product-domain exercise only. Ticketmaster architecture is fictional. Contention and reservation concepts: https://www.hellointerview.com/learn/system-design/problem-breakdowns/ticketmaster -->

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

<!-- Let the room disagree. There is no universal ranking; the answer depends on hidden state and ownership assumptions. -->

---
layout: lunchlab-scaling
eyebrow: Case · pressure moves
title: More APIs will not create more seats
prompt: Where is the pressure now?
---

<img class="scaling-figure" src="/assets/scaling/ticket-flow.svg" alt="Fictional Ticketmaster flow separates browsing through a catalog cache from checkout, where seat inventory is a contended shared resource." />

<!-- Ask first what changes if only the API is replicated. Then discuss catalog cache, browse/purchase separation, admission control, and seat contention. This is not Ticketmaster's real architecture. -->

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

<!-- Backpressure and load shedding are scaling decisions, not merely error handling. -->

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
