import Vue from 'vue'
import Vuex from 'vuex'
import db from '../../api'

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

    currentBAC: Number(localStorage.getItem("currentBAC")) || 0.0,
    lastUpdate: localStorage.getItem("lastUpdate") || new Date(),

    readTOS: localStorage.getItem("tos") || false,
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
    SET_BAC(state, data) {
      state.currentBAC = data.bac;
      // save so we can access after a user leaves this session
      localStorage.setItem("currentBAC", data.bac);
      localStorage.setItem("lastUpdate", new Date(data.date));

      // also add this calculation to the db
      db.addBAC(data.date, data.bac, data.isDrink);
    },
    SET_TOS(state, val) {
      state.readTOS = val;
    },
  },
  actions: {
  },
  modules: {
  }
})
