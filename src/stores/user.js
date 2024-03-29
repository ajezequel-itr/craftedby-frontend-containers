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
      this.storeUser(res.data.token, res.data.user);
    },

    async createBusiness(businessData) {
      await api.post(`/businesses`, businessData);
    },

    async signIn(email, password) {
        const res = await api.post('/login', { email, password });
        this.storeUser(res.data.token, res.data.user);
    },

    async passwordReset(email){
      await api.post('/password/reset-link', {email});
    },

    async newPassword(userData) {
      await api.post ('/password/reset', userData);
    },

    storeUser(token, user) {
      // Update the store state
      this.token = token;
      this.storedUser = user;
      this.userObject = user;

      // Save the token to localStorage
      localStorage.setItem('token', token);
      // Save the user to localStorage
      localStorage.setItem('user', JSON.stringify(user));
    },

    storeOnlyUser(user) {
      // Update the store state
      this.storedUser = user;

      // Save the user to localStorage
      localStorage.setItem('user', JSON.stringify(user));
    },

    logout() {
      // Reset the store state
      this.token = null;
      this.storedUser = null;
      this.userObject = null;

      // Clear the token and user from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');

    }

  },
});