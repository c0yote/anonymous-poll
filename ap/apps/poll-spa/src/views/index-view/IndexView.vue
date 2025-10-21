<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import IndexCard from './IndexCard.vue';
import { SeriesSchema } from '@ap/shared-types';

const route = useRoute();
const series = ref<SeriesSchema[] | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const createSeriesFormVisibility = ref(false);
const newSeriesTitle = ref('');
const newSeriesDescription = ref('');

const loadSeries = async () => {
  try {
    const response = await axios.get<SeriesSchema[]>(`/api/series`);
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
  };
}

onMounted(async () => {
  console.log('wat');
  try {
    await loadSeries();
  } finally {
    loading.value = false;
  }
});

const onCreateSeries = async (seriesTitle: string, seriesDescription: string) => {
  try {
    const response = await axios.post<SeriesSchema>(`/api/series`, { title: seriesTitle, description: seriesDescription });
    console.log(response.data);
    createSeriesFormVisibility.value = false;
  } catch (err) {
    console.dir(err);
    if (err.status === 404) {
      error.value = err.response.data.error;
    } else {
      error.value = 'Failed to create series';
      console.error('Error creating series:', err);
    }
  }
  await loadSeries();
};

</script>

<template>
  <div class="container mx-auto p-4">
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else-if="error" class="text-center text-destructive">
      {{ error }}
    </div>
    <button class="add-series-form" @click="createSeriesFormVisibility = !createSeriesFormVisibility">Add
      Series</button>
    <div v-if="createSeriesFormVisibility">
      <p>Series Title: <input v-model="newSeriesTitle" /></p>
      <p>Series Description: <input v-model="newSeriesDescription" /></p>
      <button class="create-series" @click="onCreateSeries(newSeriesTitle, newSeriesDescription);">Create</button>
    </div>
  </div>
  <div v-for="serie of series" :key="serie.id">
    <IndexCard :key="serie.id" :series="serie" :pollIds="serie.pollIds" />
  </div>
</template>

<style scoped>
.add-series-form,
.create-series {
  background-color: red;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
}
</style>
