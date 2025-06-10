<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  score: number;
  scoreTrend: number;
}>();

const arrow = computed(() => {
  if (Number(props.scoreTrend) > 0) {
    return '↑';
  } else if (Number(props.scoreTrend) < 0) {
    return '↓';
  }
  return '→';
});
</script>

<template>
  <div class="flex gap-1">
    <div class="flex items-center justify-center text-2xl font-bold">
      {{ score }}
    </div>
    <div class="flex items-end justify-end text-sm">
      {{ arrow }}{{ scoreTrend }}
    </div>
  </div>
</template>
