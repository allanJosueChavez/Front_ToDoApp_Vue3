<!--  Add a search bar, default lists and counter of tasks per list. A drag an drop to order -->
<template>
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
  />

  <div class="sm:flex h-full w-full">
    <div class="top-0 h-screen sm:w-1/5 p-0">
      <div
        class="sidebar sm:bg-blue-900 bg-gray-700 w-full h-full"
        style="text-align: center; height: 100%; align-items: center"
      >
        
      </div>
    </div>
    <div
      id="to-do-list"
      class="sm:w-4/5 bg-gradient-to-b from-purple-100 to-yellow-100 py-8 px-10 h-screen"
    >
      <div
      class="h-full animate-right"
      >
          <section class="my-4 align-center flex">
            <div class="greeting w-4/5">
              <h2 class="title">
                Title of the To-Do List
              </h2>
            </div>
            <div class="cursor-pointer flex justify-end w-1/5">
              <div class="cursor-pointer rounded-md p-2">
                <i
                  class="fa fa-trash-o"
                  style="font-size: 40px; color: red"
                  title="Delete To-Do List!"
                  @click="deleteToDoList(todoExample.id)"
                ></i>
              </div>
            </div>
          </section>
          <section class="create-todo">
            <form @submit.prevent="addTodo(todoExample.id)">
              <input
                type="text"
                placeholder="Add a new task +"
                v-model="input_content"
                id="AddTaskInput"
                @click="changePlaceholder()"
              />

              <button class="bg-yellow-400" type="submit" value="Add to-do">
                <span class="text-purple-900 flex align-items justify-center">
                  <span
                    @click="$router.push('/login')"
                    class="material-icons text-purple-900 cursor-pointer"
                  >
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
            <!-- <h3>Your tasks:</h3> -->
            <div
              v-for="(todo, index) in todoExample.todos"
              :class="`todo-item ${todo.done && 'done'}
               
              
              `"
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
                <button class="delete" @click="removeTodo(todoExample.id, todo)">
                  Delete
                </button>
              </div>
            </div>
          </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import "../style.css";
import axiosInstance from "../services/api/axiosInstance.js";
import { ref, onMounted, computed, watch } from "vue";
import listsService from "../services/listsService.js";

const { getAllLists, createList } = listsService;

// import { reactive, toRefs } from "vue";
const allLists = ref([]);
const todoExample = ref({
  id: 1,
  title: "My Tasks",
  todos: [
    { id: 1, content: "Learn Vue", done: false },
    { id: 2, content: "Build a project", done: false },
  ],
});

const lists = ref([
  {
    id: 1,
    title: "My Tasks",
    todos: [
      { id: 1, content: "Learn Vue", done: false },
      { id: 2, content: "Build a project", done: false },
    ],
  },
]);

// defineProps({
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

// const taskLists = ref([
//   {
//     id: 1,
//     title: "My Tasks",
//     todos: [
//       { id: 1, content: "Learn Vue", done: false },
//       { id: 2, content: "Build a project", done: false },
//     ],
//   },
// ]);
// let newTaskList = {
//   id: 0,
//   title: "Untitled",
//   todos: [],
// };

// const addNewList = () => {
//   // if (newTaskList.value.trim()) {
//   //   taskLists.value.push(newTaskList.value.trim());
//   //   newTaskList.value.trim();
//   // }
//   // console.log(newTaskList);
//   newTaskList.id = taskLists.value.length + 1;
//   taskLists.value.push(newTaskList);
//   console.log(taskLists);
// };
// const taskLists = JSON.parse(localStorage.getItem("taskLists")) || [];
const taskLists = ref([]);

const sortedTaskLists = computed(() => {
  return taskLists.value.slice().sort((a, b) => b.id - a.id);
});

async function addNewList() {
  console.log("Lengths");
  console.log(taskLists.value.length);
  console.log(sortedTaskLists.value.length);
  const newTaskList = {
    id: taskLists.value.length + 1,
    title: "Untitled (" + (taskLists.value.length + 1) + ")",
    todos: [],
  };
  taskLists.value.push(newTaskList);
  console.log(taskLists);

  const ToDolist = {
    name: "Untitled", // Untitled and the number, length of the db table of lists.
    userId: 1,
  };

  const response = await createList(ToDolist);
  console.log(response);
  localStorage.setItem("taskLists", JSON.stringify(taskLists.value));
}

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

const removeTodo = (taskListId, todo) => {
  const result = Object.values(taskLists.value).find(
    (item) => item.id === taskListId
  );
  result.todos = result.todos.filter((t) => t !== todo);
  localStorage.setItem("taskLists", JSON.stringify(taskLists.value));
};

// const activeTasklist = ref(null);

// Watch for changes to activeTasklist

// Computed property to store the value of activeTasklist
const activeTaskList = ref(null);

function openTaskList(taskListId) {
  console.log("openTaskList");
  console.log(taskListId);
  console.log(sortedTaskLists.value);
  // document.getElementById(taskListId).classList += " taskListActive";
  activeTaskList.value = taskListId;
}

// computed property to check if a task list is active
const isActiveTaskList = computed(() => {
  return (id) => {
    // console.log(activeTaskList)
    // console.log(id)
    // console.log(activeTaskList.value === id)
    return activeTaskList.value === id;
    return true;
  };
});

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

const changePlaceholder = () => {
  const input = document.getElementById("AddTaskInput");
  input.placeholder = "e.g: study concepts of ruby on rails";
};

// watch((taskList) => {
//   this.taskList.push({ id: 1, name: "New Item" });
// });
onMounted(async () => {
  // name.value = localStorage.getItem("name") || "";
  const userId = 1;
  await getAllLists(userId);
  todos.value = JSON.parse(localStorage.getItem("todos")) || [];
  const data = localStorage.getItem("taskLists");

  if (data) {
    taskLists.value = JSON.parse(data);
  }
});
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
.read-the-docs {
  color: #888;
}
.button-add {
  /* background-color: #1b62cd; */
  color: white;
  /* font-weight: 700; */
  height: 100%;
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

.tablink {
  color: aliceblue;
  padding: 5% 0px 5% 0px;
}

.tablink:hover {
  /* background-color: rgb(0, 77, 145); */
  border-radius: 0.5rem;
}
.sidebar {
  /* background-color: #0e68ef; */
  /* scrollbar-width: thin;
            

            overflow-y: scroll; */
}

#AddTaskInput:hover {
  background-color: #d4d4d4;
}

#AddTaskInput:hover::-webkit-input-placeholder {
  font-weight: 900;
  color: #6e6e6e;
}
.sidebar::-webkit-scrollbar {
  /* Thin and gray like Mac OS X */
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
