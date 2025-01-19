const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = {
  menu: `${API_BASE_URL}/menu`,
  orders: `${API_BASE_URL}/orders`,
  users: `${API_BASE_URL}/users`,
}; 