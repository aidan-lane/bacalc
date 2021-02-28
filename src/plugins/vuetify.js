import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
//import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    options: { customProperties: true },
    themes: {
      light: {
        primary: '#ffffff',
        secondary: '#ffffff',
        bac_color_below: '#27E8A7',
        bac_color_above: '#ffffff',
        accent: '#8c9eff',
        error: '#b71c1c',
        button_color: '#e6e6e6'
      },
      dark: {
        primary: '#232937',
        secondary: '#0d0d0d',
        bac_color: '#27E8A7',
        accent: '#ff0000',
        error: '#b71c1c',
      }
    },
  },
});
