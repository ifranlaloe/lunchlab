---
theme: default
layout: lunchlab-text
title: 'LunchLab #2 — Zooming with C4'
eyebrow: 'LunchLab #2'
aspectRatio: 16/9
canvasWidth: 1280
colorSchema: light
---

# Zooming with C4

<div class="subtitle">Strong architecture conversations start by agreeing on zoom level: <strong>context first, details later.</strong></div>

<TwoColumns>
<template #left>

### Why this session

- Align faster by naming the C4 level explicitly.
- Avoid over-zooming too early in architecture discussions.
- Use one shared language for scope and detail depth.

</template>
<template #right>

### What you will get

- A practical Level 1 + Level 2 facilitation workflow.
- Case-based examples to separate context from implementation.
- Facilitation prompts to keep scope under control.

</template>
</TwoColumns>

---
layout: lunchlab-text
eyebrow: C4 Explained
---

# What is C4?

<p class="lead">"The C4 model is an easy to learn, developer friendly approach to software architecture diagramming." — Simon Brown</p>

---
layout: lunchlab-text
eyebrow: C4 Explained
---

# Level 1 — Context

<p class="lead">Start with the outside view before the inside view.</p>

<ContentCard>

### Core prompt

**What is inside our system boundary, and what is outside it?**

- Who are the primary users or actors?
- Which external systems do we depend on?
- What are the main interactions across the boundary?

</ContentCard>

---
layout: lunchlab-text
eyebrow: C4 Explained
---

# Level 2 — Container

<p class="lead">Now move one level in: from outside interactions to internal building blocks.</p>

<ContentCard>

### Core prompt

**What are the major containers inside the system, and how do they collaborate?**

- Which core entities can we identify?
- Which containers exist (apps, services, data stores)?
- What is each container responsible for?
- How do containers communicate and what flows between them?

</ContentCard>

---
layout: lunchlab-text
eyebrow: C4 Explained
---

# Level 3 — Component

<p class="lead">Zoom into one container to understand its internal structure.</p>

<ContentCard>

### Core prompt

**How is this container organized internally to fulfill its responsibility?**

- Which components does this container contain?
- How are responsibilities split across components?
- Which interfaces and dependencies connect these components?

</ContentCard>

---
layout: lunchlab-text
eyebrow: C4 Explained
---

# Level 4 — Code

<p class="lead">Use this level only when implementation detail is needed.</p>

<ContentCard>

### Core prompt

**How is this part implemented in code?**

- Which classes, modules, or functions implement the components?
- What key data structures and algorithms are used?
- What conventions or constraints matter for maintainability?

</ContentCard>

---
layout: lunchlab-text
eyebrow: From model to practice
---

# Let’s use the model

<p class="lead">Design a system that helps travelers get from A to B.</p>

<ContentCard>

### First stop

**Level 1 — Traveler Context**

</ContentCard>

---
layout: lunchlab-visual
eyebrow: Level 1
title: 'Level 1: Traveler Context'
questions: true
---

<img class="c4-visual" src="/assets/svg/c4-infrastructure-level-1.svg" alt="Context map with one system boundary and external actors and connections." />
<Level1Questions />

---
layout: lunchlab-visual
eyebrow: Level 1
title: 'Level 1: Traveler Context'
questions: true
---

<img class="c4-visual" src="/assets/svg/c4-infrastructure-level-1.svg" alt="Context map with one system boundary and external actors and connections." />
<Level1Questions answers />

---
layout: lunchlab-visual
eyebrow: Level 2
title: 'Level 2: Travel Containers'
clicks: 1
---

<C4LayerStack :count="1" reveal-last label="Level 2 containers layered on top of the Context map: Road Service." />

---
layout: lunchlab-visual
eyebrow: Level 2
title: 'Level 2: Travel Containers'
---

<C4LayerStack :count="2" label="Level 2 containers layered on top of the Context map: Road Service and Rail Service." />

---
layout: lunchlab-visual
eyebrow: Level 2
title: 'Level 2: Travel Containers'
---

<C4LayerStack :count="3" label="Level 2 containers layered on top of the Context map: Road Service, Rail Service, and Water Service." />

---
layout: lunchlab-visual
eyebrow: Level 2
title: 'Level 2: Travel Containers'
---

<C4LayerStack :count="4" label="Level 2 containers layered on top of the Context map: Road Service, Rail Service, Water Service, and Air Service." />

---
layout: lunchlab-visual
eyebrow: Level 3
title: 'Level 3: Component (Rail Service Container)'
---

<img class="c4-visual" src="/assets/rail-service-container-components.svg" alt="Level 3 component view inside the Rail Service container." />

---
layout: lunchlab-visual
eyebrow: Level 4
title: 'Level 4: Code'
---

<img class="c4-visual" src="/assets/switch-controller-level-4.svg" alt="Level 4 implementation detail view inside the Switch Controller component." />

---
layout: lunchlab-matrix
title: 'C4 levels'
---

<C4Matrix />

---
layout: lunchlab-text
eyebrow: C4 framing
---

## C4 as a map-and-zoom language

<TwoColumns>
<template #left>

### Core message

- Architecture diagrams are maps.
- Good maps are made for a purpose.
- A useful map shows what matters, not everything.
- Different questions need different zoom levels.
- C4 helps us choose the right level.

</template>
<template #right>

