import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Location } from '@/types/location'
import type { TrendMap } from '@/types/trends'
import type { TrendHistoryItem } from '@/types/trend-history'

export const useTrendsStore = defineStore('trends', () => {
  const locations = ref<Location[]>([])
  const trends = ref<TrendMap>({})
  const trendsHistory = ref<Record<string, { history: TrendHistoryItem[] }>>({})

  const isLoaded = ref(false)

  async function loadData() {
    const [loc, tr, hist] = await Promise.all([
      fetch('/data/Locations.json').then((r) => r.json()),
      fetch('/data/trends.json').then((r) => r.json()),
      fetch('/data/trends-history.json').then((r) => r.json()),
    ])

    locations.value = loc
    trends.value = tr
    trendsHistory.value = hist
    isLoaded.value = true
  }

  return {
    locations,
    trends,
    trendsHistory,
    isLoaded,
    loadData,
  }
})
