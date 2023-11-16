<script setup>
import "../style.css";
import "../styles/scrollbar.css";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { ref, onMounted, computed, watch, onBeforeMount } from "vue";
import ToDoList from "../components/ToDoList/ToDoList.vue";
import Sidebar from "./ToDoList/Sidebar/Sidebar.vue";

const allLists = ref([]);
const defaultPlaceholder = ref("Add a new item...");



//   // msg: String,
// });

// let taskList = ["Dietary Intake", "Exercise", "Acvity with your partner"];
// const taskLists = ref(tasklist: {"Running", "Cycling", "Swimming"});

// const taskLists = ref([
//   {
//     title: "Task List 1",
//     todos: ["Todo 1", "Todo 2"],
//   },
//   {
//     title: "Task List 2",
//     todos: ["Todo 3", "Todo 4"],
//   },
//);
// const input_category = ref(null);

const todos = ref([]);
const input_content = ref("");
const todos_asc = computed(() =>
  todos.value.sort((a, b) => {
    return b.createdAt - a.createdAt;
  })
);

const taskLists = ref([]);

const sortedTaskLists = computed(() => {
  return taskLists.value.slice().sort((a, b) => b.id - a.id);
});



watch(taskLists, (newValue) => {
  // localStorage.setItem("taskLists", JSON.stringify(newValue.value));
});

const addTodo = (taskListId) => {
  if (input_content.value.trim() === "") {
    console.log("Please enter a name for the task!");
    return;
  }
  const data = localStorage.getItem("taskLists");
  const result = Object.values(taskLists.value).find(
    (item) => item.id === taskListId
  );
  console.log(result);

  result.todos.push({
    content: input_content.value,
    // category: input_category.value,
    done: false,
    createdAt: new Date().getTime(),
  });
  localStorage.setItem("taskLists", JSON.stringify(taskLists.value));
  input_content.value = "";
};

const saveChanges = () => {
  localStorage.setItem("taskLists", JSON.stringify(taskLists.value));
};

// const markAsDone = (taskListId, done) => {
//   // const result = Object.values(taskLists.value).find(
//   //   (item) => item.id === taskListId
//   // );
//   // result.done = done;
//   localStorage.setItem("taskLists", JSON.stringify(taskLists.value));
// };

// const updateTodoContent = (taskListId, todoContent) => {
//   // console.log(result.todos[0]);
//   // let todo = result.todos.find((element) => element === 3);
//   // todo = todoContent;
//   localStorage.setItem("taskLists", JSON.stringify(taskLists.value));
// };

const removeTodo = async (taskListId, todo)  => {
  const result = Object.values(taskLists.value).find(
    (item) => item.id === taskListId
  );
  result.todos = await result.todos.filter((t) => t !== todo);
  localStorage.setItem("taskLists", JSON.stringify(taskLists.value));
  toast.success('Item deleted!', {
    autoClose: 1500,
    hideProgressBar:   false,
    position: "top-right",
    pauseOnHover: true,
    showCloseButtonOnHover:  false,
    // To change the bg color :
    
  }
  );
};

// const activeTasklist = ref(null);

// Watch for changes to activeTasklist

// Computed property to store the value of activeTasklist
const activeTaskList = ref(null);

function openTaskList(taskListId) {
  console.log("openTaskList");
  console.log(taskListId);
  console.log(sortedTaskLists.value);
  activeTaskList.value = taskListId;
}

// computed property to check if a task list is active


const deleteToDoList = (taskListId) => {
  // taskLists.value = taskLists.value.filter(
  //   (taskList) => taskList.id !== taskListId
  // );
};
// const activeTaskListId = ref(null);

// const activeTaskList = computed(() => {
//   return taskLists.value.find(
//     (taskList) => taskList.id === activeTaskListId.value
//   );
// });

// function openTaskList(taskListId) {
//   activeTaskListId.value = taskListId;
// }



watch((activeTaskList) => {
  // this.taskList.push({ id: 1, name: "New Item" });
  console.log("The active list is: "+activeTaskList)
});


const openToDoList = (taskListId) => {
  console.log("openToDoList");
  console.log(taskListId);
  console.log(sortedTaskLists.value);
  activeTaskList.value = taskListId;
}

//trash

</script>

<!--  Add a search bar, default lists and counter of tasks per list. A drag an drop to order -->
<template>
  <!-- <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" /> -->
  <div class="sm:flex h-screen w-full">
  <Sidebar :allLists="allLists" 
    :listSelected="activeTaskList"
    @openToDoList="openToDoList"
  />
  <ToDoList 
    listSelected="activeTaskList"
  />

    <!-- <div
      id="to-do-list"
      class="sm:w-4/5 bg-gradient-to-b from-purple-100 to-yellow-100 pb-8 pt-2  px-10 "
    >
      <div
      class="h-full animate-right "
      v-for="(taskList, index) in taskLists" :key="index"
      :class="
                activeTaskList === taskList.id
                  ? ' block '
                  : ' hidden '
              "
      >
          <section 
          id="greeting-section"
          class="my-4 align-center flex h-18">
            <div 
            id="greeting"
            class="greeting w-4/5 font-extrabold p-2">
              <h2 class="title pl-2 text-3xl">
                <input
                  type="text"
                  class=""
                  placeholder="Type your list's name here..."
                  v-model="taskList.title"
                  @change="saveChanges()"
                />
              </h2>
            </div>
            <div 
            id="delete-list-button"
            class="flex justify-end w-1/5 p-2">
            
              <v-tooltip>
                <template v-slot:activator="{ props }">
                  <span
                  v-bind="props"
                    class="material-icons bg-red-500 text-white rounded-md p-2 cursor-pointer "
                    @click="deleteToDoList(taskList.id)"
                  > 
                    delete
                  </span>
                </template>
                <span> Delete List! </span>
              </v-tooltip>
 
            </div>
          </section>
          <section 
          id="create-todo-section"
          class="create-todo h-36">
            <form @submit.prevent="addTodo(taskList.id)">
              <input
                type="text"
                :placeholder="defaultPlaceholder"
                v-model="input_content"
                id="AddTaskInput"
                @click="changePlaceholder()"
              />

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
          id="to-dos-list"
          class="todo-list my-8 h-4/6  overflow-y-auto">
            <div
              v-for="(todo, index) in taskList.todos"
              :class="`todo-item ${todo.done && 'done'}`"
              :key="index"
            >
              <label>
                <input
                  type="checkbox"
                  v-model="todo.done"
                  @change="saveChanges()"
                />
                <span :class="`bubble ${todo.category}`"> </span>
              </label>
              <div class="todo-content">
                <input
                  type="text"
                  v-model="todo.content"
                  @change="saveChanges()"
                />
              </div>
              <div class="actions">
                <button class="delete" @click="removeTodo(taskList.id, todo)">
                  Delete
                </button>
              </div>
            </div>
          </section>
      </div>
    </div> -->
  </div>
</template>



<style scoped>



.container {
  width: 100%;
  height: 100%;
}
.read-the-docs {
  color: #888;
}

.taskListActive {
  border-radius: 0.5rem;
}

.inactiveTodoList {
  /* background-color: #1953ac; */
  /* border-bottom: 1px solid #d4d4d4; */
  /* border-radius: 0.5rem; */
}

.animate-right {
  position: relative;
  animation: animateright 0.4s;
}


#AddTaskInput:hover {
  background-color: #d4d4d4;
}

#AddTaskInput:hover::-webkit-input-placeholder {
  font-weight: 900;
  color: #6e6e6e;


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
