import MainPage from '@/pages/MainPage.vue';
import SecondPage from '@/pages/SecondPage.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/second',
        component: SecondPage
    }
];

const router = createRouter({
    routes,
    history: createWebHistory()
});

export default router;