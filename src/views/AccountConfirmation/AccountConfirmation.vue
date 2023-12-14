<script setup>
import { useRouter } from "vue-router";
import smallLogo from "../../components/app/smallLogo.vue";
import { ref, onMounted } from "vue";
import { useUsersStore } from "@/stores/usersStore.js";
import usersService from "@/services/usersService.js";

const { confirmAccount } = usersService;
const router = useRouter();
const usersStore = useUsersStore();

const redirectToLogin = () => {
  router.push("/login");
};

const token = ref(null);
const mailConfirmed = ref(false);

onMounted(() => {
  token.value = usersStore.userConfirmationToken;
  if (!token.value) {
    // Show view of token invalid or expired. Resend email confirmation.
  }
});

async function setAccountConfirmed() {
  const token = usersStore.userConfirmationToken;
  if (token) {
    // confirmAccount
    const body = {
      "token": token
    }
    const response = await confirmAccount(body)
      if(response && response.status === 200){
        mailConfirmed.value = true;
        usersStore.removeUserConfirmationToken();
      }
  }
}

const redirectResendEmailView = () => {
  router.push("/resend-email-confirmation");
};

</script>

<template>
  <div class="h-screen bg-gradient-to-b from-purple-100 to-yellow-100">
    <div style="height: 10%">
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
      v-if="!mailConfirmed && token"
      class="flex flex-col justify-center items-center space-y-2"
      style="height: 90%"
    >
      <div>
        <span class="text-4xl font-bold text-center">
          Please confirm your email address!
        </span>
      </div>
      <div class="w-auto">
        <span class="text-xl font-semibold text-center text-gray-600">
          Hi Allan, Thanks for signing up for ToDoFlow! Please confirm your
          email address by clicking the button
        </span>
      </div>
      <div>
        <button
          class="bg-yellow-400 rounded-lg px-4 py-2 text-white font-semibold hover:bg-yellow-500"
          @click="setAccountConfirmed()"
        >
          Confirm email address
        </button>
      </div>
    </div>

    <div
      v-if="!token"
      class="flex flex-col justify-center items-center space-y-2"
      style="height: 90%"
    >
      <div class="my-4">
        <span class="text-4xl font-bold text-center">
          Sorry! The token is invalid or it has expired.
        </span>
      </div>

      <div>
        <button
          class="bg-yellow-400 rounded-lg px-4 py-2 text-white font-semibold hover:bg-yellow-500"
          @click="redirectResendEmailView()"
        >
          Resend email confirmation
        </button>
      </div>
    </div>
  </div>
</template>
