<template>
  <v-container>
    <h2 class="bac" :style="getColor">
      {{ getBAC }}
    </h2>
  </v-container>
</template>

<script>
export default {
  name: "Counter",

  props: {
    bac: Number,
  },

  computed: {
    getBAC() {
      return (this.bac.toFixed(2) + "%").substring(1);
    },
    // Change display color to red when over legal limit
    getColor() {
      var color = "var(--v-bac_color_below-base)";
      if (this.bac >= 0.08) {
        color = "var(--v-bac_color_above-base);";
      }
      return "color: " + color;
    },
  },
};
</script>

<style scoped>
.bac {
  font-size: 7em;
}
</style>