<template>
  <div>
    <Navbar></Navbar>
    <div
      id="profile-edit "
      class="px-28 py-24 h-full w-full min-h-screen bg-gradient-to-b from-purple-100 to-yellow-100"
    >
      <div class="text-white">
        <span
          class="material-icons absolute top-2 left-2 text-3xl p-2 cursor-pointer"
          @click="$router.back()"
        >
          arrow_back
        </span>
      </div>
      <div id="personal-info-form" class="space-y-6">
        <h1 class="mb-8 text-4xl text-left font-bold text-blue-900">
          Update your personal information
        </h1>
        <v-form ref="userInfoForm" fast-fail @submit.prevent="updateUser()">
          <div class="grid gap-y-6">
            <div class="grid grid-cols-2 gap-x-6">
              <div>
                <v-text-field
                  @input="validateUserInfoForm()"
                  class="text-purple-900"
                  label="Full name"
                  :rules="fullNameRules"
                  v-model="userInfo.name"
                ></v-text-field>
              </div>
            </div>
          </div>
          <button
            v-bind:disabled="userInfoButton"
            :class="userInfoButton ? 'bg-gray-400 text-white px-4 py-2 rounded-md h-full my-3' : 'bg-sky-500 text-white px-4 py-2 rounded-md h-full my-3'"
          >
            Update profile
          </button>
        </v-form>
        <h4 class="text-2xl text-left font-bold text-blue-900">
          Change the registered email
        </h4>
        <!-- <span>
            If you want to change your email you must enter a new one and click on the button 'Send verification email.'
            Check your inbox and click on the link to confirm the email. Then the email will be updated.
        </span> -->
        <v-form ref="changeEmailForm" fast-fail @submit.prevent="sendVerificationEmail()">
          <div class="w-2/5">
            <div>
              <v-text-field
                class="text-purple-900 mb-4"
                label="Email"
                @input="validateChangeEmailForm()"
                :rules="emailRules"
                v-model="userEmail"
              ></v-text-field>
            </div>
            <button
              v-bind:disabled="confirmationEmailBtn"
              :class="confirmationEmailBtn ? 'bg-gray-400 text-white px-4 py-2 rounded-md' : 'bg-lime-500 text-white px-4 py-2 rounded-md'"
            >
              Send verification email
            </button>
            <!-- If you want to update the email you must enter it and click on the button send verification email.
              Then if he confirms the email, the email will be updated. -->
          </div>
        </v-form>
        <h4 class="text-2xl text-left font-bold text-blue-900">
          Change password
        </h4>

        <v-form
          ref="updatePassword"
          fast-fail
          @submit.prevent="updatePassword()"
        >
          <div class="w-2/5">
            <div>
              <v-text-field
                class="text-purple-900 mb-4"
                label="Current password"
                :rules="emailRules"
                v-model="passwords.currentPassword"
              ></v-text-field>
              <v-text-field
                class="text-purple-900 mb-4"
                label="Password"
                :rules="emailRules"
                v-model="passwords.password"
              ></v-text-field>
              <v-text-field
                class="text-purple-900 mb-4"
                label="Password confirmation"
                :rules="emailRules"
                v-model="passwords.passwordConfirmation"
              ></v-text-field>
            </div>
            <button class="text-white px-4 py-2 rounded-md bg-purple-900">
              Update password
            </button>
            <!-- If you want to update the email you must enter it and click on the button send verification email.
              Then if he confirms the email, the email will be updated. -->
          </div>
        </v-form>

        <div
          id="danger-zone"
          class="border-2 border-red-600 rounded-md p-8 flex flex-col justify-start w-2/5 h-full mt-8"
        >
          <h4 class="text-3xl text-left font-bold text-red-600">Danger zone</h4>
          <span class="text-red-600 my-2">
            If you delete your account, you will lose all your data.
          </span>
          <button
            class="bg-red-600 text-white px-4 py-2 rounded-md flex items-center cursor-pointer w-60 my-2"
            id="delete-account-button"
          >
            <span
              class="material-icons mr-4 text-white rounded-md p-2 cursor-pointer"
            >
              delete
            </span>
            <span>Delete account</span>
          </button>
        </div>
      </div>
      <div id="profile-edit-description" class="h-full hidden">
        This is the profile edit page. It'll have: - a form to edit the user's
        profile. Vuetify components like v-text-field, v-select, v-checkbox,
        v-file-input, etc. will be used. - a button to save the changes - it'll
        have use of yup to validate the form - i guess i'm going to have to have
        something kind of a navbar to navigate between the profile, edit
        profile, and change password pages - Profile picture because why not? -
        a button to delete the account - a button to change the password - a
        button to log out - a button to go back to the profile page - a button
        to go back to the home page - a button to go to the about page - a
        button to go to the contact page - a button to go to the terms and
        conditions page - a button to go to the privacy policy page - a button
        to go to the cookie policy page - a button to go to the accessibility
        statement page - a button to go to the faq page - a button to go to the
        help page - a button to go to the sitemap page - a button to go to the
        report a problem page - a button to go to the report abuse page - a
        button to go to the report a bug page - a button to go to the report a
        typo page - I gotta sync it or connect it with authentication of google,
        github, or fb. for that I can use the package vue-social-auth or
        vue-social-login
      </div>
    </div>
  </div>

  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card class="p-8">
      <div class="mt-4">
        <v-row>
          <v-card-title class="text-h5 mx-6 mt-2">
            The email has been sent
          </v-card-title>
          <div class="ml-auto rounded-md p-2 cursor-pointer">
            <span
              @click="dialog = false"
              class="material-icons mr-4 text-gray rounded-md p-2 cursor-pointer"
            >
              close
            </span>
          </div>
        </v-row>
      </div>
      <v-card-text class="m-2">
        Check your inbox and click on the link to confirm the email. Then the
        email will be updated.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green-darken-1" variant="text" @click="dialog = false">
          Accept
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
// import Navbar from "../../components/app/navbar/verticalNavbar.vue";
import Navbar from "../../components/app/navbar/horizontalNavbar.vue";
import usersService from "@/services/usersService.js";
import { toast } from "vue3-toastify";
import Cookies from "js-cookie";


