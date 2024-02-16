import { defineStore } from 'pinia'

// export const useUserStore = defineStore("user", {
//   state: () => ({
//     user: null,
//   }),

export const useUserStore = defineStore("user", {
  state: () => ({
    token: localStorage.getItem('token') || null,
    storedUser: localStorage.getItem('user') || null
  }),

  actions: {
    async fetchUser() {
      const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/users`);

      this.user = await res.json();
    },
    async signUp(email, password) {
      const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/users`, {
      method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      this.user = await res.json();
    },
    async signIn(email, password) {
      const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      this.user = await res.json();
    },

    storeLoggedInUser(token, user) {
      // Save the token to localStorage
      localStorage.setItem('token', token);

      // Save the user to localStorage
      localStorage.setItem('user', JSON.stringify(user));

      // Update the store state
      this.token = token;
      this.storedUser = user;
    }

  },
});