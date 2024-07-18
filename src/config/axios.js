import axios from "axios";

// const baseUrl = "https://rich-utterly-clam.ngrok-free.app";
const baseUrl = "https://happily-ultimate-mustang.ngrok-free.app";
const config = {
  baseUrl,
  timeout: 3000000,
};
const api = axios.create(config);
api.defaults.baseURL = baseUrl;
const handleBefore = (config) => {
  const token = localStorage.getItem("token")?.replaceAll('"', "");
  config.headers["Authorization"] = `Bearer ${token}`;
  config.headers["ngrok-skip-browser-warning"] = true;

  return config;
};
const handleError = (error) => {
  console.log(error);
  return;
};
api.interceptors.request.use(handleBefore, handleError);

export default api;
