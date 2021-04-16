import Vue from 'vue'
import VueRouter from 'vue-router'
import Tasks from '../views/Tasks.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Tasks',
    component: Tasks
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: () => import('../views/Statistics.vue')
  },
  { path: '/task/:id',
    name: 'Task',
    component: () => import('../views/Task.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
