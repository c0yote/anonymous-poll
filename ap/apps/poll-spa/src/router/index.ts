import { createRouter, createWebHistory } from 'vue-router';
import { PollView } from '../views/poll-view';
import { SeriesView } from '../views/series-view';
import { ReportView } from '../views/report-view';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/poll/:id',
      name: 'poll',
      component: PollView,
    },
    {
      path: '/report/:id',
      name: 'report',
      component: ReportView,
    },
    {
      path: '/series/:id',
      name: 'series',
      component: SeriesView,
    },
  ],
});

export default router;
