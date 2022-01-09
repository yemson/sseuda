import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/postdetail/:id',
    name: 'PostDetail',
    component: () => import('../views/PostDetail.vue')
  },
  {
    path: '/post',
    name: 'Post',
    component: () => import('../views/Post.vue')
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/setting/:id',
    name: 'Setting',
    component: () => import('../views/Setting.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
