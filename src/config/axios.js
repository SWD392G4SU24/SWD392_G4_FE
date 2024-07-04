import axios from "axios";

const baseUrl = "https://dassie-living-bonefish.ngrok-free.app";

//const baseUrl = "https://6627a8d2b625bf088c092e93.mockapi.io";

//
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
// api.interceptors.response.use(null, handleError);

export default api;
