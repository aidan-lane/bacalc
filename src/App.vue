<template>
  <v-app>
    <v-main class="background">
      <v-app-bar
        dense
        class="title-bar"
        color="secondary"
      >
        <v-toolbar-title class="flex text-center"
          color="textprimary"
        >
          {{ title }}
        </v-toolbar-title>
      </v-app-bar>

      <Home/>
    </v-main>
    <v-footer>
      <v-col class="d-flex justify-center">
        <v-col
          sm="4"
        >
          <i class="fas fa-glass-whiskey fa-2x"></i>
        </v-col>

        <v-col
          sm="4"
        >
          <i class="fas fa-glass-whiskey fa-2x"></i>
        </v-col>

        <v-col
          sm="4"
        >
          <i class="fas fa-glass-whiskey fa-2x"></i>
        </v-col>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import Home from './views/Home';

export default {
  name: 'BACalc',

  components: {
    Home,
  },

  data: () => ({
    title: "BACalc",
  }),
};
</script>

<style>
  .background {
    /* background: -webkit-linear-gradient(360deg, #d64759 10%, #da7352 360%); */
    background-color: white;
  } 

  .title-bar {
    color: #d9d8e2 !important;
    font-weight: bold;
  }
</style>