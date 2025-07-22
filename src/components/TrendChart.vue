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
    type: 'area',
    height: 350,
    toolbar: { show: false },
  },
  stroke: {
    width: 3,
    curve: 'straight',
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'vertical',
      shadeIntensity: 0.4,
      inverseColors: false,
      opacityFrom: 0.3,
      opacityTo: 0.5,
      stops: [0, 100],
    },
    colors: ['#28A6BD'],
  },
  xaxis: {
    type: 'category',
    labels: {
      rotate: -45,
      style: {
        fontSize: '12px',
        fontWeight: '600',
        colors: '#7D8EA0',
      },
    },
  },
  yaxis: {
    decimalsInFloat: 0,
    labels: {
      style: {
        fontSize: '13px',
      },
    },
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
    colors: ['transparent'],
    strokeColors: '#ffffff',
    strokeWidth: 4,
    shape: 'circle',
    hover: {
      size: 12,
    },
    discrete: [],
    dropShadow: {
      enabled: true,
      top: 1,
      left: 0,
      blur: 8,
      opacity: 1,
    },
  },
  dataLabels: {
    enabled: false,
  },
}))
</script>

<template>
  <div class="border border-default flex flex-col bg-background">
    <div class="px-8 py-4 flex items-center gap-2 mb-4 border-b border-default">
      <img src="@/assets/icons/ranking.svg" alt="Ranking icon" class="h-7.5 w-auto" />
      <span class="text-[22px] font-semibold leading-none">Ranking Position</span>
    </div>

    <div class="p-8 flex gap-4 mb-4">
      <label
        v-for="metric in metrics"
        :key="metric.key"
        class="inline-flex gap-2 items-center cursor-pointer"
      >
        <input
          type="radio"
          class="form-radio text-primary"
          name="metric"
          :value="metric.key"
          v-model="selectedMetric"
        />
        <span class="ml-2 text-sm font-semibold">{{ metric.label }}</span>
      </label>
    </div>

    <div v-if="series.length" class="px-4 py-0">
      <div class="relative">
        <svg width="0" height="0">
          <defs>
            <linearGradient id="marker-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#97c72f" />
              <stop offset="100%" stop-color="#1ca2cc" />
            </linearGradient>
          </defs>
        </svg>
        <ApexCharts type="area" :options="chartOptions" :series="series" height="350" />
      </div>
    </div>
    <div v-else class="text-center">No data available</div>
  </div>
</template>

<style scoped>
:deep(.apexcharts-marker) {
  fill: url(#marker-gradient);
}
</style>
