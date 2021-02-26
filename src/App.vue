<template>
  <v-app id="app">
    <Header />
    <v-main
      v-touch="{ left: () => swipe('left'), right: () => swipe('right') }"
    >
      <transition :name="transitionName">
        <router-view class="slideable-page"></router-view>
      </transition>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: "BACalc",

  components: {
    Header,
    Footer,
  },

  data: () => ({
    transitionName: null,
  }),

  methods: {
    // Handle state transitions based on swipe direction
    swipe(dir) {
      if (this.$route.path === "/" && dir === "left") {
        this.setRoute("/settings");
      } else if (this.$route.path === "/" && dir === "right") {
        this.setRoute("/graph");
      } else if (this.$route.path === "/settings" && dir === "right") {
        this.setRoute("/");
      } else if (this.$route.path === "/graph" && dir === "left") {
        this.setRoute("/");
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
          ? to.path === "/graph"
            ? left
            : right
          : from.path === "/graph"
          ? right
          : left;
    },
  },
};
</script>

<style>
html {
  overflow-y: auto;
}

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
  transition: transform 0.4s ease;
}

.slide-left-leave-active {
  z-index: 3;
  transition: transform 0.4s ease;
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
  transition: transform 0.4s ease;
}

.slide-right-leave-active {
  z-index: 3;
  transition: transform 0.4s ease;
}

.slide-right-leave-to {
  transform: translateX(-100%);
}
</style>