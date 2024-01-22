<script setup>
import { useRouter } from "vue-router";
import smallLogo from "@/components/app/smallLogo.vue";
import { useUsersStore } from "@/stores/usersStore.js";
import usersService from "@/services/usersService.js";
import { computed, ref , watch} from "vue";
import supportLogin from "../../../components/app/footer/support&Login.vue";
import { toast } from "vue3-toastify";
import inputRules from "@/validations/inputRules.js";

const { newPasswordRules, passwordSchema } = inputRules;


const APP_NAME = computed(() => import.meta.env.VITE_APP_NAME)
const {changePasswordService } = usersService;


const router = useRouter();
const usersStore = useUsersStore();
const token = computed(() => usersStore.tokenAction.token);
const redirectToResetPassoword = () => {
  router.push("/accounts/password/reset")
}

const pageLoading = ref(false)
const requestCompleted = ref(false)
const changePasswordForm = ref(null)
const changePassword = async () => {
  console.log("changePassword request")
  const validateForm =  await changePasswordForm.value.validate();
  const isFormValid = validateForm.valid;
  console.log(validateForm.valid)
  if (!isFormValid) {
      toast.warning("Please fill correctly the email input!", {
          position: "top-right",
          autoClose: 1500,
      });
      return
  }
  console.log(BodyRequest.value)
  pageLoading.value = true
  await changePasswordService(BodyRequest.value).then((response) => {
    console.log(response.data.message)
    if (response.status === 200) {
      toast.success(response.data.message?response.data.message:'Success!', {
        position: "top-right",
        autoClose: 1500,
      });
      requestCompleted.value = true
    }
  }).catch((err) => {
    console.log(err)
  }).finally(() => {
    pageLoading.value = false
  })
}

 
const BodyRequest = ref(
  {
    token: token.value,
    newPassword: null,
    passwordConfirmation: null
  })

const changePassBtn = ref(true)

const inputTextValidation = () => {
  if(BodyRequest.value.newPassword && BodyRequest.value.passwordConfirmation){
    changePassBtn.value = false
  }else{
    changePassBtn.value = false
  }
}


const passwordConfirmationRules = [
  (v) => v === BodyRequest.value.newPassword || "Password confirmation must match",
];

</script>


<template>
  <div class="w-100 h-screen bg-gradient-to-b from-purple-100 to-yellow-100 ">
    <div style="height: 10%">
      <smallLogo />
    </div>
    <v-overlay v-model="pageLoading" contained class="align-center justify-center">
      <div class="flex flex-col items-center justify-center h-screen w-screen">
        <v-progress-circular indeterminate size="36" color="white" class=""></v-progress-circular>
      </div>
    </v-overlay>
    <div class="flex justify-center items-center ">
      <section   class=" my-28 flex-1 flex flex-col justify-center items-center ">
      <div v-if="token && !requestCompleted"
        class="sm:w-auto w-64  bg-gray-50 rounded-lg p-8 flex flex-col justify-center items-center space-y-6 h-auto my-12">
        <div class="my-2 text-2xl sm:text-3xl font-bold text-center">
          <span >
            Change your password
          </span>
        </div>
        <div class="flex flex-col justify-center items-center  h-auto">
          <v-form ref="changePasswordForm" fast-fail @submit.prevent="changePassword" class="  ">
            <div class="flex flex-col justify-center items-center space-y-2">
              <v-text-field 
              @input="inputTextValidation()"
              prepend-inner-icon="mdi-lock" id="password" label="Enter new password"
                v-model="BodyRequest.newPassword" :rules="newPasswordRules"  hidden type="password" class="w-52 sm:w-96"
                autocomplete="new-password"
                ></v-text-field>
              <v-text-field   @input="inputTextValidation()" prepend-inner-icon="mdi-lock" id="passwordConfirmation" label="Confirm new password"
                v-model="BodyRequest.passwordConfirmation" :rules="newPasswordRules || passwordConfirmationRules" hidden type="password"
                class="w-52  sm:w-96"
                autocomplete="new-password-confirmation"
                ></v-text-field>
            </div>
            <div class="flex justify-center mt-4">
              <button class="bg-yellow-400 rounded-lg px-4 py-2 text-white font-semibold hover:bg-yellow-500"
                :disabled="changePassBtn" type="submit"
                :class="(changePassBtn? 'initial' : 'cursor-pointer')"
                >
                Change password
              </button>
            </div>
          </v-form>
        </div>
      </div>

      <div v-if="!token" class="flex flex-col justify-center items-center space-y-2 h-full">
        <div class="my-4 title-message">
          <span class="">
            Sorry! The token is invalid or it has expired.
          </span>
        </div>
        <div>
          <button class="bg-amber-400 rounded-lg px-4 py-2 text-white font-semibold hover:bg-yellow-500"
            @click="redirectToResetPassoword()">
            Resend reset password request
          </button>
        </div>
      </div>

      <div v-if="requestCompleted" id="successfully-changed" 
       
        class="flex flex-col justify-center items-center space-y-2 h-full"
      >
        <div>
          <span
            class="material-icons outlined text-lime-500"
            :style="{ fontSize: '3em' }"
            >check_circle</span
          >
        </div>
        <div class="title-message">
          <span >
            Your password has been changed successfully!
          </span>
        </div>
        <div class="subtitle-message">
          <span >
        Please log in into your {{ APP_NAME }} account using your new password.
            <a
              class="cursor-pointer text-lime-500 font-bold"
              @click="$router.push('/login')"
            >
              Continue
            </a
            >
          </span>
        </div>
      </div>

      <supportLogin />
    </section>
    </div>

  </div>
</template>