---
theme: default
layout: default
title: 'LunchLab #2 — Zooming with C4'
aspectRatio: 16/9
canvasWidth: 1280
colorSchema: light
---

<div class="lunchlab-slide slide-1 text-slide">
  <div class="slide-frame">
    <div class="slide-header">
      <div class="eyebrow">LunchLab #2</div>
    </div>
    <div class="slide-body">
      <div class="content">
        <h1>Zooming with C4</h1>
        <div class="subtitle">Strong architecture conversations start by agreeing on zoom level: <strong>context first, details later.</strong></div>
        <div class="two-col">
          <div class="card">
            <h3>Why this session</h3>
            <ul>
              <li>Align faster by naming the C4 level explicitly.</li>
              <li>Avoid over-zooming too early in architecture discussions.</li>
              <li>Use one shared language for scope and detail depth.</li>
            </ul>
          </div>
          <div class="card">
            <h3>What you will get</h3>
            <ul>
              <li>A practical Level 1 + Level 2 facilitation workflow.</li>
              <li>Case-based examples to separate context from implementation.</li>
              <li>Facilitation prompts to keep scope under control.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

---

<div class="lunchlab-slide slide-2 text-slide">
  <div class="slide-frame">
    <div class="slide-header">
      <div class="eyebrow">C4 Explained</div>
    </div>
    <div class="slide-body">
      <div class="content">
        <h1>What is C4?</h1>
        <p class="lead">"The C4 model is an easy to learn, developer friendly approach to software architecture diagramming." — Simon Brown</p>
      </div>
    </div>
  </div>
</div>

---

<div class="lunchlab-slide slide-3 text-slide">
  <div class="slide-frame">
    <div class="slide-header">
      <div class="eyebrow">C4 Explained</div>
    </div>
    <div class="slide-body">
      <div class="content">
        <h1>Level 1 — Context</h1>
        <p class="lead">Start with the outside view before the inside view.</p>
        <div class="card">
          <h3>Core prompt</h3>
          <p><strong>What is inside our system boundary, and what is outside it?</strong></p>
          <ul>
            <li>Who are the primary users or actors?</li>
            <li>Which external systems do we depend on?</li>
            <li>What are the main interactions across the boundary?</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

---

<div class="lunchlab-slide slide-4 text-slide">
  <div class="slide-frame">
    <div class="slide-header">
      <div class="eyebrow">C4 Explained</div>
    </div>
    <div class="slide-body">
      <div class="content">
        <h1>Level 2 — Container</h1>
        <p class="lead">Now move one level in: from outside interactions to internal building blocks.</p>
        <div class="card">
          <h3>Core prompt</h3>
          <p><strong>What are the major containers inside the system, and how do they collaborate?</strong></p>
          <ul>
            <li>Which core entities can we identify?</li>
            <li>Which containers exist (apps, services, data stores)?</li>
            <li>What is each container responsible for?</li>
            <li>How do containers communicate and what flows between them?</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

---

<div class="lunchlab-slide slide-5 text-slide">
  <div class="slide-frame">
    <div class="slide-header">
      <div class="eyebrow">C4 Explained</div>
    </div>
    <div class="slide-body">
      <div class="content">
        <h1>Level 3 — Component</h1>
        <p class="lead">Zoom into one container to understand its internal structure.</p>
        <div class="card">
          <h3>Core prompt</h3>
          <p><strong>How is this container organized internally to fulfill its responsibility?</strong></p>
          <ul>
            <li>Which components does this container contain?</li>
            <li>How are responsibilities split across components?</li>
            <li>Which interfaces and dependencies connect these components?</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

---

<div class="lunchlab-slide slide-6 text-slide">
  <div class="slide-frame">
    <div class="slide-header">
      <div class="eyebrow">C4 Explained</div>
    </div>
    <div class="slide-body">
      <div class="content">
        <h1>Level 4 — Code</h1>
        <p class="lead">Use this level only when implementation detail is needed.</p>
        <div class="card">
          <h3>Core prompt</h3>
          <p><strong>How is this part implemented in code?</strong></p>
          <ul>
            <li>Which classes, modules, or functions implement the components?</li>
            <li>What key data structures and algorithms are used?</li>
            <li>What conventions or constraints matter for maintainability?</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

---

<div class="lunchlab-slide slide-7 text-slide">
  <div class="slide-frame">
    <div class="slide-header">
      <div class="eyebrow">From model to practice</div>
    </div>
    <div class="slide-body">
      <div class="content">
        <h1>Let’s use the model</h1>
        <p class="lead">Design a system that helps travelers get from A to B.</p>
        <div class="card">
          <h3>First stop</h3>
          <p><strong>Level 1 — Traveler Context</strong></p>
        </div>
      </div>
    </div>
  </div>
