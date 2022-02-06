import { createWebHistory, createRouter } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./pages/Home/index.vue'), // 동적 import
  },
  {
    path: '/new-event',
    name: 'NewEvent',
    component: () => import('./pages/NewEvent/index.vue')
  }
];

// export default router;

export const router = createRouter({
  history: createWebHistory(),
  routes,
});