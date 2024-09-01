import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ClientForm from "@/views/clients/ClientForm.vue";
import BaseLayout from "@/layout/BaseLayout.vue";
import ClientIndex from "@/views/clients/ClientIndex.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "base",
      component: BaseLayout,
      children: [
        {
          path: "/",
          name: "home",
          component: HomeView,
        },
        {
          path: "/clients/",
          name: "clients",
          component: ClientIndex
        },
        {
          path: "/client/:id?",
          name: "client",
          component: ClientForm,
        },
      ],
    },
  ],
});

export default router;
