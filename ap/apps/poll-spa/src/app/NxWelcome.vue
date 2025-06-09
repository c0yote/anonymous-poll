<script setup lang="ts">
import PollCard from '../views/poll-view/PollCard.vue';

defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <PollCard title="Sprint 64 Retrospective" description="June 9, 2025" />
  </div>
</template>

<style scoped></style>