</div>

---

<div class="lunchlab-slide slide-8 c4-visual-slide level1-questions-slide">
  <div class="slide-frame">
    <div class="slide-header">
      <div class="eyebrow">Level 1</div>
      <h2>Level 1: Traveler Context</h2>
    </div>
    <div class="slide-body">
      <div class="content c4-visual-wrap level1-questions-wrap">
        <img class="c4-visual" src="/assets/svg/c4-infrastructure-level-1.svg" alt="Context map with one system boundary and external actors and connections." />
        <div class="level1-questions">
          <ol>
            <li><span class="prompt">Who are the primary users or actors?</span></li>
            <li><span class="prompt">Which external systems do we depend on?</span></li>
            <li><span class="prompt">What are the main interactions across the boundary?</span></li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</div>

---

<div class="lunchlab-slide slide-9 c4-visual-slide level1-questions-slide">
  <div class="slide-frame">
    <div class="slide-header">
      <div class="eyebrow">Level 1</div>
      <h2>Level 1: Traveler Context</h2>
    </div>
    <div class="slide-body">
      <div class="content c4-visual-wrap level1-questions-wrap">
        <img class="c4-visual" src="/assets/svg/c4-infrastructure-level-1.svg" alt="Context map with one system boundary and external actors and connections." />
        <div class="level1-questions">
          <ol>
            <li>
              <span class="prompt">Who are the primary users or actors?</span>
              <span class="answer">Travelers by road, railway, water, and air.</span>
            </li>
            <li>
              <span class="prompt">Which external systems do we depend on?</span>
              <span class="answer">External road, rail, waterway, and airport systems.</span>
            </li>
            <li>
              <span class="prompt">What are the main interactions across the boundary?</span>
              <span class="answer">Cross-system coordination across road, rail, water, and air systems.</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</div>

---

<div class="lunchlab-slide slide-10 c4-visual-slide">
  <div class="slide-frame">
    <div class="slide-header">
      <div class="eyebrow">Level 2</div>
      <h2>Level 2: Travel Containers</h2>
    </div>
    <div class="slide-body">
      <div class="content c4-visual-wrap">
        <div class="c4-layer-stack" role="img" aria-label="Level 2 containers layered on top of the Context map: Road Service.">
          <img class="c4-layer base" src="/assets/svg/c4-infrastructure-level-1.svg" alt="" aria-hidden="true" />
          <img class="c4-layer" src="/assets/svg/c4-infrastructure-level-2-overlay-road-network.svg" alt="" aria-hidden="true" />
        </div>
      </div>
    </div>
  </div>
</div>

---

<div class="lunchlab-slide slide-11 c4-visual-slide">
  <div class="slide-frame">
    <div class="slide-header">
      <div class="eyebrow">Level 2</div>
      <h2>Level 2: Travel Containers</h2>
    </div>
    <div class="slide-body">
      <div class="content c4-visual-wrap">
        <div class="c4-layer-stack" role="img" aria-label="Level 2 containers layered on top of the Context map: Road Service and Rail Service.">
          <img class="c4-layer base" src="/assets/svg/c4-infrastructure-level-1.svg" alt="" aria-hidden="true" />
          <img class="c4-layer" src="/assets/svg/c4-infrastructure-level-2-overlay-road-network.svg" alt="" aria-hidden="true" />
          <img class="c4-layer" src="/assets/svg/c4-infrastructure-level-2-overlay-rail-network.svg" alt="" aria-hidden="true" />
        </div>
      </div>
    </div>
  </div>
</div>

---

<div class="lunchlab-slide slide-12 c4-visual-slide">
  <div class="slide-frame">
    <div class="slide-header">
      <div class="eyebrow">Level 2</div>
      <h2>Level 2: Travel Containers</h2>
    </div>
    <div class="slide-body">
      <div class="content c4-visual-wrap">
        <div class="c4-layer-stack" role="img" aria-label="Level 2 containers layered on top of the Context map: Road Service, Rail Service, and Water Service.">
          <img class="c4-layer base" src="/assets/svg/c4-infrastructure-level-1.svg" alt="" aria-hidden="true" />
          <img class="c4-layer" src="/assets/svg/c4-infrastructure-level-2-overlay-road-network.svg" alt="" aria-hidden="true" />
          <img class="c4-layer" src="/assets/svg/c4-infrastructure-level-2-overlay-rail-network.svg" alt="" aria-hidden="true" />
          <img class="c4-layer" src="/assets/svg/c4-infrastructure-level-2-overlay-water-system.svg" alt="" aria-hidden="true" />
        </div>
      </div>
    </div>
  </div>
