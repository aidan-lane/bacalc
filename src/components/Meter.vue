<template>
  <div c>
    <div class="tick" :style="getTickLocation">⏷</div>
    <v-sheet class="bar"> </v-sheet>
    <div class="container">
      <div>🙂</div>
      <img src="@/assets/x.png" class="x" />
      <div>🤪</div>
      <div>🤢</div>
      <div>☠️</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Meter",

  props: {
    bac: {
      type: Number,
      default: 0.0,
    },
  },

  data: () => ({
    marginMin: 6.3,
    marginMax: 89.0,
  }),

  computed: {
    // Scale the BAC value to a percentage
    getTickLocation() {
      let bacRange = 0.35 - 0;
      let scaledRange = this.marginMax - this.marginMin;
      // prevent tick from going off the bar
      let newVal = Math.min(
        (this.bac * scaledRange) / bacRange + this.marginMin,
        this.marginMax
      );

      return "margin-left: " + newVal + "%";
    },
  },
};
</script>

<style scoped>
.bar {
  width: 100%;
  height: 10px;
  border-radius: 6px;
  background: linear-gradient(90deg, green, yellow, red);
}

.container {
  font-size: 1.3em;
  margin-top: -0.5em;
  display: flex;
  justify-content: space-between;
}

.tick {
  color: white;
}

.x {
  margin-top: 4px;
  width: 25px;
  height: 25px;
}
</style>