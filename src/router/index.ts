import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "resume",
      component: () => import("../views/ResumeView.vue"),
    },
    {
      path: "/edit",
      name: "editor",
      component: () => import("../views/EditorView.vue"),
    },
  ],
});

export default router;
