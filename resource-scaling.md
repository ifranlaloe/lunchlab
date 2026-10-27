---
theme: default
layout: lunchlab-text
title: 'LunchLab — Resource Scaling'
eyebrow: LunchLab
scalingTheme: true
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
title: When do we need to scale?
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
scalingTheme: true
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
Core idea: An API has several plausible scaling responses. Local CPU or memory pressure suggests more headroom; independent requests allow replicas; repeated work calls for implementation changes; overloaded dependencies may require a limit on simultaneous calls.
Why here: Turn the diagnostic hypotheses into conditional choices for a familiar component, starting with the API named on the previous slide.
Facilitate: Reveal each option in turn. Ask which measurement would support it. Stress that API replicas need safe state handling and that limiting calls protects a dependency but does not raise its capacity.
Build toward: Follow the request into the database, where read traffic, expensive queries, and competing writes need different responses.
Source: https://learn.microsoft.com/en-us/azure/architecture/guide/design-principles/scale-out
-->

---
layout: lunchlab-scaling
eyebrow: Component patterns · Database
title: 'Database: find the pressured path'
prompt: Is it node capacity, reads, a query, or competing writes?
---

<ScalingPatterns topic="database" />

<!--
Core idea: Database scaling can mean a larger node, separate read capacity, less work per query, or a shorter write transaction. These are responses to different limits and have different consistency and coordination costs.
Why here: The database was the next bottleneck in the opening landscape. This slide shows why “scale the database” is too vague to choose an action.
Facilitate: Reveal the four options. Ask what evidence distinguishes high node utilization from a slow query or writes competing for the same seat. Read replicas require a suitable freshness tolerance and do not multiply write capacity. Shorten a write transaction only if traces show avoidable work inside it. Keep the seat decision atomic; moving work outside the transaction must not allow double-selling. A shorter transaction can reduce lock time, but cannot create more seats.
Build toward: A response can still wait on a provider outside the system, so inspect calls to external services next.
Sources: https://learn.microsoft.com/en-us/azure/postgresql/scale/concepts-scaling-resources ; https://learn.microsoft.com/en-us/azure/well-architected/performance-efficiency/optimize-data-performance
-->

---
layout: lunchlab-scaling
eyebrow: Component patterns · External service
title: 'External service: protect the dependency'
prompt: What work can be avoided, limited, or delayed?
---

<ScalingPatterns topic="external" />

<!--
Core idea: When a provider is limiting the path, reducing avoidable calls, grouping calls, limiting simultaneous calls, or moving optional work out of the request path may help. None grants unlimited provider capacity.
Why here: External latency was one of the diagnostic hypotheses. These options connect that hypothesis to implementation and architecture changes.
Facilitate: Reveal each pattern and ask what the provider contract permits. Cache freshness, batch support, rate limits, and whether the caller may receive an asynchronous result are assumptions to verify. A limit on simultaneous calls can increase reliability while reducing admitted throughput.
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
eyebrow: Fictional ticket platform · BBTG
title: Big Bands Ticket Gatekeeper
slideClass: gatekeeper-intro-slide
---

<div class="gatekeeper-intro">
  <div class="gatekeeper-intro-copy">
    <p class="gatekeeper-overline">THE GATES OPEN AT 12:00</p>
    <p class="gatekeeper-lead">A fictional ticket platform for the biggest concert on-sales.</p>
    <div class="gatekeeper-journey"><span>Browse events</span><span>Reserve a seat</span><span>Buy a ticket</span></div>
  </div>
  <img class="gatekeeper-logo" src="/assets/scaling/gatekeeper-logo.png" alt="Old mansion behind an ornate gate, enclosed by a vivid orange circle" />
</div>

<!--
Core idea: Big Bands Ticket Gatekeeper (BBTG) is the fictional platform for the four quests. A concert on-sale creates a sudden arrival burst; users must still browse, reserve, and purchase.
Why here: Give the incident a memorable identity and a concrete product flow after the toolbox, before explaining its starting architecture.
Facilitate: Introduce BBTG as fictional. The visual style borrows BBTG.com's purple, cream, and orange palette, but this exercise does not describe that company's product or architecture. Describe the Ziggo Dome sale as an invented scenario. Ask which part might reach a limit, without naming a cause.
Build toward: Show the owned application, database, and external providers before Quest 1 begins.
Sources: https://www.bbtg.com/ ; https://www.ticketmaster.nl/venue/ziggo-dome-amsterdam-tickets/ziggo/107?language=en-us
-->

---
layout: lunchlab-scaling
eyebrow: BBTG · C1 system context
title: Who connects to the platform?
slideClass: gatekeeper-architecture-slide
---

