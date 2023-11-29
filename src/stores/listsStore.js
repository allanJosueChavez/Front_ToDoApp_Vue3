// store.js
import { defineStore } from 'pinia';


export const useTodoListsStore = defineStore('todoListsStore', { // '' is the name of the store
  state: () => ({
    todoLists: [],
    selectedList: null,
  }),
  getters: { // getters are like computed properties but for stores. they are used to calculate derived state based on store state// an easy example of how it can be used is to calculate the number of items in a todo list
    getTodoLists() {
      return this.todoLists;
    },
  },
  actions: {
    removeList(todoList) {
      this.todoLists = this.todoLists.filter((list) => list.id !== todoList.id);
    },
    addAllLists(lists) {
      this.todoLists = lists;
    },
    updateOneList(list) {
      const listIndex = this.todoLists.findIndex((listItem) => listItem.id === list.id);
      this.todoLists[listIndex] = list;
    },
    updateListCounter(listId, counter) {
        const listIndex = this.todoLists.findIndex((listItem) => listItem.id === listId);
        this.todoLists[listIndex].taskCount = counter;
    },
    setSelectedList(list) {
        this.selectedList = list;
    }

  },
});

 