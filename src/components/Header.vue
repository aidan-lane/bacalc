<template>
  <v-app-bar app class="title-bar" color="secondary">
    <v-toolbar-title class="flex text-center">
      {{ title }}
    </v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",

  data: () => ({
    title: "BACalc",
  }),
};
</script>

<style scoped>
.title-bar {
  color: #d9d8e2 !important;
  font-weight: bold;
}
</style>