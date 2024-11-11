import axios from "axios";
import { store } from "../store";
/**
 * ===================================
 * START OF AXIOS CONFIGURATION
 * ===================================
 */
const ciitMerchApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
  timeout: 50000,
});

/**
 * ===================================
 * END OF AXIOS CONFIGURATION
 * ===================================
 */

// interceptor this is for the token
ciitMerchApi.interceptors.request.use(
  async (config) => {
    const { authentication } = store.getState();
    if (authentication.token) {
      config.headers.authorization = `${authentication.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// interceptor to be updated depends on requirements
ciitMerchApi.interceptors.response.use(
  async (config) => {
    const { authentication } = store.getState();
    if (authentication.token) {
      config.headers = {
        Authorization: `${authentication.token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      };
    }

    return config;
  }
  // async function (error) {
  //   if (error.response.status === 403) {
  //     // session timeout
  //     store.dispatch({
  //       type: types.SESSION_TIMEOUT,
  //       payload: error.response.data ? error.response.data.message : "",
  //     });
  //   }
  //   return Promise.reject(error);
  // }
);

export { ciitMerchApi };
