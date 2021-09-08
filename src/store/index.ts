import Vue from "vue";
import Vuex, { Store } from "vuex";

export const createStore = (): Store<any> => {
  Vue.use(Vuex);
  const store = new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {},
  });
  return store;
};
