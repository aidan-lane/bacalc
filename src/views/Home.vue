<template>
  <v-container>
    <v-card raised class="main-card" elevation="3">
      <h3
        class="bac-title font-weight-bold text-center"
        style="padding-top: 15%; color: white"
      >
        Your BAC
      </h3>
      <Counter :bac="currentBAC" style="margin-top: -1.7em" class="text-center">
      </Counter>
      <Meter
        style="margin-left: 4%; margin-right: 4%"
        :bac.sync="currentBAC"
      ></Meter>
    </v-card>
  </v-container>
</template>

<script>
import Counter from "@/components/Counter";
import Meter from "@/components/Meter";

export default {
  name: "Home",

  components: {
    Counter,
    Meter,
  },

  data: () => ({
    currentBAC: 0.01,
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