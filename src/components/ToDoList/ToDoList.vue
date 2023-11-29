<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { toast } from "vue3-toastify";
import listsService from "../../services/listsService.js";
import { useTodoListsStore } from "@/stores/listsStore.js"; 


const { createTask, getAllTasks, updateListName, deleteList } = listsService;

const props = defineProps(["listSelected"]);
const emit = defineEmits(['removeList'])
const listAnimation = ref(false);

const currentList = computed(() => {
  return props.listSelected;
});
 
const listInEdition = ref(null);
const originalListName = ref(null);
const listsStore = useTodoListsStore();
const {addAllLists,updateListCounter, removeList } = listsStore;
onMounted(async () => {

});
 

watch(currentList, (newValue) => {
  listAnimation.value = true
  console.log("watching...")
  if (!currentList.value) {
    console.log("No list selected")
    return
  }
  originalListName.value = currentList.value.name
  listInEdition.value = currentList.value
 
  if((currentList.value === currentList.value.id)){
    console.log("The list is the same") // This is no use because it will never get into this watch since the prop will actually never change
    return
  }
  getAllTasks(currentList.value.id).then((response) => {
    console.log("all the tasks are: ");
    console.log(response.data);
    currentList.value.todos = response.data.tasks;
  });
  
  setTimeout(() => {
    listAnimation.value = false
  }, 400); // Why 400? Because the animation lasts 0.4s

});

const defaultPlaceholder = ref("Add a new item...");
const input_content = ref("");

const changePlaceholder = () => {
  defaultPlaceholder.value = "Type your to-do here...";
};

const addTodo = async (id) => {
  if (!input_content.value) {
    // Something nicer than this can be that the input gets red and a message appears saying that it can't be empty
    toast.warning("Please write something!", {
      position: "top-right",
      autoClose: 1000,
    });
    return
  }
  console.log("Adding a new to-do to the list with id: " + id + " and the content is: " + input_content.value);
  const newTodo = {
    name: input_content.value,
    status: false,
    listId: id
  };

  const response = await createTask(newTodo);
  console.log(response.data)

  if (response.status === 200) {
    const todoCreated = response.data.task
    currentList.value.todos.push(todoCreated);
    updateListCounter(currentList.value.id, (currentList.value.taskCount + 1));
  }
};


const saveListName = async () => {
  try {
    if(currentList.value.name.trim() === "" || currentList.value.name === originalListName.value) {
      currentList.value.name = originalListName.value;
      return
    }
    const listId = currentList.value.id;
    const data = {
      name: currentList.value.name
    }
    const response = await updateListName(listId, data);
    if(response.status === 200) {
      toast.success("List name updated!", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

async function deleteToDoList(){
  console.log("Deleting list with id: " + currentList.value.id);
  const response = await deleteList(currentList.value.id);
  if(response.status === 200) {
    toast.success("List deleted!", {
      position: "top-right",
      autoClose: 1000,
    });
  }

  emit("removeList", currentList.value.id);


}



</script>

<template>
  <div id="to-do-list" class="sm:w-4/5 bg-gradient-to-b from-purple-100 to-yellow-100 pb-8 pt-2 px-10">
    <div   :class="`h-full ${listAnimation && 'animate-right'}`" v-if="currentList">
 
        <section id="greeting-section" class="my-4 align-center flex h-18">
        <div id="greeting" class="greeting w-4/5 font-extrabold p-2">
          <h2 class="title pl-2 text-3xl">
            <input type="text" class="" placeholder="Type your list's name here..." v-model="currentList.name"  
            @blur="saveListName()" 
            />
          </h2>
        </div>
        <div id="delete-list-button" class="flex justify-end w-1/5 p-2">
          <v-tooltip>
            <template v-slot:activator="{ props }">
              <span v-bind="props" class="material-icons bg-red-500 text-white rounded-md p-2 cursor-pointer"
                @click="deleteToDoList(currentList.id)">
                delete
              </span>
            </template>
            <span> Delete List! </span>
          </v-tooltip>
        </div>
      </section>
      <section id="create-todo-section" class="create-todo h-36">
        <form @submit.prevent="addTodo(currentList.id)">
          <input type="text" :placeholder="defaultPlaceholder" v-model="input_content" id="AddTaskInput"
            @click="changePlaceholder()" />

          <button class="bg-yellow-400 font-bold" type="submit" value="Add to-do">
            <span class="text-purple-900 flex align-items justify-center">
              <span class="material-icons text-purple-900 cursor-pointer">
                add
              </span>
              Add to-do
            </span>
          </button>
        </form>
      </section>
      <section
      id="to-dos-list" class="todo-list my-8 h-4/6 overflow-y-auto">
        <div v-for="(todo, index) in currentList.todos" :class="`todo-item ${todo.status && 'done'}`" :key="index">
          <label>
            <input type="checkbox" v-model="todo.status" @change="saveChanges()" />
            <span :class="`bubble ${todo.category}`"> </span>
          </label>
          <div class="todo-content">
            <input type="text" v-model="todo.name" @change="saveChanges()" />
          </div>
          <div class="actions">
            <button class="delete" @click="removeTodo(currentList.id, todo)">
              Delete
            </button>
          </div>
        </div>
      </section>
 

    </div>
  </div>
</template>


<style scoped>
.animate-right {
  position: relative;
  animation: animateright 0.4s;
 
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