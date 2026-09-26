<script setup>
defineProps({ answers: { type: Boolean, default: false } })

const questions = [
  ['Who are the primary users or actors?', 'Travelers by road, railway, water, and air.'],
  ['Which external systems do we depend on?', 'External road, rail, waterway, and airport systems.'],
  ['What are the main interactions across the boundary?', 'Cross-system coordination across road, rail, water, and air systems.'],
]
</script>

<template>
  <div class="level1-questions">
    <ol>
      <li v-for="[prompt, answer] in questions" :key="prompt">
        <span class="prompt">{{ prompt }}</span>
        <span v-if="answers" class="answer">{{ answer }}</span>
      </li>
    </ol>
  </div>
</template>
