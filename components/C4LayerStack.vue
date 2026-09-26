<script setup>
import { computed } from 'vue'

const props = defineProps({
  count: { type: Number, required: true },
  label: { type: String, required: true },
  variant: { type: String, default: 'slide' },
  revealLast: { type: Boolean, default: false },
})

const layers = [
  '/assets/svg/c4-infrastructure-level-1.svg',
  '/assets/svg/c4-infrastructure-level-2-overlay-road-network.svg',
  '/assets/svg/c4-infrastructure-level-2-overlay-rail-network.svg',
  '/assets/svg/c4-infrastructure-level-2-overlay-water-system.svg',
  '/assets/svg/c4-infrastructure-level-2-overlay-airports.svg',
]

const visibleLayers = computed(() => layers.slice(0, Math.max(1, Math.min(5, props.count + 1))))
</script>

<template>
  <div :class="variant === 'matrix' ? 'c4-quadrant-stack' : 'c4-layer-stack'" role="img" :aria-label="label">
    <template v-for="(layer, index) in visibleLayers" :key="layer">
      <img
        v-if="revealLast && index === visibleLayers.length - 1"
        v-click="1"
        :class="variant === 'matrix' ? 'c4-quadrant-layer' : 'c4-layer'"
        :src="layer"
        alt=""
        aria-hidden="true"
      />
      <img
        v-else
        :class="variant === 'matrix' ? 'c4-quadrant-layer' : 'c4-layer'"
        :src="layer"
        alt=""
        aria-hidden="true"
      />
    </template>
  </div>
</template>
