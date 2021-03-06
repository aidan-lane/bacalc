import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBeer, faWineGlassAlt, faGlassWhiskey, faHome, faChartBar, faCog } from '@fortawesome/free-solid-svg-icons'
import { dom } from '@fortawesome/fontawesome-svg-core'
import "./registerServiceWorker"

Vue.config.productionTip = false

// Font-Awesome icons
library.add(faBeer, faWineGlassAlt, faGlassWhiskey, faHome, faChartBar, faCog)
dom.watch()

// Mixins
Vue.mixin({
  methods: {
    setRoute: function (route) {
      if (this.$route.path === route)
        return
      this.$router.push({ path: route });
    },
    getMetabolized(time) {
      const lastUpdate = this.$store.state.lastUpdate;
      const diff = time - new Date(lastUpdate);

      return (diff / (24 * 60 * 60 * 1000)) * 0.015;
    },
    // This is the main algorithm for calculating the user's
    // current BAC.
    calculateBAC(now, oz, pct) {
      // load settings
      const sex = this.$store.state.settings.sex;
      const weight = this.$store.state.settings.weight;
      const weightLabel = this.$store.state.settings.weightLabel;
      const oldBAC = this.$store.state.currentBAC;

      if (!sex || !weight) {
        console.log("WIP!");
        return;
      }

      // sex ratio
      const r = sex === "Male" ? 0.55 : 0.68;

      const weightInGrams = weightLabel === "Lb" ? weight * 453.29 : weight * 1000.0;
      const alcInGrams = oz && pct ? oz * 28.35 * (pct / 100.0) : 14.0;
      let newBAC = oldBAC + (alcInGrams / (weightInGrams * r)) * 100.0;

      // Update based on time passed since last update
      newBAC = Math.max(0, newBAC - this.getMetabolized(now));

      return newBAC;
    },
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
