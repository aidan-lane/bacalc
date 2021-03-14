<template>
  <v-container class="text-center">
    <v-dialog v-model="resetConfirm" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2"> Reset </v-card-title>

        <v-card-text style="margin-top: 1em; font-size: 1.3em">
          Are you sure you want to reset your BAC?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="reset" x-large rounded>
            Reset!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card class="settings-card" elevation="0" color="transparent">
      <v-col cols="12">
        <h1 style="color: #dbdbdb; margin-bottom: 15%">Your Settings</h1>
        <v-row class="sex-row">
          <v-col cols="8">
            <v-text-field
              v-model="weight"
              label="Weight"
              solo
              rounded
              :rules="[rules.required, rules.number]"
            >
            </v-text-field>
          </v-col>
          <v-col cols="4">
            <v-select v-model="weightLabel" :items="weightLabels"></v-select>
          </v-col>
        </v-row>
        <v-row justify="space-around">
          <v-col cols="6">
            <v-select label="Sex" v-model="sex" :items="sexes"></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-center">
            <v-btn
              icon
              color="red"
              class="text-center"
              style="margin-top: -10%; padding-bottom: -5em"
              @click="resetConfirm = true"
            >
              <v-icon x-small>fas fa-minus-circle fa-xs</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-card>
  </v-container>
</template>

<script>
import db from "../../api";

export default {
  name: "Settings",

  data: () => ({
    weight: "",
    weightLabel: "Lb",
    weightLabels: ["Lb", "Kg"],
    sex: "",
    sexes: ["Male", "Female"],
    rules: {
      required: (value) => !!value || "Required!",
      number: (value) => /^\d+$/.test(value) || "Must be a valid weight!",
    },
    resetConfirm: false,
  }),

  mounted() {
    this.sex = this.$store.state.settings.sex;
    this.weight = this.$store.state.settings.weight;
    this.weightLabel = this.$store.state.settings.weightLabel;
  },

  methods: {
    reset() {
      db.removeAllBAC();
      this.resetConfirm = false;
    },
  },

  watch: {
    sex(newSex) {
      this.$store.commit("SET_SEX", newSex);
    },
    weight(newWeight) {
      this.$store.commit("SET_WEIGHT", newWeight);
    },
    weightLabel(newWeightLabel) {
      this.$store.commit("SET_WEIGHT_LABEL", newWeightLabel);
    },
  },
};
</script>

<style scoped>
.settings-card {
  padding: 5% 5% 5% 5%;
  margin-top: 0.4em;
  margin-left: 0.4em;
  margin-right: 0.4em;
  height: 50vh;
  border-radius: 26px !important;
}

.sex-row {
  margin-bottom: -2.5em;
}
</style>
