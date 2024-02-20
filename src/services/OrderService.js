import api from './api'; // Adjust the import path to where your api.js is located

export default {
  async createOrder(orderData) {
    try {
      const response = await api.post('orders', orderData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};