<template></template>
<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {useUsersStore} from "@/stores/usersStore.js";
import usersService from "@/services/usersService.js";



const usersStore = useUsersStore();
const {  addUserConfirmationToken } =  usersStore;
const { verifyEmailConfirmationToken } =  usersService;
const route = useRoute();
const router = useRouter();
const token = ref("");

onMounted(() => {
  // Access the token from the route query
  token.value = route.query.token;
  // Now you can use the 'token' variable in your component
  if(token) console.log("There is a token");
    verifyEmailConfirmationToken(token.value).then((response) => {
        if(response.status === 200){
            addUserConfirmationToken(token.value)
            console.log("The token was successfully validated")
            router.push("/email-confirmation")
        }
        else{
            console.log("Something went wrong validating the token")
        }
    }).catch((err) => {
        // page that says that the token is invalid go to the login.
        // router.push("/login")
        console.log(err)
    })

});
</script>
