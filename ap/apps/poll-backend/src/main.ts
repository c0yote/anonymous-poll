import express from 'express';
import { setupDatabase } from './database.js';
import { getPollByIdEndpoint } from './endpoints/get-poll-by-id.endpoint.js';
import { submitPollResponseEndpoint } from './endpoints/post-submit-poll-response.endpoint.js';
import { PollService } from './services/poll.service.js';
import { SeriesService } from './services/series.service.js';
import { getSeriesByIdEndpoint } from './endpoints/get-series-by-id.endpoint.js';
import { SubmissionService } from './services/submission.services.js';

const host = process.env.HOST ?? '0.0.0.0';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const start = async () => {
  const app = express();

  const db = await setupDatabase();

  const submissionService = new SubmissionService(db);
  const pollService = new PollService(db, submissionService);
  const seriesService = new SeriesService(db, pollService);

  app.get('/api/poll/:id', await getPollByIdEndpoint(pollService));
  app.get('/api/series/:id', await getSeriesByIdEndpoint(seriesService));
  app.post(
    '/api/poll/:id/response',
    await submitPollResponseEndpoint(submissionService)
  );

  app.listen(port, host, () => {
    console.log(`[ ready ] 🚀 http://${host}:${port}`);
  });
};

const main = () => {
  start().catch((error) => {
    console.error(error);
    process.exit(1);
  });
};

main();
