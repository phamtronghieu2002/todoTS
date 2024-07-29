import axios from "axios";
import axiosRetry from "axios-retry";
import { PrivateRoutes } from "../route";
axios.defaults.withCredentials = true;

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

//confgiure axios instance response
instance.interceptors.response.use(
  function (response) {
    return response.data ? response.data : { status: response.status };
  },
  function (error) {
    let res;
    if (error.response) {
      res = {
        status: error.response.status,
        data: error.response.data,
        statusText: error.response.statusText,
        headers: error.response.headers,
        config: error.config,
      };
      const status = res.status;
      if (status === 401) {
        axios
          .post(`${import.meta.env.VITE_APP_API_URL}/auth/refresh_token`)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
            const path = window.location.pathname;
            if (
              path !== "/login" &&
              PrivateRoutes.some((route) => route.path === path)
            ) {
              window.location.href = "/login";
            }
          });
      }
    }
    return Promise.reject(res || error);
  }
);

axiosRetry(instance, {
  retries: 3, // number of retries
  retryDelay: (retryCount) => {
    return retryCount * 1000; // time interval between retries
  },
  retryCondition(error) {
    return error.status === 401;
  },
});
export default instance;
