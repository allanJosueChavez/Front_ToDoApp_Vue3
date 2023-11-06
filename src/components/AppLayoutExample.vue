<!--  Add a search bar, default lists and counter of tasks per list. A drag an drop to order -->
<template>

  <div class="sm:flex h-screen w-full">
    <div class="top-0 sm:w-1/5 p-0">
      <div
        class="sidebar sm:bg-blue-900 bg-gray-700 w-full "
        style="text-align: center; height: 100%; align-items: center"
      ></div>
    </div>
    <div
      id="to-do-list"
      class="sm:w-4/5 bg-gradient-to-b from-purple-100 to-yellow-100 pb-14 pt-2  px-10  "
    >
      <div class="h-full animate-right">
        <section class="my-4 align-center flex bg-red h-20">
          <span class="text-white ">
            Title of the list and button to delete the list
          </span>
        </section>
        <section class="create-todo bg-purple-900 h-36">
            <span class="text-white ">
              Input and button to create a new To-Do
            </span>
        </section>
        <section id="to-dos-list" class="bg-sky-400 todo-list my-8 h-4/6 overflow-y-auto">
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
