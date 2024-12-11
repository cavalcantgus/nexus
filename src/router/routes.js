import { createRouter, createWebHistory } from "vue-router";

const routes = [
    { path: '/login', name: 'Home', component: () => import("@/components/home/Home.vue")},
    { path: '/', redirect: '/home'},

]

const router = createRouter ({
    history: createWebHistory(),
    routes,
})

export default router