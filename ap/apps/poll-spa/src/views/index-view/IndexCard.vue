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
import { SeriesSchema } from '@ap/shared-types';

const props = defineProps<{
  series: SeriesSchema; // TODO: Get series type
  pollIds: string[]; // TODO: Get poll type
}>();

const pollIds = ref(props.pollIds);
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
        <RouterLink :to="`/series/${series.id}`">
            <CardTitle>Series: {{ series.name }}</CardTitle>
        </RouterLink>

      
      <CardDescription>{{ series.description }}</CardDescription>
    </CardHeader>
    <!-- <CardContent>
      <div v-if="loading" class="text-center">Loading...</div>
      <div class="p-8" v-if="polls.length === 0">
        <p class="text-center text-muted-foreground text-sm">No polls yet...</p>
      </div>
      <div class="flex flex-col gap-4">
        <div v-for="poll in polls" :key="poll.id">
          <div class="flex justify-between items-center">
            <div>{{ poll.title }}</div>
            <RouterLink :to="`/poll/${poll.id}`">
              <Button size="sm">View</Button>
            </RouterLink>
          </div>
        </div>
      </div>
      <div v-if="error" class="text-destructive text-sm py-2">
        {{ error }}
      </div>
    </CardContent> -->
    <!-- <CardFooter>
      <Button @click="onNewPoll">New Poll</Button>
    </CardFooter> -->
  </Card>
</template>
