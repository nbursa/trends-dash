<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import type { Trend, TrendMap } from '@/types/trends'
import type { Location } from '@/types/location'
import LocationDropdown from '@/components/LocationDropdown.vue'
import MetricCard from '@/components/MetricCard.vue'
import TrendChart from '@/components/TrendChart.vue'
import { useTrendsStore } from '@/stores/useTrendsStore'

const store = useTrendsStore()

onMounted(() => {
  if (!store.isLoaded) store.loadData()
})

const selectedLocation = ref<Location | null>(null)

watch(
  () => store.locations,
  (locs) => {
    if (!selectedLocation.value && locs.length) {
      selectedLocation.value = locs[0]
    }
  },
  { immediate: true },
)

const metrics = computed(() => {
  const trends: TrendMap = store.trends
  if (!selectedLocation.value) return []
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
    <div v-if="selectedLocation" class="w-full mx-auto flex flex-col gap-8">
      <div class="flex flex-col xl:flex-row items-center justify-between gap-6">
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <img src="@/assets/images/Logo.png" alt="Logo" class="w-20 h-auto mb-4" />
          <LocationDropdown v-model:selected="selectedLocation" :locations="store.locations" />
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

      <TrendChart
        v-if="selectedLocation"
        :location-id="selectedLocation.id"
        :history-data="store.trendsHistory"
      />
    </div>

    <div v-else class="text-center text-gray-500">Loading...</div>
  </main>
</template>
