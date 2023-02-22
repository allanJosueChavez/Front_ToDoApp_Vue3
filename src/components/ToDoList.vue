

<template>
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
  />
  <main class="app">
    <section
      class="tabs"
      style="
        width: 130px;
        float: left;
        width: 20%;
        padding-left: 0%;
        position: fixed;
        top: -40px;
        padding: 0px;
      "
    >
      <div
        class="sidebar"
        style="text-align: center; width: 100%; border-radius: 0.5rem"
      >
        <div>
          <h5 style="color: beige; font-weight: 700; padding-top: 10%" class="">
            MY TO-DO LISTS
          </h5>
        </div>
        <div style="height: 50px">
          <button class="button-add" @click="addNewList()">
            <span> Add a new list + </span>
            <!-- <h2 style="display: inline">＋</h2> -->
          </button>
          <!-- <div v-for="(item, index) in taskLists" :key="index">
            <ul>
              <li>{{ item }}</li>
            </ul>
          </div> -->
        </div>
        <div
          style="
            overflow-y: scroll;
            max-height: 700px;
            margin-top: 10px;
            width: 96%;
          "
        >
          <div
            v-for="(taskList, index) in sortedTaskLists"
            :key="index"
            style="margin-left: 3%"
          >
            <button
              @click="openTaskList(taskList.id)"
              class="tablink"
              style="
                padding-left: 5%;
                padding-right: 5%;
                margin-top: 1%;
                margin-bottom: 1%;
              "
              v-bind:id="taskList.id"
              :class="{ taskListActive: isActiveTaskList(taskList.id) }"
            >
              {{ taskList.title }}
            </button>
          </div>
        </div>
      </div>
    </section>
    <div v-for="(taskList, index) in taskLists" :key="index">
      <div
        class="tasklist animate-right"
        style="float: left; width: 80%; margin-left: 20%"
        v-if="activeTaskList == taskList.id"
      >
        <div style="width: 100%; inline-block">
          <section class="greeting" style="width: 90%; float: left">
            <h2 class="title">
              <input
                type="text"
                placeholder="Type your list's name here..."
                v-model="taskList.title"
                @change="saveChanges()"
              />
            </h2>
          </section>
          <section style="width: 10%; float: left; margin-top: 40px">
            <i
              class="fa fa-trash-o"
              style="font-size: 40px; color: red"
              title="Delete To-Do List!"
              @click="deleteToDoList(taskList.id)"
            ></i>
          </section>
        </div>
        <section class="create-todo">
          <form @submit.prevent="addTodo(taskList.id)">
            <input
              type="text"
              placeholder="Add a new task +"
              v-model="input_content"
              id="AddTaskInput"
              @click="changePlaceholder()"
            />

            <input type="submit" value="Add todo" />
          </form>
        </section>
        <section class="todo-list">
          <h3>Your tasks:</h3>
          <div class="list">
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
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<script setup>
import "../style.css";
import { ref, onMounted, computed, watch } from "vue";
import { reactive, toRefs } from "vue";

defineProps({
  msg: String,
});

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

function addNewList() {
  const newTaskList = {
    id: taskLists.value.length + 1,
    title: "Untitled " + (taskLists.value.length + 1),
    todos: [],
  };
  taskLists.value.push(newTaskList);
  console.log(taskLists);
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

watch(name, (newVal) => {
  localStorage.setItem("name", newVal);
});

// const activeTasklist = ref(null);

// Watch for changes to activeTasklist

// Computed property to store the value of activeTasklist
const activeTaskList = ref(null);

function openTaskList(taskListId) {
  // document.getElementById(taskListId).classList += " taskListActive";
  activeTaskList.value = taskListId;
}

// computed property to check if a task list is active
const isActiveTaskList = computed(() => {
  return (id) => {
    return activeTaskList.value === id;
  };
});

const deleteToDoList = (taskListId) => {
  taskLists.value = taskLists.value.filter(
    (taskList) => taskList.id !== taskListId
  );
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
  input.placeholder = "e.g: study study concepts of ruby on rails";
};

// watch((taskList) => {
//   this.taskList.push({ id: 1, name: "New Item" });
// });
onMounted(() => {
  // name.value = localStorage.getItem("name") || "";
  todos.value = JSON.parse(localStorage.getItem("todos")) || [];
  const data = localStorage.getItem("taskLists");

  if (data) {
    taskLists.value = JSON.parse(data);
  }
});
</script>

<style scoped>
.container {
  width: 100px;
  height: 100px;
}
.read-the-docs {
  color: #888;
}
.button-add {
  background-color: #1b62cd;
  color: white;
  font-weight: 700;
  height: 100%;
}

.taskListActive {
  background-color: rgb(0, 47, 87);
  border-radius: 0.5rem;
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
  background-color: rgb(0, 47, 87);
  border-radius: 0.5rem;
}
.sidebar {
  background-color: #2079ff;
}

#AddTaskInput:hover {
  background-color: #d4d4d4;
}

#AddTaskInput:hover::-webkit-input-placeholder {
  font-weight: 900;
  color: #6e6e6e;
}
.sidebar::-webkit-scrollbar {
  width: 0; /* Safari and Chrome */
  background: transparent;
}
::-webkit-scrollbar {
  width: 0; /* Remove scrollbar space */
  background: transparent; /* Optional: just make scrollbar invisible */
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
