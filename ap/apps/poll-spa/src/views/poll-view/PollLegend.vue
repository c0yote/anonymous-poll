<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { Label, type LabelProps } from 'reka-ui';
import { cn } from '../../shared/lib/utils';

const props = defineProps<LabelProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = reactiveOmit(props, 'class');
</script>

<template>
  <div
    :class="
      cn(
        'col-span-6 text-center text-sm text-muted-foreground border-b border-[hsl(var(--chart-1))] p-1',
        props.class,
      )
    "
  >
    <p>Unfavorable</p>
  </div>
  <div
    :class="
      cn(
        'col-span-2 text-center text-sm text-muted-foreground border-b border-[hsl(var(--chart-4))] p-1',
        props.class,
      )
    "
  >
    <p>Neutral</p>
  </div>
  <div
    :class="
      cn(
        'col-span-2 text-center text-sm text-muted-foreground border-b border-[hsl(var(--chart-2))] p-1',
        props.class,
      )
    "
  >
    <p>Favorable</p>
  </div>
  <div :class="cn('flex flex-col items-center', props.class)">
    <div class="flex flex-col items-center">
      <Label
        class="flex bg-[hsl(var(--chart-1))] py-1 w-8 rounded items-center justify-center"
        >1</Label
      >
    </div>
  </div>
  <div :class="cn('flex flex-col items-center', props.class)">
    <div class="flex flex-col items-center">
      <Label
        class="flex bg-[hsl(var(--chart-1))] py-1 w-8 rounded items-center justify-center"
        >2</Label
      >
    </div>
  </div>
  <div :class="cn('flex flex-col items-center', props.class)">
    <div class="flex flex-col items-center">
      <Label
        class="flex bg-[hsl(var(--chart-1))] py-1 w-8 rounded items-center justify-center"
        >3</Label
      >
    </div>
  </div>
  <div :class="cn('flex flex-col items-center', props.class)">
    <div class="flex flex-col items-center">
      <Label
        class="flex bg-[hsl(var(--chart-1))] py-1 w-8 rounded items-center justify-center"
        >4</Label
      >
    </div>
  </div>
  <div :class="cn('flex flex-col items-center', props.class)">
    <div class="flex flex-col items-center">
      <Label
        class="flex bg-[hsl(var(--chart-1))] py-1 w-8 rounded items-center justify-center"
        >5</Label
      >
    </div>
  </div>
  <div :class="cn('flex flex-col items-center', props.class)">
    <div class="flex flex-col items-center">
      <Label
        class="flex bg-[hsl(var(--chart-1))] py-1 w-8 rounded items-center justify-center"
        >6</Label
      >
    </div>
  </div>
  <div :class="cn('flex flex-col items-center', props.class)">
    <div class="flex flex-col items-center">
      <Label
        class="flex bg-[hsl(var(--chart-4))] py-1 w-8 rounded items-center justify-center"
        >7</Label
      >
    </div>
  </div>
  <div :class="cn('flex flex-col items-center', props.class)">
    <div class="flex flex-col items-center">
      <Label
        class="flex bg-[hsl(var(--chart-4))] py-1 w-8 rounded items-center justify-center"
        >8</Label
      >
    </div>
  </div>
  <div :class="cn('flex flex-col items-center', props.class)">
    <div class="flex flex-col items-center">
      <Label
        class="flex bg-[hsl(var(--chart-2))] py-1 w-8 rounded items-center justify-center"
        >9</Label
      >
    </div>
  </div>
  <div :class="cn('flex flex-col items-center', props.class)">
    <div class="flex flex-col items-center">
      <Label
        class="flex bg-[hsl(var(--chart-2))] py-1 w-8 rounded items-center justify-center"
        >10</Label
      >
    </div>
  </div>
</template>
