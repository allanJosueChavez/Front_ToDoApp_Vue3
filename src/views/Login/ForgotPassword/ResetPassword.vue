<script setup>
import smallLogo from "@/components/app/smallLogo.vue";
import usersService from "../../../services/usersService";
import { toast } from "vue3-toastify";
import { ref, onMounted } from 'vue'

const { sendPasswordResetMail } = usersService;
const email = ref("");
const emailRules = ref([
    (v) => !!v || "E-mail is required",
    (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
]);

const sendingMail = ref(false)
const mailRequestSent = ref(false)
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
    sendingMail.value = true
    sendPasswordResetMail({
        email: email.value
    }).then((response) => {
        if (response.status === 200) {
            mailRequestSent.value = true
            toast.success("Email sent! Please check out your inbox!", {
                position: "top-right",
                autoClose: 1500,
            });
        }
    }).catch((err) => {
        console.log("Something went wrong!", err)
    }).finally(() => {
        sendingMail.value = false
    })

    console.log("Email sent correctly!");
};


const cleanForm = () => {
    email.value = ""
    mailRequestSent.value = false
}


</script>

<template>
    <div class="h-screen bg-gradient-to-b from-purple-100 to-yellow-100">
        <div style="height: 10%">
            <smallLogo />
        </div>
        
        <div class="flex flex-col justify-center items-center space-y-4" style="height: 90%">
            <div id="sentMailForm" v-if="!mailRequestSent">
                <div class="flex flex-col justify-center items-center space-y-4">
                    <span class="text-xl font-semibold text-center text-gray-600">
                        Please enter your email address to send you a link to reset your password.
                    </span>
                    <v-form ref="resendEmailForm" fast-fail @submit.prevent="sendEmail"
                        class="flex flex-col justify-center items-center">
                        <div class="flex flex-col justify-center items-center">
                            <v-text-field prepend-inner-icon="mdi-email" id="email" label="Email" v-model="email"
                                :rules="emailRules" class="w-96">
                            </v-text-field>
                            <button
                                class="bg-yellow-400 rounded-lg px-4 py-2 text-white font-semibold hover:bg-yellow-500 mt-2">
                                Send email
                            </button>
                        </div>
                    </v-form>
                </div>
            </div>

            <div v-if="mailRequestSent"
                class="border border-gray-600 bg-slate-50 bg-opacity-50 h-64 w-2/6 rounded-lg flex justify-center items-center text-white text-4xl  ">
                <div class=" flex-col flex">
                    <p class="text-center text-lg text-blue-900 p-12">
                        <!-- The email has been sent! Go ahead and check out your inbox! -->
                        We've sent an email to the address <strong> a******9@gmail.com</strong> with a link so you can
                        reset your password.
                    </p>
                    <button
                        class="mx-auto w-48 bg-yellow-400 rounded-lg  text-white font-semibold hover:bg-yellow-500 cursor-pointer flex align-center justify-center "
                        @click="cleanForm()">
                        <span class="text-xl ">
                            Accept
                        </span>
                    </button>
                </div>

            </div>

        </div>
        <v-overlay v-model="sendingMail">
      <div
      class="flex flex-col items-center justify-center h-screen w-screen"
      >
      <v-progress-circular
        indeterminate
        size="64"
        color="blue"
        class=""
      ></v-progress-circular>
    </div>
    </v-overlay>
    </div>
</template>
