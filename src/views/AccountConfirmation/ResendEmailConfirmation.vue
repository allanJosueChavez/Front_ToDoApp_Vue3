<script setup>
import smallLogo from "../../components/app/smallLogo.vue";
import { ref, onMounted } from 'vue'
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useRouter } from "vue-router";
import usersService from "@/services/usersService.js";
import supportLogin from "../../components/app/footer/support&Login.vue";
import inputRules from "@/validations/inputRules.js";

const { emailRules } = inputRules;
const router = useRouter();
const { resendEmailConfirmation } = usersService;
const email = ref("");
 

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
        toast.info(err.respons && err.response.data.message ? err.response.data.message : "Something went wrong!"
            , {
                position: "top-right",
                autoClose: 1500,
            });
    })
    console.log("send email");
};

const redirectToLogin = () => {
    router.push("/login");
};
</script>

<template>
    <div class="h-screen bg-gradient-to-b from-purple-100 to-yellow-100">
        <div style="height: 10%">
            <smallLogo />
        </div>
        <div class="flex flex-col justify-center items-center space-y-4" style="height: 90%">
            <div class="flex flex-col justify-center items-center space-y-4">
                <div class="subtitle-message">
                    <span >
                    Please enter your email address to resend the confirmation email.
                    </span>
                </div>

                <v-form ref="resendEmailForm" fast-fail @submit.prevent="sendEmail"
                    class="flex flex-col justify-center items-center ">
                    <div class="flex flex-col justify-center items-center ">
                        <v-text-field prepend-inner-icon="mdi-email" id="email" label="Email" v-model="email"
                            :rules="emailRules" class="sm:w-96 w-72">
                        </v-text-field>
                        <button
                            class="bg-yellow-400 rounded-lg px-4 py-2 text-white font-semibold hover:bg-yellow-500 mt-2">
                            Send email
                        </button>
                    </div>
                </v-form>
            </div>
                <supportLogin />
           
        </div>
    </div>
</template>
