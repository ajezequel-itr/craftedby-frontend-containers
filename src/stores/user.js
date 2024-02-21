import { defineStore } from 'pinia'
import api from '@/services/api.js'

export const useUserStore = defineStore("user", {
  state: () => ({
    token: localStorage.getItem('token') || null,
    storedUser: localStorage.getItem('user') || null,
    userObject: JSON.parse(localStorage.getItem('user')) || null,
  }),

  actions: {
    async signUp(userData) {
      const res = await api.post(`/users`, userData);
      this.user = res.data;
      this.storeUser(res.data.token, res.data.user);
    },

    async signIn(email, password) {
        const res = await api.post('/login', { email, password });
        this.storeUser(res.data.token, res.data.user);
    },

    storeUser(token, user) {
      // Save the token to localStorage
      localStorage.setItem('token', token);
      // Save the user to localStorage
      localStorage.setItem('user', JSON.stringify(user));

      // Update the store state
      this.token = token;
      this.storedUser = user;
    },

    logout() {
      // Clear the token and user from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Reset the store state
      this.token = null;
      this.storedUser = null;
      this.userObject = null;
    }

  },
});