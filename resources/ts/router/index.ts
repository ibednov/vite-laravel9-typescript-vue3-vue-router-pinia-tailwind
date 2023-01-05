import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/components/front/index.vue'),
        },
        {
            path: '/admin/',
            name: 'admin',
            component: () => import('@/components/admin/index.vue'),
        },
    ],
});

export default router;
