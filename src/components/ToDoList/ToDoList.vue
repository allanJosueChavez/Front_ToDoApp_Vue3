<template>
    <div
      id="to-do-list"
      
      class="sm:w-4/5 bg-gradient-to-b from-purple-100 to-yellow-100 pb-8 pt-2  px-10 "
    >
      <div
      class="h-full animate-right "
      v-if="toDoListSelected"
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
                  v-model="toDoListSelected.name"
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
                    @click="deleteToDoList(toDoListSelected.id)"
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
            <form @submit.prevent="addTodo(toDoListSelected.id)">
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
            <!-- <h3>Your tasks:</h3> -->
            <div
              v-for="(todo, index) in toDoListSelected.todos"
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
                <button class="delete" @click="removeTodo(toDoListSelected.id, todo)">
                  Delete
                </button>
              </div>
            </div>
          </section>
      </div>
    </div>

</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";

const props = defineProps(["listSelected"]);

const toDoListSelected = computed(() => {
  return props.listSelected;
});

const defaultPlaceholder = ref("Add a new item...");
const input_content = ref("");
</script>