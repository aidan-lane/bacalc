<template>
  <v-container class="text-center">
    <v-card class="s-card">
      <v-col cols="12">
        <h1>Your Settings</h1>
        <v-row class="sex-row" justify="space-around">
          <v-col cols="6">
            <v-text-field rounded solo> </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-select outlined></v-select>
          </v-col>
        </v-row>
        <v-row class="weight-row" justify="space-around">
          <v-col cols="6">
            <v-text-field rounded solo> </v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-card>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
.s-card {
  padding: 5% 5% 5% 5%;
}

.sex-row {
  margin-bottom: -2.5em;
}

.weight-row {
}
</style>
