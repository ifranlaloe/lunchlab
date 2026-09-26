<script setup>
import C4LayerStack from './C4LayerStack.vue'
</script>

<template>
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
    <C4LayerStack :count="4" variant="matrix" label="C4 Level 2 services visual with Road Service, Rail Service, Water Service, and Air Service overlays." />
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
</template>
