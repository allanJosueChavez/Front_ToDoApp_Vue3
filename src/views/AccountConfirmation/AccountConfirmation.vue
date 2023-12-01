<template>
  <div class="h-screen bg-gradient-to-b from-purple-100 to-yellow-100">
    <div
      class="flex justify-center items-center bg-blue-900"
      style="height: 10%"
    >
      <span class="font-bold text-2xl sm:text-2xl text-white"> ToDoFlow </span>
      <img
        src="https://i.ibb.co/QrjrV7B/image.webp"
        alt=""
        class="w-6 sm:w-10 sm:p-auto"
      />
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

const router = useRouter();

const redirectToLogin = () => {
  router.push("/login");
};
</script>
