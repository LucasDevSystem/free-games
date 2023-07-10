import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000, // 5s
  headers: {
    "dev-email-address": process.env.REACT_APP_API_EMAIL,
  },
});

export default api;
