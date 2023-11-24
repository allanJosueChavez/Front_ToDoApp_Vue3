<script setup>

import { ref, onMounted, watch, computed } from "vue";


//Difference between accessing a prop and creating a ref from a prop. The difference relies on the fact that the prop is reactive and the ref is not. 
// The best way to use a prop is to create a computed property from it.

// const props = defineProps({
//     allLists: Array,
// });
// const lists = ref([props.allLists]); 
const computedLists = computed(() => {
  return props.allLists;
})

const props = defineProps(["lists", "listSelected", 'listsLoading']);

const emit = defineEmits(['openToDoList'])

async function openToDoList(todolist) {
  emit("openToDoList", todolist);
}

const activeTaskList = ref(null);
const isActiveTaskList = computed(() => {
  return (id) => {
    // return activeTaskList.value === id;
    return false
  };
});

onMounted(async () => {

});


</script>
<template>
  <div style="
      scrollbar-width: thin;
      overflow-y: scroll;
      margin-top: 10px;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      align-content: center;
    ">
    <div v-if="lists.length > 0 && !listsLoading" v-for="(list, index) in lists" :key="index" style="margin: 0 3% 0 3%">
      <button @click="openToDoList(list)" class="tablink hover:bg-sky-900 border rounded-lg w-full" style="
          padding-left: 5%;
          padding-right: 5%;
          margin-top: 1%;
          margin-bottom: 1%;
        " v-bind:id="list.id" :class="isActiveTaskList(list.id)
            ? 'taskListActive bg-blue-950 '
            : 'inactiveTodoList' + ' ' + 'font-semibold'
          ">
        {{ list.name }}
      </button>
    </div>
    <v-loading>
      <div v-if="listsLoading" class="h-100 text-center flex justify-center items-center">
        <v-progress-circular indeterminate color="white"></v-progress-circular>
      </div>
    </v-loading>
  </div>
</template>


<style scoped>
.tablink {
  color: aliceblue;
  padding: 5% 0px 5% 0px;
}

.tablink:hover {
  /* background-color: rgb(0, 77, 145); */
  border-radius: 0.5rem;
}
</style>
