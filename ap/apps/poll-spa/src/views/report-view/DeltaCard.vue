<script setup lang="ts">
import Card from '../../shared/Card.vue';
import CardHeader from '../../shared/CardHeader.vue';
import CardTitle from '../../shared/CardTitle.vue';
import CardDescription from '../../shared/CardDescription.vue';
import CardContent from '../../shared/CardContent.vue';
import DeltaRow from './DeltaRow.vue';
import Separator from '../../shared/Separator.vue';
import { DeltaResult } from '@ap/shared-types';

const props = defineProps<{
  results: DeltaResult[];
}>();
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
        <div
          v-for="result in results"
          :key="result.category"
          class="flex flex-col gap-2"
        >
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
