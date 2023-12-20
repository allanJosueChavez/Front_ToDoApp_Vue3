<script setup>
// Imports 
import Lists from "./../Lists/SidebarLists.vue";
import listsService from "../../../services/listsService.js";
import { ref, computed, onMounted, onBeforeMount, watch } from "vue";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import {useTodoListsStore} from '../../../stores/listsStore.js'
// Constants
const searching = ref(false);
const listsLoading = ref(false);
const search = ref("");
const { getAllLists, createList } = listsService;
const router = useRouter();
const listsStore = useTodoListsStore();
const { addAllLists, setSelectedList } = listsStore;


const openProfileMenu = () => {
  console.log("Opening profile menu");
}


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
const clearCookies = () => {
  Cookies.remove("user_jwt");
  Cookies.remove("user_name");
};

const logout = () => {
  clearCookies();
  router.push("/login");
};

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
  const cookieJwt = Cookies.get('user_jwt');
  console.log(cookieJwt)

  const ToDolist = {
    name: "Untitled",
  };

  const response = await createList(ToDolist);
  if (response.status === 200) {
    const listCreated = response.data.list
    lists.value.push(listCreated);
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

const items = [
  {
    title: 'Profile',
    itemFunction: openProfileMenu

  },
  {
    title: 'Logout'
    , itemFunction: logout
  },
]


const searchInLists = () => {
  searching.value = true;
  console.log("Searching in lists");
  console.log(search.value);
  if (search.value === "") {
    lists.value = allLists.value;
    searching.value = false;
    return
  }
  lists.value = lists.value.filter((list) => list.name.toLowerCase().includes(search.value.toLowerCase()));
  searching.value = false;
}
</script>

<template>
  <div class="  top-0 sm:w-1/5 p-0 h-full "
  :class="listSelected ? ' sm:block hidden ' : ' sm:block block '"
  id="sidebar">
    <div class="sidebar sm:bg-blue-900 bg-gray-700 w-full" style="text-align: center; height: 100%; align-items: center">
      <div id="sidebar-title"
        class="w-full h-20 flex justify-center align-center bg-opacity-25 bg-gradient-to- from-sky-800 to-blue-900"
        style="display: flex; flex-wrap: wrap">
        <div class="flex justify-center items-center">
          <span class="font-bold text-2xl sm:text-2xl" style="color: rgb(255, 255, 250)"
          >
           
            ToDoFlow
          </span>
          <img src="https://i.ibb.co/QrjrV7B/image.webp" alt="" class="w-6 sm:w-10 sm:p-auto" />
        </div>
      </div>
      <div id="search-bar-container" class="w-full h-15 mb-6">
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
      <Lists style="height: 62%; " :listSelected="listSelected" @openToDoList="openToDoList" :lists="lists"
      :listsLoading="listsLoading"
      />
      <div id="profile" class="sm:block hidden bg-blue-950 mt-1 h-16 fixed bottom-0" style="width: 20%;">
        <div id="logout" class="flex justify-center items-center h-100 ">
          <v-menu>
            <template v-slot:activator="{ props }">
              <button v-bind="props" class="rounded-lg  w-full h-full flex justify-center items-center">
                <span class="text-white font-semibold"> Profile </span>
                <span class="material-icons right-0 text-white mx-1">
                  account_circle
                </span>
              </button>
            </template>
            <v-list>
              <div v-for="(item, index) in items" :key="index"   >
                <v-list-item  @click="item.itemFunction">
                  <v-list-item-title >{{ item.title }}</v-list-item-title>
                </v-list-item>
              </div>
            </v-list>
          </v-menu>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.button-add {
  color: white;
  height: 100%;
}
</style>
