<template>
  <v-bottom-navigation
    app
    fixed
    grow
    v-model="pages[currentPage]"
    color="#1A5F9D"
  >
    <v-btn value="timeline" @click="setRoute('/timeline')">
      <span>Timeline</span>
      <i class="fas fa-chart-bar fa-2x"></i>
    </v-btn>

    <v-btn value="home" @click="setRoute('/')">
      <span>Home</span>
      <i class="fas fa-home fa-2x"></i>
    </v-btn>

    <v-btn value="settings" @click="setRoute('/settings')">
      <span>Settings</span>
      <i class="fas fa-cog fa-2x"></i>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
const pages = ["timeline", "home", "settings"];

export default {
  name: "Footer",

  props: {
    currentPage: {
      type: Number,
      default: pages[1],
    },
  },

  data: () => ({
    pages,
  }),
};
</script>

<style scoped>
</style>