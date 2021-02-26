<template>
  <v-footer absolute padless class="justify-center">
    <v-btn-toggle
      class="button-panel"
      v-model="toggle_exclusive"
      rounded
      mandatory
    >
      <v-btn @click="setRoute('/')">
        <i class="fas fa-chart-bar fa-2x"></i>
      </v-btn>
      <v-btn @click="setRoute('/')">
        <i class="fas fa-home fa-2x"></i>
      </v-btn>
      <v-btn @click="setRoute('/about')">
        <i class="fas fa-cog fa-2x"></i>
      </v-btn>
    </v-btn-toggle>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",

  data: () => ({
    toggle_exclusive: 1, // default-selected nav button
  }),
};
</script>

<style scoped>
.button-panel {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>