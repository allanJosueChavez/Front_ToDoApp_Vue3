<script setup  >
import loginSideView from "../../components/app/loginSideView.vue";
import { ref, onMounted, computed, watch, handleError } from "vue";
import { useRouter } from "vue-router";
import CryptoJS from "crypto-js";
import usersService from "../../services/usersService.js";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const router = useRouter();
const loading = ref(false);
const { create } = usersService;
const signUpform = ref(null);
const user = ref({
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
});

const PASSPHRASE = ref(import.meta.env.VITE_PASSPHRASE);

const signup = async () => {
  const isValid = await validateForm();
  if (!isValid) return;
  try{
    loading.value = true;
    const hashedPassword =  CryptoJS.AES.encrypt(user.value.password, PASSPHRASE.value).toString()
    // If you wanna avoid the problem of updating the v-model with the encrypted pass, just create a new object with the encrypted pass and send it to the backend
    const userInfo = {
      name: user.value.name,
      email: user.value.email,
      password: hashedPassword,
    };
    const response = await create(userInfo);
    await handleSignupResponse(response);
  }catch(err){
      console.log(err);
  }
};

const validateForm = async () => {
  const isValid = await signUpform.value.validate();
  return isValid.valid;
};  

const handleSignupResponse = async (response) => {
  if(response.status === 200){
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      toast.success("You just signed up successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
    }
    else{
      toast.error("Sorry, something went wrong registering your user.", {
        position: "top-right",
        duration: 2000,
      });
    }
    loading.value = false;
};



// Login form validation rules
const usernameRules = [
  (v) => !!v || "Name is required",
  (v) => (v && v.length <= 15) || "Name must be less than 15 characters",
  (v) => (v && v.length >= 3) || "Name must be larger than 3 characters",
];

const emailRules = [
  (v) => !!v || "E-mail is required",
  (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
];

const passwordRules = [
  (v) => !!v || "Password is required",
  (v) => (v && v.length >= 8) || "Password must be at least 8 characters",
];

const passwordConfirmationRules = [
  (v) => !!v || "Password Confirmation is required",
  (v) =>
    (v && v.length >= 8) ||
    "Password Confirmation must be at least 8 characters",
  (v) =>
    v === user.value.password || "Password Confirmation must match Password",
];
</script>

<template>
  <div class="h-screen sm:flex">
    <loginSideView />
    <div
      id="login-form-view"
      class="sm:w-4/6 sm:h-full bg-gray-200 flex justify-center items-center align-center py-auto"
    >
      <div class="sm:px-44 w-full">
        <div class="bg-white shadow-md rounded-2xl">
          <v-form fast-fail @submit.prevent="signup" ref="signUpform">
            <span
              @click="$router.push('/login')"
              class="m-10 absolute material-icons text-purple-900 cursor-pointer"
              >arrow_back</span
            >

            <div class="px-16 py-8 grid gap-y-2">
              <div id="title-page" class="my-10">
                <h1 class="text-4xl text-center font-bold text-purple-900">
                  SIGNUP
                </h1>
              </div>
              <div>
                <v-text-field
                  class="text-purple-900"
                  label="Full name"
                  v-model="user.name"
                  clearable
                  :rules="usernameRules"
                ></v-text-field>
              </div>
              <div>
                <v-text-field
                  class="text-purple-900"
                  label="Email"
                  v-model="user.email"
                  clearable
                  :rules="emailRules"
                ></v-text-field>
              </div>
              <div>
                <v-text-field
                  class="text-purple-900"
                  label="Password"
                  v-model="user.password"
                  clearable
                  :rules="passwordRules"
                ></v-text-field>
              </div>
              <div>
                <v-text-field
                  class="text-purple-900"
                  label="Password Confirmation"
                  v-model="user.passwordConfirmation"
                  clearable
                  :rules="passwordConfirmationRules"
                ></v-text-field>
              </div>
              <div class="w-100 flex items-center justify-center mb-6">
                <button>
                  <v-btn :disabled="loading" :loading="loading" class="text-purple-800" color="primary" type="submit">
                    <span class="text-md"> Sign up </span>
                  </v-btn>
                </button>
              </div>
              <div class="py-4 grid gap-y-3">
                <div id="loginBtn" class="text-center">
                  <span class="text-purple-800 text-center">
                    Already have an account?
                  </span>
                  <span
                    @click="$router.push('/login')"
                    class="text-purple-800 text-center font-bold cursor-pointer"
                  >
                    Log in
                  </span>
                </div>
              </div>
            </div>
          </v-form>
        </div>
      </div>
    </div>
  </div>
</template>

