import axios from "axios";
import { showToast } from "@/utils";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:4000/"
    : "https://attendence-z6yw.onrender.com/";

const TEST_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlZpdGFsaWkgVGVzdCIsImlhdCI6MTIzNDU2fQ.pcdj2JlYXvCMuKmY__iDhUXO1xJYhRDJmE9xLu3qIuE";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = TEST_TOKEN;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["Accept-Language"] = "uk-UA";
    return config;
  },
  (error) => {
    showToast(`Помилка запиту: ${error.message}`, "error");
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    showToast(`Помилка відповіді: ${error.message}`, "error");
    return Promise.reject(error);
  }
);

export default api;
