import Login from "./../../views/Login/Login.vue";
import Signup from "./../../views/Signup/Signup.vue";
import ToDoList from "./../../components/ToDoListView.vue";
import AccountConfirmation from "./../../views/AccountConfirmation/AccountConfirmation.vue";
import verifyToken from "../../views/AccountConfirmation/VerifyToken.vue";
import AppLayoutExample from "../../components/AppLayoutExample.vue";
import editProfile from "../../views/Profile/EditProfile.vue";  
import ResendEmailConfirmation from "../../views/AccountConfirmation/ResendEmailConfirmation.vue";
import ChangePassword from "../../views/Login/ForgotPassword/ChangePassword.vue";

import { createRouter, createWebHistory } from "vue-router";
import authGuard from "../guards/authGuard.js";
import ResetPassword from "@/views/Login/ForgotPassword/ResetPassword.vue"

const routes = [
  {
    path: "/login",
    component: Login,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/lists",
    component: ToDoList,
    meta: {
      requiresAuth: true,
    },
  },
  { path: "/signup", component: Signup },
  { path: "/hola", component: AppLayoutExample },

  { path: "/", redirect: "/lists" },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/lists",
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
    path: "/edit-profile", 
    component: editProfile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/reset-password",
    component: ResetPassword,
    meta: {
      requiresAuth: false,
      verifyLogin: true,
    },
  },
  {
    path: "/accounts/password/reset",
    component:  ResetPassword,
    meta: {
      requiresAuth: false,
      verifyLogin: true,
    },
  }
  ,{
    path: "/accounts/password/change",
    component: ChangePassword,
    meta: {
      requiresAuth: false,
      verifyLogin: true,
    },
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(authGuard);
export default router;
