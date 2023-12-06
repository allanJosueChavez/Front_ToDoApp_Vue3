<template>
  <div class="h-screen bg-gradient-to-b from-purple-100 to-yellow-100">
    <div  style="height: 10%">
      <smallLogo />
    </div>
    <div
    v-if="mailConfirmed"
    id="mail-confirmed"
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
      <div>
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
    <div
    v-if="!mailConfirmed"
    class="flex flex-col justify-center items-center space-y-2"
      style="height: 90%"
    >
    
    <div>
        <span class="text-4xl font-bold text-center">
          Please confirm your email address!
        </span>
      </div>
      <div class="w-auto">
        <span class="  text-xl font-semibold text-center text-gray-600">
          Hi Allan, Thanks for signing up for ToDoFlow! Please confirm your email address by clicking the button
        </span>
      </div>
      <div>
        <button class="bg-yellow-400 rounded-lg px-4 py-2 text-white font-semibold hover:bg-yellow-500" @click="confirmAccount()">
          Confirm email address
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import smallLogo from "../../components/app/smallLogo.vue";
import { ref, onMounted } from "vue";
const router = useRouter();

const redirectToLogin = () => {
  router.push("/login");
};

const confirmAccount = () => {
  mailConfirmed.value = true;
};

const mailConfirmed = ref(false);

</script>
