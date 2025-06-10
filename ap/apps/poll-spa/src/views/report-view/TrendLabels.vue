<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  unfavorableTrend: number;
  neutralTrend: number;
  favorableTrend: number;
}>();

const unfavorableArrow = computed(() => {
  if (Number(props.unfavorableTrend) > 0) {
    return '↑';
  } else if (Number(props.unfavorableTrend) < 0) {
    return '↓';
  }
  return '→';
});

const neutralArrow = computed(() => {
  if (Number(props.neutralTrend) > 0) {
    return '↑';
  } else if (Number(props.neutralTrend) < 0) {
    return '↓';
  }
  return '→';
});

const favorableArrow = computed(() => {
  if (Number(props.favorableTrend) > 0) {
    return '↑';
  } else if (Number(props.favorableTrend) < 0) {
    return '↓';
  }
  return '→';
});
</script>

<template>
  <div class="flex">
    <p class="flex items-end justify-center text-sm">
      <span class="font-bold text-[hsl(var(--chart-1))]">
        {{ unfavorableArrow }}{{ unfavorableTrend }}
      </span>
      <span class="px-1 text-sm text-muted-foreground"> / </span>
      <span class="font-bold text-[hsl(var(--chart-4))]">
        {{ neutralArrow }}{{ neutralTrend }}
      </span>
      <span class="px-1 text-sm text-muted-foreground"> / </span>
      <span class="font-bold text-[hsl(var(--chart-2))]">
        {{ favorableArrow }}{{ favorableTrend }}
      </span>
    </p>
  </div>
</template>