</div>

---

<div class="lunchlab-slide slide-13 c4-visual-slide">
  <div class="slide-frame">
    <div class="slide-header">
      <div class="eyebrow">Level 2</div>
      <h2>Level 2: Travel Containers</h2>
    </div>
    <div class="slide-body">
      <div class="content c4-visual-wrap">
        <div class="c4-layer-stack" role="img" aria-label="Level 2 containers layered on top of the Context map: Road Service, Rail Service, Water Service, and Air Service.">
          <img class="c4-layer base" src="/assets/svg/c4-infrastructure-level-1.svg" alt="" aria-hidden="true" />
          <img class="c4-layer" src="/assets/svg/c4-infrastructure-level-2-overlay-road-network.svg" alt="" aria-hidden="true" />
          <img class="c4-layer" src="/assets/svg/c4-infrastructure-level-2-overlay-rail-network.svg" alt="" aria-hidden="true" />
          <img class="c4-layer" src="/assets/svg/c4-infrastructure-level-2-overlay-water-system.svg" alt="" aria-hidden="true" />
          <img class="c4-layer" src="/assets/svg/c4-infrastructure-level-2-overlay-airports.svg" alt="" aria-hidden="true" />
        </div>
      </div>
    </div>
  </div>
</div>

---

<div class="lunchlab-slide slide-14 c4-visual-slide">
  <div class="slide-frame">
    <div class="slide-header">
      <div class="eyebrow">Level 3</div>
      <h2>Level 3: Component (Rail Service Container)</h2>
    </div>
    <div class="slide-body">
      <div class="content c4-visual-wrap">
        <img class="c4-visual" src="/assets/rail-service-container-components.svg" alt="Level 3 component view inside the Rail Service container." />
      </div>
    </div>
  </div>
</div>

---

<div class="lunchlab-slide slide-15 c4-visual-slide">
  <div class="slide-frame">
    <div class="slide-header">
      <div class="eyebrow">Level 4</div>
      <h2>Level 4: Code</h2>
    </div>
    <div class="slide-body">
      <div class="content c4-visual-wrap">
        <img class="c4-visual" src="/assets/switch-controller-level-4.svg" alt="Level 4 implementation detail view inside the Switch Controller component." />
      </div>
    </div>
  </div>
</div>

---

<div class="lunchlab-slide slide-16 c4-matrix-slide">
  <div class="slide-frame">
    <div class="slide-body">
      <div class="content c4-quadrant-grid">
        <div class="card c4-quadrant-card">
          <header class="c4-quadrant-text">
            <h3>Level 1 — System Context</h3>
            <p>Name the travelers, external systems, and system boundary.</p>
          </header>
          <img class="c4-quadrant-image" src="/assets/svg/c4-infrastructure-level-1.svg" alt="C4 Level 1 traveler context visual." />
        </div>
        <div class="card c4-quadrant-card">
          <header class="c4-quadrant-text">
            <h3>Level 2 — Container</h3>
            <p>Show the service containers and how they collaborate.</p>
          </header>
          <div class="c4-quadrant-stack" role="img" aria-label="C4 Level 2 services visual with Road Service, Rail Service, Water Service, and Air Service overlays.">
            <img class="c4-quadrant-layer" src="/assets/svg/c4-infrastructure-level-1.svg" alt="" aria-hidden="true" />
            <img class="c4-quadrant-layer" src="/assets/svg/c4-infrastructure-level-2-overlay-road-network.svg" alt="" aria-hidden="true" />
            <img class="c4-quadrant-layer" src="/assets/svg/c4-infrastructure-level-2-overlay-rail-network.svg" alt="" aria-hidden="true" />
            <img class="c4-quadrant-layer" src="/assets/svg/c4-infrastructure-level-2-overlay-water-system.svg" alt="" aria-hidden="true" />
            <img class="c4-quadrant-layer" src="/assets/svg/c4-infrastructure-level-2-overlay-airports.svg" alt="" aria-hidden="true" />
          </div>
        </div>
        <div class="card c4-quadrant-card">
          <img class="c4-quadrant-image" src="/assets/rail-service-container-components.svg" alt="C4 Level 3 Rail Service component visual." />
          <footer class="c4-quadrant-text">
            <h3>Level 3 — Component</h3>
            <p>Open Rail Service to see its internal components.</p>
          </footer>
        </div>
        <div class="card c4-quadrant-card">
          <img class="c4-quadrant-image" src="/assets/switch-controller-level-4.svg" alt="C4 Level 4 Switch Controller implementation visual." />
          <footer class="c4-quadrant-text">
            <h3>Level 4 — Code</h3>
            <p>Inspect Switch Controller behavior at the code level.</p>
          </footer>
        </div>
      </div>
    </div>
  </div>
