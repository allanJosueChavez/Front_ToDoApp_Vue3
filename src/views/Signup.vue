<template>
    <div class="h-screen sm:flex ">
      <loginSideView />
      <div id="login-form-view" class="sm:w-4/6 sm:h-full bg-gray-200 flex justify-center items-center align-center py-auto">
        <div class="sm:px-44 w-full">
          <div class="bg-white shadow-md rounded-2xl">
            <v-form fast-fail @submit.prevent="signup">
                <span 
            @click="$router.push('/login')"
            class="m-10 absolute material-icons text-purple-900 cursor-pointer">arrow_back</span>   

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
                    
                  ></v-text-field>
                </div>
                <div>
                  <v-text-field
                    class="text-purple-900"
                    label="Email"
                    v-model="user.email"
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
                <div>
                  <v-text-field
                    class="text-purple-900"
                    label="Password Confirmation"
                    v-model="user.passwordConfirmation"
                    clearable
                  ></v-text-field>
                </div>
                <div class="w-100 flex items-center justify-center mb-6">
                  <button>
                    <v-btn class="text-purple-800" color="primary" type="submit">
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

  
  <script setup>
  import loginSideView from "../components/app/loginSideView.vue";
  import { ref, onMounted, computed, watch } from "vue";
  import { useRouter } from "vue-router";
  const user = ref({
    email: "",
    password: "",
  });
  
  const signup = () => {
    console.log("signup");
    router.push("/to-do-list");
  };
  
  const router = useRouter();
  </script>
  