const {  updateUserInfo,  getUserInfo ,sendNewEmailConfirmation } = usersService;

import { onMounted, ref, watch } from "vue";


const userEmail = ref("");
const userInfoButton = ref(true);
const user = ref(null);
const userInfo = ref({
  name:  null
});

const passwords = ref({
  currentPassword: "",
  password: "",
  passwordConfirmation: "",
});

onMounted(async () => {
  const response = await getUserInfo();
  if (response.status === 200) {
   user.value = response.data.user;
   userInfo.value.name = response.data.user.name;
   userEmail.value =response.data.user.email;
  }
});


const dialog = ref(false);
const fullNameRules = [
  (v) => !!v || "Full name is required",
  (v) => (v && v.length >= 3) || "Full name must be at least 3 characters",
];

const emailRules = [
  (v) => !!v || "E-mail is required",
  (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
];



const updateUser = async () => {
   const isFormValid =  await validateUserInfoForm();
   if(!isFormValid){
     toast.warning("Please fill correctly the form!", {
       position: "top-right",
       autoClose: 1500,
     });
     return
   }
   const response = await updateUserInfo(userInfo.value);
   if(response.status === 200){
     toast.success("User updated successfully!", {
       position: "top-right",
       autoClose: 1500,
     });
     await Cookies.set("user_name", userInfo.value.name);
   }
};


const userInfoForm = ref(null);
const validateUserInfoForm = async () => {
  const isValid = await userInfoForm.value.validate();
  const differentName = userInfo.value.name !== user.value.name;
  userInfoButton.value =  !isValid.valid || !differentName;
  return isValid.valid && differentName;
};

const confirmationEmailBtn = ref(true);
const changeEmailForm = ref(null);
const validateChangeEmailForm = async () => {
   if(!userEmail.value){
     return false
   }

  const isValid = await changeEmailForm.value.validate();
  const differentEmail = userEmail.value !== user.value.email;
   confirmationEmailBtn.value =  !isValid.valid || !differentEmail;
  return isValid.valid && differentEmail;
};


const sendVerificationEmail = () => {
  dialog.value = true;
  sendNewEmailConfirmation({email: userEmail.value}).then((response) => {
    if (response.status === 200) {
      toast.success("Email sent! Please check out your inbox!", {
        position: "top-right",
        autoClose: 1500,
      });
    }
  }).catch((err) => {
    toast.info(err.response.data.message ? err.response.data.message : "Something went wrong!"
    , {
        position: "top-right",
        autoClose: 1500,
    });
  })
  console.log("sendVerificationEmail");
};


</script>
