import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import Settings from "../views/Settings.vue"
import Graph from "../views/Graph.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings
  },
  {
    path: "/graph",
    name: "Graph",
    component: Graph
  }
]

const router = new VueRouter({
  routes
})

export default router
