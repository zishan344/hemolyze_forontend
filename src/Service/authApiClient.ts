import axios from "axios";
const liveUrl = "https://hemolyze.vercel.app/";
const authApiClient = axios.create({
  baseURL: `${liveUrl}api/v1/`,
});

export default authApiClient;

authApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `JWT ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
