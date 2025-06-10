import { createRouter, createWebHistory } from 'vue-router';
import { PollView } from '../views/poll-view';
import SeriesView from '../views/series-view/SeriesView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/poll/:id',
      name: 'poll',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: PollView,
    },
    {
      path: '/series/:id',
      name: 'series',
      component: SeriesView,
    },
  ],
});

export default router;
