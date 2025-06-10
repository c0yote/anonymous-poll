<script setup lang="ts">
import Card from '../../shared/Card.vue';
import CardHeader from '../../shared/CardHeader.vue';
import CardTitle from '../../shared/CardTitle.vue';
import CardDescription from '../../shared/CardDescription.vue';
import CardContent from '../../shared/CardContent.vue';
import Button from '../../shared/Button.vue';
import CardFooter from '../../shared/CardFooter.vue';
import axios from 'axios';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import DeltaRow from './DeltaRow.vue';
import Separator from '../../shared/Separator.vue';

const props = defineProps<{
  series: any; // TODO: Get series type
  polls: any[]; // TODO: Get poll type
}>();

const polls = ref(props.polls);
const error = ref<string | null>(null);
const loading = ref(false);

interface DeltaResult {
  category: string;
  score: number;
  scoreTrend: number;
  unfavorableTrend: number;
  neutralTrend: number;
  favorableTrend: number;
  unfavorablePercentage: number;
  neutralPercentage: number;
  favorablePercentage: number;
}

const mockResult: DeltaResult[] = [
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

const onNewPoll = async () => {
  const date = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  try {
    const response = await axios.post('/api/poll', {
      title: date + ' - ' + props.series.name,
      description:
        'Retrospective poll for ' + props.series.name + ' on ' + date,
      seriesId: props.series.id,
    });

    if (response.status === 201) {
      polls.value.push(response.data);
    }
  } catch (err) {
    console.error('Failed to create poll', err);
    error.value = 'Failed to create poll';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Delta</CardTitle>
      <CardDescription>
        A delta is a measure of the change in a value over time.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="flex flex-col gap-2">
        <div v-for="result in mockResult" :key="result.category">
          <DeltaRow
            :category="result.category"
            :score="Number(result.score)"
            :score-trend="Number(result.scoreTrend)"
            :unfavorable-trend="Number(result.unfavorableTrend)"
            :neutral-trend="Number(result.neutralTrend)"
            :favorable-trend="Number(result.favorableTrend)"
            :unfavorable-percentage="Number(result.unfavorablePercentage)"
            :neutral-percentage="Number(result.neutralPercentage)"
            :favorable-percentage="Number(result.favorablePercentage)"
          />
          <Separator class="mt-2" />
        </div>
      </div>
    </CardContent>
  </Card>
</template>
