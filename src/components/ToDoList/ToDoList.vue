<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { toast } from "vue3-toastify";
import listsService from "../../services/listsService.js";
import { useTodoListsStore } from "@/stores/listsStore.js";
import ConfirmationDialog from "@/components/dialogs/ConfirmationDialogs/ConfirmationDialog.vue";


const listsStore = useTodoListsStore();
const { setSelectedList, removeList, updateUncompletedTodosCounter } = listsStore;
const { createTask, getAllTasks, updateListName, deleteList, deleteTask , updateTask} = listsService;

// const props = defineProps(["listSelected"]);

const deleteConfirmationDialog = ref(false);
const listSelected = computed(() => {
  return listsStore.selectedList;
});


const loading = ref(false)
const listAnimation = ref(false);

const currentList = computed(() => {
  // return props.listSelected;
  return listsStore.selectedList;
});

const notDoneTodos = ref([])
const doneTodos = ref([])
const listInEdition = ref(null);
const originalListName = ref(null);

onMounted(async () => {
  console.log(currentList)

});


watch(currentList, (newValue) => {
  loading.value = true
  console.log(loading.value)
  listAnimation.value = true
  console.log("Watching. Perceiving a new value...")
  if (!currentList.value) {
    console.log("No list selected")
    return
  }
  originalListName.value = currentList.value.name
  listInEdition.value = currentList.value

  if ((currentList.value === currentList.value.id)) {
    console.log("The list is the same") // This is no use because it will never get into this watch since the prop will actually never change
    return
  }
  if(currentList.value){
    getAllTasks(currentList.value.id).then((response) => {
      console.log("all the tasks are: ");
      console.log(response.data);
      currentList.value.todos = response.data.tasks;
      notDoneTodos.value = currentList.value.todos.filter((todo) => !todo.status);
      doneTodos.value = currentList.value.todos.filter((todo) => todo.status);  
      loading.value = false
      setTimeout(() => {
        listAnimation.value = false
      }, 400); // Why 400? Because the animation lasts 0.4s
  });
  }
});

const defaultPlaceholder = ref("Add a new item...");
const input_content = ref("");

const changePlaceholder = () => {
  defaultPlaceholder.value = "Type your to-do here...";
};

