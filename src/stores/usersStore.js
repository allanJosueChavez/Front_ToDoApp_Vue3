import { defineStore } from 'pinia';

export const useUsersStore = defineStore('usersStore', { // '' is the name of the store
    state: () => ({
        users: [],
        selectedUser: null,
        userConfirmationToken: null,
    }),
    getters: { // getters are like computed properties but for stores. they are used to calculate derived state based on store state// an easy example of how it can be used is to calculate the number of items in a todo list
        getUsers() {
        return this.users;
        },
    },
    actions: {
        removeUser(user) {
        this.users = this.users.filter((list) => list.id !== user.id);
        },
        addAllUsers(users) {
        this.users = users;
        },
        updateOneUser(user) {
        const userIndex = this.users.findIndex((listItem) => listItem.id === user.id);
        this.users[userIndex] = user;
        },
        setSelectedUser(user) {
            this.selectedUser = user;
        },
        addUserConfirmationToken(token) {
            console.log(token)
            this.userConfirmationToken = token;
        },
        removeUserConfirmationToken() {
            this.userConfirmationToken = null;
        }

    },
    });

// export default useUsersStore;