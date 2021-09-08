import Vue from "vue";
import VueRouter from "vue-router";
import { Store } from "vuex";
import App from "./App.vue";
import { createRouter } from "./router";
import { createStore } from "./store";
export const createApp = (): {
  app: Vue;
  router: VueRouter;
  store: Store<any>;
} => {
  Vue.config.productionTip = false;
  const router = createRouter();
  const store = createStore();
  const app = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
  return {
    app,
    router,
    store,
  };
};
