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
    }
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
