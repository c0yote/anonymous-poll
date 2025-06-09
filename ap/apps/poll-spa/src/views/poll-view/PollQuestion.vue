<script setup lang="ts">
import RadioGroup from '../../shared/RadioGroup.vue';
import RadioGroupItem from '../../shared/RadioGroupItem.vue';
import PollLegend from './PollLegend.vue';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../../shared/form';

defineProps<{
  title: string;
  question: string;
  fieldName: string;
}>();
</script>

<template>
  <div class="col-span-4 md:col-span-2">
    <p class="text-sm font-bold">{{ title }}</p>
    <p class="text-sm text-muted-foreground">{{ question }}</p>
  </div>
  <div class="col-span-4 md:col-span-2 pb-6 md:pb-0">
    <FormField v-slot="{ componentField }" :name="fieldName">
      <FormItem class="h-full">
        <FormControl>
          <RadioGroup
            v-bind="componentField"
            class="grid grid-cols-10 gap-2 h-full"
          >
            <PollLegend class="block md:hidden" />
            <div class="flex flex-col items-center justify-center h-full">
              <RadioGroupItem id="r1" value="1" />
            </div>
            <div class="flex flex-col items-center justify-center h-full">
              <RadioGroupItem id="r2" value="2" />
            </div>
            <div class="flex flex-col items-center justify-center h-full">
              <RadioGroupItem id="r3" value="3" />
            </div>
            <div class="flex flex-col items-center justify-center h-full">
              <RadioGroupItem id="r4" value="4" />
            </div>
            <div class="flex flex-col items-center justify-center h-full">
              <RadioGroupItem id="r5" value="5" />
            </div>
            <div class="flex flex-col items-center justify-center h-full">
              <RadioGroupItem id="r6" value="6" />
            </div>
            <div class="flex flex-col items-center justify-center h-full">
              <RadioGroupItem id="r7" value="7" />
            </div>
            <div class="flex flex-col items-center justify-center h-full">
              <RadioGroupItem id="r8" value="8" />
            </div>
            <div class="flex flex-col items-center justify-center h-full">
              <RadioGroupItem id="r9" value="9" />
            </div>
            <div class="flex flex-col items-center justify-center h-full">
              <RadioGroupItem id="r10" value="10" />
            </div>
          </RadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
  </div>
</template>
