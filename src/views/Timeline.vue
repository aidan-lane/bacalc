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

export default {
  data: () => ({
    width: 6,
    radius: 3,
    padding: 16,
    lineCap: "round",
    gradient: gradients[0],
    values: [0.0, 0.02, 0.08, 0.8],
    labels: ["12pm", "1pm", "2pm", "3pm", "4pm"],
    gradientDirection: "top",
    gradients,
    fill: false,
    type: "trend",
    autoLineWidth: false,
  }),
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