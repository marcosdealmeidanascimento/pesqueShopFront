import { createRouter, createWebHistory } from "vue-router";
import BaseLayout from "@/layout/BaseLayout.vue";
import HomeView from "@/views/HomeView.vue";
import ClientForm from "@/views/clients/ClientForm.vue";
import ClientIndex from "@/views/clients/ClientIndex.vue";
import ClientView from "@/views/clients/ClientView.vue";
import ClientAddressForm from "@/views/clients/ClientAddressForm.vue";
import ClientCreditCardForm from "@/views/clients/ClientCreditCardForm.vue";

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
          path: "/client/",
          name: "client",
          component: ClientForm,
        },
        {
          path: "/client/:id",
          name: "client-view",
          component: ClientView,
        },
        {
          path: "/client/address/:id",
          name: "client-address",
          component: ClientAddressForm,
        },
        {
          path: "/client/credit-card/:id",
          name: "client-credit-card",
          component: ClientCreditCardForm,
        }
      ],
    },
  ],
});

export default router;
