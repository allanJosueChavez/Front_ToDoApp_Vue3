import { defineStore } from "pinia";

export const useUsersStore = defineStore("usersStore", {
  // '' is the name of the store
  state: () => ({
    users: [],
    selectedUser: null,
    emailConfirmation: {
      newEmail: null,
    },
    tokenAction: {
      token: null,
      action: null,
    },
  }),
  getters: {
    // getters are like computed properties but for stores. they are used to calculate derived state based on store state// an easy example of how it can be used is to calculate the number of items in a todo list
    getUsers() {
      return this.users;
    },
  },
  actions: {
    removeUser(user) {
      this.users = this.users.filter((list) => list.id !== user.id);
    },
    saveAllUsers(users) {
      this.users = users;
    },
    updateOneUser(user) {
      const userIndex = this.users.findIndex(
        (listItem) => listItem.id === user.id
      );
      this.users[userIndex] = user;
    },
    setSelectedUser(user) {
      this.selectedUser = user;
    },
    setTokenAction(token, action) {
      this.tokenAction.token = token;
      this.tokenAction.action = action;
    },
    removeTokenAction() {
      this.tokenAction.token = null;
      this.tokenAction.action = null;
    },
  },
});

// export default useUsersStore;
