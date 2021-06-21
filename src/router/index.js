import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/task",
    component: () => import("../views/Main.vue"),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "/task",
        name: "Tasks",
        component: () => import("../views/Tasks.vue")
      },
      { path: "/task/:id", name: "Task", component: () => import("../views/Task.vue") },
      {
        path: "/statistics",
        name: "Statistics",
        component: () => import("../views/Statistics.vue")
      }
    ]
  },
  {
    path: "/login",
    component: () => import("../views/Login.vue"),
    meta: {
      guest: true
    }
  },
  {
    path: "/logout",
    component: () => import("../views/Logout.vue"),
    meta: {
      guest: true
    }
  }
];

//TODO add 404 route

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("user-token") == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath }
      });
    }
  }
  next();
});

export default router;
