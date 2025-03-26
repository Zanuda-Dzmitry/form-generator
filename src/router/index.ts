import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomePages from "../pages/HomePages.vue";
import FeedbackPages from "../pages/FeedbackPages.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: HomePages,
  },
  {
    path: "/feedback",
    name: "Feedback",
    component: FeedbackPages,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
