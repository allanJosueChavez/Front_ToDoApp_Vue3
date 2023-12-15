import Login from "./../../views/Login/Login.vue";
import Signup from "./../../views/Signup/Signup.vue";
import ToDoList from "./../../components/ToDoListView.vue";
import AccountConfirmation from "./../../views/AccountConfirmation/AccountConfirmation.vue";
import verifyToken from "../../views/AccountConfirmation/VerifyToken.vue";
import AppLayoutExample from "../../components/AppLayoutExample.vue";
import editProfile from "../../views/Profile/EditProfile.vue";  
import ResendEmailConfirmation from "../../views/AccountConfirmation/ResendEmailConfirmation.vue";
import { createRouter, createWebHistory } from "vue-router";
import authGuard from "../guards/authGuard.js";

const routes = [
  {
    path: "/login",
    component: Login,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/to-do-list",
    component: ToDoList,
    meta: {
      requiresAuth: true,
    },
  },
  { path: "/signup", component: Signup },
  { path: "/hola", component: AppLayoutExample },

  { path: "/", redirect: "/to-do-list" },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/to-do-list",
  },
  {
    path: "/email-confirmation",
    component: AccountConfirmation,
    meta: {
      requiresAuth: false,
      verifyLogin:false,
    },
  },
    {
      path: "/resend-email-confirmation",
      component: ResendEmailConfirmation,
      meta: {
        requiresAuth: false,
        verifyLogin:false,
      },
    },
 
  {
    // Example /verify-token/?token=YmQzU1lEUTZL
    path: "/verify-token",
    component: verifyToken,
    meta: {
      requiresAuth: false,
      verifyLogin:false,
    },
  },
  {
    path: "/editProfile",
    component: editProfile,
    meta: {
      requiresAuth: true,
    },
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(authGuard);
export default router;
