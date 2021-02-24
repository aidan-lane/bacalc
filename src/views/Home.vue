<template>
  <v-container fluid>
    <v-row class="text-center">
      <v-col md="12" class="menu">
        <h3 class="bac-title font-weight-bold">Your BAC</h3>

        <Counter :bac="currentBAC" />

        <v-row justify="space-around">
          <v-col md="4">
            <v-btn x-large block rounded elevation="2" color="primary">
              <div class="alc-btn-text">+1</div>
              <i class="fas fa-beer fa-2x"></i>
            </v-btn>
          </v-col>

          <v-col md="4">
            <v-btn x-large block rounded elevation="3" color="primary">
              <div class="alc-btn-text">+1</div>
              <i class="fas fa-wine-glass-alt fa-2x"></i>
            </v-btn>
          </v-col>

          <v-col md="4">
            <v-btn x-large block rounded elevation="3" color="primary">
              <div class="alc-btn-text">+1</div>
              <i class="fas fa-glass-whiskey fa-2x"></i>
            </v-btn>
          </v-col>
        </v-row>

        <v-row class="custom-input">
          <v-col md="4">
            <v-text-field
              rounded
              solo
              suffix="oz"
              background-color="tertiary"
            />
          </v-col>

          <v-col md="4">
            <v-text-field rounded solo suffix="%" background-color="tertiary" />
          </v-col>

          <v-col md="4">
            <v-btn x-large rounded block elevation="3" color="primary">
              +1
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
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
    currentBAC: 0.01,
  }),
};
</script>

<style>
.menu {
  margin-top: 30%;
}

.bac-title {
  font-size: 1.6em;
  color: #d9d8e2;
  margin-top: -10%;
  margin-bottom: -1em;
}

.alc-btn-text {
  padding-right: 0.2em;
  font-size: 1.3em;
  font-weight: bold;
}

.custom-input {
  margin-top: 100%;
}

.test {
  color: red;
  padding: 100px 100px 100px 100px;
}
</style>