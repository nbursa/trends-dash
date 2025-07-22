<template>
  <div class="flex items-start gap-4">
    <div class="flex flex-col text-sm gap-0.5">
      <select v-model="localSelectedId" @change="emitSelected" class="text-base font-semibold mb-1">
        <option v-for="loc in locations" :key="loc.id" :value="loc.id">
          {{ loc.name }}
        </option>
      </select>

      <div class="text-soft leading-tight">
        {{ selected.ave_review_rating?.toFixed(1) }} <span class="text-yellow-400">STARS</span> ({{
          selected.review_count
        }})
      </div>

      <div class="text-soft leading-tight">
        {{ formatAddress(selected) }}
      </div>

      <div class="text-soft leading-tight">{{ selected.primary_phone }}</div>

      <div class="flex items-center gap-2 pt-1">
        <a
          v-if="selected.website_url"
          :href="selected.website_url ?? undefined"
          target="_blank"
          class="text-link text-sm font-semibold underline flex items-center gap-1"
        >
          <img src="@/assets/icons/globe.svg" class="w-4 h-4" />
          <span>{{ selected.website_url }}</span>
        </a>

        <span v-if="selected.website_url && selected.map_url" class="text-muted px-1">|</span>

        <a
          v-if="selected.map_url"
          :href="selected.map_url ?? undefined"
          target="_blank"
          class="text-link text-sm font-semibold underline flex items-center gap-1"
        >
          <img src="@/assets/icons/map.svg" class="w-4 h-4" />
          <span>Google Map</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { defineProps, defineEmits } from 'vue'
import locations from '@/data/Locations.json'
import type { Location } from '@/types/location'

const props = defineProps<{
  selected: Location
}>()

const emit = defineEmits(['update:selected'])

const localSelectedId = ref(props.selected.id)

function emitSelected() {
  const newSelected = locations.find((loc) => loc.id === Number(localSelectedId.value))
  if (newSelected) emit('update:selected', newSelected)
}

function formatAddress(loc: Location) {
  return [loc.address, loc.city, loc.zip_code].filter(Boolean).join(', ')
}
</script>
