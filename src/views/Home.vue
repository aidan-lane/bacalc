<template>
  <v-container class="text-center">
    <v-card raised class="main-card" elevation="3">
      <h3
        class="bac-title font-weight-bold"
        style="padding-top: 15%; color: white"
      >
        Your BAC
      </h3>
      <Counter :bac="0.08" style="margin-top: -1.7em"> </Counter>
    </v-card>
  </v-container>
</template>

<script>
import Counter from "@/components/Counter";

export default {
  name: "Home",

  components: {
    Counter,
  },

  data: () => ({
    currentBAC: 0.1,
  }),
};
</script>

<style>
.main-card {
  margin-top: 0.4em;
  margin-left: 0.4em;
  margin-right: 0.4em;
  height: 50vh;
  border-radius: 26px !important;
  background: linear-gradient(0deg, #185a9d 0%, #43cea2 100%);
}
</style>