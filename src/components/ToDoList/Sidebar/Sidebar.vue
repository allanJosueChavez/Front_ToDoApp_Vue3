<script setup>
// Imports
import Lists from "./../Lists/SidebarLists.vue";
import listsService from "../../../services/listsService.js";
import { ref, computed, onMounted, onBeforeMount, watch } from "vue";

import { toast } from "vue3-toastify";
import { useTodoListsStore } from "../../../stores/listsStore.js";
import smallLogo from "../../app/smallLogo.vue";

const searching = ref(false);
const listsLoading = ref(false);
const search = ref("");
const { getAllLists, createList } = listsService;
const listsStore = useTodoListsStore();
const {
  addAllLists,
  setSelectedList,
  updateLists,
  setSidebarCollapsed,
  pushNewList,
} = listsStore;

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
const emit = defineEmits(["openToDoList"]);

// Vue hooks
onMounted(async () => {
  await getLists();
});

// Methods

const getLists = async () => {
  listsLoading.value = true;
  await getAllLists()
    .then((response) => {
      //Well here the token is not the one expected, after that confirmation the user is seeing all the notes. weird as fuck.
      const listsResponse = response.data;
      addAllLists(listsResponse);
      lists.value = listsStore.todoLists;
      allLists.value = listsStore.todoLists;
    })
    .catch((error) => {
      if (error.code === "ERR_NETWORK") return;
      toast.error("Error loading lists");
      listsLoading.value = false;
    });
  listsLoading.value = false;
};

const loading = ref(false);
async function createNewList() {
  const ToDolist = {
    name: "Untitled",
  };
  loading.value = true;
  const response = await createList(ToDolist);
  if (response.status === 200) {
    const listCreated = response.data.list;
    pushNewList(listCreated); // No need to push into the lists because it's already listeninig from the store
    console.log(listCreated);
    setSelectedList(listCreated);
  }
  loading.value = false;

  // here I gotta say to the ToDoList component which is the list I just created
}

const openToDoList = (toDoList) => {
  // This is triggered by the event emitted by the Lists component
  emit("openToDoList", toDoList);
  setSelectedList(toDoList);
  // Future implementation send the id as a route params:  router.push("/lists" + taskListId); benefits?
};

const searchInLists = () => {
  searching.value = true;
  if (search.value === "") {
    lists.value = allLists.value;
    updateLists(lists.value);
    searching.value = false;
    return;
  }
  lists.value = lists.value.filter((list) =>
    list.name.toLowerCase().includes(search.value.toLowerCase())
  );
  updateLists(lists.value);
  searching.value = false;
};

const sidebarCollapsed = ref(false);

const expandSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
  setSidebarCollapsed(sidebarCollapsed.value);
};

const collapseSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
  setSidebarCollapsed(sidebarCollapsed.value);
};

import Cookies from "js-cookie";
const username = Cookies.get("user_name");
</script>

<template>
  <div
    class="h-full top-0 sm:w-1/5 p-0"
    :class="
      (listSelected ? ' sm:block hidden ' : ' sm:block block ') +
      (sidebarCollapsed ? ' sm:w-20 ' : '   ') +
      ' transition-all duration-500 '
    "
    id="sidebar"
  >
    <div
      class="sidebar sm:bg-blue-900 bg-gray-700 w-full relative"
      style="text-align: center; height: 100%; align-items: center"
    >
      <div class="h-20 relative" v-if="!sidebarCollapsed">
        <smallLogo />
        <div
          class="text-white absolute top-7 left-4 cursor-pointer sm:invisible visible"
          
          @click="$router.push('/edit-profile')"
        >
          <span class="material-icons text-white scale-125">
            account_circle
          </span>
 
        </div>
        <div
          id="collapse-button"
          class="invisible sm:visible absolute right-0 text-white top-3 cursor-pointer text-3xl bg-blue-950 h-12 flex justify-center items-center rounded-l-lg"
          @click="collapseSidebar()"
        >
          <span class="material-icons transform scale-125">
            keyboard_arrow_left
          </span>
        </div>
      </div>

      <div
        v-if="sidebarCollapsed"
        class="cursor-pointer w-12 my-auto relative h-16 m-2 pt-1"
      >
        <img src="https://i.ibb.co/QrjrV7B/image.webp" alt="" class=" " />
      </div>
      <div
        v-if="sidebarCollapsed"
        id="collapse-button"
        class="absolute text-white right-0 top-1 cursor-pointer text-3xl bg-blue-950 h-12 flex justify-center items-center rounded-l-lg"
        @click="expandSidebar()"
      >
        <span class="material-icons transform scale-125">
          keyboard_arrow_right
        </span>
      </div>
      <div
        v-if="!sidebarCollapsed"
        id="search-bar-container"
        class="w-full h-15 mb-6"
      >
        <v-text-field
          v-model="search"
          label="Search"
          @input="searchInLists()"
          placeholder="Find a list..."
          hide-details
          class="bg-blue-900 rounded-md mx-3 text-white"
          style="border: 2px solid white"
          :loading="searching"
        >
          <span class="material-icons absolute top-5 right-0 text-white mr-1">
            search
          </span>
        </v-text-field>
      </div>

      <div class="px-3 my-2 h-14 w-full" id="add-new-list-button">
        <v-tooltip>
          <template v-slot:activator="{ props }">
            <button
              v-bind="props"
              class="rounded-lg button-add bg-pink-600 w-full h-full"
              @click="createNewList()"
            >
              <span class="text-white font-semibold" v-if="!loading">
                {{ sidebarCollapsed ? "+" : "Add new list +" }}
              </span>
              <v-progress-circular
                :width="4"
                :size="25"
                v-if="loading"
                indeterminate
                color="white"
              ></v-progress-circular>
            </button>
          </template>
          <span>Create new list </span>
        </v-tooltip>
      </div>
      <Lists
        style="height: 65%"
        :search="search"
        :listSelected="listSelected"
        @openToDoList="openToDoList"
        :lists="lists"
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
