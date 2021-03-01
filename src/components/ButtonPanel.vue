<template>
  <v-container>
    <v-card class="panel-card" elevation="5">
      <v-col cols="12">
        <v-row justify="space-around">
          <v-col cols="12">
            <v-btn block rounded color="button_color">
              <div class="alc-btn-text">+1</div>
              <i class="fas fa-beer fa-2x btn-text alc-icon"></i>
              <i class="fas fa-wine-glass-alt fa-2x alc-icon"></i>
              <i class="fas fa-glass-whiskey fa-2x alc-icon"></i>
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

        <div class="text-xs-center" style="margin-top: -1.5em">
          <v-btn block rounded color="button_color">
            <div style="font-weight: bold; font-size: 1.5em">+1</div>
          </v-btn>
        </div>
      </v-col>
    </v-card>
  </v-container>
</template>

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