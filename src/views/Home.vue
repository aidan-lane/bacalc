<template>
  <v-container>
    <v-card raised class="main-card" elevation="0" color="transparent">
      <h3
        class="font-weight-bold text-center"
        style="padding-top: 15%; color: #dbdbdb; text-shadow: 2px 2px #00000008"
      >
        Your BAC
      </h3>

      <Counter
        :bac.sync="getBAC"
        style="margin-top: -1.7em"
        class="text-center"
      >
      </Counter>

      <Meter
        style="margin-left: 6%; margin-right: 6%"
        :bac.sync="getBAC"
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

  data: () => ({}),

  mounted() {
    // whenever this component is mounted (i.e. on load), we want
    // to update the user's current BAC.
    const bac = this.$store.state.currentBAC;
    const now = new Date();

    const newBAC = Math.max(0, bac - this.getMetabolized(now));
    this.$store.commit("SET_BAC", { bac: newBAC, date: now, isDrink: false });
  },

  computed: {
    // Gets your total BAC
    getBAC() {
      return this.$store.state.currentBAC;
    },
  },
};
</script>

<style>
.main-card {
  margin-top: 0.4em;
  margin-left: 0.4em;
  margin-right: 0.4em;
  height: 50vh;
  border-radius: 26px !important;
}
</style>