import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Gửi request với token từ localStorage
export const authorizedApi = () => {
  const token = localStorage.getItem('token');
  return axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};
