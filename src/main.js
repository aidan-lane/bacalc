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
import db from "../api"

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
    // This is the main algorithm for calculating the user's
    // current BAC.
    async calculateBAC(timeNow, sex, weight, weightLabel) {
      // sex ratio
      const r = sex === "Male" ? 0.55 : 0.68;

      // Calculate weight in grams based on kg or lbs
      let weightInGrams = this.getWeightInGrams(weight, weightLabel);

      // Get drinks from the past 12 hours and sum alcohol content
      let bacTotal = 0;
      const pastDrinks = await db.getDrinksPastNHours(12);

      for (var i = 0; i < pastDrinks.length; i++) {
        let drink = pastDrinks[i];
        // calculate time between current drink and first drink in the past 24 hours
        const elapsed = (timeNow - new Date().getTime()) / (60 * 60 * 1000);
        // prevent negative bac values
        bacTotal += Math.max(
          (this.alcInGrams(drink.oz, drink.pct) / (weightInGrams * r)) * 100.0 -
          elapsed * 0.015,
          0
        );
      }

      return bacTotal;
    },
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
