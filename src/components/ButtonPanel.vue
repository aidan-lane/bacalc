<template>
  <v-container>
    <v-snackbar
      v-model="undoBar"
      :timeout="timeout"
      top
      rounded="pill"
      color="green"
      elevation="5"
    >
      Added a drink!
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="undo"> Undo </v-btn>
      </template>
    </v-snackbar>
    <v-card class="panel-card" elevation="0" color="transparent">
      <v-col cols="12">
        <v-row style="margin-bottom: -15%">
          <v-col cols="6">
            <v-text-field
              rounded
              solo
              suffix="oz"
              background-color="primary"
              v-model="oz"
              :rules="[rules.number]"
            />
          </v-col>

          <v-col cols="6">
            <v-text-field
              rounded
              solo
              suffix="%"
              background-color="primary"
              v-model="pct"
              :rules="[rules.number]"
            />
          </v-col>
        </v-row>

        <v-row justify="space-around">
          <v-col cols="12">
            <v-btn block rounded color="button_color" @click="addDrink" x-large>
              <div class="alc-btn-text">+1</div>
              <i class="fas fa-beer fa-2x btn-text alc-icon"></i>
              <i class="fas fa-wine-glass-alt fa-2x alc-icon"></i>
              <i class="fas fa-glass-whiskey fa-2x alc-icon"></i>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-card>
    <div id="bubbles" v-if="showBubbles">
      <div class="bubble x1"></div>
      <div class="bubble x2"></div>
      <div class="bubble x3"></div>
      <div class="bubble x4"></div>
      <div class="bubble x5"></div>
    </div>
  </v-container>
</template>

<script>
import db from "../../api";

export default {
  name: "ButtonPanel",

  data: () => ({
    oz: "",
    pct: "",
    rules: {
      number: (value) =>
        value === "" || /^\d+$/.test(value) || "Must be a number!",
    },
    showBubbles: false,
    undoBar: false,
    timeout: 3000,
  }),

  methods: {
    addDrink() {
      // Don't calculate if not valid numbers
      if (this.oz !== "" && this.isNumber(this.oz) === false) {
        return;
      }

      if (this.pct !== "" && this.isNumber(this.pct) === false) {
        return;
      }

      this.undoBar = true;

      // bubbles animation
      this.showBubbles = true;
      this.timer = window.setTimeout(() => {
        this.showBubbles = false;
      }, 4000);

      const now = new Date();
      let bac = this.calculateBAC(now, this.oz, this.pct);
      if (bac === null) {
        return;
      }

      this.$store.commit("SET_BAC", { bac: bac, date: now, isDrink: true });

      // Reset vars
      this.oz = "";
      this.pct = "";
    },
    async undo() {
      this.undoBar = false;
      await db.removeLatestBAC();
      let latest = (await db.getBAC(1))[0];
      console.log(latest);

      // Set current bac to last entry after removing last added
      this.$store.commit("SET_BAC", {
        bac: latest.bac,
        date: latest.date,
        isDrink: true,
        addToDB: false,
      });
    },
  },
};
</script>

<style>
.panel-card {
  padding: 10% 3% 3% 3%;
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

#bubbles {
  height: 100%;
  padding: 100px 0;
  position: absolute;
}

body {
  overflow: hidden;
}

.bubble {
  width: 60px;
  height: 60px;
  background: #469bd3;
  border-radius: 200px;
  -moz-border-radius: 200px;
  -webkit-border-radius: 200px;
  position: absolute;
}

.x1 {
  -webkit-transform: scale(0.9);
  -moz-transform: scale(0.9);
  transform: scale(0.9);
  opacity: 0.2;
  animation: moveclouds 3s linear infinite,
    sideWays 4s ease-in-out infinite alternate;
  -webkit-animation: moveclouds 3s linear infinite,
    sideWays 4s ease-in-out infinite alternate;
  -moz-animation: moveclouds 3s linear infinite,
    sideWays 4s ease-in-out infinite alternate;
  -o-animation: moveclouds 3s linear infinite,
    sideWays 4s ease-in-out infinite alternate;
}

.x2 {
  left: 200px;
  -webkit-transform: scale(0.6);
  -moz-transform: scale(0.6);
  transform: scale(0.6);
  opacity: 0.5;
  animation: moveclouds 2s linear infinite,
    sideWays 5s ease-in-out infinite alternate;
  -webkit-animation: moveclouds 2s linear infinite,
    sideWays 5s ease-in-out infinite alternate;
  -moz-animation: moveclouds 2s linear infinite,
    sideWays 5s ease-in-out infinite alternate;
  -o-animation: moveclouds 2s linear infinite,
    sideWays 5s ease-in-out infinite alternate;
}

.x3 {
  left: 250px;
  -webkit-transform: scale(0.8);
  -moz-transform: scale(0.8);
  transform: scale(0.8);
  opacity: 0.3;
  animation: moveclouds 3s linear infinite,
    sideWays 4s ease-in-out infinite alternate;
  -webkit-animation: moveclouds 3s linear infinite,
    sideWays 4s ease-in-out infinite alternate;
  -moz-animation: moveclouds 3s linear infinite,
    sideWays 4s ease-in-out infinite alternate;
  -o-animation: moveclouds 3s linear infinite,
    sideWays 4s ease-in-out infinite alternate;
}

.x4 {
  left: 50px;
  -webkit-transform: scale(0.75);
  -moz-transform: scale(0.75);
  transform: scale(0.75);
  opacity: 0.35;
  animation: moveclouds 3.3s linear infinite,
    sideWays 2s ease-in-out infinite alternate;
  -webkit-animation: moveclouds 3.3s linear infinite,
    sideWays 2s ease-in-out infinite alternate;
  -moz-animation: moveclouds 3.3s linear infinite,
    sideWays 2s ease-in-out infinite alternate;
  -o-animation: moveclouds 3.3s linear infinite,
    sideWays 2s ease-in-out infinite alternate;
}

.x5 {
  left: 150px;
  -webkit-transform: scale(0.8);
  -moz-transform: scale(0.8);
  transform: scale(0.8);
  opacity: 0.3;
  animation: moveclouds 4s linear infinite,
    sideWays 1s ease-in-out infinite alternate;
  -webkit-animation: moveclouds 4s linear infinite,
    sideWays 1s ease-in-out infinite alternate;
  -moz-animation: moveclouds 4s linear infinite,
    sideWays 1s ease-in-out infinite alternate;
  -o-animation: moveclouds 4s linear infinite,
    sideWays 1s ease-in-out infinite alternate;
}

@keyframes moveclouds {
  0% {
    top: 50px;
  }
  100% {
    top: -500px;
  }
}

@keyframes sideWays {
  0% {
    margin-left: 0px;
  }
  100% {
    margin-left: 50px;
  }
}

@-webkit-keyframes moveclouds {
  0% {
    top: 500px;
  }
  100% {
    top: -500px;
  }
}

@-webkit-keyframes sideWays {
  0% {
    margin-left: 0px;
  }
  100% {
    margin-left: 50px;
  }
}

@-moz-keyframes moveclouds {
  0% {
    top: 500px;
  }
  100% {
    top: -500px;
  }
}

@-moz-keyframes sideWays {
  0% {
    margin-left: 0px;
  }
  100% {
    margin-left: 50px;
  }
}

@-o-keyframes moveclouds {
  0% {
    top: 500px;
  }
  100% {
    top: -500px;
  }
}

@-o-keyframes sideWays {
  0% {
    margin-left: 0px;
  }
  100% {
    margin-left: 50px;
  }
}
</style>