<template></template>
<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {useUsersStore} from "@/stores/usersStore.js";
import usersService from "@/services/usersService.js";
 

const usersStore = useUsersStore();
const {  storeEmailConfirmationToken, setTokenAction } =  usersStore;
const { evaluateToken,  } =  usersService;
const route = useRoute();
const router = useRouter();
const token = ref("");
const isEmailUpdate = ref(false);
const isEmailConfirmation = ref(false);
const isPasswordReset = ref(false);
const target = ref("");
onMounted(() => {
  token.value = route.query.token;
  target.value = route.query.target;
  switch(target.value){
      case "newEmailConfirmation":
        isEmailUpdate.value = true;
        break;
      case "passwordReset":
        isPasswordReset.value = true;
        break;
      case "emailConfirmation":
        isEmailConfirmation.value = true;
        break;
      default:
        break;
  }
  if(token) {
    console.log("There is a token");
    console.log("Target is:", target.value)

    evaluateToken(token.value).then((response) => {
        if(response.status === 200){
            setTokenAction(token.value, target.value)
            if(target.value === "passwordReset"){
                router.push("/accounts/password/change")
            }else if(target.value === "emailConfirmation" || target.value === "newEmailConfirmation"){
                const newEmail = response.data.newEmail
                // save the token in the store
                storeEmailConfirmationToken(token.value, isEmailUpdate.value, newEmail)
                console.log("The token was successfully validated")
                router.push("/email-confirmation")
            }

        }
        else{
            console.log("Something went wrong validating the token")
        }
    }).catch((err) => {
        // page that says that the token is invalid go to the login.
        router.push("/email-confirmation")
        console.log("holy shit! the token is expired")
        console.log(err)
    })

  }

});

 


</script>
