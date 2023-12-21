<template>
  <div
    id="profile"
    class="bg-blue-950 sm:visible invisible h-16 w-full flex justify-end p-0"
  >
    <div id="profile-button" class="h-100 w-44">

        <v-menu >
        <template v-slot:activator="{ props }">
      <button
        v-bind="props"
        class="hover:border-4 border-white w-full h-full flex justify-center items-center bg-blue-950 rounded-lg hover:bg-blue-900"
      >
        <span class="material-icons right-0 text-white mx-1">
          account_circle
        </span>
        <span class="text-white font-semibold"> {{ username }} </span>
      </button>
        </template>
        <v-list>
          <div v-for="(item, index) in items" :key="index">
            <v-list-item @click="item.itemFunction">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </div>
        </v-list>
      </v-menu>  
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import Cookies from "js-cookie"
import {useTodoListsStore} from "./../../../stores/listsStore.js";
import cookieUtils from "../../../utils/cookies/cookiesUtils.js";

 const {setSelectedList} =  useTodoListsStore();
const { clearCookies } = cookieUtils
const router = useRouter();
const logout =  () => {
    setSelectedList(null);
    clearCookies();
    router.push("/login");
};

const username = Cookies.get("user_name");


const openProfileMenu = () => {
  router.push("/edit-profile");
};

const items = [
  {
    title: "Profile",
    itemFunction: openProfileMenu,
  },
  {
    title: "Logout",
    itemFunction: logout,
  },
];
</script>
