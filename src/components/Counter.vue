<template>
  <v-container>
    <h2 class="bac">
      {{ getBAC }}
    </h2>
  </v-container>
</template>

<script>
export default {
  name: "Counter",

  props: {
    bac: Number
  },

  computed: {
    getBAC() {
      return (this.bac + "%").substring(1)
    }
  }
}
</script>

<style scoped>
   .bac {
      color: #13152B;
      font-size: 6em;
  }
</style>