<template>
  <v-bottom-navigation
    app
    fixed
    grow
    v-model="getPage"
    color="#ffffff"
    class="bar"
    dark
  >
    <v-btn value="timeline" @click="setRoute('/timeline')" ref="timeline">
      <span>Timeline</span>
      <i class="fas fa-chart-bar fa-2x"></i>
    </v-btn>

    <v-btn value="home" @click="setRoute('/')" ref="home">
      <span>Home</span>
      <i class="fas fa-home fa-2x"></i>
    </v-btn>

    <v-btn value="settings" @click="setRoute('/settings')" ref="settings">
      <span>Settings</span>
      <i class="fas fa-cog fa-2x"></i>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: "Footer",

  data: () => ({
    page: 1,
    pages: ["timeline", "home", "settings"],
  }),

  computed: {
    getPage: {
      get() {
        return this.pages[this.$store.state.currentPage];
      },
      set(name) {
        this.$store.commit(
          "SET_PAGE",
          this.pages.findIndex((e) => e === name)
        );
      },
    },
  },
};
</script>

<style scoped>
.bar {
  background: transparent !important;
}

.theme--dark.v-btn--active:hover::before,
.theme--dark.v-btn--active::before {
  opacity: 0 !important;
}

.theme--dark.v-btn--active:hover::after,
.theme--dark.v-btn--active::after {
  opacity: 0 !important;
}
</style>