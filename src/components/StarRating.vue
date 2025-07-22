<script setup lang="ts">
defineProps<{
  rating: number
  max?: number
}>()
</script>

<template>
  <div class="flex items-center gap-0.5">
    <template v-for="i in max ?? 5" :key="i">
      <svg
        v-if="rating >= i"
        class="w-3.5 h-3.5 text-gold fill-gold stroke-gold"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.987 1.524 8.276L12 18.896 4.54 23.569l1.524-8.276L0 9.306l8.332-1.151z"
        />
      </svg>
      <svg
        v-else
        class="w-3.5 h-3.5 text-gold fill-none stroke-gold"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.987 1.524 8.276L12 18.896 4.54 23.569l1.524-8.276L0 9.306l8.332-1.151z"
        />
      </svg>
    </template>
  </div>
</template>
