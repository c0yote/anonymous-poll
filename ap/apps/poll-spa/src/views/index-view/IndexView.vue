<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import IndexCard from './IndexCard.vue';

const route = useRoute();
const series = ref<{ title: string; description: string } | null>(null);
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
      <IndexCard :key="series.id" :series="series" :polls="series.polls" />
    </div>
  </div>
</template>
