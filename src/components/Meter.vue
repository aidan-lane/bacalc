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
    marginSize: 6.3,
  }),

  computed: {
    // Scale the BAC value to a percentage
    getTickLocation() {
      let bacRange = 0.25 - 0;
      let scaledRange = 89 - this.marginSize;
      let newVal = (this.bac * scaledRange) / bacRange + this.marginSize;
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