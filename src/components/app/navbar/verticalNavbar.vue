<script setup></script>

<template>
  <div
    id="vertical-navbar"
    class="bg-blue-900 w-28 h-screen flex flex-col justify-between items-center"
  >
    <div class="h-screen flex flex-col w-full ml-6">
        <div id="to-do-list-icon" 
        @click="$router.push('/lists')"
        class="px-4 flex items-center bg-blue-950 rounded-lg cursor-pointer w-20 my-auto relative h-20 "> 
          <img
          class=""
          src="https://i.ibb.co/QrjrV7B/image.webp" alt=""  />
        </div>
    </div>
  </div>
</template>
