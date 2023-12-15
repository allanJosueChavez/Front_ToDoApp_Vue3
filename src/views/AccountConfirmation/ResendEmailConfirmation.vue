<script setup>
import smallLogo from "../../components/app/smallLogo.vue";
import { ref, onMounted } from 'vue'
import { toast } from "vue3-toastify";

import usersService from "@/services/usersService.js";

const { resendEmailConfirmation } = usersService;

const email = ref("");
const emailRules = ref([
    (v) => !!v || "E-mail is required",
    (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
]);


const resendEmailForm = ref(null);
const sendEmail = async () => {
    const validateForm = await resendEmailForm.value.validate();
    const isFormValid = validateForm.valid;
    if (!isFormValid) {
        toast.warning("Please fill correctly the email input!", {
            position: "top-right",
            autoClose: 1500,
        });
        return
    }
    const body = {
        email: email.value
    }
    resendEmailConfirmation(body).then((response) => {
        if (response.status === 200) {
            toast.success("Email sent! Please check out your inbox!", {
                position: "top-right",
                autoClose: 1500,
            });
        }
    }).catch((err) => {
        toast.info(err.response.data.message, {
            position: "top-right",
            autoClose: 1500,
        });
    })
    console.log("send email");
};

</script>

<template>
    <div class="h-screen bg-gradient-to-b from-purple-100 to-yellow-100">
        <div style="height: 10%">
            <smallLogo />
        </div>
        <div class="flex flex-col justify-center items-center space-y-4" style="height: 90%">
            <div class="flex flex-col justify-center items-center space-y-4">
                <span class="text-xl font-semibold text-center text-gray-600">
                    Please enter your email address to resend the confirmation email.
                </span>
                <v-form ref="resendEmailForm" fast-fail @submit.prevent="sendEmail"
                    class="flex flex-col justify-center items-center">
                    <div class="flex flex-col justify-center items-center">
                        <v-text-field id="email" label="Email" v-model="email" :rules="emailRules" class="w-96">
                        </v-text-field>
                        <button
                            class="bg-yellow-400 rounded-lg px-4 py-2 text-white font-semibold hover:bg-yellow-500 mt-2">
                            Send email
                        </button>
                    </div>
                </v-form>
            </div>
            <div class=" w-full flex justify-center  bottom-32 fixed">
 
          <button
            class=" text-blue-900 px-4 py-2 font-semibold underline hover:text-blue-800" 
           
            type="submit"
            @click="redirectToLogin"
          >
            <span class="text-md"> Go back to login 
 

            </span>
          </button>
      </div>
<!-- Right here a button to redirect to the login page "Go back to login". The same thing should be in the view of account confirmation. that gotta be fixed at the bottom no matter if the token's valid or not. whatever  -->
        </div>
    </div>
</template>
