<template>
  <v-footer>
      <v-row
        align="center"
        justify="center"
      >
        <v-btn-toggle
          class="button-panel"
          v-model="toggle_exclusive"
          rounded
          mandatory
        >
          <v-btn>
            <i class="fas fa-chart-bar fa-2x"></i>
          </v-btn>
          <v-btn>
            <i class="fas fa-home fa-2x"></i>
          </v-btn>
          <v-btn>
            <i class="fas fa-cog fa-2x"></i>
          </v-btn>
        </v-btn-toggle>
      </v-row>
    </v-footer>
</template>

<script>
export default {
  
}
</script>

<style scoped>
  .button-panel {
    margin: 20px 0px 15px 0px;
  }
</style>