import axios from 'axios';

// Set up default axios instance
const instance = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to include CSRF token in headers
instance.interceptors.request.use(config => {
  // Retrieve CSRF token from cookie
  const csrftoken = getCookie('csrftoken');

  // Include CSRF token in headers
  if (csrftoken) {
    config.headers['X-CSRFToken'] = csrftoken;
  }

  return config;
});

// Function to retrieve CSRF token from cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export default instance;
