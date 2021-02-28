<template>
  <v-container class="text-center">
    <v-card class="settings-card">
      <v-col cols="12">
        <h1 style="color: white; margin-bottom: 10%">Your Settings</h1>
        <v-row class="sex-row" justify="space-around">
          <v-col cols="8">
            <v-text-field
              label="Weight"
              solo
              :rules="[rules.required, rules.number]"
            >
            </v-text-field>
          </v-col>
          <v-col cols="4">
            <v-select v-model="cWeight" :items="weightLabels"></v-select>
          </v-col>
        </v-row>
        <v-row class="weight-row" justify="space-around">
          <v-col cols="8">
            <v-select label="Sex" v-model="cSex" :items="sexes"></v-select>
          </v-col>
        </v-row>
      </v-col>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Settings",

  data: () => ({
    cWeight: "Lb",
    weightLabels: ["Lb", "Kg"],
    cSex: "",
    sexes: ["Male", "Female"],
    rules: {
      required: (value) => !!value || "Required!",
      number: (value) => !isNaN(parseFloat(value)) || "Must be a valid weight!",
    },
  }),
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
  background: linear-gradient(0deg, #ec6f66 0%, #f3a183 100%);
}

.sex-row {
  margin-bottom: -2.5em;
}

.weight-row {
}
</style>