</div>

---

<div class="lunchlab-slide slide-17 text-slide">
  <div class="slide-frame">
    <div class="slide-header">
      <div class="eyebrow">C4 framing</div>
    </div>
    <div class="slide-body">
      <div class="content">
        <h2>C4 as a map-and-zoom language</h2>
        <div class="two-col">
          <div class="card">
            <h3>Core message</h3>
            <ul>
              <li>Architecture diagrams are maps.</li>
              <li>Good maps are made for a purpose.</li>
              <li>A useful map shows what matters, not everything.</li>
              <li>Different questions need different zoom levels.</li>
              <li>C4 helps us choose the right level.</li>
            </ul>
          </div>
          <div class="card">
            <h3>Facilitation intent</h3>
            <ul>
              <li>First agree on the question.</li>
              <li>Then agree on the C4 level.</li>
              <li>Stay at Level 1 and 2 for most workshop decisions.</li>
              <li>Move to Level 3 and 4 only when needed.</li>
              <li>If the discussion gets stuck, check if you are at the wrong level.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

---

<div class="lunchlab-slide slide-18 logo-slide">
  <div class="slide-frame">
    <div class="slide-body">
      <div class="content">
        <img class="whatsapp-logo" src="/assets/svg/whatsapp-logo.svg" alt="WhatsApp logo" />
      </div>
    </div>
  </div>
</div>

---

<div class="lunchlab-slide slide-19 ">
  <div class="slide-frame">
    <div class="slide-header">
      <div class="eyebrow">Previous case</div>
      <h2>WhatsApp case: C4 context at Level 1 and Level 2</h2>
    </div>
    <div class="slide-body">
      <div class="content two-col">
        <div class="card">
          <h3>L1</h3>
          <ul>
            <li><strong>Actors:</strong> sender and receiver users.</li>
            <li><strong>Boundary:</strong> WhatsApp messaging platform.</li>
            <li><strong>External systems:</strong> APNs/FCM, SMS/OTP provider, device contacts.</li>
            <li><strong>Main interaction:</strong> secure chat/media exchange with offline push delivery.</li>
          </ul>
        </div>
        <div class="card">
          <h3>L2</h3>
          <ul>
            <li><strong>Clients:</strong> mobile/web/desktop apps with local message state.</li>
            <li><strong>Realtime edge:</strong> API gateway and persistent connection handling.</li>
            <li><strong>Core services:</strong> identity/auth + key management, messaging/fan-out, presence/receipts.</li>
            <li><strong>Platform services:</strong> media service, notification service, and data stores/queues/cache.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

---

<div class="lunchlab-slide slide-20 ">
  <div class="slide-frame">
    <div class="slide-header">
      <div class="eyebrow">Previous case</div>
      <h2>WhatsApp case: C4 context at Level 1 and Level 2</h2>
    </div>
    <div class="slide-body">
      <div class="content">
        <div class="two-col">
          <div class="card">
            <h3>L1</h3>
            <ul>
              <li><strong>Actors:</strong> sender and receiver users.</li>
              <li><strong>Boundary:</strong> WhatsApp messaging platform.</li>
              <li><strong>External systems:</strong> APNs/FCM, SMS/OTP provider, device contacts.</li>
              <li><strong>Main interaction:</strong> secure chat/media exchange with offline push delivery.</li>
            </ul>
          </div>
          <div class="card">
            <h3>L2</h3>
            <ul>
              <li><strong>Clients:</strong> mobile/web/desktop apps with local message state.</li>
              <li><strong>Realtime edge:</strong> API gateway and persistent connection handling.</li>
              <li><strong>Core services:</strong> identity/auth + key management, messaging/fan-out, presence/receipts.</li>
              <li><strong>Platform services:</strong> media service, notification service, and data stores/queues/cache.</li>
            </ul>
          </div>
        </div>
        <div class="two-col">
          <div class="card">
            <h3>L3</h3>
            <ul>
              <li><strong>Chat server internals:</strong> connection map, participant lookup, fan-out, ack handling.</li>
              <li><strong>Durable delivery flow:</strong> write message + per-recipient inbox before realtime publish.</li>
              <li><strong>Offline recovery:</strong> inbox lookup, message fetch, replay on reconnect, delete on ack.</li>
              <li><strong>Media path:</strong> attachment upload via separate HTTP/media service, then message reference.</li>
              <li><strong>Scale/failure controls:</strong> Redis pub/sub routing, heartbeats, sequence checks, retry polling.</li>
            </ul>
          </div>
          <div class="card">
            <h3>L4</h3>
            <ul>
              <li><strong>Command contracts:</strong> createChat, sendMessage, createAttachment, modifyChatParticipants, newMessage, chatUpdate, RECEIVED ack.</li>
              <li><strong>Data model details:</strong> Chat, ChatParticipant (+ participantId↔chatId GSI), Message, Inbox (TTL), Clients tables.</li>
              <li><strong>Connection details:</strong> WebSocket over TLS via L4 load balancer; user-level channel subscription.</li>
              <li><strong>Ordering behavior:</strong> server timestamps (NTP-synced) drive UI ordering, not strict causal order.</li>
              <li><strong>Implementation limits:</strong> group size 100, offline retention 30 days, bounded client count per account.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

