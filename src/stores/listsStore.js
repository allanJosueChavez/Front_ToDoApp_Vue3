// store.js
import { defineStore } from 'pinia';


export const useTodoListsStore = defineStore('todoListsStore', { // 'alerts' means this store name is 'alertsStore' in this case would be 'todoListsStore'
  state: () => ({
    todoLists: [],
  }),
  getters: {
    getTodoLists() {
      return this.todoLists;
    },
  },
  actions: {
    removeList(taskListId) {
      // Remove the list with the given ID from the todoLists array
      this.todoLists = this.todoLists.filter((list) => list.id !== taskListId);
    },
    addAllLists(lists) {
      this.todoLists = lists;
    }
  },
});

 