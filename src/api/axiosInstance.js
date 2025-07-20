import axios from "axios";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(
  function (config) {
    config.headers["Auth-Token"] = JSON.parse(localStorage.getItem("token"));
    config.headers["Child-Token"] = JSON.parse(localStorage.getItem("token"));
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
