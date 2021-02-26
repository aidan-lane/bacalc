<template>
  <v-container class="text-center">
    <v-col cols="12">
      <div style="margin-top: 5%" />
      <h3 class="bac-title font-weight-bold">Your BAC</h3>

      <Counter :bac="currentBAC" />
      <div style="margin-top: 5%" />

      <v-row justify="space-around">
        <v-col cols="4">
          <v-btn large block rounded color="button_color">
            <div class="alc-btn-text">+1</div>
            <i class="fas fa-beer fa-2x btn-text"></i>
          </v-btn>
        </v-col>

        <v-col cols="4">
          <v-btn large block rounded color="button_color">
            <div class="alc-btn-text">+1</div>
            <i class="fas fa-wine-glass-alt fa-2x btn-text"></i>
          </v-btn>
        </v-col>

        <v-col cols="4">
          <v-btn large block rounded color="button_color">
            <div class="alc-btn-text">+1</div>
            <i class="fas fa-glass-whiskey fa-2x btn-text"></i>
          </v-btn>
        </v-col>
      </v-row>

      <v-row class="custom-input">
        <v-col cols="6">
          <v-text-field rounded solo suffix="oz" background-color="primary" />
        </v-col>

        <v-col cols="6">
          <v-text-field rounded solo suffix="%" background-color="primary" />
        </v-col>
      </v-row>

      <div class="text-xs-center">
        <v-btn x-large block rounded color="button_color">
          <div class="btn-text">+1</div>
        </v-btn>
      </div>
    </v-col>
  </v-container>
</template>

<script>
import Counter from "@/components/Counter";

export default {
  name: "Home",

  components: {
    Counter,
  },

  data: () => ({
    currentBAC: 0.1,
  }),
};
</script>

<style>
.bac-title {
  font-size: 1.6em;
  color: #d9d8e2;
  margin-bottom: -0.7em;
}

.alc-btn-text {
  padding-right: 0.2em;
  font-size: 1.3em;
  color: var(--v-primary-base);
}

.btn-text {
  color: white;
}
</style>