---

<div class="lunchlab-slide slide-21 logo-slide">
  <div class="slide-frame">
    <div class="slide-body">
      <div class="content">
        <img class="flink-logo" src="/assets/svg/flink-logo.svg" alt="Flink logo" />
      </div>
    </div>
  </div>
</div>

---

<div class="lunchlab-slide slide-22">
  <div class="slide-frame">
    <div class="slide-header">
      <div class="eyebrow">New case</div>
      <h2>Flink case: goal and requirements</h2>
    </div>
    <div class="slide-body">
      <div class="content">
        <div class="card">
          <h3>Goal</h3>
          <p>Design a local delivery system where customers can see what is available nearby and place multi-item orders without selling the same physical inventory twice.</p>
        </div>
        <div class="two-col">
          <div class="card">
            <h3>Functional requirements</h3>
            <ul>
              <li>Customers can query which items are available for 1-hour delivery to their location,<br />combining inventory from nearby distribution centers.</li>
              <li>Customers can place one order containing multiple items.</li>
            </ul>
            <h3>Bonus requirements</h3>
            <ul>
              <li>Customers can browse products before checking availability.</li>
              <li>Customers can inspect stock by local hub.</li>
              <li>Orders can be assigned to a courier.</li>
              <li>Customers can track order status after checkout.</li>
            </ul>
          </div>
          <div class="card">
            <h3>Non-functional requirements</h3>
            <ul>
              <li>Availability requests should return quickly, ideally under 100 ms.</li>
              <li>Ordering must prevent two customers from buying the same physical item.</li>
              <li>The system should support 10k distribution centers and 100k catalog items.</li>
              <li>The system should handle around 10 million orders per day.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

---

<div class="lunchlab-slide slide-23 ">
  <div class="slide-frame">
    <div class="slide-header">
      <div class="eyebrow">Facilitation</div>
      <h2>Session master guide: guide, unblock, re-scope</h2>
    </div>
    <div class="slide-body">
      <div class="content two-col">
        <div class="card">
          <h3>Start and unblock</h3>
          <ul>
            <li>“Who uses the system, and who sits outside it?”</li>
            <li>“What boundary are we drawing right now?”</li>
            <li>“Which containers or services are needed?”</li>
            <li>“Which container owns this responsibility?”</li>
            <li>“What data or event crosses this boundary?”</li>
            <li>“What would be good enough at Level 1 or Level 2?”</li>
          </ul>
        </div>
        <div class="card">
          <h3>When the group is at the wrong level</h3>
          <ul>
            <li>If the group debates actors or external systems, bring it back to Level 1.</li>
            <li>If the group debates service ownership or boundaries, keep it at Level 2.</li>
            <li>If the group names internal components, allow a short Level 3 detour only if it clarifies a container.</li>
            <li>If the group discusses retries, locks, schemas, algorithms, or class design, flag it as Level 4.</li>
            <li>Capture Level 4 details in a parking lot and return to containers.</li>
            <li>Ask: “Does this change a service boundary, or only an implementation detail?”</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

---

<div class="lunchlab-slide slide-24 text-slide">
  <div class="slide-frame">
    <div class="slide-header">
      <div class="eyebrow">Takeaway</div>
    </div>
    <div class="slide-body">
      <div class="content">
        <h2>Final takeaway</h2>
        <div class="big-quote">Context first. Containers next. Code only when it matters.</div>
      </div>
    </div>
  </div>
</div>
