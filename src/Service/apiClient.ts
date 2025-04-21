import axios from "axios";

const liveUrl = "https://hemolyze.vercel.app/";
const apiClient = axios.create({
  baseURL: `${liveUrl}api/v1/`,
});

export default apiClient;
