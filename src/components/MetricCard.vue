<template>
  <div class="bg-background p-4 rounded-sm border border-default flex items-center gap-4 w-full">
    <div class="flex flex-col justify-center gap-1 flex-1">
      <div class="text-accent text-2xl font-semibold leading-none">{{ value }}</div>
      <div class="text-text text-xs font-semibold leading-none">{{ label }}</div>
    </div>
    <div class="flex flex-col items-center justify-between h-full">
      <img
        v-if="isPositive"
        src="@/assets/icons/chart-up.svg"
        alt="Chart up icon"
        class="w-5 h-5"
      />
      <img v-else src="@/assets/icons/chart-down.svg" alt="Chart down icon" class="w-5 h-5" />
      <div :class="['text-xs font-semibold', isPositive ? 'text-success' : 'text-danger']">
        {{ delta }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  label: string
  value: string | number
  delta: string
}>()

const { delta } = props
const isPositive = computed(() => delta.startsWith('+'))
</script>
