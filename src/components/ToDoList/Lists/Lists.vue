<script setup>

import { ref, onMounted, watch, computed } from "vue";

// const props = defineProps({
//     allLists: Array,
// });
const props = defineProps(["lists","listSelected"]);
// const lists = ref([props.allLists]); 

const emit = defineEmits(['openToDoList'])

async function openTaskList(taskListId) {
  console.log("Opening task list with id: " + taskListId);
  props.listSelected = taskListId
  emit("openToDoList", taskListId);
  //   router.push("/to-do-list/" + taskListId);
}

const activeTaskList = ref(null);
const isActiveTaskList = computed(() => {
  return (id) => {
    // return activeTaskList.value === id;
    return false
  };
});

</script>
<template>
    <div
    v-if="lists.length > 0"
    
    style="
      scrollbar-width: thin;
      overflow-y: scroll;
      margin-top: 10px;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      align-content: center;
    "
  >
    <div
      v-for="(list, index) in lists"
      :key="index"
      style="margin: 0 3% 0 3%"
    >
      <button
        @click="openTaskList(list.id)"
        class="tablink hover:bg-sky-900 border rounded-lg w-full"
        style="
          padding-left: 5%;
          padding-right: 5%;
          margin-top: 1%;
          margin-bottom: 1%;
        "
        v-bind:id="list.id"
        :class="
          isActiveTaskList(list.id)
            ? 'taskListActive bg-blue-950 '
            : 'inactiveTodoList' + ' ' + 'font-semibold'
        "
      >
        {{ list.name }}
      </button>
    </div>
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
