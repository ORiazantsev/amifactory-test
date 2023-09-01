import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/404",
    name: "NotFoundView",
    component: () => import("../views/NotFoundView.vue"),
  },
  {
    path: "/",
    name: "MoviesView",
    component: () => import("../views/movies/MoviesView.vue"),
  },
  {
    path: "/movies/:slug",
    name: "MovieView",
    component: () => import("../views/movies/MovieView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