### Facilitation intent

- First agree on the question.
- Then agree on the C4 level.
- Stay at Level 1 and 2 for most workshop decisions.
- Move to Level 3 and 4 only when needed.
- If the discussion gets stuck, check if you are at the wrong level.

</template>
</TwoColumns>

---
layout: lunchlab-logo
title: WhatsApp
---

<img class="whatsapp-logo" src="/assets/svg/whatsapp-logo.svg" alt="WhatsApp logo" />

---
layout: lunchlab-content
eyebrow: Previous case
title: 'WhatsApp case: C4 context at Level 1 and Level 2'
---

<TwoColumns>
<template #left>

### L1

- **Actors:** sender and receiver users.
- **Boundary:** WhatsApp messaging platform.
- **External systems:** APNs/FCM, SMS/OTP provider, device contacts.
- **Main interaction:** secure chat/media exchange with offline push delivery.

</template>
<template #right>

### L2

- **Clients:** mobile/web/desktop apps with local message state.
- **Realtime edge:** API gateway and persistent connection handling.
- **Core services:** identity/auth + key management, messaging/fan-out, presence/receipts.
- **Platform services:** media service, notification service, and data stores/queues/cache.

</template>
</TwoColumns>

---
layout: lunchlab-content
eyebrow: Previous case
title: 'WhatsApp case: C4 context at Level 1 and Level 2'
slideClass: dense-case
---

<TwoColumns>
<template #left>

### L1

- **Actors:** sender and receiver users.
- **Boundary:** WhatsApp messaging platform.
- **External systems:** APNs/FCM, SMS/OTP provider, device contacts.
- **Main interaction:** secure chat/media exchange with offline push delivery.

</template>
<template #right>

### L2

- **Clients:** mobile/web/desktop apps with local message state.
- **Realtime edge:** API gateway and persistent connection handling.
- **Core services:** identity/auth + key management, messaging/fan-out, presence/receipts.
- **Platform services:** media service, notification service, and data stores/queues/cache.

</template>
</TwoColumns>

<TwoColumns>
<template #left>

### L3

- **Chat server internals:** connection map, participant lookup, fan-out, ack handling.
- **Durable delivery flow:** write message + per-recipient inbox before realtime publish.
- **Offline recovery:** inbox lookup, message fetch, replay on reconnect, delete on ack.
- **Media path:** attachment upload via separate HTTP/media service, then message reference.
- **Scale/failure controls:** Redis pub/sub routing, heartbeats, sequence checks, retry polling.

</template>
<template #right>

### L4

- **Command contracts:** createChat, sendMessage, createAttachment, modifyChatParticipants, newMessage, chatUpdate, RECEIVED ack.
- **Data model details:** Chat, ChatParticipant (+ participantId↔chatId GSI), Message, Inbox (TTL), Clients tables.
- **Connection details:** WebSocket over TLS via L4 load balancer; user-level channel subscription.
- **Ordering behavior:** server timestamps (NTP-synced) drive UI ordering, not strict causal order.
- **Implementation limits:** group size 100, offline retention 30 days, bounded client count per account.

</template>
</TwoColumns>

---
layout: lunchlab-logo
title: Flink
---

<img class="flink-logo" src="/assets/svg/flink-logo.svg" alt="Flink logo" />

---
layout: lunchlab-content
eyebrow: New case
title: 'Flink case: goal and requirements'
slideClass: flink-case
---

<ContentCard>

### Goal

Design a local delivery system where customers can see what is available nearby and place multi-item orders without selling the same physical inventory twice.

</ContentCard>

<TwoColumns>
<template #left>

### Functional requirements

- Customers can query which items are available for 1-hour delivery to their location,<br />combining inventory from nearby distribution centers.
- Customers can place one order containing multiple items.

### Bonus requirements

- Customers can browse products before checking availability.
- Customers can inspect stock by local hub.
- Orders can be assigned to a courier.
- Customers can track order status after checkout.

</template>
<template #right>

### Non-functional requirements

- Availability requests should return quickly, ideally under 100 ms.
- Ordering must prevent two customers from buying the same physical item.
- The system should support 10k distribution centers and 100k catalog items.
- The system should handle around 10 million orders per day.

</template>
</TwoColumns>

---
layout: lunchlab-content
eyebrow: Facilitation
title: 'Session master guide: guide, unblock, re-scope'
---

<TwoColumns>
<template #left>

### Start and unblock

- “Who uses the system, and who sits outside it?”
- “What boundary are we drawing right now?”
- “Which containers or services are needed?”
- “Which container owns this responsibility?”
- “What data or event crosses this boundary?”
- “What would be good enough at Level 1 or Level 2?”

</template>
<template #right>

### When the group is at the wrong level

- If the group debates actors or external systems, bring it back to Level 1.
- If the group debates service ownership or boundaries, keep it at Level 2.
- If the group names internal components, allow a short Level 3 detour only if it clarifies a container.
- If the group discusses retries, locks, schemas, algorithms, or class design, flag it as Level 4.
- Capture Level 4 details in a parking lot and return to containers.
- Ask: “Does this change a service boundary, or only an implementation detail?”

</template>
</TwoColumns>

---
layout: lunchlab-text
eyebrow: Takeaway
closing: true
---

## Final takeaway

<div class="big-quote">Context first. Containers next. Code only when it matters.</div>
