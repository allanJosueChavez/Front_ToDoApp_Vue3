<template>
  <div class="h-screen flex">
    <div
      id="lateral-image"
      class="w-2/6 bg-gradient-to-b from-blue-700 to-purple-600 flex justify-center items-center"
    >
      <!-- Content for the first column -->
      <div class="text-center shadow-2xl p-4 pt-16 rounded-2xl">
        <span class="text-6xl text-white text-center font-bold">
          ToDoFLow
        </span>
        <img
          src="https://i.ibb.co/QrjrV7B/image.webp"
          alt=""
          class="w-80"
        />
      </div>
    </div>
    <div class="w-4/6 h-full bg-gray-200 flex justify-center items-center">
      <div class="px-44 w-full h-4/6">
        <div class="bg-white shadow-md rounded-2xl">
          <v-form fast-fail @submit.prevent="login">
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
                  v-model="user.username"
                  clearable
                  
                ></v-text-field>
              </div>
              <div>
                <v-text-field
                  class="text-purple-900"
                  label="Password"
                  v-model="user.password"
                  clearable
                ></v-text-field>
              </div>

              <div class="w-100 flex items-center justify-center mb-6">
                <button>
                  <v-btn class="text-purple-800" color="primary" type="submit">
                    <span class="text-md"> Login </span>
                  </v-btn>
                </button>
              </div>
              <div class="py-4 grid gap-y-3">
              <div id="forgotPassBtn" class="text-center">
                <span class="text-purple-800">
                  Forgot your password?
                </span>
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

<!-- <script>
export default {
    name: 'Login',
    data() {
        return {
            user: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        login() {
            console.log('login');
        }
    }
}
</script> -->

<script setup>
// This is a snipeet in vue 3 using <script setup> SFCs, the same that is above in here would be:
import { ref, onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
const user = ref({
  username: "",
  password: "",
});

const login = () => {
  console.log("login");
  router.push("/to-do-list");
};

const router = useRouter();
</script>
