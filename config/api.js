const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiService {
  static getFullUrl(endpoint) {
    return `${BASE_URL}/${endpoint}`;
  }

  static async request(endpoint, options = {}) {
    const url = this.getFullUrl(endpoint);
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const config = { ...defaultOptions, ...options };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Request Error: ${error.message}`);
      throw error;
    }
  }
}

export const api = {
  menu: 'menu',
  orders: 'orders',
  users: 'users',
  
  // Methods for specific API interactions
  async getMenu() {
    return ApiService.request(this.menu);
  },

  async createOrder(orderData) {
    return ApiService.request(this.orders, {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  },

  async getUserProfile(userId) {
    return ApiService.request(`${this.users}/${userId}`);
  }
};
