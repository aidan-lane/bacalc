import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

// State based transitions
router.afterEach((to, from) => {
  const left = "fade"
  const right = "fade"

  to.meta.transitionName = from.path === "/" ? to.path === '/graph'
    ? left : right : from.path === "/graph" ? right : left

  console.log(to.meta.transitionName, to, from)
})

export default router
