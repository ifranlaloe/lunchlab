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
Build toward: The cause may call for more capacity, less work per request, or control over admitted demand. Test conditional options across common components, then summarize the levers in the toolbox.
-->

---
layout: lunchlab-scaling
eyebrow: Component patterns · API
title: 'API: when the request path is hot'
prompt: Which limit would each change actually relieve?
---

<ScalingPatterns topic="api" />

<!--
Core idea: An API has several plausible scaling responses. Local CPU or memory pressure suggests more headroom; independent requests allow replicas; repeated work calls for implementation changes; overloaded dependencies may require an in-flight limit.
Why here: Turn the diagnostic hypotheses into conditional choices for a familiar component, starting with the API named on the previous slide.
Facilitate: Reveal each option in turn. Ask which measurement would support it. Stress that API replicas need safe state handling and that limiting calls protects a dependency but does not raise its capacity.
Build toward: Follow the request into the database, where read traffic, expensive queries, and contended writes need different responses.
Source: https://learn.microsoft.com/en-us/azure/architecture/guide/design-principles/scale-out
-->

---
layout: lunchlab-scaling
eyebrow: Component patterns · Database
title: 'Database: find the pressured path'
prompt: Is it node capacity, reads, a query, or contended writes?
---

<ScalingPatterns topic="database" />

<!--
Core idea: Database scaling can mean a larger node, separate read capacity, less work per query, or divided write ownership. These are responses to different limits and have different consistency and coordination costs.
Why here: The database was the next bottleneck in the opening landscape. This slide shows why “scale the database” is too vague to choose an action.
Facilitate: Reveal the four options. Ask what evidence distinguishes high node utilization from a slow query or a hot write. Read replicas require a suitable freshness tolerance and do not multiply write capacity. Partitioning only helps when the workload can be divided by key.
Build toward: A response can still wait on a provider outside the system, so inspect calls to external services next.
Sources: https://learn.microsoft.com/en-us/azure/postgresql/scale/concepts-scaling-resources ; https://learn.microsoft.com/en-us/azure/well-architected/performance-efficiency/optimize-data-performance
-->

---
layout: lunchlab-scaling
eyebrow: Component patterns · External service
title: 'External service: protect the dependency'
prompt: What work can be avoided, bounded, or delayed?
---

<ScalingPatterns topic="external" />

<!--
Core idea: When a provider is limiting the path, reducing avoidable calls, grouping calls, bounding concurrency, or moving optional work out of the request path may help. None grants unlimited provider capacity.
Why here: External latency was one of the diagnostic hypotheses. These options connect that hypothesis to implementation and architecture changes.
Facilitate: Reveal each pattern and ask what the provider contract permits. Cache freshness, batch support, rate limits, and whether the caller may receive an asynchronous result are assumptions to verify. A concurrency gate can increase reliability while reducing admitted throughput.
Build toward: Deferring work creates a worker and queue path, whose capacity and ownership now need their own diagnosis.
Sources: https://learn.microsoft.com/en-us/azure/architecture/best-practices/caching ; https://learn.microsoft.com/en-us/azure/architecture/patterns/throttling
-->

---
layout: lunchlab-scaling
eyebrow: Component patterns · Workers and queue
title: 'Workers & queue: separate arrival from capacity'
prompt: What changes throughput, ownership, or admitted demand?
---

<ScalingPatterns topic="workers" />

<!--
Core idea: A queue separates arrivals from processing, but workers still have finite throughput. Independent jobs may use more consumers; slow jobs may need implementation improvements; ordered jobs need ownership; sustained excess arrivals need admission control.
Why here: Close the component sequence with the workload whose scaling is easiest to misunderstand as “just add a queue.”
Facilitate: Reveal each pattern. Ask what happens if arrivals exceed completions for an hour. For partitioned jobs, ask who owns a key and how duplicate delivery is handled. Make clear that a growing queue records unmet work, not added capacity.
Build toward: Summarize the cross-component options as a toolbox of capacity, work, and demand levers.
Sources: https://learn.microsoft.com/en-us/azure/architecture/patterns/competing-consumers ; https://learn.microsoft.com/en-us/azure/architecture/best-practices/background-jobs
-->

---
layout: lunchlab-scaling
eyebrow: Beyond capacity
title: Scaling is a toolbox
prompt: Which lever fits the evidence and its cause?
---

<div>
  <div class="scaling-grid three">
    <div class="scaling-panel"><h3>Add capacity</h3><p>Bigger node · replicas · workers.</p></div>
    <div class="scaling-panel accent"><h3>Change the work</h3><p>Optimize · cache · batch · make it asynchronous.</p></div>
    <div class="scaling-panel warning"><h3>Control demand</h3><p>Rate limits · admission limits · delay or reject optional work.</p></div>
  </div>
  <p class="scaling-toolbox-note">Architecture can make these levers possible: route reads, partition ownership, or move work behind a queue.</p>
</div>

<!--
Core idea: The four component examples reduce to three response levers: add capacity, change the amount or timing of work, and control demand. Architecture changes often enable a lever.
Why here: This is the summary of the conditional patterns, not a menu to apply without diagnosis.
Facilitate: Ask the room to place one option from each previous slide under a lever. Point out that one option can span categories, such as a queue changing timing while adding an architectural boundary. Return to the evidence and implementation cause before choosing.
Build toward: Apply the model to a fictional burst where correctness and prioritization matter as much as throughput.
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
  <div class="scaling-panel"><h3>What is limiting?</h3><p>CPU · memory · I/O · locks · dependency time</p></div>
  <div class="scaling-panel"><h3>Can work divide?</h3><p>Horizontal scaling and partitioning</p></div>
  <div class="scaling-panel"><h3>Can one node do more?</h3><p>Vertical headroom and limits</p></div>
  <div class="scaling-panel"><h3>Where is state?</h3><p>Coordination and ownership</p></div>
  <div class="scaling-panel"><h3>Can work wait?</h3><p>Queues and asynchronous processing</p></div>
  <div class="scaling-panel"><h3>Can work be cheaper?</h3><p>Queries, indexes, cache, and batching</p></div>
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
    <li>Can we optimize, delay, batch, cache, or reject work?</li>
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
