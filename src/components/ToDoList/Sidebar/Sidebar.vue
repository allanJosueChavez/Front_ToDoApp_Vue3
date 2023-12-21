<script setup>
// Imports 
import Lists from "./../Lists/SidebarLists.vue";
import listsService from "../../../services/listsService.js";
import { ref, computed, onMounted, onBeforeMount, watch } from "vue";

import { toast } from "vue3-toastify";
import {useTodoListsStore} from '../../../stores/listsStore.js'
import smallLogo from "../../app/smallLogo.vue";
// Constants

const searching = ref(false);
const listsLoading = ref(false);
const search = ref("");
const { getAllLists, createList } = listsService;
const listsStore = useTodoListsStore();
const { addAllLists, setSelectedList, updateLists } = listsStore;





// States
// Question: Why ref instead of computed? Because computed is a function that returns a value, and ref is a value that can be changed.
const lists = ref([]);
// const lists = computed(() => {
//   return listsStore.todoLists;
// })
const allLists = ref([]);
// Props and emits
// const props = defineProps(["listSelected"])
const listSelected = computed(() => {
  return listsStore.selectedList;
});
const emit = defineEmits(['openToDoList'])

// Vue hooks
onMounted(async () => {
  await getLists()
});

// Methods


const getLists = async () => {
  listsLoading.value = true;
  await getAllLists().then((response) => {
    //Well here the token is not the one expected, after that confirmation the user is seeing all the notes. weird as fuck. 
    const listsResponse = response.data;
    addAllLists(listsResponse);
    lists.value =  listsStore.todoLists
    allLists.value =  listsStore.todoLists
    console.log("All lists are: ");
    console.log(listsStore.todoLists); 
  }).catch((error) => {
    if(error.code === 'ERR_NETWORK') return
    toast.error("Error loading lists");
    listsLoading.value = false;
  }); 
  listsLoading.value =  false;
};


async function createNewList() {
  const ToDolist = {
    name: "Untitled",
  };

  const response = await createList(ToDolist);
  if (response.status === 200) {
    const listCreated = response.data.list
    lists.value.push(listCreated);
    updateLists(lists.value)
    console.log(listCreated);
    setSelectedList(listCreated);

  }
  // here I gotta say to the ToDoList component which is the list I just created
}

const openToDoList = (toDoList) => { // This is triggered by the event emitted by the Lists component 
  emit("openToDoList", toDoList);
  setSelectedList(toDoList);
  // Future implementation send the id as a route params:  router.push("/to-do-list/" + taskListId); benefits?
}



const searchInLists = () => {
  searching.value = true;
  console.log("Searching in lists");
  console.log(search.value);
  if (search.value === "") {
    lists.value = allLists.value;
    searching.value = false;
    return
  }
  console.log("Searching...")
  lists.value = lists.value.filter((list) => list.name.toLowerCase().includes(search.value.toLowerCase()));
  searching.value = false;
}

const sidebarCollapsed = ref(true);

const expandSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
}

const collapseSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
} 


</script>

<template>

  <div class="h-full top-0 sm:w-1/5 p-0 " 
  

  :class="(listSelected ? ' sm:block hidden ' : ' sm:block block ') + (sidebarCollapsed ? ' sm:w-20 ' : '   ') + ' transition-all duration-500 '"
  id="sidebar">

    <div class="sidebar sm:bg-blue-900 bg-gray-700 w-full" style="text-align: center; height: 100%; align-items: center">
      <div class="h-20 relative" v-if="!sidebarCollapsed">
        <smallLogo />
        <div id="collapse-button" class="absolute right-0 text-white top-6 cursor-pointer text-3xl"
        @click="collapseSidebar()"
        >

          <span class="material-icons transform scale-150 mr-4"> 
            keyboard_arrow_left
          </span> 
        </div>

      </div>
      <div v-else class="hover:bg-blue-950 cursor-pointer" @click="expandSidebar()"> 
        <img src="https://i.ibb.co/QrjrV7B/image.webp" alt="" class=" " />
      </div>
 
      <div
      v-if="!sidebarCollapsed"
      id="search-bar-container" class="w-full h-15 mb-6">
        <v-text-field v-model="search" label="Search"
        @input="searchInLists()"
        placeholder="Find a list..." hide-details
          class="bg-blue-900 rounded-md mx-3 text-white" style="border: 2px solid white" :loading="searching">
          <span class="material-icons absolute top-5 right-0 text-white mr-1">
            search
          </span>
        </v-text-field>
      </div>
      <div class="px-3 my-2 h-14 w-full" id="add-new-list-button">
        <button class="rounded-lg button-add bg-pink-600 w-full h-full" @click="createNewList()">
          <span class="text-white font-semibold"> Add a new list + </span>
        </button>
      </div>
      <Lists style="height: 60%; " :listSelected="listSelected" @openToDoList="openToDoList" :lists="lists"
      :listsLoading="listsLoading"
      />

    </div>

  </div>
</template>

<style scoped>
.button-add {
  color: white;
  height: 100%;
}
</style>
