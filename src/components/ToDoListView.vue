<script setup>
import "../style.css";
import "../styles/scrollbar.css";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { ref, onMounted, computed, watch, onBeforeMount } from "vue";
import ToDoList from "../components/ToDoList/ToDoList.vue";
import Sidebar from "./ToDoList/Sidebar/Sidebar.vue";
 
</script>

<template>
  <!-- <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" /> -->
  <div class="sm:flex h-screen w-full">
    <Sidebar :listSelected="activeTodoList" />
    <ToDoList />
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
.read-the-docs {
  color: #888;
}

.taskListActive {
  border-radius: 0.5rem;
}

.inactiveTodoList {
  /* background-color: #1953ac; */
  /* border-bottom: 1px solid #d4d4d4; */
  /* border-radius: 0.5rem; */
}
 
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
