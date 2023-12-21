<script setup>
import "../style.css";
import "../styles/scrollbar.css";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { ref, onMounted, computed, watch, onBeforeMount } from "vue";
import ToDoList from "../components/ToDoList/ToDoList.vue";
import Sidebar from "./ToDoList/Sidebar/Sidebar.vue";
import horizontalNavbar from "./app/navbar/horizontalNavbar.vue";
</script>

<template>

<div class="h-screen flex flex-col w-full">
  <!-- Navbar -->
  <horizontalNavbar />
  <!-- View -->
  <div class="flex-1 bg-purple-200 overflow-y-auto overflow-x-hidden">
    <div class="sm:flex w-full h-full">
      <Sidebar />
      <ToDoList />
    </div>
  </div>
</div>

<!-- 
  <div class="h-screen bg-yellow-900"> 


  </div> -->
  <!-- <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" /> -->

</template>

<style scoped>
 
 
#AddTaskInput:hover {
  background-color: #d4d4d4;
}

#AddTaskInput:hover::-webkit-input-placeholder {
  font-weight: 900;
  color: #6e6e6e;
}

@keyframes animateright {
  from {
    right: -300px;
    opacity: 0;
  }
  to {
    right: 0;
    opacity: 1;
  }
}
</style>
