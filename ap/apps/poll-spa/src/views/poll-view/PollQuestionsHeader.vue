<script setup lang="ts">
import PollLegend from './PollLegend.vue';
</script>

<template>
  <div class="hidden md:block col-span-2 flex flex-col justify-center"></div>
  <div class="hidden md:block col-span-2">
    <div class="grid grid-cols-10 gap-2 pb-2">
      <PollLegend class="hidden md:block" />
    </div>
  </div>
</template>
