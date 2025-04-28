import axios from "axios";

// const liveUrl = "https://hemolyze.vercel.app/";
const localUrl = "http://127.0.0.1:8000/";
const apiClient = axios.create({
  baseURL: `${localUrl}api/v1/`,
});

export default apiClient;
