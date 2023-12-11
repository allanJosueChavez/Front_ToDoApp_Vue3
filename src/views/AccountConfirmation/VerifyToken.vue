<template></template>
<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import listsService from "../../services/usersService";

const { verifyEmailConfirmationToken } = listsService;
const route = useRoute();
const token = ref("");

onMounted(() => {
  // Access the token from the route query
  token.value = route.query.token;
  // Now you can use the 'token' variable in your component
  if(token) console.log("There is a token");
    verifyEmailConfirmationToken(token.value).then((response) => {
        if(response.status === 200){
            console.log("The token was successfully validated")
        }
        else{
            console.log("Something went wrong validating the token")
        }
    }).catch((err) => {
        console.log(err)
    })

});
</script>
