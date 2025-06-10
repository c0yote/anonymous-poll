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
        <DeltaRow
          category="Clarity"
          :score="Number(8.5)"
          :score-trend="Number(0.3)"
          :unfavorable-trend="Number(0.1)"
          :neutral-trend="Number(0.1)"
          :favorable-trend="Number(0.1)"
          :unfavorable-percentage="Number(8)"
          :neutral-percentage="Number(22)"
          :favorable-percentage="Number(70)"
        /><Separator class="mt-2" />
        <DeltaRow
          category="Energy"
          :score="Number(72)"
          :score-trend="Number(0.2)"
          :unfavorable-trend="Number(0.1)"
          :neutral-trend="Number(0.1)"
          :favorable-trend="Number(0.1)"
          :unfavorable-percentage="Number(15)"
          :neutral-percentage="Number(35)"
          :favorable-percentage="Number(50)"
        />
        <Separator class="mt-2" />
        <DeltaRow
          category="Psychological Safety"
          :score="Number(9.2)"
          :score-trend="Number(-0.1)"
          :unfavorable-trend="Number(0.1)"
          :neutral-trend="Number(0.1)"
          :favorable-trend="Number(0.1)"
          :unfavorable-percentage="Number(3)"
          :neutral-percentage="Number(15)"
          :favorable-percentage="Number(82)"
        />
        <Separator class="mt-2" />
        <DeltaRow
          category="Work-life Balance"
          :score="Number(6.5)"
          :score-trend="Number(-0.1)"
          :unfavorable-trend="Number(0.1)"
          :neutral-trend="Number(0.1)"
          :favorable-trend="Number(0.1)"
          :unfavorable-percentage="Number(20)"
          :neutral-percentage="Number(40)"
          :favorable-percentage="Number(40)"
        />
        <Separator class="mt-2" />
        <DeltaRow
          category="Confidence"
          :score="Number(7.8)"
          :score-trend="Number(0.1)"
          :unfavorable-trend="Number(0.1)"
          :neutral-trend="Number(0.1)"
          :favorable-trend="Number(-0.1)"
          :unfavorable-percentage="Number(12)"
          :neutral-percentage="Number(25)"
          :favorable-percentage="Number(63)"
        />
        <Separator class="mt-2" />
        <DeltaRow
          category="Efficiency"
          :score="Number(8.8)"
          :score-trend="Number(0.1)"
          :unfavorable-trend="Number(0.1)"
          :neutral-trend="Number(0.1)"
          :favorable-trend="Number(0.1)"
          :unfavorable-percentage="Number(5)"
          :neutral-percentage="Number(18)"
          :favorable-percentage="Number(77)"
        />
      </div>
    </CardContent>
  </Card>
</template>
