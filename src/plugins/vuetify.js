import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
//import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#13152B',
        secondary: '#ffffff',
        tertiary: '#d9d8e2',
        accent: '#8c9eff',
        error: '#b71c1c',
      },
    },
  },
});
