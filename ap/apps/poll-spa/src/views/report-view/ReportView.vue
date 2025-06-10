<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import DeltaCard from './DeltaCard.vue';
import { DeltaResult } from '@ap/shared-types';

const mockSeries: DeltaResult[] = [
  {
    category: 'Clarity',
    score: 8.5,
    scoreTrend: 0.3,
    unfavorableTrend: 0.1,
    neutralTrend: 0.1,
    favorableTrend: 0.1,
    unfavorablePercentage: 8,
    neutralPercentage: 22,
    favorablePercentage: 70,
  },
  {
    category: 'Energy',
    score: 72,
    scoreTrend: 0.2,
    unfavorableTrend: 0.1,
    neutralTrend: 0.1,
    favorableTrend: 0.1,
    unfavorablePercentage: 15,
    neutralPercentage: 35,
    favorablePercentage: 50,
  },
  {
    category: 'Psychological Safety',
    score: 9.2,
    scoreTrend: -0.1,
    unfavorableTrend: 0.1,
    neutralTrend: 0.1,
    favorableTrend: 0.1,
    unfavorablePercentage: 3,
    neutralPercentage: 15,
    favorablePercentage: 82,
  },
  {
    category: 'Work-life Balance',
    score: 6.5,
    scoreTrend: -0.1,
    unfavorableTrend: 0.1,
    neutralTrend: 0.1,
    favorableTrend: 0.1,
    unfavorablePercentage: 20,
    neutralPercentage: 40,
    favorablePercentage: 40,
  },
  {
    category: 'Confidence',
    score: 7.8,
    scoreTrend: 0.1,
    unfavorableTrend: 0.1,
    neutralTrend: 0.1,
    favorableTrend: 0.1,
    unfavorablePercentage: 12,
    neutralPercentage: 25,
    favorablePercentage: 63,
  },
  {
    category: 'Efficiency',
    score: 8.8,
    scoreTrend: 0.1,
    unfavorableTrend: 0.1,
    neutralTrend: 0.1,
    favorableTrend: 0.1,
    unfavorablePercentage: 5,
    neutralPercentage: 18,
    favorablePercentage: 77,
  },
];

const route = useRoute();
const series = ref<{ title: string; description: string } | null>(null);
const mockResults = ref<DeltaResult[]>(mockSeries);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  console.log('wat');
  try {
    const response = await axios.get(`/api/series/${route.params.id}`);
    console.log(response.data);
    series.value = response.data;
  } catch (err) {
    console.dir(err);
    if (err.status === 404) {
      error.value = err.response.data.error;
    } else {
      error.value = 'Failed to load series';
      console.error('Error loading series:', err);
    }
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="container mx-auto p-4">
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else-if="error" class="text-center text-destructive">
      {{ error }}
    </div>
    <div v-else>
      <DeltaCard :series="series" :results="mockResults" :polls="[]" />
    </div>
  </div>
</template>
