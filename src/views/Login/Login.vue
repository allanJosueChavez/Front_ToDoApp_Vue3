<script setup>
// This is a snipeet in vue 3 using <script setup> SFCs, the same that is above in here would be:
import loginSideView from "../../components/app/loginSideView.vue";
import { ref, onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
import CryptoJS from "crypto-js";
import usersService from "../../services/usersService.js";
import Cookies from "js-cookie";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const { login } = usersService;
const router = useRouter();

const loading = ref(false);
const loginForm = ref(null);
const showPassword = ref(false);

const user = ref({
  email: "",
  password: "",
});

const PASSPHRASE = ref(import.meta.env.VITE_PASSPHRASE);

const authentication = async () => {
  loading.value = true;
  const isValid = await validateForm();
  if (!isValid) return;
  try {
    // I have a env variable using vite. it's called PASSPHRASE. The syntax to get it from the code is import.meta.env.PASSPHRASE
    const hashedPassword = CryptoJS.AES.encrypt(
      user.value.password,
      PASSPHRASE.value
    ).toString();
    const userCredentials = {
      email: user.value.email,
      password: hashedPassword,
    };
    const response = await login(userCredentials);
    await handleLoginResponse(response);
  } catch (err) {
    console.log(err);
    toast.error("An error just occurred logging in!", {
      position: "top-right",
      autoClose: 2000,
    });
  } finally {
    loading.value = false;
  }
};

const validateForm = async () => {
  const isValid = await loginForm.value.validate();
  console.log("The form is valid: ", isValid.valid);
  return isValid.valid;
};

const handleLoginResponse = async (response) => {
  if (response.status === 200) {
    console.log("response.data: ", response.data);
    Cookies.set("user_jwt", response.data.token);
    Cookies.set("user_name", response.data.username);

    const jwt = Cookies.get("user_jwt");
    console.log("jwt: ", jwt);
    setTimeout(() => {
      router.push("/to-do-list");
    }, 2000);
    toast.success("Log in successful!", {
      position: "top-right",
      autoClose: 2000,
    });
  } else {
    // A validation if the credentials are wrong.
    toast.error("Something went wrong logging in!", {
      position: "top-right",
      duration: 2000,
    });
  }
  loading.value = false;
};

// Login form validation rules
const emailRules = [
  (v) => !!v || "Email is required",
  (v) => /.+@.+\..+/.test(v) || "Email must be valid",
];

const passwordRules = [
  (v) => !!v || "Password is required",
  (v) => (v && v.length >= 8) || "Password must be larger than 8 characters",
];

// The mdi-close of the clearable option of the v-text-field is not working.
</script>


<template>
  <div class="h-screen sm:flex">
    <loginSideView />
    <div
      class="sm:w-4/6 sm:h-full bg-gray-200 flex justify-center items-center"
    >
      <div class="sm:px-44 w-full h-4/6">
        <div class="bg-white shadow-md rounded-2xl">
          <v-form ref="loginForm" fast-fail @submit.prevent="authentication">
            <div class="px-16 py-8 grid gap-y-6">
              <div id="title-page" class="my-10">
                <h1 class="text-4xl text-center font-bold text-purple-900">
                  LOGIN
                </h1>
              </div>
              <div class="">
                <v-text-field
                  class="text-purple-900"
                  label="Email"
                  :rules="emailRules"
                  v-model="user.email"
                ></v-text-field>
              </div>
              <div>
                <v-text-field
                  ref="passwordInput"
                  class="text-purple-900"
                  label="Password"
                  :type="showPassword ? 'text' : 'password'"
                  :rules="passwordRules"
                  v-model="user.password"
                >
                  <span
                    class="material-icons-outlined absolute right-3 top-5 cursor-pointer text-purple-800"
                    @click="showPassword = !showPassword"
                  >
                    {{ showPassword ? "visibility" : "visibility_off" }}
                  </span>
                </v-text-field>
              </div>
              <div class="w-100 flex items-center justify-center mb-4">
                <button>
                  <v-btn class="text-purple-800" color="primary" type="submit">
                    <span class="text-md"> Login </span>
                  </v-btn>
                </button>
              </div>
              <div class="pb-3 grid gap-y-3">
                <div id="forgotPassBtn" class="text-center">
                  <span class="text-purple-800"> Forgot your password? </span>
                  <span
                    @click="$router.push('/reset-password')"
                    class="text-purple-800 font-bold cursor-pointer"
                  >
                    Reset
                  </span>
                </div>
                <div id="signupBtn" class="text-center">
                  <span class="text-purple-800 text-center">
                    Don't have an account?
                  </span>
                  <span
                    @click="$router.push('/signup')"
                    class="text-purple-800 text-center font-bold cursor-pointer"
                  >
                    Sign up
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

 
