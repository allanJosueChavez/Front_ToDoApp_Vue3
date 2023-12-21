<template>
  <div class="flex">
    <Navbar></Navbar>
    <div
      id="profile-edit "
      class="px-24 py-24 h-full w-full min-h-screen bg-gradient-to-b from-purple-100 to-yellow-100"
    >
      <div id="title" class=" ">
        <v-form ref="editProfileForm" fast-fail @submit.prevent="updateUser()">
          <h1 class="mb-4 text-4xl text-left font-bold text-blue-900">
            EDIT PROFILE
          </h1>
          <div class="grid gap-y-6">
            <div class="grid grid-cols-2 gap-x-6">
              <div  >
                <v-text-field
                  class="text-purple-900"
                  label="Full name"
                  :rules="fullNameRules"
                  v-model="user.fullName"
                ></v-text-field>
              </div>
              <div>
                <v-text-field
                  class="text-purple-900"
                  label="Full name"
                  :rules="fullNameRules"
                  v-model="user.fullName"
                ></v-text-field>
              </div>
            </div>
          </div>
        </v-form>
      </div>
      <div id="profile-edit-description" class="h-full hidden">
            This is the profile edit page.
         It'll have:
         - a form to edit the user's profile. Vuetify components like v-text-field, v-select, v-checkbox, v-file-input, etc. will be used.
         - a button to save the changes
         - it'll have use of yup to validate the form
         - i guess i'm going to have to have something kind of a navbar to navigate between the profile, edit profile, and change password pages
         - Profile picture because why not?
         - a button to delete the account
         - a button to change the password
         - a button to log out
         - a button to go back to the profile page
         - a button to go back to the home page
         - a button to go to the about page
         - a button to go to the contact page
         - a button to go to the terms and conditions page
         - a button to go to the privacy policy page
         - a button to go to the cookie policy page
         - a button to go to the accessibility statement page
         - a button to go to the faq page
         - a button to go to the help page
         - a button to go to the sitemap page
         - a button to go to the report a problem page
         - a button to go to the report abuse page
         - a button to go to the report a bug page
         - a button to go to the report a typo page
         - I gotta sync it or connect it with authentication of google, github, or fb. for that I can use the package vue-social-auth or vue-social-login
         
      </div>
    </div>
  </div>
</template>
<script setup>
import Navbar from "../../components/app/navbar/verticalNavbar.vue";
import { ref } from "vue";

const fullNameRules = [
  (v) => !!v || "Full name is required",
  (v) => (v && v.length >= 3) || "Full name must be at least 3 characters",
];

const user = ref({
  fullName: "",
});
</script>