const addTodo = async (id) => {
  if (!input_content.value) {
    // Something nicer than this can be that the input gets red and a message appears saying that it can't be empty
    toast.info("Please write something!", {
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
    // currentList.value.todos.push(todoCreated);
    notDoneTodos.value.push(todoCreated);
    input_content.value = "";
    updateUncompletedTodosCounter(currentList.value.id, (currentList.value.taskCount + 1));
  }
};


const saveListName = async () => {
  try {
    if (currentList.value.name.trim() === "" || currentList.value.name === originalListName.value) {
      currentList.value.name = originalListName.value;
      return
    }
    const listId = currentList.value.id;
    const data = {
      name: currentList.value.name
    }
    const response = await updateListName(listId, data);
    if (response.status === 200) {
      toast.success("List name updated!", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  } catch (error) {
    console.log(error);
  }
};


const askConfirmation = (id) => {
  console.log("Asking confirmation to delete list with id: " + id);
  deleteConfirmationDialog.value = true;

};

async function deleteToDoList() {
   const response = await deleteList(currentList.value.id);
  if (response.status === 200) {
    toast.success("List deleted!", {
      position: "top-right",
      autoClose: 1000,
    });
    removeList(currentList.value);
    setSelectedList(null);
    deleteConfirmationDialog.value = false;
    return
  }
  toast.error("Error deleting list!", {
    position: "top-right",
    autoClose: 1000,
  });

}

async function deleteTodo(list, todo) {
  if(todo.status){
      doneTodos.value = doneTodos.value.map((t) => {
        if(t.id === todo.id){
          t.deleting = true
        }
        return t});
    }else{
      notDoneTodos.value = notDoneTodos.value.map((t) => {
        if(t.id === todo.id){
          t.deleting = true
        }
        return t});
    }
    const response = await deleteTask(todo.id);
  if (response.status === 200) {
    // currentList.value.todos = currentList.value.todos.filter((t) => t !== todo);
    if(todo.status){
      doneTodos.value = doneTodos.value.filter((t) => t !== todo);
    }else{
      notDoneTodos.value = notDoneTodos.value.filter((t) => t !== todo);
      updateUncompletedTodosCounter(list, (currentList.value.taskCount - 1));

    }

 
  }

}

const updateTodo = async (todo) => {
  const body = {
    status:  todo.status,
    name: todo.name
  }
  await updateTask(todo.id, body);
};

const markAsDone = async (todo) => {
  await updateTodo(todo);
  notDoneTodos.value = notDoneTodos.value.filter((t) => t !== todo);
  doneTodos.value.push(todo);
  updateUncompletedTodosCounter(currentList.value.id, (currentList.value.taskCount - 1));
};

const markAsNotDone = async (todo) => {
  await updateTodo(todo);
  doneTodos.value = doneTodos.value.filter((t) => t !== todo);
  notDoneTodos.value.push(todo);
  updateUncompletedTodosCounter(currentList.value.id, (currentList.value.taskCount + 1));
};

const removeListSelectedOnMobile = () => {
  setSelectedList(null);
};



</script>

<template>
  <div id="to-do-list "  
  :class="listSelected ? ' block sm:block ' : ' hidden sm:block ' "
  class="sm:h-auto h-full sm:w-4/5 bg-gradient-to-b from-purple-100 to-yellow-100 pb-8 pt-2 px-5 sm:px-10  ">
    <div :class="`h-full ${listAnimation && 'animate-right'}`" v-if="listSelected && !loading">
      <span   class="material-icons fixed top-2 left-2 text-3xl p-2 cursor-pointer"
                @click="removeListSelectedOnMobile">
                arrow_back
              </span>
      <section id="greeting-section" class="my-8 sm:my-4 align-center flex h-18">
        <div id="greeting" class="greeting w-4/5 font-extrabold p-2">
          <h2 class="title pl-2 text-3xl">
            <input type="text" class="" placeholder="Type your list's name here..." v-model="currentList.name"
              @blur="saveListName()" />
          </h2>
        </div>
        <div id="delete-list-button" class="flex justify-end w-1/5 p-2">
          <v-tooltip>
            <template v-slot:activator="{ props }">
              <span v-bind="props" class="material-icons bg-red-500 text-white rounded-md p-2 cursor-pointer"
                @click="askConfirmation(currentList.id)">
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
            <!-- <p
          class="text-red-500"
          >
              You must write something!
          </p> -->
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
      <section id="to-dos-list" class=" todo-list my-8  overflow-y-auto  "
        style="height: 60%;"
      >
        <div 
        
        v-for="(todo, index) in  notDoneTodos" :class="`todo-item ${todo.status && 'done'}`" :key="index">
          <div class="mt-2 mr-3">
 
          <span class="material-icons-outlined  cursor-pointer text-blue-800 select-none" 
          @click="todo.status = !todo.status; markAsDone(todo)"
          
          >
            circle
          </span>
          </div>
          <div class="todo-content">
            <input type="text" v-model="todo.name" @change="updateTodo(todo)" />
          </div>
          <div class="actions">
            <button class="delete w-20" @click="deleteTodo(currentList.id, todo)">
              <span v-show="!todo.deleting">Delete</span>
              <v-progress-circular   :size="25" v-show="todo.deleting" indeterminate color="white"></v-progress-circular>
            </button>
          </div>
        </div>
        <div class=" my-4
        "
        v-if="doneTodos.length > 0"
        >
          <hr class="text-gray-800 my-4" />
            <span 
            class="text-gray-800 font-bold"
            >
                Completed:
            </span>
        </div>
        <div 
       
        v-for="(todo, index) in doneTodos" :class="`todo-item ${todo.status && 'done bg-blue-400'}`" :key="index">
          <div class="mt-2 mr-3">
            <span class="material-icons-outlined cursor-pointer text-blue-800 select-none"
          @click="todo.status = !todo.status; markAsNotDone(todo)"
          
          >
            check_circle
          </span>
 
          </div>
          <div class="todo-content">
            <input type="text" v-model="todo.name" @change="updateTodo(todo)" />
          </div>
          <div class="actions">
            <button class="delete" @click="deleteTodo(currentList.id, todo)">
             <span v-show="!todo.deleting">Delete</span>
              <v-progress-circular  v-show="todo.deleting" indeterminate color="white"></v-progress-circular>
            </button>
          </div>
        </div>
      </section>
    </div>
    <div class="h-full w-full flex justify-center items-center">
      <v-progress-circular class="mx-auto my-auto"   :size="40" v-if="loading"  indeterminate color="white"></v-progress-circular>

    </div>

  </div>
  <div v-if="currentList">
    <ConfirmationDialog :showDialog="deleteConfirmationDialog"
      :v-text="`Are you sure you want to delete the list ${currentList.name}? This will delete all the to-dos inside it.`"
      :v-title="`Confirm delete`" @closeDialog="deleteConfirmationDialog = false" @confirmAction="deleteToDoList" />
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