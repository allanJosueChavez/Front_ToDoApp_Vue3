import Login from  "../../views/Login/Login.vue";
import Signup from "../../views/Signup/Signup.vue";
import ToDoList from "../../components/ToDoList.vue";
import AppLayoutExample from "../../components/AppLayoutExample.vue";
import { createRouter, createWebHistory } from "vue-router";
import Cookies from 'js-cookie';


const routes = [
  { path: "/login", component: Login
  , meta: {
    requiresAuth: false
  }
},
  { path: "/to-do-list", component: ToDoList,
    meta: {
      requiresAuth: true
    }
},
  { path: "/signup", component: Signup },
  { path: "/hola", component: AppLayoutExample },

  { path: "/", 
    redirect:"/to-do-list",
  },
  // {
  //   path: "/:catchAll(.*)",
  //   redirect: "/to-do-list",
  // }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  // Cookies.remove('user_jwt');
  const userToken = Cookies.get('user_jwt');
  if (to.meta.requiresAuth && !userToken) {
    console.log('Not logged in. Going to the login page.');
    next('/login');
  }else if(!to.meta.requiresAuth && userToken) {
    console.log('Already logged in. Going to the to-do-list.');
    next('/to-do-list')
  }else {
    console.log('Coming in');
    next()
  }
});



export default router;
