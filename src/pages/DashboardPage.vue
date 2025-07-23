<script setup lang="ts">
import { computed, ref } from 'vue'
import locations from '@/data/Locations.json'
import trendsRaw from '@/data/trends.json'
import trendsHistoryRaw from '@/data/trends-history.json'
import type { Trend, TrendMap } from '@/types/trends'
import LocationDropdown from '@/components/LocationDropdown.vue'
import MetricCard from '@/components/MetricCard.vue'
import TrendChart from '@/components/TrendChart.vue'

const selectedLocation = ref(locations[0])

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
  <main class="w-full min-h-screen p-4 md:px-8 sm:py-20 bg-background flex justify-center">
    <div class="w-full mx-auto flex flex-col gap-8">
      <div class="flex flex-col xl:flex-row items-center justify-between gap-6">
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <img src="@/assets/images/Logo.png" alt="Logo" class="w-20 h-auto mb-4" />
          <LocationDropdown v-model:selected="selectedLocation" />
        </div>

        <div class="w-full xl:w-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            v-for="metric in metrics"
            :key="metric.label"
            :label="metric.label"
            :value="metric.value"
            :delta="metric.delta"
          />
        </div>
      </div>

      <TrendChart :location-id="selectedLocation.id" :history-data="trendsHistoryRaw" />
    </div>
  </main>
</template>
