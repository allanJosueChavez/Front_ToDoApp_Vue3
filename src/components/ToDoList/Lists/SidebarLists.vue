<script setup>
import { ref, onMounted, watch, computed } from "vue";

import { useTodoListsStore } from "../../../stores/listsStore.js";
const listsStore = useTodoListsStore();

//Difference between accessing a prop and creating a ref from a prop. The difference relies on the fact that the prop is reactive and the ref is not.
// The best way to use a prop is to create a computed property from it.

// const props = defineProps({
//     allLists: Array,
// });
const lists = computed(() => {
  return listsStore.todoLists;
});
// const computedLists = computed(() => {
//   return props.allLists;
// })

// in order
const props = defineProps(["listSelected", "listsLoading"]);
const emit = defineEmits(["openToDoList"]);

async function openToDoList(todolist) {
  emit("openToDoList", todolist);
}

const sidebarCollapsed = computed(() => {
  return listsStore.sidebarCollapsed;
});
</script>
<template>
  <div
    style="
      scrollbar-width: thin;
      overflow-y: scroll;
      margin-top: 10px;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      align-content: center;
    "
    :class="sidebarCollapsed ? 'h-100 pb-24' : '   '"
  >
    <div
      v-if="lists.length > 0 && !listsLoading"
      v-for="(list, index) in lists"
      :key="index"
      style="margin: 0 3% 0 3%"
    >
      <v-tooltip>
        <template v-slot:activator="{ props }">
          <button
            v-bind="props"
            @click="openToDoList(list)"
            class="truncate tablink hover:bg-sky-900 rounded-lg w-full mt-0.5 mb-0.5"
            v-bind:class="sidebarCollapsed ? ' w-10 ' : '   '"
            style=""
            v-bind:id="list.id"
            :class="
              (listSelected && listSelected.id === list.id
                ? ' taskListActive bg-blue-950 '
                : ' inactiveTodoList' + ' ' + 'font-semibold') +
              (sidebarCollapsed ? ' w-2 h-12   ' : '    ')
            "
          >
            <span class="material-icons text-white" v-if="sidebarCollapsed">
              list
            </span>
            {{
              !sidebarCollapsed
                ? list.name +
                  " " +
                  "(" +
                  (list.taskCount ? list.taskCount : 0) +
                  ")"
                : ""
            }}
          </button>
        </template>
        <span>
          {{ sidebarCollapsed ? list.name + ": " : "" }}
          {{ "(" + (list.taskCount ? list.taskCount : 0) + ")" }} Not completed.
        </span>
      </v-tooltip>
    </div>
    <div
      class="h-100 text-center flex justify-center items-center"
      v-if="listsLoading"
    >
      <v-progress-circular indeterminate color="white"></v-progress-circular>
    </div>
    <div
      id="no-lists-found"
      v-if="lists.length === 0 && !listsLoading"
      class="h-100 text-center flex justify-center items-center"
    >
      <span class="text-white font-semibold"> No lists found! </span>
    </div>
    <!-- <div id="no-lists-yet">
      <span class="text-white font-semibold">
        No lists yet!  
      </span>

    </div> -->
  </div>
</template>

<style scoped>
.tablink {
  color: aliceblue;
  padding: 5% 0px 5% 0px;
  border: 1px solid rgba(255, 255, 255, 0.39);
}

.tablink:hover {
  /* background-color: rgb(0, 77, 145); */
  border-radius: 0.5rem;
}
</style>
