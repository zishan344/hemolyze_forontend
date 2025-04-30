import axios from "axios";
const liveUrl = "https://hemolyze.vercel.app/";
// const localUrl = "http://127.0.0.1:8000/";
const authApiClient = axios.create({
  baseURL: `${liveUrl}api/v1/`,
});

export default authApiClient;

authApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authTokens");
    if (token) {
      config.headers.Authorization = `JWT ${JSON.parse(token)?.access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
