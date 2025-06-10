<script setup lang="ts">
import Card from '../../shared/Card.vue';
import CardHeader from '../../shared/CardHeader.vue';
import CardTitle from '../../shared/CardTitle.vue';
import CardDescription from '../../shared/CardDescription.vue';
import CardContent from '../../shared/CardContent.vue';
import PollQuestion from './PollQuestion.vue';
import PollQuestionsHeader from './PollQuestionsHeader.vue';
import Separator from '../../shared/Separator.vue';
import Button from '../../shared/Button.vue';
import CardFooter from '../../shared/CardFooter.vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import axios from 'axios';
import * as z from 'zod';
import { useRoute } from 'vue-router';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../shared/form';

defineProps<{
  title: string;
  description: string;
}>();

const route = useRoute();
const formSchema = toTypedSchema(
  z.object({
    clarity: z.coerce.number().min(1).max(10).nullable(),
    energy: z.coerce.number().min(1).max(10).nullable(),
    psychologicalSafety: z.coerce.number().min(1).max(10).nullable(),
    workLifeBalance: z.coerce.number().min(1).max(10).nullable(),
    confidence: z.coerce.number().min(1).max(10).nullable(),
    efficiency: z.coerce.number().min(1).max(10).nullable(),
  }),
);

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    clarity: null,
    energy: null,
    psychologicalSafety: null,
    workLifeBalance: null,
    confidence: null,
    efficiency: null,
  },
});

const onSubmit = form.handleSubmit(async (values) => {
  try {

  const submitObject = {
    submissionId :"firstSubmissionId-1234",
    pollId : route.params.id,
    ...values
  }
  const response = await axios.post(`/api/submitForm`, submitObject);
  console.log("Submit form posted", response)
  } catch(error) {
    console.log("Error occcured while submitting the form",error);
  }

});
</script>

<template>
  <form @submit="onSubmit">
    <Card>
      <CardHeader>
        <CardTitle>{{ title }}</CardTitle>
        <CardDescription>{{ description }}</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-4 gap-2">
          <PollQuestionsHeader />
          <Separator class="col-span-4" />
          <PollQuestion
            title="Clarity"
            question="I clearly understand what is expected of me on this team"
            field-name="clarity"
          />
          <Separator class="col-span-4" />
          <PollQuestion
            title="Energy"
            question="I am energized by the work I do"
            field-name="energy"
          />
          <Separator class="col-span-4" />
          <PollQuestion
            title="Psychological Safety"
            question="I feel safe and do not fear making mistakes, raising issues, taking risks, or asking for help"
            field-name="psychologicalSafety"
          />
          <Separator class="col-span-4" />
          <PollQuestion
            title="Work-life Balance"
            question="My typical workload allows me to achieve an acceptable level of work-life balance"
            field-name="workLifeBalance"
          />
          <Separator class="col-span-4" />
          <PollQuestion
            title="Confidence"
            question="I'm confident our team will be successful"
            field-name="confidence"
          />
          <Separator class="col-span-4" />
          <PollQuestion
            title="Efficiency"
            question="Tools, resources, processes, procedures allow me to effectively meet my customers' needs"
            field-name="efficiency"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit">Submit</Button>
      </CardFooter>
    </Card>
  </form>
</template>
