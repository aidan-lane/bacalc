<template>
  <v-container>
    <h2 class="bac" style="color: white">
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
  },
};
</script>

<style scoped>
.bac {
  font-size: 7em;
  text-shadow: 2px 2px #00000013;
}
</style>