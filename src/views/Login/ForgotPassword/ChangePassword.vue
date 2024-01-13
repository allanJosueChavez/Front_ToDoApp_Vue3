<script setup>
    import smallLogo from "@/components/app/smallLogo.vue";
    const APP_NAME = import.meta.env.VITE_APP_NAME
</script>


<template>
    <div class="h-screen bg-gradient-to-b from-purple-100 to-yellow-100">
      <div style="height: 10%">
        <smallLogo />
      </div>
      <v-overlay v-model="loading" contained class="align-center justify-center">
    </v-overlay>
    <section
      style="height: 90%"
      class="flex flex-col justify-center items-center"
    >
      <div
        v-if="mailConfirmed"
        id="mail-confirmed"
        class="flex flex-col justify-center items-center space-y-2 h-full"
      >
        <div>
          <span
            class="material-icons outlined text-lime-500"
            :style="{ fontSize: '3em' }"
            >check_circle</span
          >
        </div>
        <div>
          <span class="text-4xl font-bold text-center">
            Thanks for confirming your email address!
          </span>
        </div>
        <div>
          <span class="text-xl font-semibold text-center text-gray-600">
            Do you wish to start using {{ APP_NAME }}? Start
            <a
              class="cursor-pointer text-lime-500 font-bold"
              @click="authenticateVerifiedUser"
              >here</a
            >
          </span>
        </div>
      </div>
      <div
        v-if="!mailConfirmed && token"
        class="flex flex-col justify-center items-center space-y-2 h-auto"
      >
        <div>
          <span class="text-4xl font-bold text-center">
            Please confirm your email address!
          </span>
        </div>
        <div
          v-if="!isEmailUpdate"
          class="flex flex-col justify-center items-center space-y-2 h-auto"
        >
          <div class="w-auto">
            <span class="text-xl font-semibold text-center text-gray-600">
              Hi Allan, Thanks for signing up for {{ APP_NAME }}! Please confirm your
              email address by clicking the button
            </span>
          </div>
          <div>
            <button
              class="bg-yellow-400 rounded-lg px-4 py-2 text-white font-semibold hover:bg-yellow-500"
              :loading="loading"
              @click="setAccountConfirmed()"
            >
              Confirm email address
            </button>
          </div>
        </div>
        <div
          v-if="isEmailUpdate"
          class="flex flex-col justify-center items-center space-y-2 h-auto"
        >
          <div class="w-auto">
            <span class="text-xl font-semibold text-center text-gray-600">
              Hi Allan, to confirm your email address please click the button
            </span>
          </div>
          <div>
            <button
              class="bg-yellow-400 rounded-lg px-4 py-2 text-white font-semibold hover:bg-yellow-500"
              :loading="loading"
              @click="updateUserEmail()"
            >
              Confirm and update email address
            </button>
          </div>
        </div>
      </div>

      <div
        v-if="!token"
        class="flex flex-col justify-center items-center space-y-2 h-full"
      >
        <div class="my-4">
          <span class="text-4xl font-bold text-center">
            Sorry! The token is invalid or it has expired.
          </span>
        </div>

        <div>
          <button
            class="bg-amber-400 rounded-lg px-4 py-2 text-white font-semibold hover:bg-yellow-500"
            @click="redirectResendEmailView()"
          >
            Resend email confirmation
          </button>
        </div>
      </div>

      <div class="w-full flex justify-center bottom-32 fixed">
        <!-- <span class="text-xl font-semibold text-center text-gray-600 ">
        If you need help, please contact us at
        <a class="cursor-pointer text-lime-500 font-bold" href="mailto:achavez@mem.gob.gt"> 
        </a>

      </span> -->
        <button
          class="text-blue-900 px-4 py-2 font-semibold underline hover:text-blue-800"
          type="submit"
          @click="redirectToLogin"
        >
          <span class="text-md"> Go back to login </span>
        </button>
      </div>
    </section>
    </div>
  </template>