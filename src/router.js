import Login from "./views/Login.vue";
import ToDoList from "./components/ToDoList.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/login", component: Login },
  { path: "/to-do-list", component: ToDoList },
  { path: "/", component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
