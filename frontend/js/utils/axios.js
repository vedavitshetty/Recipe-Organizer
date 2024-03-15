import axios from 'axios';

// Set up default axios instance
const instance = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
