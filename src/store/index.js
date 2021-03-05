import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    settings: {
      sex: localStorage.sex || "",
      weight: localStorage.weight || "",
      weightLabel: localStorage.weightLabel || "Lb",
    },
    pastBACs: [],
    pastBACLabels: [],
    totalBAC: 0.0,
  },
  mutations: {
    SET_SEX(state, val) {
      state.settings.sex = val;
      localStorage.sex = val;
    },
    SET_WEIGHT(state, val) {
      state.settings.weight = val;
      localStorage.weight = val;
    },
    SET_WEIGHT_LABEL(state, val) {
      state.settings.weightLabel = val;
      localStorage.weightLabel = val;
    },
    ADD_BAC(state, data) {
      if (state.pastBACs.length >= 6) {
        state.pastBACs.shift();
        state.pastBACLabels.shift();
      }
      state.pastBACs.push(data.bac);
      state.pastBACLabels.push(data.time);

      // also add to total
      state.totalBAC += data.bac;
    }
  },
  actions: {
  },
  modules: {
  }
})
