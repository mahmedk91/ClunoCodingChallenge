import Vue from "vue";
import VueRouter from "vue-router";
import OffersList from "./components/OffersList";
import OfferDetails from "./components/OfferDetails";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: OffersList
  },
  {
    path: "/offer/:id",
    component: OfferDetails
  }
];
const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
