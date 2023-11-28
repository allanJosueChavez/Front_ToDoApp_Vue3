// store.js
import { createPinia } from 'pinia';

const pinia = createPinia();

export const useTodoListsStore = pinia.createStore({
  state: () => ({
    todoLists: [],
  }),
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

export default pinia;
