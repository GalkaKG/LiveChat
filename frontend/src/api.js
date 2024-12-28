import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  withCredentials: true,
});

// const getCSRFToken = () => {
//     const csrfToken = document.cookie.split(";").find(cookie => cookie.trim().startsWith("csrftoken="));
//     return csrfToken ? csrfToken.split("=")[1] : null;
//   };

//   // Добавяне на CSRF токена в axios
//   API.interceptors.request.use((config) => {
//     const csrfToken = getCSRFToken();
//     if (csrfToken) {
//       config.headers["X-CSRFToken"] = csrfToken;
//     }
//     return config;
//   });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