<img class="scaling-figure" src="/assets/scaling/gatekeeper-before-quest-1-c1.svg" alt="C1 system context: a User uses BBTG to browse, reserve, and buy tickets. BBTG calls external payment and email providers." />

<!--
Core idea: C1 is the system context: one User reaches BBTG, which calls external payment and email providers. It does not describe internal applications or data stores.
Why here: Start with the product boundary and its dependencies before zooming into implementation.
Facilitate: Ask who uses BBTG and which other systems it relies on. Keep the explanation at the software-system level; the external providers are outside BBTG's ownership.
Build toward: Open the BBTG boundary and show its application and data store at C2.
Source: https://c4model.com/diagrams/system-context
-->

---
layout: lunchlab-scaling
eyebrow: BBTG · C2 containers
title: What does BBTG own?
slideClass: gatekeeper-architecture-slide
---

<img class="scaling-figure" src="/assets/scaling/gatekeeper-before-quest-1-c2.svg" alt="C2 container view: the User reaches the owned Web/API application. Web/API reads and writes the owned primary database and calls external payment and email providers." />

<!--
Core idea: C2 reveals BBTG's two starting containers: the Web/API application and the primary database. The payment and email providers remain external systems. There is no cache, waiting room, queue, or separate worker application yet.
Why here: Distinguish owned deployable applications and data stores from external dependencies before opening Web/API.
Facilitate: Trace User to Web/API, then the database and providers. Explain that C4's container means an application or data store, not necessarily a Docker container. The email confirmation work still runs inside Web/API at this point.
Build toward: Decompose Web/API at C3 to show the request path and internal responsibilities.
Source: https://c4model.com/diagrams/container
-->

---
layout: lunchlab-scaling
eyebrow: BBTG · C3 components
title: What happens inside Web/API?
slideClass: gatekeeper-architecture-slide
---

<img class="scaling-figure" src="/assets/scaling/gatekeeper-before-quest-1.svg" alt="C3 component view of Web/API: the User enters through a request router, which leads to event catalog and seat reservation. Seat reservation leads to checkout and an internal Email service. The components use a primary database and external payment and email providers." />

<!--
Core idea: C3 shows the components within Web/API: request routing, event catalog, seat reservation, checkout, and email service. The primary database is a separate owned container; providers are external software systems.
Why here: The first quest can now point to the exact component and path responsible for slow event pages.
Facilitate: Trace left to right from User through Request router to Event catalog and Seat reservation. Follow Checkout down to Email service and right to Email provider. Point out that the email component is already present, while a separate confirmation worker does not exist yet. Do not reveal the Quest 1 cause.
Build toward: Leave a compact question guide on screen while participants investigate the incidents.
Source: https://c4model.com/diagrams/component
-->

---
layout: lunchlab-scaling
eyebrow: Participant guide · keep on screen
title: Questions for every quest
prompt: Use these in any order. Return to the architecture as it changes.
---

<div class="scaling-quest-guide">
  <div class="scaling-quest-card"><h3>What is happening?</h3><p>Which user action is slow, failing, or waiting?</p></div>
  <div class="scaling-quest-card"><h3>Where is the limit?</h3><p>Which component or dependency? What evidence points there?</p></div>
  <div class="scaling-quest-card"><h3>What creates the pressure?</h3><p>Repeated work, contention, a provider, or a burst of arrivals?</p></div>
  <div class="scaling-quest-card"><h3>Where is state?</h3><p>Who owns the seat or job? What must stay correct?</p></div>
  <div class="scaling-quest-card"><h3>Which change fits?</h3><p>Add capacity, reduce or divide work, delay it, or control demand?</p></div>
  <div class="scaling-quest-card"><h3>What happens next?</h3><p>What should improve? Where might pressure move?</p></div>
</div>

<!--
Core idea: These six questions combine observation, evidence, implementation cause, state, scaling choice, and predicted consequences. They are reusable prompts, not ordered steps or an answer key.
Why here: Keep one participant-facing guide visible throughout all four quests after the C1–C3 walkthrough. The general diagnosis reveal on slide 8 introduced the reasoning; this board makes it practical.
Facilitate: Read each quest's participant brief, then leave this slide on screen. Let participants ask for evidence in any order and answer from the host guide. Bring back the C3 or updated diagram when a path needs tracing, then return to this board. Do not read every card aloud or reveal host-only causes.
Build toward: After the final quest, close with the single takeaway question.
-->

---
layout: lunchlab-text
eyebrow: Takeaway
slideClass: closing-slide
scalingTheme: true
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
