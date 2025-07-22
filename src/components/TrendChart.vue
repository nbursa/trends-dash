<script setup lang="ts">
import type { TrendHistoryItem } from '@/types/trend-history'
import { computed, defineProps, ref } from 'vue'
import ApexCharts from 'vue3-apexcharts'

const props = defineProps<{
  locationId: string | number | null
  historyData: Record<string, { history: TrendHistoryItem[] }>
}>()

const metrics = [
  { key: 'average', label: 'Average Position' },
  { key: 'top_3_position', label: 'Top 3 Position' },
  { key: 'top_3_percentage', label: 'Top 3 Percentage' },
  { key: 'market_share_position', label: 'Market Share Position' },
  { key: 'market_share_percentage', label: 'Market Share Percentage' },
]

const selectedMetric = ref('average')

const series = computed(() => {
  if (!props.locationId || !props.historyData[props.locationId]) return []

  const history = props.historyData[props.locationId].history

  const metric = metrics.find((m) => m.key === selectedMetric.value)
  if (!metric) return []

  return [
    {
      name: metric.label,
      data: history.map((item) => ({
        x: new Date(item.execution_date).toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        }),
        y: item[metric.key as keyof TrendHistoryItem] as number,
      })),
    },
  ]
})

const chartOptions = computed(() => ({
  chart: {
    type: 'line',
    height: 350,
    toolbar: { show: false },
  },
  colors: ['#28A6BD'],
  stroke: {
    width: 3,
    curve: 'straight',
  },
  xaxis: {
    type: 'category',
    labels: {
      rotate: -45,
    },
  },
  yaxis: {
    decimalsInFloat: 0,
  },
  tooltip: {
    shared: true,
    intersect: false,
  },
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'center',
  },
  markers: {
    size: 8,
    colors: ['#00B2FF'],
    strokeColors: '#ffffff',
    strokeWidth: 4,
    shape: 'circle',
    hover: {
      size: 12,
    },
    discrete: [],
    dropShadow: {
      enabled: true,
      top: 0,
      left: 0,
      blur: 6,
      opacity: 0.5,
    },
  },
}))
</script>

<template>
  <div>
    <div class="flex gap-4 mb-4">
      <label
        v-for="metric in metrics"
        :key="metric.key"
        class="inline-flex gap-1 items-center cursor-pointer"
      >
        <input
          type="radio"
          class="form-radio text-primary"
          name="metric"
          :value="metric.key"
          v-model="selectedMetric"
        />
        <span class="ml-2">{{ metric.label }}</span>
      </label>
    </div>
    <div v-if="series.length">
      <ApexCharts type="line" :options="chartOptions" :series="series" height="350" />
    </div>
    <div v-else class="text-center text-gray-400">No data available</div>
  </div>
</template>
