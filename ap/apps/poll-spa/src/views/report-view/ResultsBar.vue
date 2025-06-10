<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '../../shared/lib/utils';

const props = defineProps<{
  unfavorablePercentage: number;
  neutralPercentage: number;
  favorablePercentage: number;
}>();

const willTotalEleven = computed(() => {
  const unfavorableRounded = Math.round(props.unfavorablePercentage / 10);
  const neutralRounded = Math.round(props.neutralPercentage / 10);
  const favorableRounded = Math.round(props.favorablePercentage / 10);
  return unfavorableRounded + neutralRounded + favorableRounded === 11;
});

const willBeZero = computed(() => {
  const unfavorableRounded = Math.round(props.unfavorablePercentage / 10);
  const neutralRounded = Math.round(props.neutralPercentage / 10);
  const favorableRounded = Math.round(props.favorablePercentage / 10);
  return (
    unfavorableRounded === 0 || neutralRounded === 0 || favorableRounded === 0
  );
});

const largest = computed(() => {
  if (
    props.unfavorablePercentage > props.neutralPercentage &&
    props.unfavorablePercentage > props.favorablePercentage
  ) {
    return 'unfavorable';
  }
  if (
    props.neutralPercentage > props.unfavorablePercentage &&
    props.neutralPercentage > props.favorablePercentage
  ) {
    return 'neutral';
  }
  return 'favorable';
});

const unfavorable = computed(() => {
  let rounded = Math.round(props.unfavorablePercentage / 10);

  if (
    (willBeZero.value || willTotalEleven.value) &&
    largest.value === 'unfavorable'
  ) {
    rounded -= 1;
  }

  return cn('flex bg-[hsl(var(--chart-1))]', {
    'col-span-1': rounded === 1,
    'col-span-2': rounded === 2,
    'col-span-3': rounded === 3,
    'col-span-4': rounded === 4,
    'col-span-5': rounded === 5,
    'col-span-6': rounded === 6,
    'col-span-7': rounded === 7,
    'col-span-8': rounded === 8,
    'col-span-9': rounded === 9,
    'col-span-10': rounded === 10,
  });
});

const neutral = computed(() => {
  let rounded = Math.round(props.neutralPercentage / 10);

  if (
    (willBeZero.value || willTotalEleven.value) &&
    largest.value === 'neutral'
  ) {
    rounded -= 1;
  }

  return cn('flex bg-[hsl(var(--chart-4))]', {
    'col-span-1': rounded === 1,
    'col-span-2': rounded === 2,
    'col-span-3': rounded === 3,
    'col-span-4': rounded === 4,
    'col-span-5': rounded === 5,
    'col-span-6': rounded === 6,
    'col-span-7': rounded === 7,
    'col-span-8': rounded === 8,
    'col-span-9': rounded === 9,
    'col-span-10': rounded === 10,
  });
});

const favorable = computed(() => {
  let rounded = Math.round(props.favorablePercentage / 10);

  if (
    (willBeZero.value || willTotalEleven.value) &&
    largest.value === 'favorable'
  ) {
    rounded -= 1;
  }

  return cn('flex bg-[hsl(var(--chart-2))]', {
    'col-span-1': rounded === 1,
    'col-span-2': rounded === 2,
    'col-span-3': rounded === 3,
    'col-span-4': rounded === 4,
    'col-span-5': rounded === 5,
    'col-span-6': rounded === 6,
    'col-span-7': rounded === 7,
    'col-span-8': rounded === 8,
    'col-span-9': rounded === 9,
    'col-span-10': rounded === 10,
  });
});
</script>

<template>
  <div class="grid grid-cols-10 gap-2 w-full">
    <div :class="unfavorable">
      <div class="flex w-8 rounded items-center justify-center w-full text-sm">
        {{ unfavorablePercentage }} %
      </div>
    </div>
    <div :class="neutral">
      <div class="flex w-8 rounded items-center justify-center w-full text-sm">
        {{ neutralPercentage }} %
      </div>
    </div>
    <div :class="favorable">
      <div class="flex w-8 rounded items-center justify-center w-full text-sm">
        {{ favorablePercentage }} %
      </div>
    </div>
  </div>
</template>
