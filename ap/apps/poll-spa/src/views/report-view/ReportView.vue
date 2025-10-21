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
const results = ref<DeltaResult[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const calculateDeltaResults = (polls: Poll[]): DeltaResult[] => {
  const categories = [
    { key: 'clarity', label: 'Clarity' },
    { key: 'energy', label: 'Energy' },
    { key: 'psychologicalSafety', label: 'Psychological Safety' },
    { key: 'workLifeBalance', label: 'Work-life Balance' },
    { key: 'confidence', label: 'Confidence' },
    { key: 'efficiency', label: 'Efficiency' }
  ];

  const allSubmissions = polls.flatMap(poll => poll.submissions);

  return categories.map(category => {
    const scores = allSubmissions.map(submission => submission.responses[category.key]);
    const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;

    const unfavorableCount = scores.filter(score => score >= 1 && score <= 4).length;
    const neutralCount = scores.filter(score => score >= 5 && score <= 7).length;
    const favorableCount = scores.filter(score => score >= 8 && score <= 10).length;

    const totalCount = scores.length;
    const unfavorablePercentage = Math.round((unfavorableCount / totalCount) * 100);
    const neutralPercentage = Math.round((neutralCount / totalCount) * 100);
    const favorablePercentage = Math.round((favorableCount / totalCount) * 100);

    const scoreTrend = 0;
    const unfavorableTrend = 0;
    const neutralTrend = 0;
    const favorableTrend = 0;

    return {
      category: category.label,
      score: Number(averageScore.toFixed(1)),
      scoreTrend,
      unfavorableTrend,
      neutralTrend,
      favorableTrend,
      unfavorablePercentage,
      neutralPercentage,
      favorablePercentage,
    };
  });
};

onMounted(async () => {
  console.log('wat');
  try {
    const response = await axios.get(`/api/series/${route.params.id}`);
    console.log(response.data);
    series.value = response.data;
    
    results.value = calculateDeltaResults(response.data.polls);
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
      <DeltaCard :series="series" :results="results" :polls="series?.polls || []" />
    </div>
  </div>
</template>
