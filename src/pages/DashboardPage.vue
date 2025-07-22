<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        v-for="metric in metrics"
        :key="metric.key"
        class="bg-background p-4 rounded-sm flex flex-col gap-1 border border-default"
      >
        <div class="text-sm">{{ metric.label }}</div>
        <div class="text-xl font-semibold text-heading">{{ metric.value }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const metrics = [
  { key: 'average', label: 'Average', value: 12 },
  { key: 'top_3_position', label: 'Top 3 Position', value: 28.9 },
  { key: 'top_3_percentage', label: 'Top 3 %', value: '68.5%' },
  { key: 'market_share_position', label: 'Market Share Pos.', value: 15 },
  { key: 'market_share_percentage', label: 'Market Share %', value: '72.4%' },
]
</script>
