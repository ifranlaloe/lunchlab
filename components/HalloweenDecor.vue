<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ items?: string[] | string }>()

const assetBase = `${import.meta.env.BASE_URL}assets/scaling/halloween/`
const sources: Record<string, string> = {
  'bats-top-right': 'bats.png',
  'cobweb-top-right': 'cobweb-spider.png',
  'gargoyle-top-right': 'gargoyle.png',
  'mask-right': 'scream-mask.png',
  'pumpkin-bottom-left': 'pumpkin.png',
  'pumpkin-bottom-right': 'pumpkin.png',
  'skeleton-bottom-left': 'skeleton-hand.png',
  'skeleton-bottom-right': 'skeleton-hand.png',
  'zombie-bottom-left': 'zombie-hands.png',
  'zombie-bottom-right': 'zombie-hands.png',
}

const pieces = computed(() => {
  const selected = Array.isArray(props.items) ? props.items : props.items ? [props.items] : []
  return selected.filter((item) => sources[item]).map((item) => ({ item, src: `${assetBase}${sources[item]}` }))
})
</script>

<template>
  <div v-if="pieces.length" class="halloween-decor" aria-hidden="true">
    <img v-for="piece in pieces" :key="piece.item" :class="piece.item" :src="piece.src" alt="" />
  </div>
</template>
