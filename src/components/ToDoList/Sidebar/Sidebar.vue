<script setup>
import listsService from "../../../services/listsService.js";
const { getAllLists, createList } = listsService;
import { ref, computed, onMounted, defineProps, onBeforeMount
 } from "vue";
const listsLoading = ref(false);
const search = ref("");
import Cookies from "js-cookie";
import { useRouter } from "vue-router";
const router = useRouter();

// const props = defineProps({
//     allLists: Array,
// });
const props = defineProps(['allLists']);
const logout = async () => {
    Cookies.remove('user_jwt');
    Cookies.remove('user_name');
    router.push("/login");
}

async function addNewList() {
    const ToDolist = {
        name: "Untitled", // Untitled and the number, length of the db table of lists.
    };

    const response = await createList(ToDolist);
    console.log(response);
}

async function openTaskList(taskListId) {
    console.log("Opening task list with id: " + taskListId);
    //   router.push("/to-do-list/" + taskListId);
}


onMounted(async() => {
  console.log("all the lists are: ");
  console.log(props.allLists);
});

</script>

<template>
    <div class="top-0 sm:w-1/5 p-0 h-full" id="sidebar">
        <div class="sidebar sm:bg-blue-900 bg-gray-700 w-full"
            style="text-align: center; height: 100%; align-items: center">
            <div id="sidebar-title"
                class="w-full h-20 flex justify-center align-center bg-opacity-25 bg-gradient-to- from-sky-800 to-blue-900"
                style="  display: flex; flex-wrap: wrap">
                <div class="flex justify-center items-center" @click="logout()">
                    <span class="font-bold text-2xl sm:text-2xl" style="color: beige; "> ToDoFlow </span>
                    <img src="https://i.ibb.co/QrjrV7B/image.webp" alt="" class="w-6 sm:w-10 sm:p-auto" />
                </div>
            </div>
            <div id="search-bar-container" class="w-full h-15 mb-6">
                <v-text-field v-model="search" label="Search" placeholder="Find a list..." hide-details
                    class="bg-blue-900 rounded-md mx-3 text-white" style="border:  2px solid white; "
                    :loading="listsLoading">
                    <span class="material-icons absolute top-5 right-0 text-white mr-1">

                        search
                    </span>
                </v-text-field>
            </div>
            <div class="px-3 my-2 h-14" id="add-new-list-button">
                <button class="rounded-lg button-add bg-pink-600 w-full h-full" @click="addNewList()">
                    <span class="text-white font-semibold"> Add a new list + </span>
                    <!-- <h2 style="display: inline">＋</h2> -->
                </button>
                <!-- <div v-for="(item, index) in taskLists" :key="index">
            <ul>
              <li>{{ item }}</li>
            </ul>
          </div> -->
            </div>
            <div style="
            scrollbar-width: thin;
            overflow-y: scroll;
            height: 70%;
            margin-top: 10px;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            align-content: center;
          ">
                <div v-for="(taskList, index) in sortedTaskLists" :key="index" style="margin: 0 3% 0 3%">
                    <button @click="openTaskList(taskList.id)" class="tablink hover:bg-sky-900 border rounded-lg w-full"
                        style="
                padding-left: 5%;
                padding-right: 5%;
                margin-top: 1%;
                margin-bottom: 1%;
              " v-bind:id="taskList.id" :class="isActiveTaskList(taskList.id)
                      ? 'taskListActive bg-blue-950 '
                      : 'inactiveTodoList' + ' ' + 'font-semibold'">
                        {{ taskList.title }}
                    </button>
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



.tablink {
    color: aliceblue;
    padding: 5% 0px 5% 0px;
}

.tablink:hover {
    /* background-color: rgb(0, 77, 145); */
    border-radius: 0.5rem;
}
</style>