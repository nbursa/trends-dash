<script setup lang="ts">
import { computed, ref } from 'vue'
import locations from '@/data/Locations.json'
import trendsRaw from '@/data/trends.json'
import type { Trend, TrendMap } from '@/types/trends'
import MetricCard from '@/components/MetricCard.vue'

const selectedLocation = ref(locations[0]) // Default to the first location

const metrics = computed(() => {
  const trends: TrendMap = trendsRaw
  const trend: Trend = trends[String(selectedLocation.value.id)]

  if (!trend) return []

  return [
    {
      label: 'Average Ranking',
      value: trend.current.average.toFixed(1),
      delta: calcDelta(trend.current.average, trend.previous.average),
    },
    {
      label: 'Top 3%',
      value: `${trend.current.top_3_percentage.toFixed(0)}%`,
      delta: calcDelta(trend.current.top_3_percentage, trend.previous.top_3_percentage, true),
    },
    {
      label: 'Market Share',
      value: `${trend.current.market_share_percentage.toFixed(0)}%`,
      delta: calcDelta(
        trend.current.market_share_percentage,
        trend.previous.market_share_percentage,
        true,
      ),
    },
  ]
})

function calcDelta(current: number, previous: number, isPercent = false) {
  const diff = current - previous
  const sign = diff >= 0 ? '+' : ''
  return `${sign}${isPercent ? diff.toFixed(0) : diff.toFixed(1)}${isPercent ? '%' : ''}`
}
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <MetricCard
        v-for="metric in metrics"
        :key="metric.label"
        :label="metric.label"
        :value="metric.value"
        :delta="metric.delta"
      />
    </div>
  </div>
</template>
