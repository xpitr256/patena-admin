import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/task",
    component: () => import('../views/Main.vue'),
    children :[
      {
        path: '/task',
        name: 'Tasks',
        component: () => import('../views/Tasks.vue')
      },
      { path: '/task/:id',
        name: 'Task',
        component: () => import('../views/Task.vue')
      },
      {
        path: '/statistics',
        name: 'Statistics',
        component: () => import('../views/Statistics.vue')
      },
    ]
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
