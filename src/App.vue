<template>
  <v-app id="app">
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

export default {
  name: "BACalc",

  components: {
    ButtonPanel,
    BottomNav,
  },

  data: () => ({
    transitionName: null,
    page: 1,
  }),

  methods: {
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
#app {
  background: var(--v-primary-base);
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