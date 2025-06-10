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
import ResultsBar from './ResultsBar.vue';
import TrendLabels from './TrendLabels.vue';
import ScoreLabel from './ScoreLabel.vue';

const props = defineProps<{
  category: string;
  score: number;
  scoreTrend: number;
  unfavorableTrend: number;
  neutralTrend: number;
  favorableTrend: number;
  unfavorablePercentage: number;
  neutralPercentage: number;
  favorablePercentage: number;
}>();
</script>

<template>
  <div class="grid grid-cols-1 gap-2 md:grid-cols-10">
    <div class="col-span-1 md:col-span-3 lg:col-span-2">
      <div class="flex flex-col">
        <div class="font-bold">{{ category }}</div>
        <ScoreLabel :score="score" :scoreTrend="scoreTrend" />
        <TrendLabels
          :unfavorableTrend="unfavorableTrend"
          :neutralTrend="neutralTrend"
          :favorableTrend="favorableTrend"
        />
      </div>
    </div>
    <div class="col-span-1 md:col-span-7 lg:col-span-8">
      <div class="flex h-full items-center justify-center">
        <div class="flex w-full">
          <ResultsBar
            :unfavorablePercentage="unfavorablePercentage"
            :neutralPercentage="neutralPercentage"
            :favorablePercentage="favorablePercentage"
          />
        </div>
      </div>
    </div>
  </div>
</template>
