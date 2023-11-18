<script setup>
import Lists from "./../Lists/Lists.vue";
import listsService from "../../../services/listsService.js";
import { ref, computed, onMounted, onBeforeMount, watch } from "vue";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";

const listsLoading = ref(false);
const search = ref("");
const { getAllLists, createList } = listsService;
const router = useRouter();
const lists = ref([]);
const logout = async () => {
  Cookies.remove("user_jwt");
  Cookies.remove("user_name");
  router.push("/login");
};


const props = defineProps(["listSelected"]);
// defineEmits(["openToDoList"]);

async function addNewList() {
  const ToDolist = {
    name: "Untitled", // Untitled and the number, length of the db table of lists.
  };

  const response = await createList(ToDolist);
  console.log(response);
  if (response.status === 200) {
    const listCreated = response.data.list
    lists.value.push(listCreated);
  }
}

async function openTaskList(taskListId) {
  //   console.log("Opening task list with id: " + taskListId);
  //   props.listSelected = taskListId
  //   console.log(props.listSelected)
  //nested
  //   router.push("/to-do-list/" + taskListId);
}

onMounted(async () => {
  await getAllLists().then((response) => {
    lists.value = response.data;
  });
});

watch(lists, (newValue) => {
  console.log("all the lists are: ");
  console.log(newValue);
});

watch(props.listSelected, (newValue) => {
  console.log("list selected ");
  console.log(newValue);
});



const emit = defineEmits(['openToDoList'])

 
  
 
onBeforeMount(async () => {


});

const openToDoList = (listId) => {
  console.log("Sidebar knows id of the list is: " + listId);
  emit("openToDoList", listId);
  //   props.listSelected = listId
  //   console.log(props.listSelected)
}

const openProfileMenu = () => {
  console.log("Opening profile menu");
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

</script>

<template>
  <div class="top-0 sm:w-1/5 p-0 h-full" id="sidebar">
    <div class="sidebar sm:bg-blue-900 bg-gray-700 w-full" style="text-align: center; height: 100%; align-items: center">
      <div id="sidebar-title"
        class="w-full h-20 flex justify-center align-center bg-opacity-25 bg-gradient-to- from-sky-800 to-blue-900"
        style="display: flex; flex-wrap: wrap">
        <div class="flex justify-center items-center">
          <span class="font-bold text-2xl sm:text-2xl" style="color: beige">
            ToDoFlow
          </span>
          <img src="https://i.ibb.co/QrjrV7B/image.webp" alt="" class="w-6 sm:w-10 sm:p-auto" />
        </div>
      </div>
      <div id="search-bar-container" class="w-full h-15 mb-6">
        <v-text-field v-model="search" label="Search" placeholder="Find a list..." hide-details
          class="bg-blue-900 rounded-md mx-3 text-white" style="border: 2px solid white" :loading="listsLoading">
          <span class="material-icons absolute top-5 right-0 text-white mr-1">
            search
          </span>
        </v-text-field>
      </div>
      <div class="px-3 my-2 h-14" id="add-new-list-button">
        <button class="rounded-lg button-add bg-pink-600 w-full h-full" @click="addNewList()">
          <span class="text-white font-semibold"> Add a new list + </span>
        </button>
      </div>
      <Lists style="height: 62%" :listSelected="props.listSelected" @openToDoList="openToDoList" :lists="lists" />
      <div id="profile" class="bg-blue-950 mt-1 h-16">
        <div id="logout" class="flex justify-center items-center h-100">
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
              <v-list-item v-for="(item, index) in items" :key="index" :value="index">
                <v-list-item-title @click="item.itemFunction">{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.button-add {
  /* background-color: #1b62cd; */
  color: white;
  /* font-weight: 700; */
  height: 100%;
}
</style>
