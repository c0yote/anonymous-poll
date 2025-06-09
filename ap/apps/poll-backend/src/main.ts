import express from 'express';
import { setupDatabase } from './database';

const host = process.env.HOST ?? '0.0.0.0';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const start = async () => {
  const app = express();

  const db = await setupDatabase();

  app.get('/api/poll/:id', (req, res) => {
    const poll = db.data.polls.find((poll) => poll.id === req.params.id);

    console.log('poll', poll);

    res.send({
      title: 'Poll 13',
      description: 'This is a poll',
    });
  });

  app.listen(port, host, () => {
    console.log(`[ ready ] http://${host}:${port}`);
  });
};

const main = async () => {
  start().catch((error) => {
    console.error(error);
    process.exit(1);
  });
};

main();
console.log('Bye! 👋');
