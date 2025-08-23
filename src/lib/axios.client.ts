import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL, NEXT_API_ROUTE_URL } from "@/config/api";
import { COOKIE_KEYS } from "@/config/storage";

function getDeviceId(): string {
  const deviceId = Cookies.get(COOKIE_KEYS.deviceId)!;

  // if (!deviceId) {
  //   const newDeviceId = crypto.randomUUID();
  //   Cookies.set(COOKIE_KEYS.deviceId, newDeviceId);
  //   return newDeviceId;
  // }

  return deviceId;
}

// Use this instance to make requests to the KJO Academy API
const axiosClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    common: {
      "X-Device-Id": getDeviceId(),
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  },
});

// axiosClient.interceptors.request.use((config) => {
//   config.headers["X-Request-Id"] = crypto.randomUUID();
//   return config;
// });

// axiosClient.interceptors.response.use(
//   (response: AxiosResponse) => {
//     return response;
//   },
//   async (error: AxiosError) => {
//     const originalRequest = error.config as AxiosRequestConfig & {
//       _retry?: boolean;
//     };

//     // @TODO: Handle 401 Unauthorized error

//     return Promise.reject(error);
//   }
// );

// Use this instance to make requests to the Next.js API route
const axiosClientNext: AxiosInstance = axios.create({
  baseURL: NEXT_API_ROUTE_URL,
  timeout: 10000,
  headers: {
    common: {
      "X-Device-Id": getDeviceId(),
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  },
});

[axiosClient, axiosClientNext].forEach((instance) => {
  instance.interceptors.request.use((config) => {
    config.headers["X-Request-Id"] = crypto.randomUUID();
    return config;
  });

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig & {
        _retry?: boolean;
      };

      // @TODO: Handle 401 Unauthorized error

      return Promise.reject(error);
    }
  );
});

export { axiosClient, axiosClientNext };
