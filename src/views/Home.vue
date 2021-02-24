<template>
  <v-container>
    <v-row class="text-center menu">
       <v-col
        class="mb-5"
        cols="12"
      >
        <h3
          class="bac-title font-weight-bold"
        >
          Your BAC
        </h3>
        
        <Counter 
          :bac="currentBAC"
        />

        <v-divider/>
      </v-col>

      <v-row>
        <v-flex xs4>
          <v-btn
            x-large
            rounded
            elevation="3"
            color="primary"
          >
            <div class="alc-btn-text"> +1 </div>
            <i class="fas fa-beer fa-2x"></i>
          </v-btn>
        </v-flex>

        <v-flex xs4>
          <v-btn
            x-large
            rounded
            elevation="3"
            color="primary"
          >
            <div class="alc-btn-text"> +1 </div>
            <i class="fas fa-wine-glass-alt fa-2x"></i>
          </v-btn>
        </v-flex>

        <v-flex xs4>
          <v-btn
            x-large
            rounded
            elevation="3"
            color="primary"
          >
            <div class="alc-btn-text"> +1 </div>
            <i class="fas fa-glass-whiskey fa-2x"></i>
          </v-btn>
        </v-flex>
      </v-row>
    </v-row>

    <v-col class="custom-input d-flex justify-center">
      <v-col
        sm="4"
      >
        <v-text-field
          rounded
          solo
          suffix="oz"
          background-color="tertiary"
        />
      </v-col>

      <v-col
        sm="4"
      >
        <v-text-field
          rounded
          solo
          suffix="%alc"
          background-color="tertiary"
        />
      </v-col>

      <v-col
        sm="4"
      >
        <v-btn
          x-large
          rounded
          elevation="3"
          color="primary"
        >
        +1
        </v-btn>
      </v-col>
    </v-col>
  </v-container>
</template>

<script>
  import Counter from '@/components/Counter';

  export default {
    name: 'Home',

    components: {
      Counter
    },

    data: () => ({
      currentBAC: 0.01
    }),
  }
</script>

<style>
  .menu {
    padding: 20% 10% 0 10%;
  }

  .bac-title {
    font-size: 1.6em;
    color: #d9d8e2;
    margin-bottom: -1em;
  }

  .alc-btn-text {
    padding-right: 0.2em;
    font-size: 1.3em;
    font-weight: bold;
  }

  .custom-input {
    margin-top: 1.5em;
  }

  .test {
    color: red;
    padding: 100px 100px 100px 100px;
  }

</style>