<script setup>
import { useRouter } from "vue-router";
import smallLogo from "../../components/app/smallLogo.vue";
import { ref, onMounted } from "vue";
import { useUsersStore } from "@/stores/usersStore.js";
import usersService from "@/services/usersService.js";
import Cookies from "js-cookie";
import { toast } from "vue3-toastify";
import supportLogin from "../../components/app/footer/support&Login.vue";

const { confirmAccount, loginThroughToken, updateMainEmail } = usersService;
const router = useRouter();
const usersStore = useUsersStore();

const token = ref(null);
const mailConfirmed = ref(false);
const isEmailUpdate = ref(false);
const loading = ref(false);
const APP_NAME = import.meta.env.VITE_APP_NAME
onMounted(() => {
  token.value = usersStore.tokenAction.token;
  console.log(token.value);
  isEmailUpdate.value = usersStore.tokenAction.action === "newEmailConfirmation";
  console.log("isEmailUpdate.value");
  console.log(isEmailUpdate.value);
  if (!token.value) {
    // Show view of token invalid or expired. Resend email confirmation.
  }
});

async function setAccountConfirmed() {
  const token = usersStore.tokenAction.token;
  if (token) {
    // confirmAccount
    const body = {
      token: token,
    };
    const response = await confirmAccount(body);
    if (response && response.status === 200) {
      mailConfirmed.value = true;
      usersStore.removeActionToken();
    }
  }
}

async function updateUserEmail() {
  const newEmail = usersStore.emailConfirmation.newEmail;
  const token = usersStore.tokenAction.token;
  console.log("newEmail")
  console.log(newEmail)
  console.log("token")
  console.log(token)
  if (newEmail && token) {
    const body = {
      token: token,
      newEmail: newEmail,
    };
    console.log("body", body)

    const response = await updateMainEmail(body);
    if (response && response.status === 200) {
      mailConfirmed.value = true;
      usersStore.removeTokenAction();
    }
  }
}

const redirectResendEmailView = () => {
  router.push("/resend-email-confirmation");
};

const authenticateVerifiedUser = async () => {
  const body = {
    token: token.value,
  };
  console.log("Login through token", body);
  const loginResponse = await loginThroughToken(body);
  console.log("loginResponse", loginResponse);
  if (loginResponse && loginResponse.status === 200) {
    console.log("Debugging loginResponse", loginResponse.data);

    await Cookies.set("user_jwt", loginResponse.data.token);
    await Cookies.set("user_name", loginResponse.data.username);
    router.push("/lists");
    loading.value = false;
  } else {
    toast.error("Something went wrong!", {
      position: "top-right",
      autoClose: 1500,
    });
  }
};

const redirectToLogin = async () => {
  router.push("/login");
};
</script>

<template>
  <div class="h-screen bg-gradient-to-b from-purple-100 to-yellow-100">
    <div style="height: 10%">
      <smallLogo />
    </div>
    <v-overlay v-model="loading" contained class="align-center justify-center">
    </v-overlay>
    <section
      style="height: 90%"
      class="flex flex-col justify-center items-center"
    >
      <div
        v-if="mailConfirmed"
        id="mail-confirmed"
        class="flex flex-col justify-center items-center space-y-2 h-full"
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
            Do you wish to start using {{ APP_NAME }}? Start
            <a
              class="cursor-pointer text-lime-500 font-bold"
              @click="authenticateVerifiedUser"
              >here</a
            >
          </span>
        </div>
      </div>
      <div
        v-if="!mailConfirmed && token"
        class="flex flex-col justify-center items-center space-y-2 h-auto"
      >
        <div>
          <span class="text-4xl font-bold text-center">
            Please confirm your email address!
          </span>
        </div>
        <div
          v-if="!isEmailUpdate"
          class="flex flex-col justify-center items-center space-y-2 h-auto"
        >
          <div class="w-auto">
            <span class="text-xl font-semibold text-center text-gray-600">
              Hi Allan, Thanks for signing up for {{ APP_NAME }}! Please confirm your
              email address by clicking the button
            </span>
          </div>
          <div>
            <button
              class="bg-yellow-400 rounded-lg px-4 py-2 text-white font-semibold hover:bg-yellow-500"
              :loading="loading"
              @click="setAccountConfirmed()"
            >
              Confirm email address
            </button>
          </div>
        </div>
        <div
          v-if="isEmailUpdate"
          class="flex flex-col justify-center items-center space-y-2 h-auto"
        >
          <div class="w-auto">
            <span class="text-xl font-semibold text-center text-gray-600">
              Hi Allan, to confirm your email address please click the button
            </span>
          </div>
          <div>
            <button
              class="bg-yellow-400 rounded-lg px-4 py-2 text-white font-semibold hover:bg-yellow-500"
              :loading="loading"
              @click="updateUserEmail()"
            >
              Confirm and update email address
            </button>
          </div>
        </div>
      </div>

      <div
        v-if="!token"
        class="flex flex-col justify-center items-center space-y-2 h-full"
      >
        <div class="my-4">
          <span class="text-4xl font-bold text-center">
            Sorry! The token is invalid or it has expired.
          </span>
        </div>

        <div>
          <button
            class="bg-amber-400 rounded-lg px-4 py-2 text-white font-semibold hover:bg-yellow-500"
            @click="redirectResendEmailView()"
          >
            Resend email confirmation
          </button>
        </div>
      </div>

      <supportLogin />
    </section>
  </div>
</template>
