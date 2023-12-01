<template>
  <div class="h-screen bg-gradient-to-b from-purple-100 to-yellow-100">
    <div  style="height: 10%">
      <smallLogo />
    </div>
    <div
      class="flex flex-col justify-center items-center space-y-2"
      style="height: 90%"
    >
      <div>
        <span
          class="material-icons outlined text-lime-500"
          :style="{ fontSize: '3em' }"
          >check_circle</span
        >
      </div>
      <div>
        <span class="text-4xl font-bold text-center">
          Thanks for confirming your email address!
        </span>
      </div>
      <div clas>
        <span class="text-xl font-semibold text-center text-gray-600">
          Do you wish to start using ToDoFlow? Start
          <a
            class="cursor-pointer text-lime-500 font-bold"
            @click="redirectToLogin"
            >here</a
          >
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import SmallLogo from "../../components/app/smallLogo.vue";
const router = useRouter();

const redirectToLogin = () => {
  router.push("/login");
};
</script>
