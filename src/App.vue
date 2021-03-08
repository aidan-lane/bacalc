<template>
  <v-app :id.sync="getID">
    <v-dialog v-model="readTOS" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Terms of Service
        </v-card-title>

        <v-card-text style="margin-top: 1em">
          This app only serves as an approximation and in no way is a legal
          indicator of your blood alcohol content. We are not responsible for
          any actions you make while using this app and by agreeing to these
          terms you are also indicating that you are of the legal age to drink.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="Black" text @click="acceptTerms"> I accept </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar bottom right :value="updateExists" :timeout="-1" color="green">
      An update is available
      <v-btn text color="white" @click="refreshApp"> Refresh </v-btn>
    </v-snackbar>
    <v-main
      v-touch="{ left: () => swipe('left'), right: () => swipe('right') }"
    >
      <transition :name="transitionName">
        <router-view class="slideable-page"></router-view>
      </transition>

      <ButtonPanel> </ButtonPanel>
    </v-main>

    <BottomNav :currentPage.sync="page" />
  </v-app>
</template>

<script>
import ButtonPanel from "@/components/ButtonPanel";
import BottomNav from "@/components/BottomNav";
import update from "@/mixins/update";
import db from "../api";

export default {
  name: "BACalc",

  mixins: [update],

  components: {
    ButtonPanel,
    BottomNav,
  },

  data: () => ({
    transitionName: null,
    page: 1,
    test: "home",
  }),

  mounted() {
    // on mount, remove old db entries older than 24 hours
    let now = new Date();
    db.removeOlderBAC(now.setHours(now.getHours() - 24));
  },

  methods: {
    acceptTerms() {
      // set tos to read
      localStorage.setItem("tos", true);
      this.$store.commit("SET_TOS", true);
    },
    // Handle state transitions based on swipe direction
    swipe(dir) {
      if (this.$route.path === "/" && dir === "left") {
        this.setRoute("/settings");
        this.page++;
      } else if (this.$route.path === "/" && dir === "right") {
        this.setRoute("/timeline");
        this.page--;
      } else if (this.$route.path === "/settings" && dir === "right") {
        this.setRoute("/");
        this.page--;
      } else if (this.$route.path === "/timeline" && dir === "left") {
        this.setRoute("/");
        this.page++;
      }
    },
  },

  computed: {
    getID() {
      return this.$route.name.toLowerCase();
    },
    readTOS() {
      return !this.$store.state.readTOS;
    },
  },

  watch: {
    // Handle transition animations based on route state change
    $route(to, from) {
      const left = "slide-left";
      const right = "slide-right";

      this.transitionName =
        from.path === "/"
          ? to.path === "/timeline"
            ? left
            : right
          : from.path === "/timeline"
          ? right
          : left;
    },
  },
};
</script>

<style>
#home {
  background: linear-gradient(0deg, #185a9d 0%, #43cea2 100%);
}

#settings {
  background: linear-gradient(0deg, #f3a183 0%, #ec6f66 100%);
}

#timeline {
  background: linear-gradient(0deg, #c33764 0%, #1d2671 100%);
}

.slideable-page {
  position: fixed;
  overflow: auto;
  z-index: 2;
}

/* Left */

.slide-left-enter {
  z-index: 1;
  transform: translateX(-100%);
}

.slide-left-enter-active {
  z-index: 1;
  transition: transform 0.3s ease;
}

.slide-left-leave-active {
  z-index: 3;
  transition: transform 0.3s ease;
}

.slide-left-leave-to {
  transform: translateX(130%);
}

/* Right */

.slide-right-enter {
  z-index: 1;
  transform: translateX(100%);
}

.slide-right-enter-active {
  z-index: 1;
  transition: transform 0.3s ease;
}

.slide-right-leave-active {
  z-index: 3;
  transition: transform 0.3s ease;
}

.slide-right-leave-to {
  transform: translateX(-100%);
}
</style>