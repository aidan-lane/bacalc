<template>
  <v-container>
    <v-card class="panel-card" elevation="5">
      <v-col cols="12">
        <v-row justify="space-around">
          <v-col cols="12">
            <v-btn block rounded color="button_color" @click="addDrink">
              <div class="alc-btn-text">+1</div>
              <i class="fas fa-beer fa-2x btn-text alc-icon"></i>
              <i class="fas fa-wine-glass-alt fa-2x alc-icon"></i>
              <i class="fas fa-glass-whiskey fa-2x alc-icon"></i>
            </v-btn>
          </v-col>
        </v-row>

        <v-row class="custom-input">
          <v-col cols="6">
            <v-text-field
              rounded
              solo
              suffix="oz"
              background-color="primary"
              v-model="oz"
            />
          </v-col>

          <v-col cols="6">
            <v-text-field
              rounded
              solo
              suffix="%"
              background-color="primary"
              v-model="pct"
            />
          </v-col>
        </v-row>

        <div class="text-xs-center" style="margin-top: -1.5em">
          <v-btn block rounded color="button_color" @click="addDrink">
            <div style="font-weight: bold; font-size: 1.5em">+1</div>
          </v-btn>
        </div>
      </v-col>
    </v-card>
  </v-container>
</template>

<script>
import db from "../../api";

export default {
  name: "ButtonPanel",

  data: () => ({
    oz: "",
    pct: "",
  }),

  methods: {
    getWeightInGrams(weight, weightLabel) {
      return weightLabel === "Lb" ? weight * 453.29 : weight * 1000.0;
    },
    alcInGrams(oz, pct) {
      return oz && pct ? oz * 28.35 * (pct / 100.0) : 14.0;
    },
    async addDrink() {
      const sex = this.$store.state.settings.sex;
      const weight = this.$store.state.settings.weight;
      const weightLabel = this.$store.state.settings.weightLabel;

      const r = sex === "Male" ? 0.55 : 0.68;

      const now = new Date();

      if (!sex || !weight) {
        console.log("WIP!");
        return;
      }

      // First, calculate the current BAC based on past drinks in the last 12 hours.
      // Then indepdently calculate the new BAC, and then add together.
      const currentBAC = await this.calculateBAC(now, sex, weight, weightLabel);
      const newBAC =
        (this.alcInGrams(this.oz, this.pct) /
          (this.getWeightInGrams(weight, weightLabel) * r)) *
        100.0;
      const totalBAC = currentBAC + newBAC;

      // Add the total BAC so we can handle it in other components
      this.$store.commit("ADD_BAC", { bac: totalBAC, time: now });
      // Store only the newly added bac in the db
      await db.addDrink(now, newBAC, this.oz, this.pct);
    },
  },
};
</script>

<style>
.panel-card {
  padding: 5% 3% 3% 3%;
  margin-top: 53vh;
  margin-left: 0.4em;
  margin-right: 0.4em;
  height: 34vh;
  border-radius: 26px !important;
}

.alc-icon {
  margin-left: 0.3em;
  margin-right: 0.3em;
  font-size: 1.5em;
  font-weight: bold;
}

.alc-btn-text {
  padding-right: 0.2em;
  font-size: 1.5em;
  font-weight: bold;
}
</style>