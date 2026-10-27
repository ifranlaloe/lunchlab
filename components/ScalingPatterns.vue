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
    { title: 'Limit simultaneous calls', type: 'Implementation + operations', condition: 'If a shared dependency is overloaded', before: ['Too many calls at once'], after: ['Call limit', 'Dependency'], afterMode: 'flow' },
  ],
  database: [
    { title: 'Increase database headroom', type: 'Infrastructure', condition: 'If CPU, memory, or I/O is saturated', before: ['DB · small node'], after: ['DB · larger node'] },
    { title: 'Split reads from writes', type: 'Architecture + infrastructure', condition: 'If reads dominate and replica lag is acceptable', before: ['Primary · reads + writes'], after: ['Primary · writes', 'Replica · reads'] },
    { title: 'Optimize queries and indexes', type: 'Implementation', condition: 'If scans or excess rows drive the load', before: ['Scan many rows'], after: ['Index seek', 'Fetch less'], afterMode: 'flow' },
    { title: 'Shorten write transactions', type: 'Implementation', condition: 'If avoidable work happens inside a transaction', before: ['Long write transaction'], after: ['Prepare first', 'Short atomic write'], afterMode: 'flow' },
  ],
  external: [
    { title: 'Cache repeat lookups', type: 'Implementation + architecture', condition: 'If results can be reused safely', before: ['Every call → provider'], after: ['Cache hit', 'Provider on miss'] },
    { title: 'Batch provider calls', type: 'Implementation', condition: 'If the provider accepts grouped work', before: ['Call', 'Call', 'Call'], after: ['One batch call'] },
    { title: 'Limit simultaneous calls', type: 'Implementation + operations', condition: 'If concurrent calls overload the provider', before: ['Too many calls at once'], after: ['Call limit', 'Provider'], afterMode: 'flow' },
    { title: 'Add a queue for optional calls', type: 'Architecture', condition: 'If the caller need not wait', before: ['Request waits'], after: ['Queue', 'Worker → provider'], afterMode: 'flow' },
  ],
  workers: [
    { title: 'Add consumers', type: 'Infrastructure', condition: 'If jobs can run independently', before: ['One worker'], after: ['Worker A', 'Worker B', 'Worker C'] },
    { title: 'Make jobs cheaper', type: 'Implementation', condition: 'If each job takes too long', before: ['Step', 'Step', 'Step'], after: ['Batch or optimize'] },
    { title: 'Partition by key', type: 'Architecture', condition: 'If per-key order or ownership matters', before: ['Shared work'], after: ['Key A → worker A', 'Key B → worker B'] },
    { title: 'Control intake', type: 'Operations + architecture', condition: 'If the backlog keeps growing', before: ['No intake limit'], after: ['Intake limit', 'Queue size limit'], afterMode: 'flow' },
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
