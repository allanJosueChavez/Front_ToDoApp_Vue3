<script setup>
import { useRouter } from "vue-router";
import smallLogo from "@/components/app/smallLogo.vue";
import { useUsersStore } from "@/stores/usersStore.js";
import usersService from "@/services/usersService.js";
import { computed, ref , watch} from "vue";
import supportLogin from "../../../components/app/footer/support&Login.vue";
import { toast } from "vue3-toastify";

const passwordRules = ref([
  (v) => !!v || "Password is required",
  (v) => v.length >= 8 || "Password must be at least 8 characters",
  (v) => v.length <= 30 || "Password must be less than 30 characters",
  (v) => /[A-Z]/.test(v) || "Password must contain at least one uppercase letter",
  (v) => /[a-z]/.test(v) || "Password must contain at least one lowercase letter",
  (v) => /[0-9]/.test(v) || "Password must contain at least one number",
  (v) => /[^A-Za-z0-9]/.test(v) || "Password must contain at least one special character",
])

const router = useRouter();
const usersStore = useUsersStore();
const token = computed(() => usersStore.tokenAction.token);
const redirectToResetPassoword = () => {
  router.push("/accounts/password/reset")
}

const changePasswordForm = ref(null)
const changePassword = async () => {
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
  console.log("Changing password")
}

const loading = ref(false)
const BodyRequest = ref(
  {
    token: token.value,
    password: null,
    password_confirmation: null
  })

const changePassBtn =  ref(true)

const inputTextValidation = () => {
  if(BodyRequest.value.password && BodyRequest.value.password_confirmation){
    changePassBtn.value = false
  }else{
    changePassBtn.value = true
  }
}

</script>


<template>
  <div class="h-screen bg-gradient-to-b from-purple-100 to-yellow-100">
    <div style="height: 10%">
      <smallLogo />
    </div>
    <v-overlay v-model="loading" contained class="align-center justify-center">
      <div class="flex flex-col items-center justify-center h-screen w-screen">
        <v-progress-circular indeterminate size="36" color="white" class=""></v-progress-circular>
      </div>
    </v-overlay>
    <section style="height: 90%" class="flex flex-col justify-center items-center">
      <div v-if="token"
        class=" bg-gray-50 rounded-lg p-8 flex flex-col justify-center items-center space-y-6 h-auto my-12">
        <div class="my-2">
          <span class="text-3xl font-bold text-center">
            Change your password
          </span>
        </div>
        <div class="flex flex-col justify-center items-center  h-auto">
          <v-form ref="changePasswordForm" fast-fail @submit.prevent="changePassword">
            <div class="flex flex-col justify-center items-center space-y-2">
              <v-text-field 
              @input="inputTextValidation()"
              prepend-inner-icon="mdi-lock" id="password" label="Enter new password"
                v-model="BodyRequest.password" :rules="passwordRules"  hidden type="password" class="w-96"
                autocomplete="new-password"
                ></v-text-field>
              <v-text-field   @input="inputTextValidation()" prepend-inner-icon="mdi-lock" id="password_confirmation" label="Confirm new password"
                v-model="BodyRequest.password_confirmation" :rules="passwordRules" hidden type="password"
                class="w-96"
                autocomplete="new-password"
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
        <div class="my-4">
          <span class="text-4xl font-bold text-center">
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

      <supportLogin />
    </section>
  </div>
</template>