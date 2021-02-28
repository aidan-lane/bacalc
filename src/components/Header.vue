<template>
  <div>
    <v-app-bar app fixed color="primary">
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>
  </div>
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