<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ items?: string[] | string }>()

const sources: Record<string, string> = {
  'bats-top-right': '/assets/scaling/halloween/bats.png',
  'cobweb-top-right': '/assets/scaling/halloween/cobweb-spider.png',
  'gargoyle-top-right': '/assets/scaling/halloween/gargoyle.png',
  'mask-right': '/assets/scaling/halloween/scream-mask.png',
  'pumpkin-bottom-left': '/assets/scaling/halloween/pumpkin.png',
  'pumpkin-bottom-right': '/assets/scaling/halloween/pumpkin.png',
  'skeleton-bottom-left': '/assets/scaling/halloween/skeleton-hand.png',
  'skeleton-bottom-right': '/assets/scaling/halloween/skeleton-hand.png',
  'zombie-bottom-left': '/assets/scaling/halloween/zombie-hands.png',
  'zombie-bottom-right': '/assets/scaling/halloween/zombie-hands.png',
}

const pieces = computed(() => {
  const selected = Array.isArray(props.items) ? props.items : props.items ? [props.items] : []
  return selected.filter((item) => sources[item]).map((item) => ({ item, src: sources[item] }))
})
</script>

<template>
  <div v-if="pieces.length" class="halloween-decor" aria-hidden="true">
    <img v-for="piece in pieces" :key="piece.item" :class="piece.item" :src="piece.src" alt="" />
  </div>
</template>
