import axios from "axios";

const requestPrivate = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: { Authorization: `Bearer ${localStorage.getItem("auth-token")}` },
});

requestPrivate.interceptors.request.use(
  function (config) {
    const newToken = localStorage.getItem("auth-token");
    if (newToken) {
      config.headers["Authorization"] = `Bearer ${newToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default requestPrivate;