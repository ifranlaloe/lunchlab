<script setup>
defineProps({
  pattern: { type: Object, required: true },
})
</script>

<template>
  <article class="scaling-pattern">
    <div class="scaling-pattern-type">{{ pattern.type }}</div>
    <h3>{{ pattern.title }}</h3>
    <div class="scaling-mini-diagram" role="img" :aria-label="`${pattern.before.join(', ')} changes to ${pattern.after.join(', ')}`">
      <div class="scaling-mini-side">
        <span v-for="(node, nodeIndex) in pattern.before" :key="`before-${nodeIndex}`" class="scaling-mini-node before">{{ node }}</span>
      </div>
      <span class="scaling-mini-arrow" aria-hidden="true">→</span>
      <div class="scaling-mini-side" :class="{ flow: pattern.afterMode === 'flow' }">
        <template v-for="(node, nodeIndex) in pattern.after" :key="`after-${nodeIndex}`">
          <span v-if="nodeIndex > 0 && pattern.afterMode === 'flow'" class="scaling-mini-step-arrow" aria-hidden="true">↓</span>
          <span class="scaling-mini-node after">{{ node }}</span>
        </template>
      </div>
    </div>
    <p>{{ pattern.condition }}</p>
  </article>
</template>
