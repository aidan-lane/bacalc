<template>
  <v-app id="app">
    <Header />
    <v-main
      v-touch="{ left: () => swipe('left'), right: () => swipe('right') }"
    >
      <transition name="slide-right">
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

  methods: {
    swipe(dir) {
      if (this.$route.path === "/" && dir === "left") {
        this.setRoute("/about");
      } else if (this.$route.path === "/" && dir === "right") {
        this.setRoute("/graph");
      } else if (this.$route.path === "/about" && dir === "right") {
        this.setRoute("/");
      } else if (this.$route.path === "/graph" && dir === "left") {
        this.setRoute("/");
      }
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
}

.slide-left-enter-active {
  z-index: 1;
}

.slide-left-leave-active {
  transition: transform 0.4s ease;
  z-index: 3;
}

.slide-left-leave-to {
  transform: translateX(100%);
}

/* Right */

.slide-right-enter {
  z-index: 1;
}

.slide-right-enter-active {
  z-index: 1;
}

.slide-right-leave-active {
  transition: transform 0.4s ease;
  z-index: 3;
}

.slide-right-leave-to {
  transform: translateX(-100%);
}
</style>