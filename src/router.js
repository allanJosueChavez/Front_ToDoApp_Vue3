import Login from "./views/Login.vue";
import Signup from "./views/Signup/Signup.vue";
import ToDoList from "./components/ToDoList.vue";
import AppLayoutExample from "./components/AppLayoutExample.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/login", component: Login },
  { path: "/to-do-list", component: ToDoList },
  { path: "/signup", component: Signup },
  { path: "/hola", component: AppLayoutExample },
  { path: "/", component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
