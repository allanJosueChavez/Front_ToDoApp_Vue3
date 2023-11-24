<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { toast } from "vue3-toastify";
import listsService from "../../services/listsService.js";

const { createTask, getAllTasks, updateListName } = listsService;

const props = defineProps(["listSelected"]);
const listAnimation = ref(false);

const toDoListSelected = computed(() => {
  return props.listSelected;
});

onMounted(async () => {

});

const modifiedList = ref({
  name: ""
});

watch(toDoListSelected, (newValue) => {
  listAnimation.value = true
  console.log("list selected ");
  console.log(newValue.id);
  console.log(toDoListSelected.value.id)
  if (!toDoListSelected.value) {
    console.log("No list selected")
    return
  }

  getAllTasks(toDoListSelected.value.id).then((response) => {
    console.log("all the tasks are: ");
    console.log(response.data);
    toDoListSelected.value.todos = response.data.tasks;
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
    toDoListSelected.value.todos.push(todoCreated);
  }
};


const saveListName = async () => {
  console.log("Saving list name...");
  try {
    console.log(toDoListSelected.value)
    
    if(modifiedList.value.name.trim() === "") {
      modifiedList.value.name = toDoListSelected.value.name;
      return
    }
    const listId = toDoListSelected.value.id;
    const data = {
      name: toDoListSelected.value.name
    }
    const response = await updateListName(listId, data);
    if(response.status === 200) {
      toast.success("List name updated!", {
        position: "top-right",
        autoClose: 1000,
      });
      toDoListSelected.value.name = modifiedList.value.name; // This is to update the name in the sidebar. So I don't have to 
    }
  } catch (error) {
    console.log(error);
  }
};





</script>

<template>
  <div id="to-do-list" class="sm:w-4/5 bg-gradient-to-b from-purple-100 to-yellow-100 pb-8 pt-2 px-10">
    <div   :class="`h-full ${listAnimation && 'animate-right'}`" v-if="toDoListSelected">
 
        <section id="greeting-section" class="my-4 align-center flex h-18">
        <div id="greeting" class="greeting w-4/5 font-extrabold p-2">
          <h2 class="title pl-2 text-3xl">
            <input type="text" class="" placeholder="Type your list's name here..." v-model="modifiedList.name"
            @blur="saveListName()" 
            />
          </h2>
        </div>
        <div id="delete-list-button" class="flex justify-end w-1/5 p-2">
          <v-tooltip>
            <template v-slot:activator="{ props }">
              <span v-bind="props" class="material-icons bg-red-500 text-white rounded-md p-2 cursor-pointer"
                @click="deleteToDoList(toDoListSelected.id)">
                delete
              </span>
            </template>
            <span> Delete List! </span>
          </v-tooltip>
        </div>
      </section>
      <section id="create-todo-section" class="create-todo h-36">
        <form @submit.prevent="addTodo(toDoListSelected.id)">
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
        <div v-for="(todo, index) in toDoListSelected.todos" :class="`todo-item ${todo.status && 'done'}`" :key="index">
          <label>
            <input type="checkbox" v-model="todo.status" @change="saveChanges()" />
            <span :class="`bubble ${todo.category}`"> </span>
          </label>
          <div class="todo-content">
            <input type="text" v-model="todo.name" @change="saveChanges()" />
          </div>
          <div class="actions">
            <button class="delete" @click="removeTodo(toDoListSelected.id, todo)">
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