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
    alcInGrams(oz, pct) {
      return oz && pct ? oz * 28.35 * (pct / 100.0) : 14.0;
    },
    // This is the main algorithm for calculating the user's
    // current BAC.
    async calculateBAC(timeNow, sex, weight, weightLabel) {
      // sex ratio
      const r = sex === "Male" ? 0.55 : 0.68;

      // Calculate weight in grams based on kg or lbs
      let weightInGrams = weight;
      weightInGrams =
        weightLabel === "Lb" ? weightInGrams * 453.29 : weightInGrams * 1000.0;

      // Get drinks from the past 12 hours and sum alcohol content
      let bacTotal =
        (this.alcInGrams(this.oz, this.pct) / (weightInGrams * r)) * 100.0;
      const pastDrinks = await db.getDrinksPastNHours(12);

      for (var i = 0; i < pastDrinks.length; i++) {
        let drink = pastDrinks[i];
        // calculate time between current drink and first drink in the past 24 hours
        const elapsed = (timeNow - new Date().getTime()) / (60 * 60 * 1000);
        // prevent negative bac values
        bacTotal += Math.max(
          (this.alcInGrams(drink.oz, drink.pct) / (weightInGrams * r)) * 100.0 -
            elapsed * 0.015,
          0
        );
      }

      return bacTotal;
    },
    async addDrink() {
      const sex = this.$store.state.settings.sex;
      const weight = this.$store.state.settings.weight;
      const weightLabel = this.$store.state.settings.weightLabel;

      const now = new Date();

      if (!sex || !weight) {
        console.log("WIP!");
        return;
      }

      const bac = await this.calculateBAC(now, sex, weight, weightLabel);
      this.$store.commit("ADD_BAC", { bac: bac, time: now });
      await db.addDrink(now, bac, this.oz, this.pct);
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