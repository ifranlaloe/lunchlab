<script setup>
import { computed } from 'vue'
import ScalingPatternCard from './ScalingPatternCard.vue'

const props = defineProps({
  topic: { type: String, required: true },
})

const byTopic = {
  api: [
    { title: 'Give one API more headroom', type: 'Infrastructure', condition: 'If its CPU or memory is saturated', before: ['API · 2 vCPU'], after: ['API · 8 vCPU'] },
    { title: 'Add API replicas', type: 'Infrastructure + architecture', condition: 'If requests can run independently', before: ['One API'], after: ['API A', 'API B', 'API C'] },
    { title: 'Make each request cheaper', type: 'Implementation', condition: 'If repeated work can be reused safely', before: ['Compute', 'Compute', 'Compute'], after: ['Compute once', 'Reuse result'], afterMode: 'flow' },
    { title: 'Bound in-flight calls', type: 'Implementation + operations', condition: 'If a shared dependency is overloaded', before: ['Unbounded calls'], after: ['Concurrency gate', 'Dependency'], afterMode: 'flow' },
  ],
  database: [
    { title: 'Increase database headroom', type: 'Infrastructure', condition: 'If CPU, memory, or I/O is saturated', before: ['DB · small node'], after: ['DB · larger node'] },
    { title: 'Split reads from writes', type: 'Architecture + infrastructure', condition: 'If reads dominate and replica lag is acceptable', before: ['Primary · reads + writes'], after: ['Primary · writes', 'Replica · reads'] },
    { title: 'Optimize queries and indexes', type: 'Implementation', condition: 'If scans or excess rows drive the load', before: ['Scan many rows'], after: ['Index seek', 'Fetch less'], afterMode: 'flow' },
    { title: 'Partition contended writes', type: 'Architecture', condition: 'If ownership can be separated by key', before: ['One hot write path'], after: ['Key A owner', 'Key B owner'] },
  ],
  external: [
    { title: 'Cache repeat lookups', type: 'Implementation + architecture', condition: 'If results can be reused safely', before: ['Every call → provider'], after: ['Cache hit', 'Provider on miss'] },
    { title: 'Batch provider calls', type: 'Implementation', condition: 'If the provider accepts grouped work', before: ['Call', 'Call', 'Call'], after: ['One batch call'] },
    { title: 'Bound concurrency', type: 'Implementation + operations', condition: 'If calls pile up or hit a rate limit', before: ['Unbounded calls'], after: ['Call gate', 'Provider'], afterMode: 'flow' },
    { title: 'Defer optional calls', type: 'Architecture', condition: 'If the caller need not wait', before: ['Request waits'], after: ['Queue', 'Worker → provider'], afterMode: 'flow' },
  ],
  workers: [
    { title: 'Add consumers', type: 'Infrastructure', condition: 'If jobs can run independently', before: ['One worker'], after: ['Worker A', 'Worker B', 'Worker C'] },
    { title: 'Make jobs cheaper', type: 'Implementation', condition: 'If each job takes too long', before: ['Step', 'Step', 'Step'], after: ['Batch or optimize'] },
    { title: 'Partition by key', type: 'Architecture', condition: 'If per-key order or ownership matters', before: ['Shared work'], after: ['Key A → worker A', 'Key B → worker B'] },
    { title: 'Control intake', type: 'Operations + architecture', condition: 'If backlog grows without bound', before: ['Unbounded arrivals'], after: ['Admission limit', 'Bounded queue'], afterMode: 'flow' },
  ],
}

const patterns = computed(() => byTopic[props.topic] ?? [])
</script>

<template>
  <div class="scaling-patterns">
    <template v-for="(pattern, index) in patterns" :key="pattern.title">
      <ScalingPatternCard v-if="index === 0" :pattern="pattern" />
      <ScalingPatternCard v-else v-click="index" :pattern="pattern" />
    </template>
  </div>
</template>
