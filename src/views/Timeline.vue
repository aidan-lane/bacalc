<template>
  <v-container class="text-center">
    <v-card class="time-card" elevation="5">
      <h1 style="color: #dbdbdb; padding-top: 10%">Your Timeline</h1>
      <v-sparkline
        class="graph"
        :value="values"
        :labels="labels"
        :gradient="gradient"
        :smooth="radius || false"
        :padding="padding"
        :line-width="width"
        :stroke-linecap="lineCap"
        :gradient-direction="gradientDirection"
        :fill="fill"
        :type="type"
        :auto-line-width="autoLineWidth"
        auto-draw
      >
      </v-sparkline>
    </v-card>
  </v-container>
</template>

<script>
const gradients = [["#f72047", "#ffd200", "#1feaea"]];
import db from "../../api";

export default {
  data: () => ({
    width: 6,
    radius: 3,
    padding: 16,
    lineCap: "round",
    gradient: gradients[0],
    values: [],
    labels: [],
    gradientDirection: "top",
    gradients,
    fill: false,
    type: "trend",
    autoLineWidth: false,
    lookBack: 6,
  }),

  methods: {
    // converts a date string to a rounded, abbreviated hour.
    // i.e. 2021-03-13 12:30 => 12pm
    timeToString(time) {
      const hour = time.getHours();
      const conv = (hour + 24) % 12 || 12;
      return hour >= 12 ? conv + "pm" : conv + "am";
    },
  },

  mounted() {
    // first get all of the bac calculations from the past,
    // defined, lookback window.
    db.getDrinksPastNHours(this.lookBack).then((bacList) => {
      console.log(bacList);
      let hours = new Map();
      let currentTime = new Date();

      // We initialize the map to have values of lists which will hold
      // bac calculations in added order.
      for (let i = 0; i < this.lookBack; i++) {
        hours.set(this.timeToString(currentTime), []);
        // Go back in time one hour
        currentTime.setHours(currentTime.getHours() - 1);
      }

      // Iterate through each bac and add to it's respective hour.
      for (let i = 0; i < bacList.length; i++) {
        const key = this.timeToString(new Date(bacList[i].date));
        hours.get(key).push(bacList[i].bac);
      }

      // Go through the first entry in each bucket to get
      // the the bac value for that hour.
      hours.forEach((val, key) => {
        this.labels.unshift(key);
        this.values.unshift(val[val.length - 1] || 0);
      });
    });
  },

  computed: {
    bacs() {
      return this.$store.state.pastBACs;
    },
  },

  watch: {
    bacs: function () {
      console.log("test");
    },
  },
};
</script>

<style>
text {
  font-size: 2em;
}

.time-card {
  margin-top: 0.4em;
  margin-left: 0.4em;
  margin-right: 0.4em;
  height: 50vh;
  border-radius: 26px !important;
  background: linear-gradient(0deg, #c33764 0%, #1d2671 100%);
}

.graph {
  padding-top: 20%;
  padding-bottom: 2em;
  margin-left: 1em;
  margin-right: 1em;
}
</style>